import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const investorSchema = z.object({
  type: z.literal("investor"),
  name: z.string().min(2),
  email: z.string().email(),
  affiliation: z.string().optional(),
  message: z.string().optional(),
});

const presaleSchema = z.object({
  type: z.literal("presale"),
  email: z.string().email(),
});

const bodySchema = z.discriminatedUnion("type", [investorSchema, presaleSchema]);

export async function POST(request: NextRequest) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }

  const data = parsed.data;

  // Log to console (always)
  console.log("[contact]", JSON.stringify(data));

  // Send email if SMTP is configured
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const toEmail = process.env.CONTACT_TO_EMAIL ?? "springer.alex.h@gmail.com";

  if (smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const subject =
        data.type === "investor"
          ? `[Aretex Labs] Investor Inquiry — ${data.name}`
          : `[Aretex Labs] Presale Signup — ${data.email}`;

      const text =
        data.type === "investor"
          ? [
              `Type: Investor Inquiry`,
              `Name: ${data.name}`,
              `Email: ${data.email}`,
              `Affiliation: ${data.affiliation ?? "(none)"}`,
              `Message:\n${data.message ?? "(none)"}`,
            ].join("\n")
          : [`Type: Presale Signup`, `Email: ${data.email}`].join("\n");

      await transporter.sendMail({
        from: `"Aretex Labs Website" <${smtpUser}>`,
        to: toEmail,
        subject,
        text,
      });
    } catch (err) {
      // Log the error but do not expose details to the client
      console.error("[contact] email send error:", err);
    }
  }

  return NextResponse.json({ success: true });
}
