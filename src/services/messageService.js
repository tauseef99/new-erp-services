//frontend/services/messageServices.js
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

// Create axios instance with better error handling
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
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

export const messageAPI = {
  // Conversation management
  getOrCreateConversation: (buyerId, sellerId) =>
    api.post("/messages/conversation", { buyerId, sellerId }),

  getUserConversations: () =>
    api.get("/messages/conversations"),

  getMessages: (conversationId) =>
    api.get(`/messages/${conversationId}`),

  sendMessage: (messageData) =>
    api.post("/messages/send", messageData),

  markAsRead: (conversationId) =>
    api.put("/messages/read", { conversationId }),
};

// Test connection
export const testConnection = async () => {
  try {
    const response = await api.get("/auth/test");
    return response.data;
  } catch (error) {
    throw new Error(`API connection failed: ${error.message}`);
  }
};

export default messageAPI;