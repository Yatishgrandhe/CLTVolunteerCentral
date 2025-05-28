export interface EmailTemplate {
  subject: string
  html: string
  text: string
}

export function SignupVerificationEmail(verificationUrl: string, userName: string): EmailTemplate {
  return {
    subject: "Welcome to CLT Volunteer Central - Please Verify Your Email",
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to CLT Volunteer Central</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #2563eb;">CLT Volunteer Central</h1>
            </div>
            
            <h2>Welcome, ${userName}!</h2>
            
            <p>Thank you for joining CLT Volunteer Central. We're excited to have you as part of our community of volunteers making a difference in Charlotte.</p>
            
            <p>To complete your registration, please verify your email address by clicking the button below:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" style="background-color: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email Address</a>
            </div>
            
            <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
            <p style="word-break: break-all; color: #2563eb;">${verificationUrl}</p>
            
            <p>Once verified, you'll be able to:</p>
            <ul>
              <li>Browse volunteer opportunities</li>
              <li>Sign up for events that interest you</li>
              <li>Track your volunteer hours</li>
              <li>Connect with other volunteers</li>
            </ul>
            
            <p>If you didn't create this account, please ignore this email.</p>
            
            <p>Best regards,<br>The CLT Volunteer Central Team</p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to CLT Volunteer Central, ${userName}!
      
      Thank you for joining our community of volunteers. To complete your registration, please verify your email address by visiting: ${verificationUrl}
      
      Once verified, you'll be able to browse opportunities, sign up for events, and connect with other volunteers.
      
      If you didn't create this account, please ignore this email.
      
      Best regards,
      The CLT Volunteer Central Team
    `,
  }
}

export default SignupVerificationEmail
