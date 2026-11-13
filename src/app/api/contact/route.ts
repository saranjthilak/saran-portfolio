import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const TO_EMAIL = process.env.CONTACT_EMAIL ?? "saranjthilak@gmail.com";

/* ── Rate limit: 1 submission per IP per minute (in-memory, edge-safe) ──── */
const ratemap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: NextRequest) {
  /* ── API key guard ── */
  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Email service not configured." }, { status: 503 });
  }

  /* ── Rate limit ── */
  const ip = getIp(req);
  const last = ratemap.get(ip) ?? 0;
  if (Date.now() - last < RATE_LIMIT_MS) {
    return NextResponse.json({ error: "Too many requests. Please wait a moment." }, { status: 429 });
  }

  /* ── Parse + validate body ── */
  let body: { name?: unknown; email?: unknown; message?: unknown; website?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message, website } = body;

  // Honeypot check
  if (website) {
    return NextResponse.json({ ok: true }); // silently swallow bot submissions
  }

  if (
    typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100 ||
    typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254 ||
    typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5000
  ) {
    return NextResponse.json({ error: "Invalid form data." }, { status: 422 });
  }

  /* ── Send email via Resend ── */
  try {
    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email.trim(),
      subject: `New message from ${name.trim()} — saran.cloud`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;border-radius:12px;">
          <h2 style="margin:0 0 8px;font-size:20px;font-weight:800;color:#fff;">New contact form submission</h2>
          <p style="margin:0 0 24px;font-size:13px;color:#888;">via saran.cloud — ${new Date().toUTCString()}</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:12px 16px;background:#1a1a1a;border-radius:8px 8px 0 0;border-bottom:1px solid #2a2a2a;">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666;">Name</span><br/>
                <span style="font-size:15px;font-weight:600;color:#fff;">${name.trim()}</span>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#1a1a1a;border-bottom:1px solid #2a2a2a;">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666;">Email</span><br/>
                <a href="mailto:${email.trim()}" style="font-size:15px;font-weight:600;color:#22d3ee;text-decoration:none;">${email.trim()}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 16px;background:#1a1a1a;border-radius:0 0 8px 8px;">
                <span style="font-size:11px;text-transform:uppercase;letter-spacing:0.1em;color:#666;">Message</span><br/>
                <p style="font-size:14px;color:#ccc;margin:8px 0 0;line-height:1.6;white-space:pre-wrap;">${message.trim().replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
              </td>
            </tr>
          </table>

          <p style="margin:24px 0 0;font-size:12px;color:#555;">
            Reply directly to this email to reach ${name.trim()} at ${email.trim()}.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] Resend error:", error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    ratemap.set(ip, Date.now());
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json({ error: "Unexpected error. Please try again." }, { status: 500 });
  }
}
