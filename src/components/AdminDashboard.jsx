import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Pending"); // ✅ Sidebar filter

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "https://myportfoliosg8990.vercel.app/api/sendMail"
      : "/api/sendMail";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resume_requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().Sname,
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

  const filteredRequests = requests.filter((r) => r.status === filter);

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white">

      {/* ✅ SIDEBAR */}
      <div className="w-64 bg-white/10 backdrop-blur-xl border-r border-white/20 p-6 flex flex-col space-y-6">
        <h2 className="text-2xl font-bold text-yellow-300">Dashboard</h2>

        <button
          className={`text-left px-4 py-2 rounded-lg transition font-semibold ${
            filter === "Pending"
              ? "bg-yellow-400 text-black"
              : "hover:bg-white/10 text-gray-300"
          }`}
          onClick={() => setFilter("Pending")}
        >
          Pending Requests
        </button>

        <button
          className={`text-left px-4 py-2 rounded-lg transition font-semibold ${
            filter === "Approved"
              ? "bg-green-400 text-black"
              : "hover:bg-white/10 text-gray-300"
          }`}
          onClick={() => setFilter("Approved")}
        >
          Approved Requests
        </button>

        <button
          className={`text-left px-4 py-2 rounded-lg transition font-semibold ${
            filter === "Denied"
              ? "bg-red-400 text-black"
              : "hover:bg-white/10 text-gray-300"
          }`}
          onClick={() => setFilter("Denied")}
        >
          Rejected Requests
        </button>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div className="flex-1 p-10">
        <h1 className="text-center text-4xl font-extrabold tracking-wide mb-10 bg-gradient-to-r from-yellow-300 to-orange-400 text-transparent bg-clip-text">
          {filter} Requests
        </h1>

        <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredRequests.length === 0 && (
            <p className="text-center opacity-60 text-lg col-span-full">
              No {filter.toLowerCase()} requests.
            </p>
          )}

          {filteredRequests.map((req) => (
            <div
              key={req.id}
              className="rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-lg hover:scale-[1.03] transition-transform duration-300"
            >
              <h3 className="text-xl font-bold text-yellow-300">{req.name}</h3>

              <p className="text-gray-200 text-sm mt-1">
                <span className="text-gray-400">Email:</span> {req.email}
              </p>

              {req.message && (
                <p className="text-gray-300 text-sm mt-1">
                  <span className="text-gray-400">Message:</span> {req.message}
                </p>
              )}

              <div className="mt-4">
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-full
                    ${
                      req.status === "Approved"
                        ? "bg-green-500/20 text-green-400 border border-green-400/40"
                        : req.status === "Denied"
                        ? "bg-red-500/20 text-red-400 border border-red-400/40"
                        : "bg-yellow-500/20 text-yellow-300 border border-yellow-300/40"
                    }`}
                >
                  {req.status}
                </span>
              </div>

              {req.status === "Pending" && (
                <div className="mt-5 flex gap-3">
                  <button
                    onClick={() => handleApprove(req.id, req.name, req.email)}
                    className="flex-1 py-2 rounded-lg bg-green-500 hover:bg-green-600 transition text-white font-semibold text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(req.id, req.name, req.email)}
                    className="flex-1 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-semibold text-sm"
                  >
                    Deny
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
