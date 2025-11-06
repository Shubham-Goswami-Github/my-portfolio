/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const mailjet = require("node-mailjet");

admin.initializeApp();

const mj = mailjet.apiConnect(
  functions.config().mailjet.public,
  functions.config().mailjet.private
);

exports.sendResumeEmail = functions.firestore
  .document("resume_requests/{requestId}")
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();

    // Only trigger if status changed
    if (before.status === after.status) return null;

    const email = after.email;
    const name = after.Sname || "User";

    // ✅ APPROVED → Send Resume Download Email
    if (after.status === "Approved") {
      return mj.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "qis2k2535@gmail.com", // ← Change this to your sender email
              Name: "Portfolio Admin",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Your Resume Download Link",
            TextPart:
              `Hello ${name},\n\nYour resume request has been approved!\n\nDownload your resume here:\nhttps://YOUR-WEBSITE/resume.pdf\n\nThank you!`,
          },
        ],
      });
    }

    // ❌ REJECTED → Send Rejection Message
    if (after.status === "Rejected") {
      return mj.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: "qis2k2535@gmail.com", // ← Same email
              Name: "Portfolio Admin",
            },
            To: [
              {
                Email: email,
                Name: name,
              },
            ],
            Subject: "Resume Request Update",
            TextPart:
              `Hello ${name},\n\nWe are sorry to inform you that your resume request was not approved at this time.\n\nThank you for your understanding.`,
          },
        ],
      });
    }

    return null;
  });
