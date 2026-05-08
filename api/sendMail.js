const Mailjet = require("node-mailjet");

const RESUME_URL =
  "https://drive.google.com/file/d/1t2OyqQyQj5Aq0HWwgjVFytAXPq1XTTak/view?usp=drive_link";

const SENDER_EMAIL = process.env.MAILJET_SENDER_EMAIL || "qis2k2535@gmail.com";
const SENDER_NAME = process.env.MAILJET_SENDER_NAME || "Shubham Das Goswami";

function sendJson(res, statusCode, payload) {
  return res.status(statusCode).json(payload);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function normalizeStatus(status) {
  const value = String(status || "").trim().toLowerCase();

  if (value === "approved" || value === "approve") {
    return "Approved";
  }

  if (value === "denied" || value === "deny" || value === "rejected" || value === "reject") {
    return "Denied";
  }

  return "";
}

function getMailjetError(error) {
  const statusCode = error.statusCode || error.response?.status;
  const responseBody = error.response?.body || error.response?.data || error.body;
  const mailjetError =
    responseBody?.ErrorMessage ||
    responseBody?.Messages?.[0]?.Errors?.[0]?.ErrorMessage ||
    responseBody?.Messages?.[0]?.Errors?.[0]?.ErrorRelatedTo?.join(", ");

  if (statusCode === 401) {
    return "Mailjet authentication failed. Check MAILJET_PUBLIC and MAILJET_PRIVATE.";
  }

  if (statusCode === 403) {
    return "Mailjet rejected the sender. Verify MAILJET_SENDER_EMAIL in Mailjet.";
  }

  if (statusCode === 400) {
    return mailjetError || "Mailjet rejected the request. Check recipient and sender email.";
  }

  if (statusCode === 429) {
    return "Mailjet rate limit exceeded. Try again later.";
  }

  return mailjetError || error.message || "Failed to send email.";
}

function buildEmail({ name, status }) {
  const safeName = escapeHtml(name);
  const isApproved = status === "Approved";

  const subject = isApproved
    ? "Your Resume Download Link - Shubham Das Goswami"
    : "Resume Request Update - Shubham Das Goswami";

  const html = isApproved
    ? `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background:#d4af37;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="color:#000;margin:0;font-size:24px;font-weight:bold;">Request Approved</h1>
    </div>
    <div style="background-color:#1a1a1a;padding:30px;border-radius:0 0 16px 16px;">
      <p style="font-size:16px;color:#e5e5e5;margin-bottom:10px;">
        Hello <strong style="color:#c9a86c;">${safeName}</strong>,
      </p>
      <p style="font-size:16px;color:#a3a3a3;line-height:1.6;margin-bottom:25px;">
        Great news! Your resume download request has been <strong style="color:#10b981;">approved</strong>.
        Click the button below to download my resume.
      </p>
      <div style="text-align:center;margin:30px 0;">
        <a href="${RESUME_URL}" style="display:inline-block;background:#d4af37;color:#000;padding:14px 32px;border-radius:10px;text-decoration:none;font-weight:bold;font-size:16px;">
          Download Resume
        </a>
      </div>
      <p style="font-size:14px;color:#737373;text-align:center;margin-top:25px;">
        Thank you for your interest in my work.
      </p>
      <hr style="border:none;border-top:1px solid #333;margin:25px 0;">
      <p style="font-size:12px;color:#525252;text-align:center;margin:0;">
        Shubham Das Goswami | Web Developer
      </p>
    </div>
  </div>
</body>
</html>`
    : `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:20px;">
    <div style="background-color:#dc2626;padding:30px;border-radius:16px 16px 0 0;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:24px;font-weight:bold;">Request Update</h1>
    </div>
    <div style="background-color:#1a1a1a;padding:30px;border-radius:0 0 16px 16px;">
      <p style="font-size:16px;color:#e5e5e5;margin-bottom:10px;">
        Hello <strong style="color:#fff;">${safeName}</strong>,
      </p>
      <p style="font-size:16px;color:#a3a3a3;line-height:1.6;margin-bottom:20px;">
        Thank you for your interest in my resume. Unfortunately, your request could not be approved at this time.
      </p>
      <p style="font-size:14px;color:#737373;margin-bottom:25px;">
        If you believe this was a mistake or have any questions, feel free to reach out to me directly.
      </p>
      <hr style="border:none;border-top:1px solid #333;margin:25px 0;">
      <p style="font-size:12px;color:#525252;text-align:center;margin:0;">
        Shubham Das Goswami | Web Developer
      </p>
    </div>
  </div>
</body>
</html>`;

  const text = isApproved
    ? `Hello ${name},

Great news! Your resume download request has been approved.

Download here: ${RESUME_URL}

Thank you for your interest.

Shubham Das Goswami | Web Developer`
    : `Hello ${name},

Thank you for your interest in my resume. Unfortunately, your request could not be approved at this time.

If you have any questions, feel free to reach out.

Shubham Das Goswami | Web Developer`;

  return { subject, html, text };
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, { success: false, error: "Method not allowed" });
  }

  let body = req.body || {};

  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return sendJson(res, 400, { success: false, error: "Invalid JSON body" });
    }
  }

  const email = String(body.email || "").trim();
  const name = String(body.name || "").trim();
  const status = normalizeStatus(body.status);

  if (!email || !name || !status) {
    return sendJson(res, 400, {
      success: false,
      error: "Missing or invalid required fields",
      received: { email: Boolean(email), name: Boolean(name), status: body.status || null }
    });
  }

  if (!process.env.MAILJET_PUBLIC || !process.env.MAILJET_PRIVATE) {
    return sendJson(res, 500, {
      success: false,
      error: "Mailjet credentials are missing on the server."
    });
  }

  try {
    const mailjet = Mailjet.apiConnect(process.env.MAILJET_PUBLIC, process.env.MAILJET_PRIVATE);
    const emailContent = buildEmail({ name, status });

    const result = await mailjet.post("send", { version: "v3.1" }).request({
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
          Subject: emailContent.subject,
          TextPart: emailContent.text,
          HTMLPart: emailContent.html
        }
      ]
    });

    const message = result.body?.Messages?.[0];

    if (message?.Status !== "success") {
      return sendJson(res, 502, {
        success: false,
        error: "Mailjet did not accept the email.",
        details: message || result.body
      });
    }

    return sendJson(res, 200, {
      success: true,
      message: `Email sent successfully to ${email}`,
      messageId: message?.To?.[0]?.MessageID || null
    });
  } catch (error) {
    return sendJson(res, 500, {
      success: false,
      error: getMailjetError(error),
      details: {
        statusCode: error.statusCode || error.response?.status || null,
        body: error.response?.body || error.response?.data || error.body || null
      }
    });
  }
};
