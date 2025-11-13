// frontend/src/services/socketService.js 
import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.connectionAttempts = 0;
    this.maxConnectionAttempts = 3;
  }

  connect(token) {
    return new Promise((resolve, reject) => {
      try {
        if (this.socket && this.isConnected) {
          console.log('✅ Socket already connected');
          resolve(this.socket);
          return;
        }

        // Prevent too many connection attempts
        if (this.connectionAttempts >= this.maxConnectionAttempts) {
          console.warn('⚠️ Max connection attempts reached');
          reject(new Error('Max connection attempts reached'));
          return;
        }

        console.log('🔌 Connecting to socket...');
        this.connectionAttempts++;

        this.socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000', {
          auth: { token },
          transports: ['websocket', 'polling'],
          timeout: 10000,
          reconnectionAttempts: 3,
          reconnectionDelay: 1000
        });

        const connectionTimeout = setTimeout(() => {
          reject(new Error('Socket connection timeout'));
        }, 8000);

        this.socket.on('connect', () => {
          clearTimeout(connectionTimeout);
          console.log('✅ Socket connected successfully:', this.socket.id);
          this.isConnected = true;
          this.connectionAttempts = 0;
          resolve(this.socket);
        });

        this.socket.on('disconnect', (reason) => {
          console.log('❌ Socket disconnected:', reason);
          this.isConnected = false;
        });

        this.socket.on('connect_error', (error) => {
          clearTimeout(connectionTimeout);
          console.error('❌ Socket connection error:', error);
          this.isConnected = false;
          reject(error);
        });

      } catch (error) {
        console.error('❌ Error connecting socket:', error);
        reject(error);
      }
    });
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
      this.connectionAttempts = 0;
      console.log('✅ Socket disconnected');
    }
  }

  // ----------------- Chat-related -----------------
  joinUser(userId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinUser', userId);
      console.log(`✅ Joined user room: ${userId}`);
      return true;
    } else {
      console.warn('⚠️ Socket not connected, cannot join user room');
      return false;
    }
  }

  joinConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('joinConversation', conversationId);
      console.log(`✅ Joined conversation room: ${conversationId}`);
      return true;
    } else {
      console.warn('⚠️ Socket not connected, cannot join conversation');
      return false;
    }
  }

  leaveConversation(conversationId) {
    if (this.socket && this.isConnected) {
      this.socket.emit('leaveConversation', conversationId);
      console.log(`✅ Left conversation room: ${conversationId}`);
    }
  }

  // Message events
  sendMessage(messageData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('sendMessage', messageData);
    }
  }

  onNewMessage(callback) {
    if (this.socket) {
      this.socket.on('newMessage', callback);
    }
  }

  offNewMessage() {
    if (this.socket) {
      this.socket.off('newMessage');
    }
  }

  onConversationUpdated(callback) {
    if (this.socket) {
      this.socket.on('conversationUpdated', callback);
    }
  }

  offConversationUpdated() {
    if (this.socket) {
      this.socket.off('conversationUpdated');
    }
  }

  onUserTyping(callback) {
    if (this.socket) {
      this.socket.on('userTyping', callback);
    }
  }

  offUserTyping() {
    if (this.socket) {
      this.socket.off('userTyping');
    }
  }

  emitTyping(conversationId, isTyping) {
    if (this.socket && this.isConnected) {
      this.socket.emit('typing', { conversationId, isTyping });
    }
  }

  // ----------------- Offer-related -----------------
  // ✅ ADDED: Missing onNewOffer and offNewOffer methods
  onNewOffer(callback) {
    if (this.socket) {
      this.socket.on('newOffer', callback);
      console.log('📡 Socket: newOffer listener added');
    }
  }

  offNewOffer() {
    if (this.socket) {
      this.socket.off('newOffer');
      console.log('📡 Socket: newOffer listener removed');
    }
  }

  emitNewOffer(offerData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('newOffer', offerData);
      console.log('📡 Socket: newOffer emitted', offerData);
    }
  }

  // Existing offer methods
  onOfferCreated(callback) {
    if (this.socket) {
      this.socket.on('offerCreated', callback);
    }
  }

  offOfferCreated() {
    if (this.socket) {
      this.socket.off('offerCreated');
    }
  }

  onOfferUpdated(callback) {
    if (this.socket) {
      this.socket.on('offerUpdated', callback);
    }
  }

  offOfferUpdated() {
    if (this.socket) {
      this.socket.off('offerUpdated');
    }
  }

  onOfferAccepted(callback) {
    if (this.socket) {
      this.socket.on('offerAccepted', callback);
    }
  }

  offOfferAccepted() {
    if (this.socket) {
      this.socket.off('offerAccepted');
    }
  }

  onOfferRejected(callback) {
    if (this.socket) {
      this.socket.on('offerRejected', callback);
    }
  }

  offOfferRejected() {
    if (this.socket) {
      this.socket.off('offerRejected');
    }
  }

  emitCreateOffer(offerData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('createOffer', offerData);
    }
  }

  emitAcceptOffer(offerData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('acceptOffer', offerData);
    }
  }

  emitRejectOffer(offerData) {
    if (this.socket && this.isConnected) {
      this.socket.emit('rejectOffer', offerData);
    }
  }

  // ----------------- Call-related -----------------
  onIncomingCall(callback) {
    if (this.socket) {
      this.socket.on('incomingCall', callback);
    }
  }

  offIncomingCall() {
    if (this.socket) {
      this.socket.off('incomingCall');
    }
  }

  onCallAnswered(callback) {
    if (this.socket) {
      this.socket.on('callAnswered', callback);
    }
  }

  offCallAnswered() {
    if (this.socket) {
      this.socket.off('callAnswered');
    }
  }

  onCallConnected(callback) {
    if (this.socket) {
      this.socket.on('callConnected', callback);
    }
  }

  offCallConnected() {
    if (this.socket) {
      this.socket.off('callConnected');
    }
  }

  onCallEnded(callback) {
    if (this.socket) {
      this.socket.on('callEnded', callback);
    }
  }

  offCallEnded() {
    if (this.socket) {
      this.socket.off('callEnded');
    }
  }

  onCallRejected(callback) {
    if (this.socket) {
      this.socket.on('callRejected', callback);
    }
  }

  offCallRejected() {
    if (this.socket) {
      this.socket.off('callRejected');
    }
  }

  onICECandidate(callback) {
    if (this.socket) {
      this.socket.on('iceCandidate', callback);
    }
  }

  offICECandidate() {
    if (this.socket) {
      this.socket.off('iceCandidate');
    }
  }

  // ADDED: Missing call event for ice-candidate (different naming)
  onIceCandidate(callback) {
    if (this.socket) {
      this.socket.on('ice-candidate', callback);
    }
  }

  offIceCandidate() {
    if (this.socket) {
      this.socket.off('ice-candidate');
    }
  }

  emitCallOffer(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('callOffer', data);
    }
  }

  emitCallAnswer(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('callAnswer', data);
    }
  }

  emitICECandidate(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('iceCandidate', data);
    }
  }

  // ADDED: Alternative ice-candidate emit method
  emitIceCandidate(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('ice-candidate', data);
    }
  }

  emitEndCall(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('endCall', data);
    }
  }

  emitRejectCall(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('rejectCall', data);
    }
  }

  // ADDED: Start call method
  emitStartCall(data) {
    if (this.socket && this.isConnected) {
      this.socket.emit('startCall', data);
    }
  }

  // ----------------- Payment-related -----------------
  // ADDED: Payment event listeners
  onPaymentSuccess(callback) {
    if (this.socket) {
      this.socket.on('paymentSuccess', callback);
    }
  }

  offPaymentSuccess() {
    if (this.socket) {
      this.socket.off('paymentSuccess');
    }
  }

  onPaymentFailed(callback) {
    if (this.socket) {
      this.socket.on('paymentFailed', callback);
    }
  }

  offPaymentFailed() {
    if (this.socket) {
      this.socket.off('paymentFailed');
    }
  }

  // ----------------- Notification-related -----------------
  // ADDED: Notification event listeners
  onNotification(callback) {
    if (this.socket) {
      this.socket.on('notification', callback);
    }
  }

  offNotification() {
    if (this.socket) {
      this.socket.off('notification');
    }
  }

  // ----------------- Connection Status -----------------
  getConnectionStatus() {
    return this.isConnected && this.socket?.connected;
  }

  getSocketId() {
    return this.socket?.id;
  }

  waitForConnection(timeout = 5000) {
    return new Promise((resolve, reject) => {
      if (this.isConnected && this.socket?.connected) {
        resolve(true);
        return;
      }

      const checkInterval = setInterval(() => {
        if (this.isConnected && this.socket?.connected) {
          clearInterval(checkInterval);
          resolve(true);
        }
      }, 100);

      setTimeout(() => {
        clearInterval(checkInterval);
        reject(new Error('Connection timeout'));
      }, timeout);
    });
  }

  // ----------------- Cleanup Methods -----------------
  // ADDED: Comprehensive cleanup method
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
      console.log('✅ Removed all socket listeners');
    }
  }

  // ADDED: Safe cleanup for specific events
  cleanupEventListeners() {
    const cleanupMethods = [
      'offNewMessage',
      'offConversationUpdated',
      'offUserTyping',
      'offNewOffer', // ✅ Added this
      'offOfferCreated',
      'offOfferUpdated',
      'offOfferAccepted',
      'offOfferRejected',
      'offIncomingCall',
      'offCallAnswered',
      'offCallConnected',
      'offCallEnded',
      'offCallRejected',
      'offICECandidate',
      'offIceCandidate',
      'offPaymentSuccess',
      'offPaymentFailed',
      'offNotification'
    ];

    cleanupMethods.forEach(method => {
      if (typeof this[method] === 'function') {
        this[method]();
      }
    });
  }
}

const socketService = new SocketService();
export default socketService;