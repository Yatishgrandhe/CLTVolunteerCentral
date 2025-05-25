"use server"

import { sendVerificationEmail, sendMagicLinkEmail, sendPasswordResetEmail } from "@/lib/email-service"; //
// REMOVE these lines:
// import { createClient } from "@supabase/supabase-js"
// import type { Database } from "@/lib/database.types"

// Import the shared admin client
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // Adjust path if necessary

// REMOVE these lines:
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
// const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
// const supabaseAdmin = createClient<Database>(supabaseUrl, supabaseServiceKey)

export async function resendVerificationEmail(email: string) {
  try {
    const { data: user, error: userError } = await supabaseAdmin
      .from("auth.users")
      .select("*")
      .eq("email", email)
      .single(); //

    if (userError || !user) {
      return { success: false, message: "User not found" };
    } //

    const { success, error } = await sendVerificationEmail(email); //

    if (!success) {
      return { success: false, message: error || "Failed to send verification email" };
    } //

    return { success: true, message: "Verification email sent successfully" }; //
  } catch (error) {
    console.error("Error resending verification email:", error);
    return { success: false, message: "An unexpected error occurred" }; //
  }
}

export async function sendPasswordResetEmailAction(email: string) {
  try {
    const { data: user, error: userError } = await supabaseAdmin
      .from("auth.users")
      .select("*")
      .eq("email", email)
      .single(); //

    if (userError || !user) {
      return { success: false, message: "User not found" };
    } //

    const { success, error } = await sendPasswordResetEmail(email); //

    if (!success) {
      return { success: false, message: error || "Failed to send password reset email" };
    } //

    return { success: true, message: "Password reset email sent successfully" }; //
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return { success: false, message: "An unexpected error occurred" }; //
  }
}

export async function sendMagicLinkEmailAction(email: string) {
  try {
    const { success, error } = await sendMagicLinkEmail(email); //

    if (!success) {
      return { success: false, message: error || "Failed to send magic link email" };
    } //

    return { success: true, message: "Magic link email sent successfully" }; //
  } catch (error) {
    console.error("Error sending magic link email:", error);
    return { success: false, message: "An unexpected error occurred" }; //
  }
}
