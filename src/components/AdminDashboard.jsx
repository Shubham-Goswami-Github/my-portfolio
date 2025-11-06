import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "https://myportfoliosg8990.vercel.app/api/sendMail"
      : "/api/sendMail";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resume_requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().Sname,   // ✅ FIX NAME FIELD HERE
      }));
      setRequests(data);
    });
    return () => unsubscribe();
  }, []);

  const sendMail = async (email, name, status) => {
    await axios.post(API_URL, { email, name, status });
  };

  const handleApprove = async (id, name, email) => {
    await updateDoc(doc(db, "resume_requests", id), { status: "Approved" });
    await sendMail(email, name, "Approved");
    alert(`✅ Resume approved and Email sent to ${email}`);
  };

  const handleDeny = async (id, name, email) => {
    await updateDoc(doc(db, "resume_requests", id), { status: "Denied" });
    await sendMail(email, name, "Denied");
    alert(`❌ Request Denied and Email sent to ${email}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors">
      <h2 className="text-3xl font-bold text-[#e16928ff] dark:text-yellow-400 mb-6 text-center">
        Resume Requests Dashboard
      </h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div key={req.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">{req.name}</h3>

            <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Email:</strong> {req.email}</p>
            <p className="text-gray-700 dark:text-gray-300 mb-1"><strong>Message:</strong> {req.message || "No message"}</p>

            <p className={`mb-4 font-semibold ${
              req.status === "Approved" ? "text-green-500" :
              req.status === "Denied" ? "text-red-500" : "text-yellow-500"
            }`}>
              Status: {req.status}
            </p>

            {req.status === "Pending" && (
              <div className="flex space-x-2">
                <button onClick={() => handleApprove(req.id, req.name, req.email)} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:brightness-110 transition">Approve</button>
                <button onClick={() => handleDeny(req.id, req.name, req.email)} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:brightness-110 transition">Deny</button>
              </div>
            )}

            {req.status !== "Pending" && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic pt-3">Request already processed</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
