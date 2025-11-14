// frontend/src/Components/Verify.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Verify() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // optionally accept email via state or query param
  useEffect(() => {
    // try location.state.email first (from Register)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // fallback to localStorage
      const e = localStorage.getItem("verif_email");
      if (e) setEmail(e);
    }
  }, [location.state]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    try {
      // const res = await axios.post("${process.env.REACT_APP_API_URL}/api/auth/verify-email", { email, code });
      const res = await axios.post("https://just-erp-backend.onrender.com/api/auth/verify-email", { email, code });
      setMsg(res.data.message || "Verified");
      // remove stored email
      localStorage.removeItem("verif_email");
      // redirect to signIn after short delay
      setTimeout(() => navigate("/signIn"), 1200);
    } catch (err) {
      setMsg(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) return setMsg("Email is required to resend code");
    setLoading(true);
    setMsg("");
    try {
      // const res = await axios.post("${process.env.REACT_APP_API_URL}/api/auth/resend-code", { email });
      const res = await axios.post("https://just-erp-backend.onrender.com/api/auth/resend-code", { email });
      setMsg(res.data.message || "Code resent");
    } catch (err) {
      setMsg(err.response?.data?.message || "Resend failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-4">Verify your email</h2>
        <p className="text-sm text-gray-600 mb-4">
          Enter the 6-digit code sent to <span className="font-medium">{email || "your email"}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="6-digit code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />

          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 bg-green-600 text-white rounded"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            <button
              type="button"
              onClick={handleResend}
              className="py-2 px-4 border rounded"
              disabled={loading}
            >
              Resend
            </button>
          </div>
        </form>

        {msg && <p className="mt-4 text-center text-sm">{msg}</p>}
      </div>
    </div>
  );
}
