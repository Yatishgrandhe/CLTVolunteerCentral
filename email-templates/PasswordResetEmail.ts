export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function PasswordResetEmail(resetUrl: string, userName: string): EmailTemplate {
  return {
    subject: "Reset Your CLT Volunteer Central Password",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb;">CLT Volunteer Central</h1>
            </div>
            
            <h2>Reset Your Password</h2>
            
            <p>Hello ${userName},</p>
            
            <p>We received a request to reset your password for your CLT Volunteer Central account.</p>
            
            <p>Click the button below to reset your password:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" style="background-color: #dc2626; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Reset Password</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">${resetUrl}</p>
            
            <p>This link will expire in 1 hour for security reasons.</p>
            
            <p>If you didn't request a password reset, please ignore this email. Your password will remain unchanged.</p>
            
            <p>Best regards,<br>The CLT Volunteer Central Team</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Reset Your CLT Volunteer Central Password
      
      Hello ${userName},
      
      We received a request to reset your password. Click this link to reset it: ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, please ignore this email.
      
      Best regards,
      The CLT Volunteer Central Team
    `,
  }
}

export default PasswordResetEmail
