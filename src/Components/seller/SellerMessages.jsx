// frontend/src/components/SellerMessages.jsx
import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiSend, FiPaperclip, FiSmile, FiMenu, FiX, FiDollarSign } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { BsThreeDotsVertical, BsStarFill } from "react-icons/bs";
import { FaSpinner, FaUserCircle, FaPhone, FaVideo } from "react-icons/fa";
import SellerLayout from "../../Pages/layouts/SellerLayout";
import { messageAPI } from "../../services/messageService";
import { offerAPI, paymentAPI } from "../../services/offerService";
import socketService from "../../services/socketService";
import { jwtDecode } from 'jwt-decode';
import CallModal from '../CallModal.jsx';
import useWebRTC from '../../hooks/useWebRTC.js';
import CustomOfferModal from './CustomOfferModal';
import OfferMessage from '../common/OfferMessage';

const SellerMessages = () => {
  const [message, setMessage] = useState("");
  const [activeConversation, setActiveConversation] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showOrderPanel, setShowOrderPanel] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Custom Offer States
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offers, setOffers] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);

  // Call-related states
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  const [socketStatus, setSocketStatus] = useState('disconnected');

  // WebRTC refs and hooks
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const {
    startCall,
    endCall,
    rejectCall,
    answerCall,
    isCallActive,
    isCallInProgress,
    localStream,
    remoteStream,
    currentCall: webrtcCurrentCall
  } = useWebRTC(localVideoRef, remoteVideoRef);

  // Store user data in ref to avoid timing issues
  const userRef = useRef(null);

  // Initialize with call functionality
  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log('🔧 Seller: Initializing chat...');
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const decoded = jwtDecode(token);
        console.log('👤 Seller User decoded:', decoded);
        setUser(decoded);
        userRef.current = decoded;

        // Connect to socket with error handling
        try {
          console.log('🔌 Seller: Attempting socket connection...');
          await socketService.connect(token);
          setSocketStatus('connected');
          socketService.joinUser(decoded.id);
          console.log('✅ Seller: Socket connected and joined user room');
        } catch (socketError) {
          console.error('❌ Seller: Socket connection failed:', socketError);
          setSocketStatus('error');
        }

        // Set up socket listeners
        socketService.onNewMessage(handleNewMessage);
        socketService.onConversationUpdated(handleConversationUpdated);
        socketService.onOfferUpdated(handleOfferUpdated);
        
        // Call-related socket listeners
        socketService.onIncomingCall(handleIncomingCall);
        socketService.onCallAnswered(handleCallAnswered);
        socketService.onCallEnded(handleCallEnded);
        socketService.onCallRejected(handleCallRejected);
        socketService.onICECandidate(handleRemoteICECandidate);
        
        console.log('✅ Seller: All socket listeners set up');

        // Load conversations
        await loadConversations();
      } catch (error) {
        console.error('❌ Seller: Error initializing chat:', error);
        setError('Failed to initialize messaging system');
      } finally {
        setLoading(false);
      }
    };

    initializeChat();

    return () => {
      // Clean up socket listeners
      socketService.offNewMessage();
      socketService.offConversationUpdated();
      socketService.offOfferUpdated();
      socketService.offIncomingCall();
      socketService.offCallAnswered();
      socketService.offCallEnded();
      socketService.offCallRejected();
      socketService.offICECandidate();
      socketService.disconnect();
      
      // End any active call
      if (isCallActive || isCallInProgress) {
        endCall();
      }
    };
  }, []);

  // Update userRef when user state changes
  useEffect(() => {
    if (user) {
      userRef.current = user;
    }
  }, [user]);

  // Load offers when active conversation changes
  useEffect(() => {
    if (activeConversation && activeConversation._id) {
      loadOffersForConversation(activeConversation._id);
    }
  }, [activeConversation]);

  // Socket event handlers
  const handleNewMessage = (message) => {
    console.log('📨 Seller received new message:', message);
    
    if (activeConversation && message.conversationId === activeConversation._id) {
      setMessages(prev => {
        if (prev.some(msg => msg._id === message._id)) return prev;
        return [...prev, message];
      });
      scrollToBottom();
      
      // Mark as read automatically when seller views the message
      markAsRead(activeConversation._id);
    }
    
    // Update conversations list
    setConversations(prev => 
      prev.map(conv => 
        conv._id === message.conversationId 
          ? { 
              ...conv, 
              lastMessage: message.message, 
              lastMessageAt: new Date(),
              unreadCount: conv._id === activeConversation?._id ? 0 : (conv.unreadCount || 0) + 1
            }
          : conv
      )
    );
  };

  const handleConversationUpdated = () => {
    console.log('🔄 Seller: Conversation updated, reloading...');
    loadConversations();
  };

  const handleOfferUpdated = (data) => {
    console.log('🔄 Seller: Offer updated via socket:', data);
    
    // Update offers list
    setOffers(prev => 
      prev.map(offer => 
        offer._id === data.offer._id ? data.offer : offer
      )
    );
    
    // Update messages that contain this offer
    setMessages(prev => 
      prev.map(msg => 
        msg.type === 'offer' && msg.offer._id === data.offer._id 
          ? { ...msg, offer: data.offer }
          : msg
      )
    );
  };

  // Call-related socket handlers
  const handleIncomingCall = (data) => {
    console.log('📞 Seller: Incoming call received:', data);
    setCurrentCall(data.call);
    setIsIncomingCall(true);
    setIsCallModalOpen(true);
  };

  const handleCallAnswered = (data) => {
    console.log('📞 Seller: Call answered by remote:', data);
  };

  const handleCallEnded = (data) => {
    console.log('📞 Seller: Call ended by remote:', data);
    setIsCallModalOpen(false);
    setCurrentCall(null);
    setIsIncomingCall(false);
  };

  const handleCallRejected = (data) => {
    console.log('📞 Seller: Call rejected by remote:', data);
    setIsCallModalOpen(false);
    setCurrentCall(null);
    setIsIncomingCall(false);
    alert('Call was rejected by the buyer.');
  };

  const handleRemoteICECandidate = (data) => {
    console.log('❄️ Seller: Remote ICE candidate received:', data);
  };

  // Load conversations
  const loadConversations = async () => {
    try {
      console.log('📂 Seller: Loading conversations...');
      const response = await messageAPI.getUserConversations();
      console.log('✅ Seller: Conversations API response:', response);
      
      // Handle different response structures
      let conversationsData = [];
      if (response.data && Array.isArray(response.data)) {
        conversationsData = response.data;
      } else if (response.data && response.data.conversations) {
        conversationsData = response.data.conversations;
      } else if (response.data && response.data.data) {
        conversationsData = response.data.data;
      }
      
      console.log(`✅ Seller: Loaded ${conversationsData.length} conversations`, conversationsData);
      setConversations(conversationsData);
      
      // Auto-select first conversation if available
      if (conversationsData.length > 0 && !activeConversation) {
        const firstConversation = conversationsData[0];
        console.log('✅ Seller: Auto-selecting first conversation:', firstConversation);
        setActiveConversation(firstConversation);
        await loadMessages(firstConversation._id);
      }
    } catch (error) {
      console.error('❌ Seller: Error loading conversations:', error);
      setConversations([]);
      setError('Failed to load conversations');
    }
  };

  // Load messages for a conversation
  const loadMessages = async (conversationId) => {
    if (!conversationId) {
      console.error('❌ No conversation ID provided');
      return;
    }

    try {
      console.log(`💬 Seller: Loading messages for conversation: ${conversationId}`);
      const response = await messageAPI.getMessages(conversationId);
      console.log('✅ Seller: Messages API response:', response);
      
      // Handle different response structures
      let messagesData = [];
      if (response.data && Array.isArray(response.data)) {
        messagesData = response.data;
      } else if (response.data && response.data.messages) {
        messagesData = response.data.messages;
      } else if (response.data && response.data.data) {
        messagesData = response.data.data;
      }
      
      console.log(`✅ Seller: Loaded ${messagesData.length} messages`, messagesData);
      setMessages(messagesData);
      scrollToBottom();
      
      // Join conversation room if socket is connected
      if (socketService.getConnectionStatus && socketService.getConnectionStatus()) {
        socketService.joinConversation(conversationId);
        console.log(`✅ Seller: Joined conversation room: ${conversationId}`);
      }
    } catch (error) {
      console.error('❌ Seller: Error loading messages:', error);
      
      if (error.code === 'ECONNABORTED') {
        console.warn('⚠️ Message load timeout - keeping existing messages');
        return;
      }
      
      if (error.response) {
        console.error('Error response:', error.response.data);
        if (error.response.status !== 408) {
          setMessages([]);
        }
      } else {
        console.warn('⚠️ Network error - keeping existing messages');
      }
    }
  };

  // Load offers for conversation - FIXED VERSION
  const loadOffersForConversation = async (conversationId) => {
    if (!conversationId) return;
    
    try {
      setIsLoadingOffers(true);
      console.log(`📦 Seller: Loading offers for conversation: ${conversationId}`);
      const response = await offerAPI.getOffersByConversation(conversationId);
      console.log('✅ Seller: Offers loaded:', response.data);
      
      // Handle different response structures
      const offersData = response.data?.data || response.data || [];
      setOffers(Array.isArray(offersData) ? offersData : []);
    } catch (error) {
      console.error('❌ Seller: Error loading offers:', error);
      setOffers([]);
    } finally {
      setIsLoadingOffers(false);
    }
  };

