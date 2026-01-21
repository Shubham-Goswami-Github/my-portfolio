import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Modal States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/sendMail"
      : "https://myportfoliosg8990.vercel.app/api/sendMail";

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "resume_requests"), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        name: doc.data().Sname,
      }));
      setRequests(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Auto hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "" });
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const sendMail = async (email, name, status) => {
    await axios.post(API_URL, { email, name, status });
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
  };

  const openConfirmModal = (id, name, email, action) => {
    setModalData({ id, name, email, action });
    setShowConfirmModal(true);
  };

  const handleConfirmAction = async () => {
    if (!modalData) return;
    
    const { id, name, email, action } = modalData;
    setActionLoading(id);
    setShowConfirmModal(false);

    try {
      if (action === "Approve") {
        await updateDoc(doc(db, "resume_requests", id), { status: "Approved" });
        await sendMail(email, name, "Approved");
        setSuccessMessage(`✅ Resume approved successfully! Email sent to ${email}`);
        showToast(`Approved request for ${name}`, "success");
      } else {
        await updateDoc(doc(db, "resume_requests", id), { status: "Denied" });
        await sendMail(email, name, "Denied");
        setSuccessMessage(`❌ Request denied. Notification email sent to ${email}`);
        showToast(`Denied request for ${name}`, "error");
      }
      setShowSuccessModal(true);
    } catch (error) {
      showToast("Something went wrong!", "error");
    } finally {
      setActionLoading(null);
      setModalData(null);
    }
  };

  const filteredRequests = requests.filter((r) => r.status === filter);

  const stats = {
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    denied: requests.filter((r) => r.status === "Denied").length,
    total: requests.length,
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 animate-slide-in-right`}>
          <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl backdrop-blur-xl border ${
            toast.type === "success" 
              ? "bg-green-500/20 border-green-500/50 text-green-300" 
              : "bg-red-500/20 border-red-500/50 text-red-300"
          }`}>
            <span className="text-2xl">{toast.type === "success" ? "✅" : "❌"}</span>
            <p className="font-medium">{toast.message}</p>
            <button 
              onClick={() => setToast({ show: false, message: "", type: "" })}
              className="ml-4 hover:opacity-70 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirmModal && modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfirmModal(false)}
          />
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scale-in">
            {/* Icon */}
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
              modalData.action === "Approve" 
                ? "bg-green-500/20 border-2 border-green-500" 
                : "bg-red-500/20 border-2 border-red-500"
            }`}>
              <span className="text-4xl">
                {modalData.action === "Approve" ? "✓" : "✕"}
              </span>
            </div>

            {/* Content */}
            <h3 className="text-2xl font-bold text-white text-center mb-2">
              {modalData.action === "Approve" ? "Approve Request?" : "Deny Request?"}
            </h3>
            <p className="text-gray-400 text-center mb-2">
              {modalData.action === "Approve" 
                ? "This will send an approval email with resume access."
                : "This will notify the user that their request was denied."
              }
            </p>
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <p className="text-white font-semibold">{modalData.name}</p>
              <p className="text-gray-400 text-sm">{modalData.email}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition font-semibold text-white border border-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`flex-1 py-3 rounded-xl transition font-semibold text-white ${
                  modalData.action === "Approve"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                    : "bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700"
                }`}
              >
                {modalData.action === "Approve" ? "Yes, Approve" : "Yes, Deny"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 max-w-md w-full border border-white/10 shadow-2xl animate-scale-in text-center">
            {/* Success Animation */}
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-6 animate-bounce-slow">
              <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Action Completed!</h3>
            <p className="text-gray-300 mb-6">{successMessage}</p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition font-semibold text-white"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Sidebar Toggle Button (Mobile) */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 p-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20 text-white"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {sidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* SIDEBAR */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}>
        <div className="h-full bg-white/5 backdrop-blur-2xl border-r border-white/10 p-6 flex flex-col">
          
          {/* Logo/Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Admin Panel</h2>
                <p className="text-xs text-gray-400">Resume Manager</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-xs text-gray-400">Total</p>
            </div>
            <div className="bg-yellow-500/10 rounded-xl p-3 border border-yellow-500/30">
              <p className="text-2xl font-bold text-yellow-400">{stats.pending}</p>
              <p className="text-xs text-yellow-400/70">Pending</p>
            </div>
            <div className="bg-green-500/10 rounded-xl p-3 border border-green-500/30">
              <p className="text-2xl font-bold text-green-400">{stats.approved}</p>
              <p className="text-xs text-green-400/70">Approved</p>
            </div>
            <div className="bg-red-500/10 rounded-xl p-3 border border-red-500/30">
              <p className="text-2xl font-bold text-red-400">{stats.denied}</p>
              <p className="text-xs text-red-400/70">Denied</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 px-3">Navigation</p>
            
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                filter === "Pending"
                  ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/50 text-yellow-300"
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
              onClick={() => setFilter("Pending")}
            >
              <span className="text-xl">⏳</span>
              <span className="font-medium">Pending</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === "Pending" ? "bg-yellow-500 text-black" : "bg-white/10"
              }`}>
                {stats.pending}
              </span>
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                filter === "Approved"
                  ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 text-green-300"
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
              onClick={() => setFilter("Approved")}
            >
              <span className="text-xl">✅</span>
              <span className="font-medium">Approved</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === "Approved" ? "bg-green-500 text-black" : "bg-white/10"
              }`}>
                {stats.approved}
              </span>
            </button>

            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                filter === "Denied"
                  ? "bg-gradient-to-r from-red-500/20 to-rose-500/20 border border-red-500/50 text-red-300"
                  : "hover:bg-white/5 text-gray-400 hover:text-white"
              }`}
              onClick={() => setFilter("Denied")}
            >
              <span className="text-xl">❌</span>
              <span className="font-medium">Denied</span>
              <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-bold ${
                filter === "Denied" ? "bg-red-500 text-black" : "bg-white/10"
              }`}>
                {stats.denied}
              </span>
            </button>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 px-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-sm font-bold">A</span>
              </div>
              <div>
                <p className="text-sm font-medium text-white">Admin</p>
                <p className="text-xs text-gray-400">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT */}
      <main className="flex-1 lg:ml-0 min-h-screen overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-6 lg:px-10 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 text-transparent bg-clip-text">
                {filter} Requests
              </h1>
              <p className="text-gray-400 mt-1">
                Manage all {filter.toLowerCase()} resume requests
              </p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                <p className="text-sm text-gray-400">Total Requests</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            
            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-gray-400">Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
                  <span className="text-5xl opacity-50">
                    {filter === "Pending" ? "⏳" : filter === "Approved" ? "✅" : "❌"}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No {filter} Requests</h3>
                <p className="text-gray-400">There are no {filter.toLowerCase()} requests at the moment.</p>
              </div>
            ) : (
              /* Cards Grid */
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredRequests.map((req, index) => (
                  <div
                    key={req.id}
                    className="group relative rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Status Indicator */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${
                      req.status === "Approved" 
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : req.status === "Denied"
                        ? "bg-gradient-to-r from-red-400 to-rose-500"
                        : "bg-gradient-to-r from-yellow-400 to-orange-500"
                    }`} />

                    <div className="p-6">
                      {/* User Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-bold ${
                          req.status === "Approved"
                            ? "bg-green-500/20 text-green-400"
                            : req.status === "Denied"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {req.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white truncate">{req.name}</h3>
                          <p className="text-gray-400 text-sm truncate">{req.email}</p>
                        </div>
                      </div>

                      {/* Message */}
                      {req.message && (
                        <div className="mb-4 p-3 rounded-xl bg-white/5 border border-white/5">
                          <p className="text-xs text-gray-500 mb-1">Message</p>
                          <p className="text-gray-300 text-sm line-clamp-2">{req.message}</p>
                        </div>
                      )}

                      {/* Status Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-full ${
                            req.status === "Approved"
                              ? "bg-green-500/20 text-green-400 border border-green-500/30"
                              : req.status === "Denied"
                              ? "bg-red-500/20 text-red-400 border border-red-500/30"
                              : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
                          {req.status}
                        </span>
                        <span className="text-xs text-gray-500">
                          {req.timestamp?.toDate?.()?.toLocaleDateString() || "No date"}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {req.status === "Pending" && (
                        <div className="flex gap-3 pt-4 border-t border-white/10">
                          <button
                            onClick={() => openConfirmModal(req.id, req.name, req.email, "Approve")}
                            disabled={actionLoading === req.id}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                          >
                            {actionLoading === req.id ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Approve
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => openConfirmModal(req.id, req.name, req.email, "Deny")}
                            disabled={actionLoading === req.id}
                            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 transition-all duration-200 text-white font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed group/btn"
                          >
                            {actionLoading === req.id ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <>
                                <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Deny
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Completed Status Actions */}
                      {req.status !== "Pending" && (
                        <div className="pt-4 border-t border-white/10">
                          <p className="text-center text-sm text-gray-500">
                            {req.status === "Approved" 
                              ? "✉️ Approval email sent" 
                              : "✉️ Denial notification sent"
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            transform: scale(0.9);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;