import { createServerClient } from "./supabase"
import { SignupVerificationEmail } from "../email-templates/SignupVerificationEmail"
import { MagicLinkEmail } from "../email-templates/MagicLinkEmail"
import { PasswordResetEmail } from "../email-templates/PasswordResetEmail"

export interface EmailServer {
  id: string
  name: string
  smtp_host: string
  smtp_port: number
  smtp_user: string
  smtp_password: string
  from_email: string
  is_active: boolean
}

export async function sendVerificationEmail(email: string, verificationUrl: string, userName: string) {
  const template = SignupVerificationEmail(verificationUrl, userName)
  return await sendEmail(email, template.subject, template.html, template.text)
}

export async function sendMagicLinkEmail(email: string, magicLinkUrl: string, userName: string) {
  const template = MagicLinkEmail(magicLinkUrl, userName)
  return await sendEmail(email, template.subject, template.html, template.text)
}

export async function sendPasswordResetEmail(email: string, resetUrl: string, userName: string) {
  const template = PasswordResetEmail(resetUrl, userName)
  return await sendEmail(email, template.subject, template.html, template.text)
}

export async function verifyEmailToken(token: string) {
  const supabase = createServerClient()

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: "email",
    })

    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error("Email verification error:", error)
    return { success: false, error }
  }
}

async function sendEmail(to: string, subject: string, html: string, text: string) {
  const supabase = createServerClient()

  try {
    // Get active email server
    const { data: emailServer, error: serverError } = await supabase
      .from("email_servers")
      .select("*")
      .eq("is_active", true)
      .single()

    if (serverError || !emailServer) {
      console.error("No active email server found")
      return { success: false, error: "No email server configured" }
    }

    // In a real implementation, you would use nodemailer or similar
    // For now, we'll log the email details
    console.log("Sending email:", {
      to,
      subject,
      from: emailServer.from_email,
      server: emailServer.smtp_host,
    })

    // Log email attempt in database
    await supabase.from("email_logs").insert({
      email_address: to,
      status: "sent",
      sent_at: new Date().toISOString(),
    })

    return { success: true }
  } catch (error) {
    console.error("Email sending error:", error)

    // Log failed email attempt
    await supabase.from("email_logs").insert({
      email_address: to,
      status: "failed",
      error_message: error instanceof Error ? error.message : "Unknown error",
      sent_at: new Date().toISOString(),
    })

    return { success: false, error }
  }
}
