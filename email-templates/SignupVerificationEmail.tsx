interface SignupVerificationEmailProps {
  name: string
  verificationLink: string
  websiteUrl: string
  year: number
}

export default function SignupVerificationEmail({
  name,
  verificationLink,
  websiteUrl,
  year,
}: SignupVerificationEmailProps) {
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
          <h1>Verify Your Email</h1>
          <p>Hello {name},</p>
          <p>
            Thank you for signing up with CLT Volunteer Central! To complete your registration and start making a
            difference in your community, please verify your email address by clicking the button below:
          </p>

          <div style={{ textAlign: "center" }}>
            <a
              href={verificationLink}
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
              Verify Email Address
            </a>
          </div>

          <p>
            This link will expire in 24 hours. If you did not create an account with CLT Volunteer Central, please
            ignore this email.
          </p>

          <div
            style={{
              fontSize: "13px",
              color: "#666",
              marginTop: "30px",
            }}
          >
            <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
            <p style={{ wordBreak: "break-all" }}>{verificationLink}</p>
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
