import mailjet from "node-mailjet";

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  const { email, name, status } = req.body;

  const mj = mailjet.apiConnect(
    process.env.MAILJET_PUBLIC,
    process.env.MAILJET_PRIVATE
  );

  try {
    const isApproved = status === "Approved";

    const subject = isApproved
      ? "✅ Your Resume Download Link"
      : "❌ Resume Request Denied";

    const textContent = isApproved
      ? `Hello ${name},\nYour resume request is approved.\nDownload here: https://yourwebsite.com/Resume.pdf`
      : `Hello ${name},\nSorry, your resume request was not approved.`;

    await mj.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "your-email@example.com",
            Name: "Portfolio Admin",
          },
          To: [{ Email: email, Name: name }],
          Subject: subject,
          TextPart: textContent,
        },
      ],
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log("Mailjet Error:", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