const handleSendCustomOffer = async (offerData) => {
  try {
    console.log('📦 Seller: Sending REAL custom offer:', offerData);
    
    // Create the offer payload with correct field names
    const offerPayload = {
      title: offerData.title,
      description: offerData.description,
      price: offerData.price,
      deliveryDays: offerData.deliveryDays,
      conversationId: activeConversation._id,
      buyerId: getBuyerId(activeConversation),
      sellerId: user?.id,
      revisions: offerData.revisions || 1,
      requirements: offerData.requirements || [],
      inclusions: offerData.inclusions || []
    };

    console.log('📦 Seller: Sending offer with payload:', offerPayload);

    const response = await offerAPI.createOffer(offerPayload);
    console.log('✅ Seller: REAL Offer created:', response.data);

    const newOffer = response.data?.data || response.data;
    
    if (!newOffer) {
      throw new Error('No offer data received from server');
    }

    console.log('🔄 New REAL offer created with ID:', newOffer._id);

    // ✅ Socket emission with error handling - don't throw for socket errors
    try {
      if (socketService.getConnectionStatus && socketService.getConnectionStatus()) {
        socketService.emitNewOffer(newOffer);
        console.log('📡 Socket event emitted for new offer');
      } else {
        console.warn('⚠️ Socket not connected, skipping socket emission');
        // Don't throw - this is not critical
      }
    } catch (socketError) {
      console.warn('⚠️ Socket emission failed (non-critical):', socketError);
      // Don't rethrow - offer was created successfully
    }

    // Update local state
    setOffers(prev => [...prev, newOffer]);
    
    // Create a message for the offer
    const offerMessage = {
      _id: `temp-${Date.now()}`,
      type: 'offer',
      offer: newOffer,
      sender: { _id: user?.id },
      conversationId: activeConversation._id,
      createdAt: new Date().toISOString(),
      message: `New offer: ${newOffer.title} - $${newOffer.price}`
    };

    setMessages(prev => [...prev, offerMessage]);
    scrollToBottom();

    return newOffer;
  } catch (error) {
    console.error('❌ Seller: Error sending REAL custom offer:', error);
    throw error;
  }
};
  // In SellerMessages.jsx - Update the handleOfferAction function
  const handleOfferAction = async (offerId, action) => {
    try {
      console.log(`🔄 Seller: ${action} offer: ${offerId} by user: ${user?.id}`);
      
      if (!user?.id) {
        throw new Error('User ID not found. Please log in again.');
      }

      let response;
      const payload = { 
        userId: user.id // Make sure this is included
      };
      
      if (action === 'accept') {
        response = await offerAPI.acceptOffer(offerId, payload);
      } else {
        response = await offerAPI.rejectOffer(offerId, payload);
      }
      
      console.log(`✅ Seller: Offer ${action}ed:`, response.data);
      
      const updatedOffer = response.data?.data || response.data;
      
      // Update offer in offers list
      setOffers(prev => 
        prev.map(offer => 
          offer._id === offerId ? updatedOffer : offer
        )
      );
      
      // Update offer in messages
      setMessages(prev => 
        prev.map(msg => 
          msg.type === 'offer' && msg.offer._id === offerId 
            ? { ...msg, offer: updatedOffer }
            : msg
        )
      );
      
      return updatedOffer;
    } catch (error) {
      console.error(`❌ Seller: Error ${action}ing offer:`, error);
      alert(`Failed to ${action} offer: ${error.response?.data?.message || error.message}`);
      throw error;
    }
  };

  // Helper functions to safely access buyer data
  const getBuyerId = (conversation) => {
    if (!conversation) return null;
    
    if (conversation.buyer?._id) return conversation.buyer._id;
    
    if (conversation.participants && Array.isArray(conversation.participants)) {
      const buyer = conversation.participants.find(p => p.role === 'buyer' || p._id !== user?.id);
      if (buyer) return buyer._id;
    }
    
    return null;
  };

  const getBuyerName = (conversation) => {
    if (!conversation) return 'Unknown Buyer';
    
    if (conversation.buyer?.name) return conversation.buyer.name;
    if (conversation.buyer?.username) return conversation.buyer.username;
    if (conversation.buyer?.firstName) {
      return `${conversation.buyer.firstName}${conversation.buyer.lastName ? ' ' + conversation.buyer.lastName : ''}`;
    }
    
    if (conversation.participants && Array.isArray(conversation.participants)) {
      const buyer = conversation.participants.find(p => p.role === 'buyer' || p._id !== user?.id);
      if (buyer) return buyer.name || buyer.username || 'Buyer';
    }
    
    return 'Unknown Buyer';
  };

  const getBuyerImage = (conversation) => {
    if (!conversation) return null;
    
    if (conversation.buyer?.profileImage) return conversation.buyer.profileImage;
    if (conversation.buyer?.avatar) return conversation.buyer.avatar;
    if (conversation.buyer?.image) return conversation.buyer.image;
    
    if (conversation.participants && Array.isArray(conversation.participants)) {
      const buyer = conversation.participants.find(p => p.role === 'buyer' || p._id !== user?.id);
      if (buyer) return buyer.profileImage || buyer.avatar || buyer.image;
    }
    
    return null;
  };

  const getBuyerEmail = (conversation) => {
    if (!conversation) return 'Not available';
    
    if (conversation.buyer?.email) return conversation.buyer.email;
    
    if (conversation.participants && Array.isArray(conversation.participants)) {
      const buyer = conversation.participants.find(p => p.role === 'buyer' || p._id !== user?.id);
      if (buyer) return buyer.email || 'Not available';
    }
    
    return 'Not available';
  };

  // Send message from seller
  const handleSendMessage = async () => {
    if (message.trim() === '' || !activeConversation) {
      console.log('ℹ️ Seller: Message empty or no active conversation');
      return;
    }

    console.log('📤 Seller: Sending message...');
    setIsSending(true);
    
    const messageToSend = message.trim();
    setMessage('');
    
    try {
      // Get buyer ID safely
      const buyerId = getBuyerId(activeConversation);
      if (!buyerId) {
        throw new Error('Could not find buyer ID in conversation data');
      }

      const messageData = {
        conversationId: activeConversation._id,
        receiverId: buyerId,
        message: messageToSend
      };

      console.log('📡 Seller: Sending message via API:', messageData);
      
      const response = await messageAPI.sendMessage(messageData);
      console.log('✅ Seller: Message sent successfully:', response.data);
      
      // Add message to local state immediately for better UX
      const newMessage = response.data?.message || response.data?.data || response.data;
      if (newMessage) {
        setMessages(prev => [...prev, newMessage]);
        scrollToBottom();
      }
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv._id === activeConversation._id 
            ? { ...conv, lastMessage: messageToSend, lastMessageAt: new Date() }
            : conv
        )
      );
    } catch (error) {
      console.error('❌ Seller: Error sending message:', error);
      setMessage(messageToSend);
      alert('Failed to send message. Please check console for details.');
    } finally {
      setIsSending(false);
    }
  };

  // Call management functions
  const handleStartCall = async (callType) => {
    if (!activeConversation) {
      alert('Please select a conversation first');
      return;
    }

    if (isCallInProgress || isCallActive) {
      alert('A call is already in progress');
      return;
    }

    try {
      console.log(`📞 Seller: Starting ${callType} call...`);
      
      // Show call modal immediately to show "calling" state
      setIsCallModalOpen(true);
      setIsIncomingCall(false);
      
      const call = await startCall(activeConversation._id, callType);
      setCurrentCall(call);
      
      console.log('✅ Seller: Call initiated, waiting for answer...');
    } catch (error) {
      console.error('❌ Seller: Failed to start call:', error);
      setIsCallModalOpen(false);
      alert(`Failed to start ${callType} call: ${error.message}`);
    }
  };

  const handleAnswerCall = async (callType = 'audio') => {
    try {
      await answerCall(currentCall, callType);
      setIsIncomingCall(false);
    } catch (error) {
      console.error('❌ Seller: Error answering call:', error);
      alert('Failed to answer call. Please try again.');
    }
  };

  const handleRejectCall = async () => {
    try {
      await rejectCall(currentCall._id);
      setIsCallModalOpen(false);
      setCurrentCall(null);
      setIsIncomingCall(false);
    } catch (error) {
      console.error('❌ Seller: Failed to reject call:', error);
    }
  };

  // Add this function to your SellerMessages.jsx in the component
  const handleOfferPayment = async (offerId) => {
    try {
      console.log(`💳 Processing payment for offer: ${offerId}`);
      
      // Find the offer
      const offer = offers.find(o => o._id === offerId);
      if (!offer) {
        throw new Error('Offer not found');
      }

      // If there's a payment session URL, redirect to Stripe
      if (offer.paymentSession?.url) {
        console.log('🔗 Redirecting to Stripe checkout:', offer.paymentSession.url);
        window.open(offer.paymentSession.url, '_blank');
        return;
      }

      // Otherwise create a new payment session
      console.log('💳 Creating new payment session for offer:', offerId);
      const paymentData = {
        offerId: offerId,
        amount: offer.price,
        currency: offer.currency || 'usd',
        successUrl: `${window.location.origin}/payment/success?offer_id=${offerId}`,
        cancelUrl: `${window.location.origin}/payment/cancel?offer_id=${offerId}`
      };

      const response = await paymentAPI.createCheckoutSession(paymentData);
      
      if (response.data?.session?.url) {
        console.log('🔗 Redirecting to Stripe checkout');
        window.open(response.data.session.url, '_blank');
      } else {
        throw new Error('No payment URL received');
      }

    } catch (error) {
      console.error('❌ Error processing payment:', error);
      alert(`Payment failed: ${error.message}`);
      throw error;
    }
  };

  const handleEndCall = async () => {
    await endCall();
    setIsCallModalOpen(false);
    setCurrentCall(null);
    setIsIncomingCall(false);
  };

  const handleCloseCallModal = () => {
    if (isCallActive || isCallInProgress) {
      handleEndCall();
    } else {
      setIsCallModalOpen(false);
      setCurrentCall(null);
      setIsIncomingCall(false);
    }
  };

  // Utility functions
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsRead = async (conversationId) => {
    try {
      await messageAPI.markAsRead(conversationId);
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Manual retry for socket connection
  const retrySocketConnection = async () => {
    try {
      setSocketStatus('connecting');
      const token = localStorage.getItem('token');
      await socketService.connect(token);
      setSocketStatus('connected');
      
      if (userRef.current) {
        socketService.joinUser(userRef.current.id);
      }
      
      if (activeConversation) {
        socketService.joinConversation(activeConversation._id);
      }
    } catch (error) {
      console.error('❌ Seller: Failed to reconnect socket:', error);
      setSocketStatus('error');
    }
  };

  // Safe conversation data access
  const safeConversations = Array.isArray(conversations) ? conversations : [];

  if (loading) {
    return (
      <SellerLayout>
        <div className="flex items-center justify-center h-64">
          <FaSpinner className="animate-spin text-4xl text-[#708238]" />
          <span className="ml-2">Loading messages...</span>
        </div>
      </SellerLayout>
    );
  }

  return (
    <SellerLayout>
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] bg-gray-50">
        {/* Mobile Menu Button */}
        <div className="lg:hidden flex justify-between items-center p-4 bg-white border-b">
          <button 
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="text-gray-700"
          >
            {showMobileMenu ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <h2 className="text-xl font-bold text-gray-800">Messages</h2>
          <div className="flex items-center space-x-2">
            {/* Socket Status */}
            <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
              socketStatus === 'connected' ? 'bg-green-100 text-green-800' : 
              socketStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' : 
              socketStatus === 'connecting' ? 'bg-blue-100 text-blue-800' :
              'bg-red-100 text-red-800'
            }`}>
              <div className={`w-2 h-2 rounded-full mr-1 ${
                socketStatus === 'connected' ? 'bg-green-500' : 
                socketStatus === 'disconnected' ? 'bg-yellow-500' : 
                socketStatus === 'connecting' ? 'bg-blue-500' :
                'bg-red-500'
              }`}></div>
              {socketStatus}
            </div>
            <button 
              onClick={() => setShowOrderPanel(!showOrderPanel)}
              className="text-gray-700"
            >
              <BsThreeDotsVertical size={20} />
            </button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mx-4 mt-2 rounded">
            {error}
          </div>
        )}

        {/* Socket Status for Desktop */}
        <div className="hidden lg:flex absolute top-4 right-4 z-10">
          <div className={`flex items-center text-xs px-2 py-1 rounded-full ${
            socketStatus === 'connected' ? 'bg-green-100 text-green-800' : 
            socketStatus === 'disconnected' ? 'bg-yellow-100 text-yellow-800' : 
            socketStatus === 'connecting' ? 'bg-blue-100 text-blue-800' :
            'bg-red-100 text-red-800'
          }`}>
            <div className={`w-2 h-2 rounded-full mr-1 ${
              socketStatus === 'connected' ? 'bg-green-500' : 
              socketStatus === 'disconnected' ? 'bg-yellow-500' : 
              socketStatus === 'connecting' ? 'bg-blue-500' :
              'bg-red-500'
            }`}></div>
            {socketStatus}
            {socketStatus === 'error' && (
              <button 
                onClick={retrySocketConnection}
                className="ml-2 text-xs underline"
              >
                Retry
              </button>
            )}
          </div>
          {(isCallInProgress || isCallActive) && (
            <div className="flex items-center text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 ml-2">
              <FaPhone className="mr-1" />
              Call in Progress
            </div>
          )}
        </div>

        {/* Left Sidebar - Conversations */}
        <div className={`${showMobileMenu ? "block" : "hidden"} lg:block w-full lg:w-1/3 xl:w-1/4 border-r bg-white p-4 overflow-y-auto`}>
          <div className="sticky top-0 bg-white pb-4 z-10">
            <div className="relative mb-4">
              <FiSearch className="absolute top-3 left-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-1">
            {safeConversations.length > 0 ? (
              safeConversations.map((conversation) => (
                <div
                  key={conversation._id}
                  onClick={() => {
                    setActiveConversation(conversation);
                    markAsRead(conversation._id);
                    loadMessages(conversation._id);
                    setShowMobileMenu(false);
                  }}
                  className={`flex items-center p-3 rounded-xl cursor-pointer transition-all ${
                    activeConversation && activeConversation._id === conversation._id
                      ? "bg-[#708238]/10 border border-[#708238]/20"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="relative">
                    {getBuyerImage(conversation) ? (
                      <img 
                        src={getBuyerImage(conversation)} 
                        alt={getBuyerName(conversation)}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : null}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold text-lg">
                      {getBuyerName(conversation).charAt(0).toUpperCase()}
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#FFA500] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-semibold text-gray-800 truncate">
                        {getBuyerName(conversation)}
                      </h4>
                      <span className="text-xs text-gray-400">
                        {conversation.lastMessageAt ? 
                          new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                          : 'Now'
                        }
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 truncate">
                      {conversation.lastMessage || 'New conversation'}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FaUserCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                <p>No conversations yet</p>
                <p className="text-sm text-gray-400 mt-1">When buyers contact you, conversations will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="border-b p-4 flex justify-between items-center bg-white sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                  {getBuyerImage(activeConversation) ? (
                    <img 
                      src={getBuyerImage(activeConversation)} 
                      alt={getBuyerName(activeConversation)}
                      className="w-10 h-10 rounded-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold">
                    {getBuyerName(activeConversation).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {getBuyerName(activeConversation)}
                    </h3>
                    <div className="flex items-center">
                      <BsStarFill className="text-[#FFA500] text-xs mr-1" />
                      <span className="text-xs text-gray-500">Active buyer</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  {/* Custom Offer Button */}
                  <button
                    onClick={() => setShowOfferModal(true)}
                    className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2"
                    title="Send Custom Offer"
                  >
                    <FiDollarSign />
                    <span>Send Offer</span>
                  </button>

                  {/* Call Buttons */}
                  <button
                    onClick={() => handleStartCall('audio')}
                    className="text-green-600 hover:text-green-700 p-2 rounded-full hover:bg-green-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Audio Call"
                    disabled={isCallInProgress || isCallActive}
                  >
                    <FaPhone />
                  </button>
                  <button
                    onClick={() => handleStartCall('video')}
                    className="text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Video Call"
                    disabled={isCallInProgress || isCallActive}
                  >
                    <FaVideo />
                  </button>
                  
                  <button 
                    onClick={() => setShowOrderPanel(!showOrderPanel)}
                    className="text-gray-500 hover:text-[#708238] lg:hidden"
                  >
                    <BsThreeDotsVertical />
                  </button>
                  <button className="text-gray-500 hover:text-[#708238] hidden lg:block">
                    <BsThreeDotsVertical />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-[#f9fbf7]">
                {messages.length > 0 ? (
                  messages.map((msg, idx) => (
                    <div
                      key={msg._id || idx}
                      className={`flex ${
                        msg.sender?._id === user?.id ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] md:max-w-[70%] lg:max-w-[60%] ${
                          msg.sender?._id === user?.id ? "text-right" : "text-left"
                        }`}
                      >
                        <div className="flex items-center mb-1 space-x-2">
                          {msg.sender?._id !== user?.id && (
                            <span className="text-xs font-medium text-gray-700">
                              {msg.sender?.name || getBuyerName(activeConversation)}
                            </span>
                          )}
                          <span className="text-xs text-gray-400">
                            {msg.createdAt ? 
                              new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                              : 'Now'
                            }
                          </span>
                          {msg.sender?._id === user?.id && msg.isRead && (
                            <IoCheckmarkDone className="text-xs text-[#708238]" />
                          )}
                        </div>
                        
                        {/* Render offer message differently */}
                        {msg.type === 'offer' || msg.offer ? (
                          <OfferMessage 
                            offer={msg.offer || msg}
                            currentUser={user}
                            onAccept={(offerId) => handleOfferAction(offerId, 'accept')}
                            onReject={(offerId) => handleOfferAction(offerId, 'reject')}
                            onPay={handleOfferPayment}
                          />
                        ) : (
                          <div
                            className={`px-4 py-3 rounded-2xl ${
                              msg.sender?._id === user?.id
                                ? "bg-[#708238] text-white"
                                : "bg-white text-gray-800 border border-gray-200"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No messages yet</p>
                    <p className="text-sm text-gray-400 mt-1">Start a conversation with {getBuyerName(activeConversation)}</p>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="border-t p-4 bg-white sticky bottom-0">
                <div className="flex items-center gap-2">
                  <button className="text-gray-500 hover:text-[#708238] p-2 rounded-full hover:bg-gray-100">
                    <FiPaperclip className="text-xl" />
                  </button>
                  <button className="text-gray-500 hover:text-[#708238] p-2 rounded-full hover:bg-gray-100">
                    <FiSmile className="text-xl" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent text-sm"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!message || isSending}
                    className={`p-3 rounded-full ${
                      message && !isSending
                        ? "bg-[#708238] hover:bg-[#5a6a2d] text-white"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    } transition`}
                  >
                    {isSending ? <FaSpinner className="animate-spin" /> : <FiSend />}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#f9fbf7]">
              <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
                <p className="text-gray-500">Select a conversation from the list to start messaging</p>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel - Order Info */}
        {activeConversation && (
          <div className={`hidden lg:block w-1/4 border-l bg-white p-6 ${showOrderPanel ? "!block" : ""}`}>
            <div className="sticky top-0 space-y-6">
              <div className="flex justify-between items-center mb-4 lg:hidden">
                <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>
                <button 
                  onClick={() => setShowOrderPanel(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3 hidden lg:block">
                  Order Details
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Buyer</span>
                    <span className="text-sm font-semibold">{getBuyerName(activeConversation)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Status</span>
                    <span className="text-sm font-semibold text-[#708238]">
                      Active
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">Last Activity</span>
                    <span className="text-sm font-semibold">
                      {activeConversation.lastMessageAt ? 
                        new Date(activeConversation.lastMessageAt).toLocaleDateString()
                        : 'Today'
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Offers Section */}
              {offers.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Active Offers
                  </h3>
                  <div className="space-y-3">
                    {offers.slice(0, 3).map((offer) => (
                      <div key={offer._id} className="bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-sm font-semibold text-gray-800 truncate">
                            {offer.title}
                          </h4>
                          <span className="text-xs font-bold text-[#708238]">
                            ${offer.price}
                          </span>
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                          offer.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                          offer.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          offer.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {offer.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  About {getBuyerName(activeConversation)}
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> {getBuyerEmail(activeConversation)}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Member since:</span> {new Date().getFullYear()}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Avg. response time:</span> 1 hour
                  </p>
                </div>
              </div>

              <button className="w-full px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition">
                View Order Page
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Call Modal */}
      {isCallModalOpen && currentCall && (
        <CallModal
          call={currentCall}
          isIncoming={isIncomingCall}
          isActive={isCallActive}
          onAnswer={handleAnswerCall}
          onReject={handleRejectCall}
          onEnd={handleEndCall}
          onClose={handleCloseCallModal}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          localStream={localStream}
          remoteStream={remoteStream}
        />
      )}

      {/* Custom Offer Modal */}
      {activeConversation && (
        <CustomOfferModal
          isOpen={showOfferModal}
          onClose={() => setShowOfferModal(false)}
          buyer={activeConversation.buyer || { _id: getBuyerId(activeConversation), name: getBuyerName(activeConversation) }}
          onSendOffer={handleSendCustomOffer}
        />
      )}
    </SellerLayout>
  );
};

export default SellerMessages;