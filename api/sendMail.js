// api/sendMail.js

const Mailjet = require("node-mailjet");


module.exports = async function handler(req, res) {

  // ★ CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // ★ Parse body safely
  let body = req.body;
  
  // If body is string, parse it
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch (e) {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }

  const { email, name, status } = body;

  console.log("📧 Received request:", { email, name, status });

  // ★ Validate input
  if (!email || !name || !status) {
    console.error("❌ Missing fields:", { email: !!email, name: !!name, status: !!status });
    return res.status(400).json({
      error: "Missing required fields",
      received: { email: !!email, name: !!name, status: !!status }
    });
  }

  // ★ Check environment variables
  const MAILJET_PUBLIC = process.env.MAILJET_PUBLIC;
  const MAILJET_PRIVATE = process.env.MAILJET_PRIVATE;

  console.log("🔑 Checking credentials...");
  console.log("   Public key exists:", !!MAILJET_PUBLIC);
  console.log("   Private key exists:", !!MAILJET_PRIVATE);

  if (!MAILJET_PUBLIC || !MAILJET_PRIVATE) {
    console.error("❌ Mailjet credentials not found!");
    return res.status(500).json({
      error: "Server configuration error",
      details: "Missing email credentials in environment variables"
    });
  }

  try {
    // ★ Initialize Mailjet client - FIXED IMPORT
   const mailjet = Mailjet.connect(MAILJET_PUBLIC, MAILJET_PRIVATE);

    const isApproved = status === "Approved";

    // ★ Email subject
    const subject = isApproved
      ? "✅ Your Resume Download Link - Shubham Das Goswami"
      : "❌ Resume Request Update - Shubham Das Goswami";

    // ★ HTML Content for Approved
    const approvedHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background: linear-gradient(135deg, #C9A86C, #D4AF37); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
      <h1 style="color: #000000; margin: 0; font-size: 24px; font-weight: bold;">✅ Request Approved!</h1>
    </div>
    
    <!-- Body -->
    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 0 0 16px 16px;">
      <p style="font-size: 16px; color: #e5e5e5; margin-bottom: 10px;">
        Hello <strong style="color: #C9A86C;">${name}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #a3a3a3; line-height: 1.6; margin-bottom: 25px;">
        Great news! Your resume download request has been <strong style="color: #10B981;">approved</strong>.
        Click the button below to download my resume.
      </p>
      
      <!-- Download Button -->
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://drive.google.com/file/d/1t2OyqQyQj5Aq0HWwgjVFytAXPq1XTTak/view?usp=drive_link" 
           style="display: inline-block; background: linear-gradient(135deg, #C9A86C, #D4AF37); 
                  color: #000000; padding: 14px 32px; border-radius: 10px; text-decoration: none; 
                  font-weight: bold; font-size: 16px;">
          📄 Download Resume
        </a>
      </div>
      
      <p style="font-size: 14px; color: #737373; text-align: center; margin-top: 25px;">
        Thank you for your interest in my work!
      </p>
      
      <!-- Divider -->
      <hr style="border: none; border-top: 1px solid #333333; margin: 25px 0;">
      
      <!-- Footer -->
      <p style="font-size: 12px; color: #525252; text-align: center; margin: 0;">
        — Shubham Das Goswami | Web Developer
      </p>
    </div>
  </div>
</body>
</html>`;

    // ★ HTML Content for Denied
    const deniedHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: Arial, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <!-- Header -->
    <div style="background-color: #dc2626; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Request Update</h1>
    </div>
    
    <!-- Body -->
    <div style="background-color: #1a1a1a; padding: 30px; border-radius: 0 0 16px 16px;">
      <p style="font-size: 16px; color: #e5e5e5; margin-bottom: 10px;">
        Hello <strong style="color: #ffffff;">${name}</strong>,
      </p>
      
      <p style="font-size: 16px; color: #a3a3a3; line-height: 1.6; margin-bottom: 20px;">
        Thank you for your interest in my resume. Unfortunately, your request could not be approved at this time.
      </p>
      
      <p style="font-size: 14px; color: #737373; margin-bottom: 25px;">
        If you believe this was a mistake or have any questions, feel free to reach out to me directly.
      </p>
      
      <!-- Divider -->
      <hr style="border: none; border-top: 1px solid #333333; margin: 25px 0;">
      
      <!-- Footer -->
      <p style="font-size: 12px; color: #525252; text-align: center; margin: 0;">
        — Shubham Das Goswami | Web Developer
      </p>
    </div>
  </div>
</body>
</html>`;

    const htmlContent = isApproved ? approvedHTML : deniedHTML;

    // ★ Plain Text Content
    const textContent = isApproved
      ? `Hello ${name},\n\nGreat news! Your resume download request has been approved.\n\nDownload here: https://drive.google.com/file/d/1t2OyqQyQj5Aq0HWwgjVFytAXPq1XTTak/view?usp=drive_link\n\nThank you for your interest!\n\n— Shubham Das Goswami | Web Developer`
      : `Hello ${name},\n\nThank you for your interest in my resume. Unfortunately, your request could not be approved at this time.\n\nIf you have any questions, feel free to reach out.\n\n— Shubham Das Goswami | Web Developer`;

    console.log("📧 Sending email to:", email);
    console.log("📧 Status:", status);

    // ★ IMPORTANT: Change this to YOUR verified sender email in Mailjet
    const SENDER_EMAIL = "qis2k2535@gmail.com"; // Must be verified in Mailjet!
    const SENDER_NAME = "Shubham Das Goswami";

    // ★ Send Email via Mailjet
    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: SENDER_EMAIL,
              Name: SENDER_NAME
            },
            To: [
              {
                Email: email,
                Name: name
              }
            ],
            Subject: subject,
            TextPart: textContent,
            HTMLPart: htmlContent
          }
        ]
      });

    console.log("✅ Mailjet Response:", JSON.stringify(request.body, null, 2));

    // Check if email was actually sent
    const messageStatus = request.body?.Messages?.[0]?.Status;
    
    if (messageStatus === "success") {
      return res.status(200).json({
        success: true,
        message: `Email sent successfully to ${email}`,
        messageId: request.body?.Messages?.[0]?.To?.[0]?.MessageID
      });
    } else {
      console.error("⚠️ Mailjet returned non-success status:", messageStatus);
      return res.status(500).json({
        error: "Email sending failed",
        details: `Mailjet status: ${messageStatus}`,
        fullResponse: request.body
      });
    }

  } catch (error) {
    console.error("❌ Mailjet Error:", error);
    
    // ★ Extract detailed error information
    let errorMessage = "Failed to send email";
    let errorDetails = {};

    if (error.response) {
      // Mailjet API error response
      console.error("❌ Mailjet API Error Response:", error.response.body || error.response.data);
      errorDetails = {
        statusCode: error.response.status || error.statusCode,
        body: error.response.body || error.response.data,
        message: error.message
      };
      
      // Common Mailjet errors
      if (error.statusCode === 401) {
        errorMessage = "Authentication failed - Check API keys";
      } else if (error.statusCode === 400) {
        errorMessage = "Bad request - Check sender email is verified";
      } else if (error.statusCode === 403) {
        errorMessage = "Forbidden - Sender email not verified in Mailjet";
      } else if (error.statusCode === 429) {
        errorMessage = "Rate limit exceeded - Too many requests";
      }
    } else if (error.statusCode) {
      errorDetails = {
        statusCode: error.statusCode,
        message: error.message,
        body: error.body
      };
    } else {
      errorDetails = {
        message: error.message,
        stack: error.stack
      };
    }

    console.error("❌ Full Error Details:", JSON.stringify(errorDetails, null, 2));

    return res.status(500).json({
      error: errorMessage,
      details: errorDetails,
      hint: "Make sure sender email is verified in Mailjet dashboard"
    });
  }
}