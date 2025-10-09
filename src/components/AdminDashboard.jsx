import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import emailjs from "@emailjs/browser";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  // Firestore realtime fetch
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "resume_requests"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRequests(data);
      }
    );
    return () => unsubscribe();
  }, []);

  // Email send function
 const sendEmail = (toEmail, userName, status) => {
  const cvLink = status === "Approved" ? "https://yourdomain.com/resume.pdf" : "";

  emailjs
    .send(
      "service_r7zsx5o",       // Your EmailJS service ID
      "template_sq4fz88",      // Your EmailJS template ID
      {
        to_email: toEmail,     // Visitor email
        user_name: userName,   // Visitor name
        status: status,        // Approved/Denied
        cv_link: cvLink,       // CV link for Approved
        title: "Resume Request"
      },
      "CXfCaFkoekA1FCLDh"      // Your EmailJS public key
    )
    .then((res) => console.log(`Email sent to ${toEmail} - ${status}`))
    .catch((err) => console.error("EmailJS Error:", err));
};

  // Approve request
  const handleApprove = async (id, userName, userEmail) => {
    const docRef = doc(db, "resume_requests", id);
    await updateDoc(docRef, { status: "Approved" });
    sendEmail(userEmail, userName, "Approved");
  };

  // Deny request
  const handleDeny = async (id, userName, userEmail) => {
    const docRef = doc(db, "resume_requests", id);
    await updateDoc(docRef, { status: "Denied" });
    sendEmail(userEmail, userName, "Denied");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-[#e16928ff] dark:text-yellow-400 mb-6">
        Resume Requests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform duration-300"
          >
            <h3 className="text-xl font-semibold mb-2">{req.name}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <strong>Email:</strong> {req.email}
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              <strong>Message:</strong> {req.message || "No message"}
            </p>
            <p
              className={`mb-3 font-semibold ${
                req.status === "Approved"
                  ? "text-green-500"
                  : req.status === "Denied"
                  ? "text-red-500"
                  : "text-yellow-500"
              }`}
            >
              Status: {req.status}
            </p>

            {req.status === "Pending" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => handleApprove(req.id, req.name, req.email)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:brightness-110 transition duration-300"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleDeny(req.id, req.name, req.email)}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:brightness-110 transition duration-300"
                >
                  Deny
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
