"use server" // Keep this if actions within this file are also directly called from client

// REMOVE these:
// import { createClient } from "@supabase/supabase-js"
// import type { Database } from "@/lib/database.types"

// IMPORT the shared admin client
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // Adjust path if necessary

import type { EmailTemplate } from "@/lib/types"; //
import transporter from "@/lib/mail"; //
import jwt from "jsonwebtoken"; //
import fs from "fs/promises";
import path from "path";

// REMOVE these:
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET || ""; // Keep JWT secret if used directly here

// REMOVE this line:
// const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)

interface SendEmailProps {
  to: string
  subject: string
  template: EmailTemplate
  data?: Record<string, any>
} //

const getEmailTemplate = async (templateName: string, data: Record<string, any>) => {
  // Loads the HTML template from the email-templates directory
  const templatePath = path.join(process.cwd(), "email-templates", `${templateName}.html`);
  let template = "";
  try {
    template = await fs.readFile(templatePath, "utf-8");
  } catch (e) {
    // fallback to inline string if file not found
    template = `<p>Email content for ${templateName}</p>`;
  }
  const updatedData = {
    ...data,
    websiteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://clt-volunteer-central.vercel.app",
    year: new Date().getFullYear(),
  };
  // Replace {{variable}} in template
  const renderTemplate = (template: string, data: Record<string, any>) => {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return data[key] || match;
    });
  };
  return renderTemplate(template, updatedData);
};

export async function sendEmail({ to, subject, template, data = {} }: SendEmailProps) {
  try {
    // Now uses the imported supabaseAdmin
    await supabaseAdmin.from("email_logs").insert({
      recipient: to,
      template,
      subject,
      data: data,
      status: "pending",
      created_at: new Date().toISOString(),
    }); //

    let html: string | undefined;
    html = await getEmailTemplate(template, data); //

    if (!html) {
      return { success: false, error: "No email template found" };
    }

    const mailOptions = {
      from: `"CLT Volunteer Central" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    }; //

    const info = await transporter.sendMail(mailOptions); //
    console.log("Email sent:", info.messageId);

    // Now uses the imported supabaseAdmin
    await supabaseAdmin
      .from("email_logs")
      .update({
        status: "sent",
        sent_at: new Date().toISOString(),
      })
      .eq("recipient", to)
      .eq("template", template); //

    return { success: true }; //
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error }; //
  }
}

// Ensure all other functions in this file that might have used the local supabaseAdmin
// now use the imported one if they need DB access.
// generateEmailToken and verifyEmailToken seem to only use jwt and supabaseJwtSecret, so they are likely fine.
// sendVerificationEmail, sendMagicLinkEmail, sendPasswordResetEmail call sendEmail, so they will benefit from this change.
// sendAuthEmail should also be reviewed if it directly uses a Supabase client.

export async function generateEmailToken(email: string, type: "signup" | "reset" | "magic-link"): Promise<string> {
  let expiresIn: string | number = "24h";
  if (type === "reset") expiresIn = "1h";
  if (type === "magic-link") expiresIn = "10m";
  // Fix: ensure supabaseJwtSecret is a non-empty string and pass as Secret type
  if (!supabaseJwtSecret) throw new Error("SUPABASE_JWT_SECRET is not set");
  return jwt.sign({ email, type }, supabaseJwtSecret, { expiresIn } as jwt.SignOptions);
} //

export async function verifyEmailToken(token: string): Promise<{ email: string; type: string } | null> {
    try {
      const decoded = jwt.verify(token, supabaseJwtSecret) as { email: string; type: string };
      return decoded;
    } catch (error) {
      console.error("Error verifying token:", error);
      return null;
    }
  } //

  export async function sendVerificationEmail(email: string, name = "") {
    try {
      const token = await generateEmailToken(email, "signup"); //
      const verificationLink = `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_SITE\_URL\}/auth/verify?token\=</span>{token}`; //
      const result = await sendEmail({
        to: email,
        subject: "Verify Your Email - CLT Volunteer Central",
        template: "signup-verification",
        data: {
          name: name || "there",
          verificationLink,
        },
      }); //
      return result; //
    } catch (error) {
      console.error("Error sending verification email:", error);
      return { success: false, error }; //
    }
  }

  export async function sendMagicLinkEmail(email: string) {
    try {
      const token = await generateEmailToken(email, "magic-link"); //
      const magicLink = `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_SITE\_URL\}/auth/callback?token\=</span>{token}`; //
      const result = await sendEmail({
        to: email,
        subject: "Your Magic Link - CLT Volunteer Central",
        template: "magic-link",
        data: {
          magicLink,
        },
      }); //
      return result; //
    } catch (error) {
      console.error("Error sending magic link email:", error);
      return { success: false, error }; //
    }
  }

  export async function sendPasswordResetEmail(email: string) {
    try {
      const token = await generateEmailToken(email, "reset"); //
      const resetLink = `<span class="math-inline">\{process\.env\.NEXT\_PUBLIC\_SITE\_URL\}/auth/reset\-password?token\=</span>{token}`; //
      const result = await sendEmail({
        to: email,
        subject: "Reset Your Password - CLT Volunteer Central",
        template: "password-reset",
        data: {
          resetLink,
        },
      }); //
      return result; //
    } catch (error) {
      console.error("Error sending password reset email:", error);
      return { success: false, error }; //
    }
  }

  export async function sendAuthEmail(email: string, type: "signup" | "recovery" | "invite" | "magiclink") {
    try {
      // Ensure this function also uses the imported supabaseAdmin if it needs to make direct Supabase calls,
      // or relies on the other refactored functions.
      // The current implementation maps to other custom functions which should now use the shared admin client.
      switch (type) {
        case "signup":
          return await sendVerificationEmail(email); //
        case "recovery":
          return await sendPasswordResetEmail(email); //
        case "magiclink":
          return await sendMagicLinkEmail(email); //
        case "invite":
          // This part still uses supabaseAdmin directly.
          const result = await supabaseAdmin.auth.admin.inviteUserByEmail(email); //
          if (result.error) throw result.error;
          return { success: true }; //
        default:
          return { success: false, error: "Invalid email type" }; //
      }
    } catch (error) {
      console.error(`Error sending ${type} email:`, error);
      return { success: false, error }; //
    }
  }
