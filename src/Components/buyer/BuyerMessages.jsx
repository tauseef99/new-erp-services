// frontend/src/components/BuyerMessages.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaPaperclip, FaSmile, FaPaperPlane, FaEllipsisV, FaStar, FaCheck, FaCheckDouble, FaClock, FaTrash, FaArchive, FaSpinner, FaUserCircle, FaTimes, FaPhone, FaVideo, FaDollarSign, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import BuyerNavbar from './BuyerNavbar';
import { messageAPI } from '../../services/messageService';
import { offerAPI, paymentAPI } from '../../services/offerService';
import { jwtDecode } from "jwt-decode"; 
import socketService from "../../services/socketService";
import CallModal from '../CallModal.jsx';
import useWebRTC from '../../hooks/useWebRTC.js';
import OfferMessage from '../common/OfferMessage';

const BuyerMessages = () => {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  
  // State management
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [socketStatus, setSocketStatus] = useState('disconnected');
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [processingSeller, setProcessingSeller] = useState(false);
  
  // Offer-related states
  const [offers, setOffers] = useState([]);
  const [isLoadingOffers, setIsLoadingOffers] = useState(false);
  const [processingOffer, setProcessingOffer] = useState(null);
  
  // Call-related states
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [currentCall, setCurrentCall] = useState(null);
  const [isIncomingCall, setIsIncomingCall] = useState(false);
  
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

  // Initialize
  useEffect(() => {
    const initializeChat = async () => {
      try {
        console.log('🔧 Initializing chat...');
        
        // Get token and validate
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('❌ No token found, redirecting to login');
          navigate('/login');
          return;
        }

        const decoded = jwtDecode(token);
        console.log('👤 User decoded:', decoded);
        setUser(decoded);
        userRef.current = decoded;

        // 1. Connect to socket with better error handling
        try {
          console.log('🔌 Attempting socket connection...');
          await socketService.connect(token);
          setSocketStatus('connected');
          
          // Join user room after successful connection
          if (socketService.joinUser(decoded.id)) {
            console.log('✅ Socket connected and user joined');
          }
        } catch (socketError) {
          console.error('❌ Socket connection failed:', socketError);
          setSocketStatus('error');
        }

        // 2. Set up socket listeners
        socketService.onNewMessage(handleNewMessage);
        socketService.onConversationUpdated(handleConversationUpdated);
        socketService.onUserTyping(handleUserTyping);
        
        // ✅ FIXED: Add listener for new offers
        socketService.onNewOffer(handleNewOffer);
        
        // Call-related socket listeners
        socketService.onIncomingCall(handleIncomingCall);
        socketService.onCallAnswered(handleCallAnswered);
        socketService.onCallEnded(handleCallEnded);
        socketService.onCallRejected(handleCallRejected);
        socketService.onICECandidate(handleRemoteICECandidate);
        
        console.log('✅ All socket listeners set up');

        // 3. Load conversations
        await loadConversations();

        // 4. Handle selected seller AFTER everything is ready
        const storedSeller = localStorage.getItem('selectedSeller');
        if (storedSeller) {
          console.log('🛍️ Found selected seller in localStorage');
          const sellerData = JSON.parse(storedSeller);
          setSelectedSeller(sellerData);
          
          if (userRef.current) {
            console.log('👤 User data available via ref, processing seller immediately');
            handleSelectedSeller(sellerData);
            localStorage.removeItem('selectedSeller');
          } else {
            setTimeout(() => {
              if (userRef.current) {
                handleSelectedSeller(sellerData);
                localStorage.removeItem('selectedSeller');
              }
            }, 500);
          }
        }

      } catch (error) {
        console.error('❌ Error initializing chat:', error);
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
      socketService.offUserTyping();
      socketService.offNewOffer(); // ✅ Clean up offer listener
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
  }, [navigate]);

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
    console.log('📨 New message received via socket:', message);
    
    if (activeConversation && message.conversationId === activeConversation._id) {
      setMessages(prev => {
        if (prev.some(msg => msg._id === message._id)) return prev;
        return [...prev, message];
      });
      scrollToBottom();
    }
    
    setConversations(prev => 
      prev.map(conv => {
        if (conv._id === message.conversationId) {
          const isActive = activeConversation && activeConversation._id === conv._id;
          return { 
            ...conv, 
            lastMessage: message.message, 
            lastMessageAt: new Date(),
            unreadCount: isActive ? 0 : (conv.unreadCount || 0) + 1
          };
        }
        return conv;
      })
    );
  };

  // ✅ FIXED: Add handler for new offers via socket
  const handleNewOffer = (newOffer) => {
    console.log('📦 New offer received via socket:', newOffer);
    
    if (activeConversation && newOffer.conversationId === activeConversation._id) {
      console.log('🎯 New offer belongs to active conversation');
      
      // Add offer to offers list
      setOffers(prev => {
        const exists = prev.some(offer => offer._id === newOffer._id);
        if (exists) {
          console.log('🔄 Offer already exists, updating...');
          return prev.map(offer => offer._id === newOffer._id ? newOffer : offer);
        }
        console.log('🆕 Adding new offer to offers list');
        return [newOffer, ...prev];
      });
      
      // Add offer as message if it doesn't exist
      const offerMessage = {
        _id: `offer-msg-${newOffer._id}`,
        type: 'offer',
        offer: newOffer,
        sender: newOffer.sellerId,
        createdAt: newOffer.createdAt || new Date(),
        isRead: false,
        message: `New offer: ${newOffer.title} - $${newOffer.price}`
      };
      
      setMessages(prev => {
        const exists = prev.some(msg => 
          msg.type === 'offer' && msg.offer?._id === newOffer._id
        );
        if (exists) {
          console.log('🔄 Offer message already exists, updating...');
          return prev.map(msg => 
            msg.type === 'offer' && msg.offer?._id === newOffer._id 
              ? { ...msg, offer: newOffer } 
              : msg
          );
        }
        console.log('🆕 Adding new offer message to chat');
        return [...prev, offerMessage];
      });
      
      scrollToBottom();
      
      // Update conversation last message
      setConversations(prev => 
        prev.map(conv => 
          conv._id === activeConversation._id 
            ? { 
                ...conv, 
                lastMessage: `New offer: ${newOffer.title} - $${newOffer.price}`,
                lastMessageAt: new Date()
              }
            : conv
        )
      );
    }
  };

  const handleConversationUpdated = () => {
    console.log('🔄 Conversation updated, reloading conversations...');
    loadConversations();
  };

  const handleUserTyping = (data) => {
    console.log('✍️ User typing:', data);
  };

  // Call-related socket handlers
  const handleIncomingCall = (data) => {
    console.log('📞 Incoming call received:', data);
    setCurrentCall(data.call);
    setIsIncomingCall(true);
    setIsCallModalOpen(true);
  };

  const handleCallAnswered = (data) => {
    console.log('📞 Call answered by remote:', data);
  };

  const handleCallEnded = (data) => {
    console.log('📞 Call ended by remote:', data);
    setIsCallModalOpen(false);
    setCurrentCall(null);
    setIsIncomingCall(false);
  };

  const handleCallRejected = (data) => {
    console.log('📞 Call rejected by remote:', data);
    setIsCallModalOpen(false);
    setCurrentCall(null);
    setIsIncomingCall(false);
    alert('Call was rejected by the seller.');
  };

  const handleRemoteICECandidate = (data) => {
    console.log('❄️ Remote ICE candidate received:', data);
  };

  // Load conversations
  const loadConversations = async () => {
    try {
      console.log('📂 Loading conversations...');
      const response = await messageAPI.getUserConversations();
      console.log('✅ Conversations API response:', response);
      
      if (response.data && response.data.length > 0) {
        console.log(`✅ Loaded ${response.data.length} conversations:`, response.data);
        setConversations(response.data);
        
        const hasSelectedSeller = localStorage.getItem('selectedSeller') || selectedSeller;
        if (!activeConversation && !hasSelectedSeller && response.data.length > 0) {
          setActiveConversation(response.data[0]);
          await loadMessages(response.data[0]._id);
        }
      } else {
        console.log('ℹ️ No conversations found');
        setConversations([]);
      }
    } catch (error) {
      console.error('❌ Error loading conversations:', error);
      setConversations([]);
    }
  };

  // ✅ FIXED: Load REAL offers from backend
  const loadOffersForConversation = async (conversationId) => {
    if (!conversationId || conversationId.startsWith('demo-')) {
      console.log('🎭 Skipping offers load for demo conversation');
      return;
    }
    
    try {
      setIsLoadingOffers(true);
      console.log(`📦 Loading REAL offers for conversation: ${conversationId}`);
      
      const response = await offerAPI.getOffersByConversation(conversationId);
      console.log('✅ REAL Offers loaded from backend:', response.data);
      
      // ✅ FIXED: Handle the response structure correctly
      const offersData = response.data?.data || response.data || [];
      
      if (Array.isArray(offersData)) {
        console.log(`🎯 Found ${offersData.length} REAL offers:`, offersData.map(o => ({
          id: o._id,
          title: o.title,
          price: o.price,
          status: o.status,
          isDemo: o._id?.startsWith('demo-offer-') || false
        })));
        
        setOffers(offersData);
      } else {
        console.error('❌ Invalid offers data structure:', offersData);
        setOffers([]);
      }
    } catch (error) {
      console.error('❌ Error loading REAL offers:', error);
      setOffers([]);
    } finally {
      setIsLoadingOffers(false);
    }
  };

  // ✅ FIXED: Handle both real and demo offers
  const handleOfferAction = async (offerId, action) => {
    try {
      console.log(`=== 🚀 START ${action.toUpperCase()} OFFER FLOW ===`);
      console.log('📋 Offer Details:', {
        offerId: offerId,
        offerIdType: typeof offerId,
        isDemoOffer: offerId?.startsWith('demo-offer-'),
        user: {
          id: user?.id,
          email: user?.email,
          role: user?.role
        },
        action: action
      });

      // Validate required data
      if (!offerId) {
        console.error('❌ Missing offer ID');
        throw new Error('Offer ID is required');
      }

      if (!user?.id) {
        console.error('❌ Missing user authentication');
        throw new Error('User authentication required. Please log in again.');
      }

      // Check if this is a demo offer
      const isDemoOffer = offerId.startsWith('demo-offer-');
      
      if (isDemoOffer && action === 'accept') {
        console.log('🎭 Demo offer detected - cannot process payment');
        alert('This is a demo offer. Please ask the seller to send a real offer to proceed with payment.');
        return;
      }

      // Log the exact offer from state
      const currentOffer = offers.find(o => o._id === offerId);
      console.log('🔍 Current offer from state:', currentOffer);

      setProcessingOffer(offerId);
      
      let response;
      console.log(`📤 Making API call to ${action} offer...`);
      
      if (action === 'accept') {
        response = await offerAPI.acceptOffer(offerId);
        console.log('✅ Accept offer API response:', response.data);
        
        // ✅ FIXED: Handle payment session redirect properly
        const paymentSession = response.data?.paymentSession || response.data?.data?.paymentSession;
        console.log('💳 Payment session data:', paymentSession);
        
        if (paymentSession && paymentSession.url) {
          console.log('🔗 Redirecting to Stripe checkout:', paymentSession.url);
          alert('Redirecting to secure payment page...');
          window.location.href = paymentSession.url;
          return; // Exit early since we're redirecting
        } else {
          console.warn('⚠️ No payment session URL received');
          alert('Payment session created but no redirect URL. Please contact support.');
        }
      } else if (action === 'reject') {
        response = await offerAPI.rejectOffer(offerId);
        console.log('✅ Reject offer API response:', response.data);
      } else {
        throw new Error(`Unknown action: ${action}`);
      }

      // Handle different response structures
      const updatedOffer = response.data?.data || response.data?.offer || response.data;
      console.log('🔄 Updated offer data:', updatedOffer);

      if (!updatedOffer) {
        console.error('❌ No offer data received from server');
        throw new Error('No offer data received from server');
      }

      // Update local state
      console.log('🔄 Updating local state with new offer data...');
      setOffers(prev => 
        prev.map(offer => 
          offer._id === offerId ? updatedOffer : offer
        )
      );

      setMessages(prev => 
        prev.map(msg => 
          msg.type === 'offer' && msg.offer?._id === offerId 
            ? { ...msg, offer: updatedOffer }
            : msg
        )
      );

      // Show success message
      if (action === 'reject') {
        alert('✅ Offer rejected successfully!');
      } else if (action === 'accept') {
        alert('✅ Offer accepted! Processing payment...');
      }
      
      console.log(`=== ✅ SUCCESS ${action.toUpperCase()} OFFER FLOW ===`);
      return updatedOffer;

    } catch (error) {
      console.error(`=== ❌ ERROR ${action.toUpperCase()} OFFER FLOW ===`);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });
      
      // Enhanced error message
      let errorMessage = error.response?.data?.error || 
                        error.response?.data?.message || 
                        error.response?.data?.details || 
                        error.message || 
                        `Failed to ${action} offer`;
      
      // Special handling for demo offers
      if (error.response?.data?.isDemo) {
        errorMessage = "This is a demo offer. Please ask the seller to send a real offer to proceed with payment.";
      }
      
      console.error('🚨 Final error message:', errorMessage);
      alert(`Error: ${errorMessage}`);
      throw error;
    } finally {
      setProcessingOffer(null);
      console.log(`=== 🏁 END ${action.toUpperCase()} OFFER FLOW ===`);
    }
  };
  
  // Handle offer payment (manual payment trigger)
  const handleOfferPayment = async (offerId) => {
    try {
      console.log(`💳 Processing payment for offer: ${offerId}`);
      setProcessingOffer(offerId);
      
      const offer = offers.find(o => o._id === offerId);
      if (!offer) {
        throw new Error('Offer not found');
      }
      
      // Only create payment session for accepted offers
      if (offer.status !== 'accepted') {
        throw new Error('Offer must be accepted before payment');
      }
      
      // Create Stripe checkout session
      const paymentData = {
        amount: offer.price,
        currency: offer.currency || 'usd',
        offerId: offer._id,
        buyerId: user.id, // Make sure user.id is included
        sellerId: offer.sellerId._id,
        description: `Payment for: ${offer.title}`
      };
      
      console.log('💳 Creating checkout session:', paymentData);
      const response = await paymentAPI.createCheckoutSession(paymentData);
      
      if (response.data?.url || response.data?.session?.url) {
        // Redirect to Stripe Checkout
        const paymentUrl = response.data.url || response.data.session.url;
        console.log('🔗 Redirecting to payment:', paymentUrl);
        window.location.href = paymentUrl;
      } else {
        throw new Error('No checkout URL received');
      }
      
    } catch (error) {
      console.error('❌ Error processing payment:', error);
      alert('Failed to process payment. Please try again.');
      throw error;
    } finally {
      setProcessingOffer(null);
    }
  };

  // Handle selected seller from dashboard
  const handleSelectedSeller = async (seller) => {
    try {
      console.log('🔄 STARTING: Handling selected seller:', seller);
      setProcessingSeller(true);
      
      const currentUser = userRef.current;
      if (!currentUser || !currentUser.id) {
        throw new Error('User data missing');
      }

      const sellerId = seller.userId || seller._id;
      console.log(`💬 Creating conversation between buyer ${currentUser.id} and seller ${sellerId}`);

      if (!sellerId) {
        throw new Error('Seller ID missing');
      }

      // Check if conversation already exists
      const existingConversation = conversations.find(conv => 
        conv.seller?._id === sellerId || 
        conv.seller === sellerId ||
        (conv.participants && conv.participants.some(p => p._id === sellerId))
      );

      if (existingConversation) {
        console.log('✅ Existing conversation found:', existingConversation._id);
        setActiveConversation(existingConversation);
        await loadMessages(existingConversation._id);
        
        if (socketStatus === 'connected') {
          socketService.joinConversation(existingConversation._id);
        }
        
        setProcessingSeller(false);
        return;
      }

      // Create real conversation via API
      try {
        console.log('📞 Calling getOrCreateConversation API...');
        const response = await messageAPI.getOrCreateConversation(currentUser.id, sellerId);
        
        if (response.data && response.data._id) {
          const conversation = response.data;
          console.log('✅ Conversation created/retrieved:', conversation._id);
          
          setConversations(prev => {
            const exists = prev.some(c => c._id === conversation._id);
            if (exists) return prev;
            return [conversation, ...prev];
          });
          
          setActiveConversation(conversation);
          await loadMessages(conversation._id);
          
          if (socketStatus === 'connected') {
            socketService.joinConversation(conversation._id);
            console.log(`✅ Joined conversation room: ${conversation._id}`);
          }
          
          console.log('🎉 SUCCESS: Conversation created and ready for messaging!');
        } else {
          throw new Error('No conversation data returned');
        }
        
      } catch (apiError) {
        console.error('❌ API error creating conversation:', apiError);
        createDemoConversation(seller);
      }
    } catch (error) {
      console.error('❌ Error in handleSelectedSeller:', error);
      createDemoConversation(seller);
    } finally {
      setProcessingSeller(false);
    }
  };

  // Create demo conversation (fallback)
  const createDemoConversation = (seller) => {
    console.log('🎭 Creating demo conversation for:', seller);
    
    const sellerId = seller.userId || seller._id;
    const demoConversation = {
      _id: `demo-${sellerId}-${Date.now()}`,
      seller: {
        _id: sellerId,
        name: seller.name || seller.businessName || 'Unknown Seller',
        profileImage: seller.img || seller.profileImage,
        email: seller.email || `${seller.name?.toLowerCase().replace(/\s+/g, '')}@example.com`
      },
      lastMessage: `Started conversation about ${seller.title || seller.serviceTitle || 'services'}`,
      lastMessageAt: new Date(),
      unreadCount: 0,
      status: 'active',
      orderTitle: seller.title || seller.serviceTitle || 'New Project',
      isDemo: true
    };
    
    setConversations(prev => {
      const existing = prev.find(c => c.seller?._id === sellerId);
      if (existing) return prev;
      return [demoConversation, ...prev];
    });
    
    setActiveConversation(demoConversation);
    setMessages([{
      _id: `demo-msg-${Date.now()}`,
      sender: { 
        _id: sellerId, 
        name: seller.name || seller.businessName || 'Seller', 
        profileImage: seller.img || seller.profileImage 
      },
      message: `Hi! Thanks for reaching out about ${seller.title || seller.serviceTitle || 'my services'}. How can I help you today?`,
      createdAt: new Date(),
      isRead: true,
      isDemo: true
    }]);
    
    console.log('✅ Demo conversation created and active');
  };

  // ✅ FIXED: Load messages and transform REAL offers
  const loadMessages = async (conversationId) => {
    try {
      console.log(`💬 Loading messages for conversation: ${conversationId}`);
      
      if (conversationId.startsWith('demo-')) {
        console.log('🎭 Loading demo messages');
        setMessages([{
          _id: 'demo-msg-1',
          sender: activeConversation?.seller,
          message: 'Hi! Thanks for reaching out. How can I help you today?',
          createdAt: new Date(),
          isRead: true,
          isDemo: true
        }]);
        scrollToBottom();
        return;
      }

      const response = await messageAPI.getMessages(conversationId);
      console.log('✅ REAL Messages loaded:', response.data);
      
      const messagesData = response.data || [];
      
      // ✅ FIXED: Also load REAL offers and add them as offer messages
      try {
        const offersResponse = await offerAPI.getOffersByConversation(conversationId);
        const realOffers = offersResponse.data?.data || [];
        
        console.log(`🔄 Adding ${realOffers.length} REAL offers to messages`);
        
        // Create offer messages for each real offer
        const offerMessages = realOffers.map(offer => ({
          _id: `offer-msg-${offer._id}`,
          type: 'offer',
          offer: offer,
          sender: offer.sellerId,
          createdAt: offer.createdAt,
          isRead: false,
          message: `Custom Offer: ${offer.title} - $${offer.price}`
        }));
        
        // Combine regular messages with offer messages
        const allMessages = [...messagesData, ...offerMessages];
        
        // Sort by creation date
        allMessages.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        
        setMessages(allMessages);
      } catch (offerError) {
        console.error('❌ Error loading offers for messages:', offerError);
        setMessages(messagesData);
      }
      
      scrollToBottom();

      // Mark as read
      await messageAPI.markAsRead(conversationId);
    } catch (error) {
      console.error('❌ Error loading messages:', error);
      setMessages([]);
    }
  };

  // Add this function to your BuyerMessages.jsx
  const debugRealOffers = () => {
    console.log('=== 🔍 DEBUG REAL OFFERS ===');
    console.log('Active Conversation:', activeConversation);
    console.log('All Offers from State:', offers);
    console.log('All Messages from State:', messages);
    
    const realOffers = offers.filter(offer => !offer._id?.startsWith('demo-offer-'));
    const demoOffers = offers.filter(offer => offer._id?.startsWith('demo-offer-'));
    
    console.log(`Real Offers: ${realOffers.length}`, realOffers);
    console.log(`Demo Offers: ${demoOffers.length}`, demoOffers);
    console.log('=== 🏁 END DEBUG REAL OFFERS ===');
  };

  // Call this when offers or messages change
  useEffect(() => {
    if (offers.length > 0 || messages.length > 0) {
      debugRealOffers();
    }
  }, [offers, messages]);

  // Send message
  const handleSendMessage = async () => {
    if (newMessage.trim() === '' || !activeConversation) {
      return;
    }

    console.log('📤 Sending message...');
    setIsSending(true);
    
    const messageToSend = newMessage.trim();
    setNewMessage('');
    
    try {
      if (activeConversation._id.startsWith('demo-')) {
        console.log('🎭 Sending demo message');
        const newMsg = {
          _id: `msg-${Date.now()}`,
          sender: { _id: userRef.current.id, name: userRef.current.name || 'You', profileImage: userRef.current.profileImage },
          message: messageToSend,
          createdAt: new Date(),
          isRead: false,
          conversationId: activeConversation._id,
          isDemo: true
        };
        
        setMessages(prev => [...prev, newMsg]);
        scrollToBottom();
        
        setConversations(prev => 
          prev.map(conv => 
            conv._id === activeConversation._id 
              ? { ...conv, lastMessage: messageToSend, lastMessageAt: new Date() }
              : conv
          )
        );
        
        setTimeout(() => {
          const sellerResponse = {
            _id: `msg-${Date.now()}-response`,
            sender: { 
              _id: activeConversation.seller._id, 
              name: activeConversation.seller.name, 
              profileImage: activeConversation.seller.profileImage 
            },
            message: 'Thanks for your message! I will get back to you shortly.',
            createdAt: new Date(),
            isRead: false,
            conversationId: activeConversation._id,
            isDemo: true
          };
          setMessages(prev => [...prev, sellerResponse]);
          scrollToBottom();
        }, 2000);
      } else {
        const messageData = {
          conversationId: activeConversation._id,
          receiverId: activeConversation.seller._id,
          message: messageToSend
        };

        console.log('📡 Sending real message via API:', messageData);
        
        const response = await messageAPI.sendMessage(messageData);
        console.log('✅ Message sent successfully:', response.data);
        
        setMessages(prev => [...prev, response.data]);
        scrollToBottom();
        
        setConversations(prev => 
          prev.map(conv => 
            conv._id === activeConversation._id 
              ? { ...conv, lastMessage: messageToSend, lastMessageAt: new Date() }
              : conv
          )
        );
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      setNewMessage(messageToSend);
      alert('Failed to send message. Please check console for details.');
    } finally {
      setIsSending(false);
    }
  };

  // Call management functions - FIXED VERSION
  const handleStartCall = async (callType) => {
    if (!activeConversation || activeConversation._id.startsWith('demo-')) {
      alert('Cannot start calls in demo conversations');
      return;
    }

    if (isCallInProgress || isCallActive) {
      alert('A call is already in progress');
      return;
    }

    try {
      console.log(`📞 Starting ${callType} call...`);
      
      // Show call modal immediately to show "calling" state
      setIsCallModalOpen(true);
      setIsIncomingCall(false);
      
      const call = await startCall(activeConversation._id, callType);
      setCurrentCall(call);
      
      console.log('✅ Call initiated, waiting for answer...');
    } catch (error) {
      console.error('❌ Failed to start call:', error);
      setIsCallModalOpen(false);
      alert(`Failed to start ${callType} call: ${error.message}`);
    }
  };

  const handleAnswerCall = async (callType = 'audio') => {
    try {
      await answerCall(currentCall, callType);
      setIsIncomingCall(false);
    } catch (error) {
      console.error('❌ Error answering call:', error);
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
      console.error('❌ Failed to reject call:', error);
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
      if (!conversationId.startsWith('demo-')) {
        await messageAPI.markAsRead(conversationId);
      }
      setConversations(prev => 
        prev.map(conv => 
          conv._id === conversationId ? { ...conv, unreadCount: 0 } : conv
        )
      );
    } catch (error) {
      console.error('Error marking as read:', error);
    }
  };

  // Filter conversations
  const filteredConversations = conversations.filter(convo => 
    convo.seller?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (convo.orderTitle && convo.orderTitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Status badge component
  const getStatusBadge = (status) => {
    switch(status) {
      case 'active':
        return <span className="bg-[#708238]/20 text-[#708238] text-xs px-2 py-0.5 rounded-full">Active</span>;
      case 'archived':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Archived</span>;
      case 'completed':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded-full">Completed</span>;
      default:
        return null;
    }
  };

  // Manual retry functions
  const retrySellerProcessing = () => {
    if (selectedSeller) {
      console.log('🔄 Manually retrying seller processing:', selectedSeller.name);
      handleSelectedSeller(selectedSeller);
    }
  };

  const retrySocketConnection = async () => {
    try {
      setSocketStatus('connecting');
      const token = localStorage.getItem('token');
      await socketService.connect(token);
      setSocketStatus('connected');
      
      if (userRef.current) {
        socketService.joinUser(userRef.current.id);
      }
      
      if (activeConversation && !activeConversation._id.startsWith('demo-')) {
        socketService.joinConversation(activeConversation._id);
      }
    } catch (error) {
      console.error('❌ Failed to reconnect socket:', error);
      setSocketStatus('error');
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <BuyerNavbar />
        <div className="flex-1 flex items-center justify-center">
          <FaSpinner className="animate-spin text-4xl text-[#708238]" />
          <span className="ml-2">Loading messages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <BuyerNavbar />
      
      {/* Header with Socket Status */}
      <div className="bg-white shadow-sm py-4 px-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
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
            {processingSeller && (
              <div className="flex items-center text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                <FaSpinner className="animate-spin mr-1" />
                Creating conversation...
              </div>
            )}
            {(isCallInProgress || isCallActive) && (
              <div className="flex items-center text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                <FaPhone className="mr-1" />
                Call in Progress
              </div>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-64 px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button 
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition"
              onClick={() => navigate('/buyer/dashboard')}
            >
              Find More Sellers
            </button>
          </div>
          <button 
            className="md:hidden text-gray-500"
            onClick={() => setShowSearch(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mx-4 mt-4 rounded">
          {error} - Using demo data for testing
        </div>
      )}
      
      {/* Debug info */}
      <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 mx-4 mt-2 rounded text-xs">
        <strong>Debug Info:</strong> 
        User: {user?.id} | 
        Conversations: {conversations.length} | 
        Active: {activeConversation?._id} | 
        Socket: {socketStatus} |
        Seller: {selectedSeller?.name || 'None'} |
        Call: {isCallActive ? 'Active' : isCallInProgress ? 'In Progress' : 'None'} |
        Offers: {offers.length}
        {activeConversation?._id?.startsWith('demo-') && ' |  DEMO MODE'}
        <br />
        {selectedSeller && !activeConversation && (
          <button 
            onClick={retrySellerProcessing}
            className="mt-1 bg-green-500 text-white px-2 py-1 rounded text-xs"
          >
            🔄 Retry Seller Processing
          </button>
        )}
      </div>
      
      {/* Mobile Search Overlay */}
      {showSearch && (
        <div className="md:hidden fixed inset-0 bg-white z-20 p-4">
          <div className="flex items-center mb-4">
            <button 
              className="mr-3 text-gray-500"
              onClick={() => setShowSearch(false)}
            >
              <FaTimes />
            </button>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full px-4 py-2 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#708238]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              <FaSearch className="absolute right-3 top-2.5 text-gray-400" />
            </div>
          </div>
          <button 
            className="bg-[#708238] w-full hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-full text-sm font-medium transition"
            onClick={() => navigate('/buyer/dashboard')}
          >
            Find More Sellers
          </button>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Conversations Sidebar */}
        <div className="w-full md:w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between mb-4">
              <h2 className="font-semibold text-gray-700">All Conversations</h2>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {conversations.length} conversations
              </span>
            </div>
            
            {/* Conversation List */}
            <div className="space-y-1">
              {filteredConversations.map((conversation) => (
                <div 
                  key={conversation._id}
                  className={`p-3 rounded-lg cursor-pointer transition ${
                    activeConversation && activeConversation._id === conversation._id 
                      ? 'bg-[#708238]/10 border border-[#708238]/20' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveConversation(conversation);
                    markAsRead(conversation._id);
                    loadMessages(conversation._id);
                  }}
                >
                  <div className="flex items-start">
                    <div className="relative mr-3">
                      {conversation.seller?.profileImage ? (
                        <img 
                          src={conversation.seller.profileImage} 
                          alt={conversation.seller.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-800 truncate">
                          {conversation.seller?.name || 'Unknown Seller'}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">
                          {new Date(conversation.lastMessageAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                        {conversation.unreadCount > 0 && (
                          <span className="bg-[#FFA500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unreadCount}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-500 truncate">
                          {conversation.orderTitle || 'New Conversation'}
                        </span>
                        {getStatusBadge(conversation.status)}
                        {conversation._id.startsWith('demo-') && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Demo</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredConversations.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FaUserCircle className="text-4xl text-gray-300 mx-auto mb-3" />
                  <p>No conversations found</p>
                  {selectedSeller && (
                    <div className="mt-4 space-y-2">
                      <p className="text-sm text-gray-600">Trying to connect with: <strong>{selectedSeller.name}</strong></p>
                      <button 
                        onClick={retrySellerProcessing}
                        className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-md text-sm"
                      >
                        Retry Connection
                      </button>
                    </div>
                  )}
                  <button 
                    className="mt-4 bg-[#708238] hover:bg-[#5a6a2d] text-white px-4 py-2 rounded-md text-sm"
                    onClick={() => navigate('/buyer/dashboard')}
                  >
                    Start a Conversation
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Chat Area */}
        <div className="hidden md:flex flex-col w-2/3">
          {activeConversation ? (
            <>
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      {activeConversation.seller?.profileImage ? (
                        <img 
                          src={activeConversation.seller.profileImage} 
                          alt={activeConversation.seller.name} 
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10 flex items-center justify-center">
                          <FaUserCircle className="text-gray-400 text-xl" />
                        </div>
                      )}
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h2 className="font-bold text-gray-800">{activeConversation.seller?.name || 'Unknown Seller'}</h2>
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <span>Online</span>
                        <span className="mx-1">•</span>
                        <div className="flex items-center">
                          <FaStar className="text-[#FFA500] mr-1" />
                          <span>4.9 (128 reviews)</span>
                        </div>
                        {activeConversation._id.startsWith('demo-') && (
                          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs ml-2">Demo Conversation</span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* Call Buttons */}
                    {!activeConversation._id.startsWith('demo-') && (
                      <>
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
                      </>
                    )}
                    
                    <div className="relative">
                      <button 
                        className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
                        onClick={() => setShowDropdown(!showDropdown)}
                      >
                        <FaEllipsisV />
                      </button>
                      
                      {showDropdown && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:text-[#FFA500]">
                            <FaArchive className="mr-2 text-gray-500" /> Archive
                          </button>
                          <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left hover:text-red-500">
                            <FaTrash className="mr-2 text-gray-500" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                  {/* Order Info Banner */}
                  <div className="bg-white rounded-lg border border-gray-200 p-4 mb-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-gray-800">
                        {activeConversation.orderTitle || 'New Project Discussion'}
                      </h3>
                      <div className="flex items-center mt-1 text-sm">
                        <span className="text-gray-600">Started conversation</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="font-medium text-[#FFA500]">Active</span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="text-sm font-medium text-[#708238] hover:text-[#5a6a2d] px-3 py-1 rounded-md hover:bg-[#708238]/10">
                        View Profile
                      </button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message._id} 
                        className={`flex ${message.sender?._id === user?.id ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className="flex items-end space-x-2">
                          {message.sender?._id !== user?.id && (
                            <div className="mb-1">
                              {message.sender?.profileImage ? (
                                <img 
                                  src={message.sender.profileImage} 
                                  alt="avatar" 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 flex items-center justify-center">
                                  <FaUserCircle className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          )}
                          
                          {/* Render offer message differently */}
                          {message.type === 'offer' ? (
                            <OfferMessage 
                              offer={message.offer}
                              currentUser={user}
                              onAccept={(offerId) => handleOfferAction(offerId, 'accept')}
                              onReject={(offerId) => handleOfferAction(offerId, 'reject')}
                              onPay={handleOfferPayment}
                              isProcessing={processingOffer === message.offer._id}
                            />
                          ) : (
                            <div 
                              className={`max-w-md rounded-2xl px-4 py-3 ${
                                message.sender?._id === user?.id 
                                  ? 'bg-[#708238] text-white rounded-br-none' 
                                  : 'bg-white text-gray-800 rounded-bl-none border border-gray-200'
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                              <div className={`flex items-center text-xs mt-2 ${
                                message.sender?._id === user?.id ? 'text-[#FFA500]' : 'text-gray-500'
                              }`}>
                                <span>{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                {message.sender?._id === user?.id && (
                                  <span className="ml-2">
                                    {message.isRead ? <FaCheckDouble className="text-[#FFA500]" /> : <FaCheck className="text-current" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
              </div>
              
              {/* Message Input */}
              <div className="bg-white border-t border-gray-200 p-4">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-end border border-gray-300 rounded-lg bg-white px-3">
                    <div className="flex py-2 space-x-2">
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                        <FaPaperclip />
                      </button>
                      <button className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100">
                        <FaSmile />
                      </button>
                    </div>
                    
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      className="flex-1 py-3 px-2 resize-none focus:outline-none text-sm max-h-32"
                      rows={1}
                    />
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={newMessage.trim() === '' || isSending}
                      className={`m-2 p-3 rounded-full ${
                        newMessage.trim() === '' || isSending
                          ? 'bg-gray-200 text-gray-400' 
                          : 'bg-[#708238] hover:bg-[#5a6a2d] text-white'
                      }`}
                    >
                      {isSending ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaPaperPlane />
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500 flex justify-between">
                    <span>Press Enter to send</span>
                    <span>Shift + Enter for a new line</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <FaUserCircle className="text-gray-400 text-3xl" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
                <p className="text-gray-500 mb-6">Select a conversation from the list to start messaging</p>
                {selectedSeller && (
                  <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      Trying to connect with: <strong>{selectedSeller.name}</strong>
                    </p>
                    <button 
                      onClick={retrySellerProcessing}
                      className="mt-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm"
                    >
                      Retry Connection
                    </button>
                  </div>
                )}
                <button 
                  className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium"
                  onClick={() => navigate('/buyer/dashboard')}
                >
                  Find Sellers to Message
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Empty State for Mobile */}
        <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50 p-8">
          <div className="text-center">
            <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <FaUserCircle className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No conversation selected</h3>
            <p className="text-gray-500 mb-6">Select a conversation from the list to start messaging</p>
            <button 
              className="bg-[#708238] hover:bg-[#5a6a2d] text-white px-5 py-2 rounded-md text-sm font-medium"
              onClick={() => navigate('/buyer/dashboard')}
            >
              Start New Chat
            </button>
          </div>
        </div>
      </div>

      {/* Call Modal */}
      {isCallModalOpen && currentCall && (
        <CallModal
          call={currentCall}
          isIncoming={isIncomingCall}
          isActive={isCallActive}
          onAnswer={handleAnswerCall}
          onReject={handleCallRejected}
          onEnd={handleEndCall}
          onClose={handleCloseCallModal}
          localVideoRef={localVideoRef}
          remoteVideoRef={remoteVideoRef}
          localStream={localStream}
          remoteStream={remoteStream}
        />
      )}
    </div>
  );
};

export default BuyerMessages;