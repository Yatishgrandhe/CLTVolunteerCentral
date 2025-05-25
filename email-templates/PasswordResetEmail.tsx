interface PasswordResetEmailProps {
  resetLink: string
  websiteUrl: string
  year: number
}

export default function PasswordResetEmail({ resetLink, websiteUrl, year }: PasswordResetEmailProps) {
  return (
    <div
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        lineHeight: 1.6,
        color: "#333",
        margin: 0,
        padding: 0,
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
            borderBottom: "1px solid #eaeaea",
          }}
        >
          <img
            src={`${websiteUrl}/images/clt-volunteer-central-logo.png`}
            alt="CLT Volunteer Central Logo"
            style={{ maxWidth: "150px", height: "auto" }}
          />
        </div>
        <div style={{ padding: "30px 20px" }}>
          <h1>Reset Your Password</h1>
          <p>Hello,</p>
          <p>
            We received a request to reset your password for your CLT Volunteer Central account. Click the button below
            to create a new password:
          </p>

          <div style={{ textAlign: "center" }}>
            <a
              href={resetLink}
              style={{
                display: "inline-block",
                padding: "12px 24px",
                backgroundColor: "#2A85A0",
                color: "white",
                textDecoration: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                margin: "20px 0",
              }}
            >
              Reset Password
            </a>
          </div>

          <p>This link will expire in 1 hour.</p>

          <div
            style={{
              backgroundColor: "#f8f9fa",
              padding: "15px",
              borderRadius: "4px",
              marginTop: "30px",
              fontSize: "13px",
            }}
          >
            <strong>Security Note:</strong> If you did not request a password reset, please ignore this email or contact
            support if you have concerns about your account security.
          </div>

          <div
            style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "30px",
            }}
          >
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p style={{ wordBreak: "break-all" }}>{resetLink}</p>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontSize: "12px",
            color: "#666",
            borderTop: "1px solid #eaeaea",
          }}
        >
          <p>CLT Volunteer Central - Connecting volunteers with opportunities in Charlotte</p>
          <p>© {year} CLT Volunteer Central. All rights reserved.</p>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <a
              href="#"
              style={{
                display: "inline-block",
                margin: "0 10px",
                color: "#2A85A0",
                textDecoration: "none",
              }}
            >
              Facebook
            </a>{" "}
            |{" "}
            <a
              href="#"
              style={{
                display: "inline-block",
                margin: "0 10px",
                color: "#2A85A0",
                textDecoration: "none",
              }}
            >
              Twitter
            </a>{" "}
            |{" "}
            <a
              href="#"
              style={{
                display: "inline-block",
                margin: "0 10px",
                color: "#2A85A0",
                textDecoration: "none",
              }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
