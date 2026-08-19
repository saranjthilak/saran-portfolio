import { Resend } from "resend";
import type { Handler } from "@netlify/functions";

const resend = new Resend(process.env.RESEND_API_KEY);

export const handler: Handler = async (event) => {
  const headers = {
    "Access-Control-Allow-Origin": "https://saran.cloud",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const { name, email, message } = JSON.parse(event.body ?? "{}");

    if (!name || !email || !message) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Missing required fields" }) };
    }

    const TO_EMAIL = process.env.CONTACT_EMAIL ?? "saranjthilak@gmail.com";

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [TO_EMAIL],
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#0a0a0a;color:#e5e5e5;border-radius:12px;">
          <h2 style="margin:0 0 16px;font-size:20px;color:#ffffff;">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;margin-bottom:20px;">
            <tr>
              <td style="padding:8px 0;color:#a3a3a3;width:80px;">Name</td>
              <td style="padding:8px 0;color:#ffffff;font-weight:600;">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#a3a3a3;">Email</td>
              <td style="padding:8px 0;">
                <a href="mailto:${email}" style="color:#a78bfa;text-decoration:none;">${email}</a>
              </td>
            </tr>
          </table>
          <div style="background:#1a1a1a;border-radius:8px;padding:16px;">
            <p style="margin:0;color:#a3a3a3;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Message</p>
            <p style="margin:0;color:#e5e5e5;line-height:1.6;white-space:pre-wrap;">${message}</p>
          </div>
          <p style="margin:20px 0 0;font-size:12px;color:#525252;">
            Sent from your portfolio contact form · Reply directly to this email to respond.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { statusCode: 500, headers, body: JSON.stringify({ error: "Failed to send email." }) };
    }

    return { statusCode: 200, headers, body: JSON.stringify({ success: true }) };
  } catch (err) {
    console.error("Contact function error:", err);
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid request." }) };
  }
};
