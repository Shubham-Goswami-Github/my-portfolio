import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaTimes } from "react-icons/fa";

// Dummy Requests Data (replace with API/backend later)
const dummyRequests = [
  { id: 1, name: "Rahul Kumar", email: "rahul@example.com", message: "Please send resume" },
  { id: 2, name: "Priya Singh", email: "priya@example.com", message: "Requesting CV" },
  { id: 3, name: "Amit Das", email: "amit@example.com", message: "" },
];

const AdminResumeApproval = () => {
  const [requests, setRequests] = useState(dummyRequests);
  const [approvedIds, setApprovedIds] = useState([]);

  const handleApprove = (id) => {
    // Mark request as approved
    setApprovedIds([...approvedIds, id]);
    // Optional: show alert / toast
    alert(`✅ Resume link approved for Request ID: ${id}`);
    // TODO: Integrate backend/email service here in future
  };

  const handleReject = (id) => {
    setRequests(requests.filter((req) => req.id !== id));
    alert(`❌ Request ID: ${id} rejected`);
  };

  return (
    <section className="min-h-screen p-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
      <h2 className="text-4xl font-bold text-[#e16928ff] dark:text-yellow-400 mb-8 text-center drop-shadow-lg">
        Admin: Resume Requests
      </h2>

      <div className="max-w-4xl mx-auto grid gap-4">
        {requests.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-300 text-lg">
            No pending requests
          </p>
        )}

        {requests.map((req) => (
          <motion.div
            key={req.id}
            className={`p-4 rounded-xl shadow-md flex justify-between items-center
              transition-colors duration-300
              ${approvedIds.includes(req.id) ? "bg-green-100 dark:bg-green-800" : "bg-white dark:bg-gray-800"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {req.name} ({req.email})
              </h3>
              {req.message && <p className="text-gray-700 dark:text-gray-300">{req.message}</p>}
            </div>

            <div className="flex space-x-2">
              {!approvedIds.includes(req.id) && (
                <>
                  <button
                    onClick={() => handleApprove(req.id)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    <FaCheck className="mr-2" /> Approve
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTimes className="mr-2" /> Reject
                  </button>
                </>
              )}
              {approvedIds.includes(req.id) && (
                <span className="text-green-700 dark:text-green-300 font-semibold">
                  ✅ Approved - Download Link Generated
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AdminResumeApproval;
