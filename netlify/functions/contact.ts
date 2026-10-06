import { Resend } from "resend";
import { z } from "zod";
import type { Handler, HandlerEvent } from "@netlify/functions";

// ── Resend client (API key from environment only) ──────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY);

// ── CORS ────────────────────────────────────────────────────────────────────
const ALLOWED_ORIGIN = "https://saran.cloud";

const corsHeaders = {
  "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ── Zod schema with length limits ──────────────────────────────────────────
const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(100, "Name must be at most 100 characters.")
    .regex(/^[^<>]*$/, "Name contains invalid characters."),
  email: z
    .string()
    .email("Please enter a valid email.")
    .max(254, "Email must be at most 254 characters."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(5000, "Message must be at most 5,000 characters."),
  // Honeypot field — must be empty for legitimate submissions
  website: z
    .string()
    .max(0, "Bot detected.")
    .optional()
    .default(""),
});

// ── In-memory rate limiting (per function instance) ────────────────────────
// Netlify Functions run as short-lived AWS Lambda invocations, so this map
// is scoped to the warm instance. It catches rapid-fire abuse from a single
// IP while the instance is alive. For persistent limiting, use a KV store.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 3; // max requests per window per IP

interface RateBucket {
  count: number;
  resetAt: number;
}

const ipBuckets = new Map<string, RateBucket>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const bucket = ipBuckets.get(ip);

  if (!bucket || now >= bucket.resetAt) {
    ipBuckets.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  bucket.count++;
  return bucket.count > RATE_LIMIT_MAX;
}

function getClientIp(event: HandlerEvent): string {
  return (
    event.headers["x-nf-client-connection-ip"] ??
    event.headers["x-forwarded-for"]?.split(",")[0]?.trim() ??
    "unknown"
  );
}

// ── HTML sanitisation ──────────────────────────────────────────────────────
// Escapes all HTML-significant characters to prevent injection in the email.
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Strips CR/LF to prevent email header injection via replyTo / subject.
function stripNewlines(str: string): string {
  return str.replace(/[\r\n]/g, "");
}

// ── Helpers ────────────────────────────────────────────────────────────────
function jsonResponse(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
}

// ── Handler ────────────────────────────────────────────────────────────────
export const handler: Handler = async (event) => {
  // Preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders, body: "" };
  }

  // Only POST
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  // Rate limiting
  const clientIp = getClientIp(event);
  if (isRateLimited(clientIp)) {
    return jsonResponse(429, { error: "Too many requests. Please wait a minute." });
  }

  try {
    // Parse + validate
    const raw = JSON.parse(event.body ?? "{}");
    const result = contactSchema.safeParse(raw);

    if (!result.success) {
      const firstError = result.error.errors[0]?.message ?? "Validation failed.";
      return jsonResponse(400, { error: firstError });
    }

    const { name, email, message, website } = result.data;

    // Honeypot — silently accept but don't send
    if (website) {
      return jsonResponse(200, { success: true });
    }

    // Sanitise for safe email rendering
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(stripNewlines(email));
    const safeMessage = escapeHtml(message);
    const safeReplyTo = stripNewlines(email);
    const safeSubject = stripNewlines(`New message from ${name} — Portfolio`);

    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "saranjthilak@gmail.com";

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: safeReplyTo,
      subject: safeSubject,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;">
          <h2 style="margin:0 0 16px;font-size:20px;color:#ffffff;">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0;color:#a3a3a3;width:80px;">Name</td>
              <td style="padding:8px 0;color:#ffffff;font-weight:600;">${safeName}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#a3a3a3;">Email</td>
              <td style="padding:8px 0;">
                <a href="mailto:${safeEmail}" style="color:#a78bfa;text-decoration:none;">${safeEmail}</a>
              </td>
            </tr>
          </table>
          <div style="background:#1a1a1a;border-radius:8px;padding:16px;">
            <p style="margin:0;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Message</p>
            <p style="margin:0;color:#e5e5e5;line-height:1.6;white-space:pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin:20px 0 0;font-size:12px;color:#525252;">
            Sent from your portfolio contact form · Reply directly to this email to respond.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return jsonResponse(500, { error: "Failed to send email." });
    }

    return jsonResponse(200, { success: true });
  } catch (err) {
    console.error("Contact function error:", err);
    return jsonResponse(400, { error: "Invalid request." });
  }
};
