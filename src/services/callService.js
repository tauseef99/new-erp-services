// frontend/src/services/callService.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request interceptor for auth
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📞 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    
    return Promise.reject(error);
  }
);

export const callAPI = {
  // Create call offer
  createCallOffer: (callData) =>
    api.post("/calls/offer", callData),

  // Answer call
  answerCall: (answerData) =>
    api.post("/calls/answer", answerData),

  // Send ICE candidate
  sendICECandidate: (candidateData) =>
    api.post("/calls/ice-candidate", candidateData),

  // End call
  endCall: (callData) =>
    api.post("/calls/end", callData),

  // Reject call
  rejectCall: (callData) =>
    api.post("/calls/reject", callData),

  // Get call history
  getCallHistory: (conversationId) =>
    api.get(`/calls/history/${conversationId}`),
};

export default callAPI;