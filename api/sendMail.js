// api/sendMail.js

import mailjet from "node-mailjet";

export default async function handler(req, res) {
  // ★ CORS Headers - Important for cross-origin requests
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

  // ★ Parse body if needed (for some environments)
  let body = req.body;
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

  // ★ Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // ★ Check environment variables
  const MAILJET_PUBLIC = process.env.MAILJET_PUBLIC;
  const MAILJET_PRIVATE = process.env.MAILJET_PRIVATE;

  if (!MAILJET_PUBLIC || !MAILJET_PRIVATE) {
    console.error("❌ Mailjet credentials not found in environment variables");
    console.error("MAILJET_PUBLIC exists:", !!MAILJET_PUBLIC);
    console.error("MAILJET_PRIVATE exists:", !!MAILJET_PRIVATE);
    return res.status(500).json({ 
      error: "Server configuration error - Missing email credentials" 
    });
  }

  try {
    const mj = mailjet.apiConnect(MAILJET_PUBLIC, MAILJET_PRIVATE);

    const isApproved = status === "Approved";

    const subject = isApproved
      ? "✅ Your Resume Download Link - Shubham Das Goswami"
      : "❌ Resume Request Update";

    const htmlContent = isApproved
      ? `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #C9A86C, #D4AF37); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #000; margin: 0; font-size: 24px;">✅ Request Approved!</h1>
          </div>
          <div style="background: #1a1a1a; padding: 30px; border-radius: 0 0 16px 16px; color: #fff;">
            <p style="font-size: 16px; color: #e5e5e5;">Hello <strong style="color: #C9A86C;">${name}</strong>,</p>
            <p style="font-size: 16px; color: #a3a3a3; line-height: 1.6;">
              Great news! Your resume download request has been approved.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://drive.google.com/file/d/1t2OyqQyQj5Aq0HWwgjVFytAXPq1XTTak/view?usp=drive_link" 
                 style="display: inline-block; background: linear-gradient(135deg, #C9A86C, #D4AF37); 
                        color: #000; padding: 14px 32px; border-radius: 10px; text-decoration: none; 
                        font-weight: bold; font-size: 16px;">
                📄 Download Resume
              </a>
            </div>
            <p style="font-size: 14px; color: #737373; text-align: center;">
              Thank you for your interest!
            </p>
            <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;">
            <p style="font-size: 12px; color: #525252; text-align: center;">
              — Shubham Das Goswami | Web Developer
            </p>
          </div>
        </div>
      `
      : `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #dc2626; padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: #fff; margin: 0; font-size: 24px;">Request Update</h1>
          </div>
          <div style="background: #1a1a1a; padding: 30px; border-radius: 0 0 16px 16px; color: #fff;">
            <p style="font-size: 16px; color: #e5e5e5;">Hello <strong>${name}</strong>,</p>
            <p style="font-size: 16px; color: #a3a3a3; line-height: 1.6;">
              Thank you for your interest. Unfortunately, your resume request could not be approved at this time.
            </p>
            <p style="font-size: 14px; color: #737373;">
              If you have any questions, feel free to reach out.
            </p>
            <hr style="border: none; border-top: 1px solid #333; margin: 20px 0;">
            <p style="font-size: 12px; color: #525252; text-align: center;">
              — Shubham Das Goswami
            </p>
          </div>
        </div>
      `;

    const textContent = isApproved
      ? `Hello ${name},\n\nYour resume request is approved!\n\nDownload here: https://drive.google.com/file/d/1t2OyqQyQj5Aq0HWwgjVFytAXPq1XTTak/view?usp=drive_link\n\nThank you!\n— Shubham Das Goswami`
      : `Hello ${name},\n\nThank you for your interest. Unfortunately, your resume request could not be approved at this time.\n\n— Shubham Das Goswami`;

    console.log("📧 Sending email to:", email);
    console.log("📧 Status:", status);
    console.log("📧 Subject:", subject);

    const result = await mj.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "qis2k2535@gmail.com",
            Name: "Shubham Das Goswami",
          },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          TextPart: textContent,
          HTMLPart: htmlContent,
        },
      ],
    });

    console.log("✅ Email sent successfully!");
    console.log("✅ Mailjet Response:", JSON.stringify(result.body, null, 2));

    return res.status(200).json({ 
      success: true,
      message: `Email sent successfully to ${email}`,
      data: result.body
    });

  } catch (error) {
    console.error("❌ Mailjet Error:", error);
    
    // Extract detailed error information
    let errorMessage = "Failed to send email";
    let errorDetails = "";
    
    if (error.response) {
      // Mailjet API error
      console.error("❌ Mailjet Response Error:", error.response.status);
      console.error("❌ Mailjet Response Body:", JSON.stringify(error.response.body, null, 2));
      errorDetails = JSON.stringify(error.response.body) || error.message;
    } else if (error.message) {
      errorDetails = error.message;
    }
    
    console.error("❌ Error Details:", errorDetails);
    
    return res.status(500).json({ 
      error: errorMessage,
      details: errorDetails,
      message: errorDetails
    });
  }
}