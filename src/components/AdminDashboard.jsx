import { useState, useEffect } from "react";
import { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import axios from "axios";
import {
  X,
  Check,
  Clock,
  CheckCircle,
  XCircle,
  Mail,
  User,
  MessageSquare,
  Menu,
  Sparkles,
  AlertTriangle,
  Loader2,
  Calendar,
  Shield,
  RefreshCw
} from "lucide-react";

/* -------------------- INJECT PREMIUM STYLES -------------------- */
if (typeof document !== "undefined") {
  const existingStyle = document.getElementById("admin-dashboard-styles");
  if (!existingStyle) {
    const style = document.createElement("style");
    style.id = "admin-dashboard-styles";
    style.innerHTML = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
      
      :root {
        --admin-gold: #C9A86C;
        --admin-gold-light: #E8D5B5;
        --admin-gold-dark: #A68B4B;
      }
      
      .admin-bg-pure-black {
        background-color: #000000;
      }
      
      .admin-text-gold {
        color: var(--admin-gold);
      }
      
      .admin-gold-gradient-text {
        background: linear-gradient(135deg, #D4AF37 0%, #C9A86C 30%, #E8D5B5 50%, #C9A86C 70%, #B8956A 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      
      .admin-noise-texture {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        opacity: 0.015;
      }
      
      .admin-card {
        background: rgba(255, 255, 255, 0.02);
        border: 1px solid rgba(255, 255, 255, 0.06);
        transition: all 0.3s ease;
      }
      
      .admin-card:hover {
        background: rgba(255, 255, 255, 0.04);
        border-color: rgba(201, 168, 108, 0.2);
      }
      
      .admin-sidebar {
        background: rgba(10, 10, 10, 0.95);
        border-right: 1px solid rgba(255, 255, 255, 0.06);
      }
      
      .admin-btn-gold {
        background: linear-gradient(135deg, #C9A86C 0%, #D4AF37 50%, #C9A86C 100%);
        box-shadow: 0 4px 20px rgba(201, 168, 108, 0.2);
      }
      
      .admin-btn-gold:hover {
        box-shadow: 0 6px 30px rgba(201, 168, 108, 0.3);
      }
      
      .admin-btn-approve {
        background: linear-gradient(135deg, #10B981 0%, #059669 100%);
        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.25);
      }
      
      .admin-btn-approve:hover:not(:disabled) {
        box-shadow: 0 6px 25px rgba(16, 185, 129, 0.35);
      }
      
      .admin-btn-deny {
        background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.25);
      }
      
      .admin-btn-deny:hover:not(:disabled) {
        box-shadow: 0 6px 25px rgba(239, 68, 68, 0.35);
      }
      
      .admin-input {
        background: rgba(26, 26, 26, 0.9);
        border: 1px solid rgba(64, 64, 64, 0.6);
        color: #ffffff;
      }
      
      .admin-input:focus {
        border-color: rgba(201, 168, 108, 0.6);
        box-shadow: 0 0 0 3px rgba(201, 168, 108, 0.1);
        outline: none;
      }
      
      .admin-glow-line {
        background: linear-gradient(90deg, transparent, rgba(201, 168, 108, 0.5), transparent);
      }
      
      .admin-accent-dot {
        width: 6px;
        height: 6px;
        background: var(--admin-gold);
        border-radius: 50%;
        box-shadow: 0 0 10px var(--admin-gold);
      }
      
      .admin-nav-item {
        transition: all 0.3s ease;
      }
      
      .admin-nav-item.active {
        background: rgba(201, 168, 108, 0.1);
        border: 1px solid rgba(201, 168, 108, 0.3);
      }
      
      .admin-nav-item:not(.active):hover {
        background: rgba(255, 255, 255, 0.03);
      }
      
      .admin-modal-backdrop {
        background: rgba(0, 0, 0, 0.85);
        backdrop-filter: blur(8px);
      }
      
      .admin-modal-card {
        background: rgba(10, 10, 10, 0.98);
        border: 1px solid rgba(201, 168, 108, 0.15);
      }
      
      @keyframes admin-slide-in {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes admin-scale-in {
        from {
          transform: scale(0.95);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }
      
      @keyframes admin-fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes admin-spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }
      
      @keyframes admin-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
      
      .admin-animate-slide-in {
        animation: admin-slide-in 0.3s ease-out;
      }
      
      .admin-animate-scale-in {
        animation: admin-scale-in 0.25s ease-out;
      }
      
      .admin-animate-fade-in {
        animation: admin-fade-in 0.3s ease-out;
      }
      
      .admin-animate-spin {
        animation: admin-spin 1s linear infinite;
      }
      
      .admin-animate-pulse {
        animation: admin-pulse 2s ease-in-out infinite;
      }
      
      .admin-scrollbar::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      
      .admin-scrollbar::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.02);
      }
      
      .admin-scrollbar::-webkit-scrollbar-thumb {
        background: rgba(201, 168, 108, 0.3);
        border-radius: 3px;
      }
      
      .admin-scrollbar::-webkit-scrollbar-thumb:hover {
        background: rgba(201, 168, 108, 0.5);
      }
      
      .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }
}

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("Pending");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Modal States
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [successType, setSuccessType] = useState("approve");

  // Toast State
  const [toast, setToast] = useState({ show: false, message: "", type: "", details: "" });

  // ★★★ FIX: Better API URL configuration ★★★
  const getApiUrl = () => {
    // Check if running on localhost
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        return "http://localhost:3000/api/sendMail";
      }
    }
    // Production URL - UPDATE THIS TO YOUR VERCEL URL
    return "/api/sendMail"; // Relative URL works on same domain
  };

  const API_URL = getApiUrl();

  useEffect(() => {
    console.log("🔗 Using API URL:", API_URL);
  }, [API_URL]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "resume_requests"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          name: doc.data().Sname || doc.data().name
        }));
        // Sort by createdAt descending (newest first)
        data.sort((a, b) => {
          const dateA = a.createdAt?.toDate?.() || new Date(0);
          const dateB = b.createdAt?.toDate?.() || new Date(0);
          return dateB - dateA;
        });
        setRequests(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase listener error:", error);
        showToast("Failed to load requests", "error", error.message);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Auto hide toast
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "", type: "", details: "" });
      }, 6000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // ★★★ FIX: Improved sendMail with detailed error handling ★★★
  const sendMail = async (email, name, status) => {
    console.log("📧 Attempting to send mail...");
    console.log("   Email:", email);
    console.log("   Name:", name);
    console.log("   Status:", status);
    console.log("   API URL:", API_URL);

    try {
      const response = await axios.post(
        API_URL,
        {
          email: email,
          name: name,
          status: status
        },
        {
          timeout: 30000, // 30 second timeout
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      console.log("✅ Mail API Response:", response.data);

      if (response.data.success) {
        return { success: true, data: response.data };
      } else {
        return {
          success: false,
          error: response.data.error || "Unknown error from API"
        };
      }
    } catch (error) {
      console.error("❌ Mail sending failed:", error);

      // Get detailed error message
      let errorMessage = "Unknown error";
      let errorDetails = null;

      if (error.response) {
        // Server responded with error
        console.error("❌ Server Error Response:", error.response.data);
        errorMessage = error.response.data?.error || `Server error: ${error.response.status}`;
        errorDetails = error.response.data?.details;

        // Check for specific Mailjet errors
        if (error.response.data?.hint) {
          errorMessage += ` - ${error.response.data.hint}`;
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = "No response from server. API might be down or unreachable.";
        console.error("❌ No response received. Request:", error.request);
      } else {
        // Error in setting up request
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
        details: errorDetails
      };
    }
  };

  const showToast = (message, type, details = "") => {
    setToast({ show: true, message, type, details });
  };

  const openConfirmModal = (id, name, email, action) => {
    setModalData({ id, name, email, action });
    setShowConfirmModal(true);
  };

  // ★★★ FIX: Improved handleConfirmAction ★★★
  const handleConfirmAction = async () => {
    if (!modalData) return;

    const { id, name, email, action } = modalData;
    setActionLoading(id);
    setShowConfirmModal(false);

    const newStatus = action === "Approve" ? "Approved" : "Denied";

    try {
      // Step 1: Send Email FIRST (so we don't update status if email fails)
      console.log("📧 Step 1: Sending email...");
      const mailResult = await sendMail(email, name, newStatus);

      if (mailResult.success) {
        // Step 2: Update Firestore only if email sent successfully
        console.log("📝 Step 2: Updating Firestore...");
        await updateDoc(doc(db, "resume_requests", id), {
          status: newStatus,
          updatedAt: new Date(),
          emailSent: true,
          emailSentAt: new Date()
        });
        console.log("✅ Firestore updated successfully");

        // Both succeeded
        setSuccessType(action === "Approve" ? "approve" : "deny");
        setSuccessMessage(
          action === "Approve"
            ? `Resume approved! Email sent to ${email}`
            : `Request denied. Notification sent to ${email}`
        );
        showToast(`${action}d request for ${name}`, "success");
        setShowSuccessModal(true);
      } else {
        // Email failed - show detailed error
        console.error("❌ Email failed:", mailResult.error);

        let detailsText = mailResult.error;
        if (mailResult.details) {
          detailsText += `\n\nDetails: ${JSON.stringify(mailResult.details, null, 2)}`;
        }

        showToast("Email sending failed", "error", detailsText);

        // Ask if user wants to update status anyway
        setSuccessType("warning");
        setSuccessMessage(
          `⚠️ Email could not be sent to ${email}\n\nError: ${mailResult.error}\n\nThe request status was NOT updated. Please check:\n1. Mailjet API keys in Vercel\n2. Sender email is verified in Mailjet\n3. You haven't exceeded rate limits`
        );
        setShowSuccessModal(true);
      }
    } catch (error) {
      console.error("❌ Action failed:", error);

      // Show detailed error
      let errorMessage = "Something went wrong!";
      let errorDetails = "";

      if (error.code) {
        errorDetails = `Firebase Error: ${error.code} - ${error.message}`;
      } else if (error.message) {
        errorDetails = error.message;
      }

      showToast(errorMessage, "error", errorDetails);
    } finally {
      setActionLoading(null);
      setModalData(null);
    }
  };

  // ★ Manual resend email function
  const resendEmail = async (req) => {
    setActionLoading(req.id);
    const mailResult = await sendMail(req.email, req.name, req.status);

    if (mailResult.success) {
      await updateDoc(doc(db, "resume_requests", req.id), {
        emailSent: true,
        emailSentAt: new Date()
      });
      showToast(`Email resent to ${req.email}`, "success");
    } else {
      showToast("Failed to resend email", "error", mailResult.error);
    }
    setActionLoading(null);
  };

  const filteredRequests = requests.filter((r) => r.status === filter);

  const stats = {
    pending: requests.filter((r) => r.status === "Pending").length,
    approved: requests.filter((r) => r.status === "Approved").length,
    denied: requests.filter((r) => r.status === "Denied").length,
    total: requests.length
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "No date";
    const date = timestamp.toDate?.() || new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div
      className="min-h-screen flex admin-bg-pure-black admin-scrollbar"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* Noise texture */}
      <div className="fixed inset-0 admin-noise-texture pointer-events-none z-0" />

      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-[#C9A86C]/[0.02] rounded-full blur-[150px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-[400px] h-[400px] bg-neutral-800/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* ==================== TOAST NOTIFICATION ==================== */}
      {toast.show && (
        <div className="fixed top-6 right-6 z-[100] admin-animate-slide-in">
          <div
            className={`flex items-start gap-3 px-5 py-4 rounded-xl shadow-2xl backdrop-blur-xl border max-w-md ${
              toast.type === "success"
                ? "bg-emerald-500/10 border-emerald-500/30"
                : toast.type === "warning"
                ? "bg-amber-500/10 border-amber-500/30"
                : "bg-red-500/10 border-red-500/30"
            }`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                toast.type === "success"
                  ? "bg-emerald-500/20"
                  : toast.type === "warning"
                  ? "bg-amber-500/20"
                  : "bg-red-500/20"
              }`}
            >
              {toast.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              ) : toast.type === "warning" ? (
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              ) : (
                <XCircle className="w-5 h-5 text-red-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p
                className={`font-medium ${
                  toast.type === "success"
                    ? "text-emerald-300"
                    : toast.type === "warning"
                    ? "text-amber-300"
                    : "text-red-300"
                }`}
              >
                {toast.message}
              </p>
              {toast.details && (
                <p className="text-xs text-neutral-500 mt-1 break-words whitespace-pre-wrap">
                  {toast.details}
                </p>
              )}
            </div>
            <button
              onClick={() => setToast({ show: false, message: "", type: "", details: "" })}
              className="flex-shrink-0 text-neutral-500 hover:text-white transition p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* ==================== CONFIRM MODAL ==================== */}
      {showConfirmModal && modalData && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 admin-modal-backdrop"
            onClick={() => setShowConfirmModal(false)}
          />
          <div className="relative admin-modal-card rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl admin-animate-scale-in">
            {/* Noise overlay */}
            <div className="absolute inset-0 admin-noise-texture rounded-2xl pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-[#C9A86C]/40 to-transparent" />
              <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-[#C9A86C]/40 to-transparent" />
            </div>
            <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-[#C9A86C]/40 to-transparent" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-gradient-to-t from-[#C9A86C]/40 to-transparent" />
            </div>

            <div className="relative z-10">
              {/* Icon */}
              <div
                className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-5 ${
                  modalData.action === "Approve"
                    ? "bg-emerald-500/10 border border-emerald-500/30"
                    : "bg-red-500/10 border border-red-500/30"
                }`}
              >
                {modalData.action === "Approve" ? (
                  <Check className="w-8 h-8 text-emerald-400" />
                ) : (
                  <X className="w-8 h-8 text-red-400" />
                )}
              </div>

              {/* Title */}
              <h3
                className="text-xl sm:text-2xl font-bold text-white text-center mb-2"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {modalData.action === "Approve" ? "Approve Request?" : "Deny Request?"}
              </h3>

              <p className="text-neutral-400 text-sm text-center mb-5">
                {modalData.action === "Approve"
                  ? "This will send an approval email with resume access."
                  : "This will notify the user that their request was denied."}
              </p>

              {/* User Info Card */}
              <div className="admin-card rounded-xl p-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl admin-btn-gold flex items-center justify-center">
                    <User className="w-5 h-5 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{modalData.name}</p>
                    <p className="text-neutral-500 text-sm truncate">{modalData.email}</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 
                           transition font-semibold text-white border border-neutral-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmAction}
                  className={`flex-1 py-3 rounded-xl transition font-semibold text-white ${
                    modalData.action === "Approve" ? "admin-btn-approve" : "admin-btn-deny"
                  }`}
                >
                  {modalData.action === "Approve" ? "Yes, Approve" : "Yes, Deny"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SUCCESS MODAL ==================== */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 admin-modal-backdrop"
            onClick={() => setShowSuccessModal(false)}
          />
          <div className="relative admin-modal-card rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl admin-animate-scale-in text-center">
            {/* Noise overlay */}
            <div className="absolute inset-0 admin-noise-texture rounded-2xl pointer-events-none" />

            <div className="relative z-10">
              {/* Success Icon */}
              <div
                className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-5 ${
                  successType === "approve"
                    ? "bg-emerald-500/10 border-2 border-emerald-500/40"
                    : successType === "warning"
                    ? "bg-amber-500/10 border-2 border-amber-500/40"
                    : "bg-red-500/10 border-2 border-red-500/40"
                }`}
              >
                {successType === "approve" ? (
                  <CheckCircle className="w-10 h-10 text-emerald-400" />
                ) : successType === "warning" ? (
                  <AlertTriangle className="w-10 h-10 text-amber-400" />
                ) : (
                  <XCircle className="w-10 h-10 text-red-400" />
                )}
              </div>

              <h3
                className="text-xl sm:text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {successType === "warning" ? "Action Required" : "Action Completed!"}
              </h3>
              <p className="text-neutral-400 text-sm mb-6 whitespace-pre-line text-left">
                {successMessage}
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 rounded-xl admin-btn-gold text-black font-semibold 
                         transition"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {successType === "warning" ? "Understood" : "Continue"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==================== SIDEBAR TOGGLE (Mobile) ==================== */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-[60] p-3 rounded-xl 
                   bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 text-white"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* ==================== SIDEBAR ==================== */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-[50] w-72 transform transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-full admin-sidebar p-5 flex flex-col overflow-y-auto admin-scrollbar">
          {/* Logo/Header */}
          <div className="mb-8 pt-2">
            <div className="flex items-center gap-3 mb-1">
              <div className="w-11 h-11 rounded-xl admin-btn-gold flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  Admin Panel
                </h2>
                <p className="text-xs text-neutral-500">Resume Manager</p>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full admin-glow-line mb-6" />

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="admin-card rounded-xl p-3">
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stats.total}
              </p>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Total</p>
            </div>
            <div className="rounded-xl p-3 bg-amber-500/10 border border-amber-500/20">
              <p className="text-2xl font-bold text-amber-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stats.pending}
              </p>
              <p className="text-[10px] text-amber-400/70 uppercase tracking-wider">Pending</p>
            </div>
            <div className="rounded-xl p-3 bg-emerald-500/10 border border-emerald-500/20">
              <p className="text-2xl font-bold text-emerald-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stats.approved}
              </p>
              <p className="text-[10px] text-emerald-400/70 uppercase tracking-wider">Approved</p>
            </div>
            <div className="rounded-xl p-3 bg-red-500/10 border border-red-500/20">
              <p className="text-2xl font-bold text-red-400" style={{ fontFamily: "'Outfit', sans-serif" }}>
                {stats.denied}
              </p>
              <p className="text-[10px] text-red-400/70 uppercase tracking-wider">Denied</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            <p className="text-[10px] uppercase tracking-widest text-neutral-600 mb-3 px-2 font-medium">
              Navigation
            </p>

            {/* Pending */}
            <button
              className={`admin-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                filter === "Pending" ? "active" : ""
              }`}
              onClick={() => {
                setFilter("Pending");
                setSidebarOpen(false);
              }}
            >
              <Clock className={`w-5 h-5 ${filter === "Pending" ? "text-amber-400" : "text-neutral-500"}`} />
              <span className={`font-medium ${filter === "Pending" ? "text-amber-400" : "text-neutral-400"}`}>
                Pending
              </span>
              <span
                className={`ml-auto px-2 py-0.5 rounded-md text-xs font-bold ${
                  filter === "Pending" ? "bg-amber-500 text-black" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {stats.pending}
              </span>
            </button>

            {/* Approved */}
            <button
              className={`admin-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                filter === "Approved" ? "active" : ""
              }`}
              onClick={() => {
                setFilter("Approved");
                setSidebarOpen(false);
              }}
            >
              <CheckCircle
                className={`w-5 h-5 ${filter === "Approved" ? "text-emerald-400" : "text-neutral-500"}`}
              />
              <span className={`font-medium ${filter === "Approved" ? "text-emerald-400" : "text-neutral-400"}`}>
                Approved
              </span>
              <span
                className={`ml-auto px-2 py-0.5 rounded-md text-xs font-bold ${
                  filter === "Approved" ? "bg-emerald-500 text-black" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {stats.approved}
              </span>
            </button>

            {/* Denied */}
            <button
              className={`admin-nav-item w-full flex items-center gap-3 px-4 py-3 rounded-xl ${
                filter === "Denied" ? "active" : ""
              }`}
              onClick={() => {
                setFilter("Denied");
                setSidebarOpen(false);
              }}
            >
              <XCircle className={`w-5 h-5 ${filter === "Denied" ? "text-red-400" : "text-neutral-500"}`} />
              <span className={`font-medium ${filter === "Denied" ? "text-red-400" : "text-neutral-400"}`}>
                Denied
              </span>
              <span
                className={`ml-auto px-2 py-0.5 rounded-md text-xs font-bold ${
                  filter === "Denied" ? "bg-red-500 text-black" : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {stats.denied}
              </span>
            </button>
          </nav>

          {/* Footer */}
          <div className="mt-auto pt-5 border-t border-neutral-800/50">
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-xl admin-btn-gold flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">Shubham</p>
                <p className="text-[10px] text-neutral-500">Super Admin</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/60 z-[40]" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ==================== MAIN CONTENT ==================== */}
      <main className="flex-1 min-h-screen overflow-auto admin-scrollbar relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-20 bg-black/80 backdrop-blur-xl border-b border-neutral-800/50 px-6 lg:px-10 py-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="pl-12 lg:pl-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="admin-accent-dot admin-animate-pulse" />
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-medium">
                  Resume Requests
                </p>
              </div>
              <h1
                className="text-2xl sm:text-3xl lg:text-4xl font-bold admin-gold-gradient-text"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {filter} Requests
              </h1>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <div className="admin-card rounded-xl px-5 py-3">
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">Total</p>
                <p className="text-2xl font-bold text-white" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {/* Loading State */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-12 h-12 rounded-xl admin-btn-gold flex items-center justify-center mb-4">
                  <Loader2 className="w-6 h-6 text-black admin-animate-spin" />
                </div>
                <p className="text-neutral-400">Loading requests...</p>
              </div>
            ) : filteredRequests.length === 0 ? (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-24">
                <div className="w-20 h-20 rounded-2xl admin-card flex items-center justify-center mb-6">
                  {filter === "Pending" ? (
                    <Clock className="w-10 h-10 text-neutral-600" />
                  ) : filter === "Approved" ? (
                    <CheckCircle className="w-10 h-10 text-neutral-600" />
                  ) : (
                    <XCircle className="w-10 h-10 text-neutral-600" />
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2" style={{ fontFamily: "'Outfit', sans-serif" }}>
                  No {filter} Requests
                </h3>
                <p className="text-neutral-500 text-sm">
                  There are no {filter.toLowerCase()} requests at the moment.
                </p>
              </div>
            ) : (
              /* Cards Grid */
              <div className="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                {filteredRequests.map((req, index) => (
                  <div
                    key={req.id}
                    className="group admin-card rounded-2xl overflow-hidden admin-animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Status Bar */}
                    <div
                      className={`h-1 ${
                        req.status === "Approved"
                          ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                          : req.status === "Denied"
                          ? "bg-gradient-to-r from-red-500 to-rose-500"
                          : "bg-gradient-to-r from-amber-500 to-orange-500"
                      }`}
                    />

                    <div className="p-5">
                      {/* User Info */}
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${
                            req.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : req.status === "Denied"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {req.name?.charAt(0)?.toUpperCase() || "?"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-bold text-white truncate">{req.name}</h3>
                          <p className="text-neutral-500 text-sm truncate flex items-center gap-1.5">
                            <Mail className="w-3.5 h-3.5" />
                            {req.email}
                          </p>
                        </div>
                      </div>

                      {/* Message */}
                      {req.message && (
                        <div className="mb-4 p-3 rounded-xl bg-neutral-900/50 border border-neutral-800/50">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <MessageSquare className="w-3 h-3 text-neutral-600" />
                            <p className="text-[10px] text-neutral-600 uppercase tracking-wider">Message</p>
                          </div>
                          <p className="text-neutral-400 text-sm line-clamp-2">{req.message}</p>
                        </div>
                      )}

                      {/* Status & Date */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg ${
                            req.status === "Approved"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : req.status === "Denied"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              req.status === "Pending" ? "admin-animate-pulse" : ""
                            } ${
                              req.status === "Approved"
                                ? "bg-emerald-400"
                                : req.status === "Denied"
                                ? "bg-red-400"
                                : "bg-amber-400"
                            }`}
                          />
                          {req.status}
                        </span>
                        <span className="text-[11px] text-neutral-600 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(req.createdAt)}
                        </span>
                      </div>

                      {/* Action Buttons */}
                      {req.status === "Pending" && (
                        <div className="flex gap-3 pt-4 border-t border-neutral-800/50">
                          <button
                            onClick={() => openConfirmModal(req.id, req.name, req.email, "Approve")}
                            disabled={actionLoading === req.id}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl 
                                     admin-btn-approve text-white font-semibold text-sm 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {actionLoading === req.id ? (
                              <Loader2 className="w-4 h-4 admin-animate-spin" />
                            ) : (
                              <>
                                <Check className="w-4 h-4" />
                                Approve
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => openConfirmModal(req.id, req.name, req.email, "Deny")}
                            disabled={actionLoading === req.id}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl 
                                     admin-btn-deny text-white font-semibold text-sm 
                                     disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {actionLoading === req.id ? (
                              <Loader2 className="w-4 h-4 admin-animate-spin" />
                            ) : (
                              <>
                                <X className="w-4 h-4" />
                                Deny
                              </>
                            )}
                          </button>
                        </div>
                      )}

                      {/* Completed Status with Resend Option */}
                      {req.status !== "Pending" && (
                        <div className="pt-4 border-t border-neutral-800/50">
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-neutral-600 flex items-center gap-1.5">
                              <Mail className="w-3.5 h-3.5" />
                              {req.status === "Approved" ? "Approval email sent" : "Denial notification sent"}
                            </p>
                            <button
                              onClick={() => resendEmail(req)}
                              disabled={actionLoading === req.id}
                              className="text-xs text-[#C9A86C] hover:text-[#E8D5B5] flex items-center gap-1 transition"
                            >
                              {actionLoading === req.id ? (
                                <Loader2 className="w-3 h-3 admin-animate-spin" />
                              ) : (
                                <RefreshCw className="w-3 h-3" />
                              )}
                              Resend
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Decorative */}
        <div className="flex justify-center py-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-neutral-800" />
            <div className="admin-accent-dot" />
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-neutral-800" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;