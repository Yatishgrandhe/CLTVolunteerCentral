export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function MagicLinkEmail(magicLinkUrl: string, userName: string): EmailTemplate {
  return {
    subject: "Your CLT Volunteer Central Sign-in Link",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Sign in to CLT Volunteer Central</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb;">CLT Volunteer Central</h1>
            </div>
            
            <h2>Sign in to your account</h2>
            
            <p>Hello ${userName},</p>
            
            <p>Click the button below to sign in to your CLT Volunteer Central account:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${magicLinkUrl}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Sign In</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">${magicLinkUrl}</p>
            
            <p>This link will expire in 1 hour for security reasons.</p>
            
            <p>If you didn't request this sign-in link, please ignore this email.</p>
            
            <p>Best regards,<br>The CLT Volunteer Central Team</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Sign in to CLT Volunteer Central
      
      Hello ${userName},
      
      Click this link to sign in to your account: ${magicLinkUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request this sign-in link, please ignore this email.
      
      Best regards,
      The CLT Volunteer Central Team
    `,
  }
}

export default MagicLinkEmail
