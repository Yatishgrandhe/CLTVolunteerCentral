import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function sendEmail({ to, subject, template, data = {} }: { to: string; subject: string; template: string; data?: Record<string, any> }) {
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

export async function sendVerificationEmail(email: string, name = "") {
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
