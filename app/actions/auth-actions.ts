"use server"

// Import the shared admin client
import { supabaseAdmin } from "@/lib/supabaseAdmin" // Adjust path if necessary

import {
  sendVerificationEmail,
  sendMagicLinkEmail as sendCustomMagicLinkEmail,
  sendPasswordResetEmail as sendCustomPasswordResetEmail,
  verifyEmailToken,
} from "@/lib/email-service" //
import { ensureProfile } from "@/lib/auth-utils" //

export async function signUp(email: string, password: string, fullName: string) {
  try {
    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: false, // We'll handle email verification ourselves
      user_metadata: {
        full_name: fullName,
      },
    }) //

    if (authError) {
      return { success: false, message: authError.message }
    } //

    // Create a profile for the user
    if (authData.user) {
      await ensureProfile(supabaseAdmin, authData.user, { full_name: fullName })
    } //

    // Send custom verification email
    const { success, error } = await sendVerificationEmail(email, fullName) //

    if (!success) {
      return { success: false, message: error || "Failed to send verification email" }
    } //

    return { success: true, message: "Verification email sent successfully" } //
  } catch (error: any) {
    console.error("Error in signUp:", error)
    return { success: false, message: "An unexpected error occurred" } //
  }
}

// ... rest of your functions in auth-actions.ts, ensuring they use the imported supabaseAdmin
// (verifyEmail, sendMagicLinkEmail, sendPasswordResetEmail, resetPassword)
// Make sure to remove the local supabaseAdmin definition if it exists elsewhere in this file.

export async function verifyEmail(token: string) {
  try {
    const decoded = await verifyEmailToken(token) //
    if (!decoded || decoded.type !== "signup") {
      return { success: false, message: "Invalid or expired verification link" }
    } //
    const { error } = await supabaseAdmin.auth.admin.updateUserById(decoded.email, { email_confirm: true }) //
    if (error) {
      return { success: false, message: error.message }
    } //
    return { success: true, message: "Email verified successfully" } //
  } catch (error: any) {
    console.error("Error verifying email:", error)
    return { success: false, message: "An unexpected error occurred" } //
  }
}

export async function sendMagicLinkEmail(email: string) {
  try {
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(email) //
    if (userError || !user) {
      return { success: false, message: "User not found" }
    } //
    const { success, error } = await sendCustomMagicLinkEmail(email) //
    if (!success) {
      return { success: false, message: error || "Failed to send magic link email" }
    } //
    return { success: true, message: "Magic link email sent successfully" } //
  } catch (error: any) {
    console.error("Error sending magic link email:", error)
    return { success: false, message: "An unexpected error occurred" } //
  }
}

export async function sendPasswordResetEmail(email: string) {
  try {
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserByEmail(email) //
    if (userError || !user) {
      return { success: false, message: "User not found" }
    } //
    const { success, error } = await sendCustomPasswordResetEmail(email) //
    if (!success) {
      return { success: false, message: error || "Failed to send password reset email" }
    } //
    return { success: true, message: "Password reset email sent successfully" } //
  } catch (error: any) {
    console.error("Error sending password reset email:", error)
    return { success: false, message: "An unexpected error occurred" } //
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const decoded = await verifyEmailToken(token) //
    if (!decoded || decoded.type !== "reset") {
      return { success: false, message: "Invalid or expired reset link" }
    } //
    const { error } = await supabaseAdmin.auth.admin.updateUserById(decoded.email, { password: newPassword }) //
    if (error) {
      return { success: false, message: error.message }
    } //
    return { success: true, message: "Password reset successfully" } //
  } catch (error: any) {
    console.error("Error resetting password:", error)
    return { success: false, message: "An unexpected error occurred" } //
  }
}
