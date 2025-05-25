"use server" // Keep this if actions within this file are also directly called from client

// REMOVE these:
// import { createClient } from "@supabase/supabase-js"
// import type { Database } from "@/lib/database.types"

// IMPORT the shared admin client
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // Adjust path if necessary

// Move type import to a JSDoc comment to avoid direct type import in a 'use server' file

// REMOVE these:
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET || ""; // Keep JWT secret if used directly here

// REMOVE this line:
// const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)

/**
 * @typedef {Object} SendEmailProps
 * @property {string} to
 * @property {string} subject
 * @property {string} template
 * @property {Record<string, any>=} data
 */

export async function sendEmail({ to, subject, template, data = {} }: { to: string; subject: string; template: string; data?: Record<string, any> }) {
  // This function is now a no-op or can log to email_logs if you want to keep logging
  await supabaseAdmin.from("email_logs").insert({
    recipient: to,
    template,
    subject,
    data: data,
    status: "sent",
    created_at: new Date().toISOString(),
    sent_at: new Date().toISOString(),
  });
  return { success: true };
}

// Remove jwt token generation and verification since Supabase handles email flows
// Remove generateEmailToken and verifyEmailToken

export async function sendVerificationEmail(email: string, name = "") {
    // Use Supabase's built-in signup email
    const { error } = await supabaseAdmin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: name },
    });
    if (error) {
      console.error("Error sending verification email via Supabase:", error);
      return { success: false, error };
    }
    return { success: true };
  }

  export async function sendMagicLinkEmail(email: string) {
    // Use Supabase's built-in magic link
    const { error } = await supabaseAdmin.auth.admin.generateLink({
      type: "magiclink",
      email,
      options: { redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/auth/callback" },
    });
    if (error) {
      console.error("Error sending magic link via Supabase:", error);
      return { success: false, error };
    }
    return { success: true };
  }

  export async function sendPasswordResetEmail(email: string) {
    // Use Supabase's built-in password reset
    const { error } = await supabaseAdmin.auth.admin.generateLink({
      type: "recovery",
      email,
      options: { redirectTo: process.env.NEXT_PUBLIC_SITE_URL + "/auth/reset-password" },
    });
    if (error) {
      console.error("Error sending password reset via Supabase:", error);
      return { success: false, error };
    }
    return { success: true };
  }

  export async function sendAuthEmail(email: string, type: "signup" | "recovery" | "invite" | "magiclink") {
    switch (type) {
      case "signup":
        return await sendVerificationEmail(email);
      case "recovery":
        return await sendPasswordResetEmail(email);
      case "magiclink":
        return await sendMagicLinkEmail(email);
      case "invite":
        return await sendVerificationEmail(email);
      default:
        return { success: false, error: "Invalid email type" };
    }
  }
