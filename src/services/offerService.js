// frontend/src/services/offerService.js
import api from './api';

export const offerAPI = {
  // Create a new custom offer
  createOffer: async (offerData) => {
    try {
      console.log('📦 Creating offer:', offerData);
      const response = await api.post('/api/offers/create', offerData);
      console.log('✅ Offer created successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error creating offer:', error);
      throw new Error(error.response?.data?.error || 'Failed to create offer');
    }
  },

  // Get offers for a conversation
  getOffersByConversation: async (conversationId) => {
    try {
      console.log(`📦 Fetching offers for conversation: ${conversationId}`);
      const response = await api.get(`/api/offers/conversation/${conversationId}`);
      console.log('✅ Offers fetched successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching offers:', error);
      // Return empty array instead of throwing error for better UX
      return { data: { offers: [] } };
    }
  },

  // ✅ FIXED: Accept an offer - no userId in payload needed
  acceptOffer: async (offerId) => {
    try {
      console.log(`✅ Accepting offer: ${offerId}`);
      
      // ✅ FIXED: No payload needed - userId comes from auth token
      const response = await api.patch(`/api/offers/${offerId}/accept`);
      console.log('✅ Offer accepted successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error accepting offer:', error);
      
      // Enhanced error message
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.response?.data?.details || 
                          error.message || 
                          'Failed to accept offer';
      
      throw new Error(errorMessage);
    }
  },

  // ✅ FIXED: Reject an offer - no userId in payload needed
  rejectOffer: async (offerId) => {
    try {
      console.log(`❌ Rejecting offer: ${offerId}`);
      
      // ✅ FIXED: No payload needed - userId comes from auth token
      const response = await api.patch(`/api/offers/${offerId}/reject`);
      console.log('✅ Offer rejected successfully:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error rejecting offer:', error);
      
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          error.response?.data?.details || 
                          error.message || 
                          'Failed to reject offer';
      
      throw new Error(errorMessage);
    }
  },

  // Get offer details
  getOffer: async (offerId) => {
    try {
      console.log(`📋 Fetching offer details: ${offerId}`);
      const response = await api.get(`/api/offers/${offerId}`);
      console.log('✅ Offer details fetched:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching offer details:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch offer details');
    }
  },

  // Update offer status
  updateOfferStatus: async (offerId, status) => {
    try {
      console.log(`🔄 Updating offer ${offerId} status to: ${status}`);
      const response = await api.patch(`/api/offers/${offerId}/status`, { status });
      console.log('✅ Offer status updated:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error updating offer status:', error);
      throw new Error(error.response?.data?.error || 'Failed to update offer status');
    }
  },

  // Get user's offers (both as buyer and seller)
  getUserOffers: async (role = 'all') => {
    try {
      console.log(`👤 Fetching user offers with role: ${role}`);
      const response = await api.get(`/api/offers/user/offers?role=${role}`);
      console.log('✅ User offers fetched:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching user offers:', error);
      return { data: { offers: [] } };
    }
  },

  // Cancel an offer (seller only)
  cancelOffer: async (offerId) => {
    try {
      console.log(`🚫 Canceling offer: ${offerId}`);
      const response = await api.patch(`/api/offers/${offerId}/cancel`);
      console.log('✅ Offer canceled:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error canceling offer:', error);
      throw new Error(error.response?.data?.error || 'Failed to cancel offer');
    }
  }
};

export const paymentAPI = {
  // Create Stripe checkout session
  createCheckoutSession: async (paymentData) => {
    try {
      console.log('💳 Creating Stripe checkout session:', paymentData);
      const response = await api.post('/api/payments/create-checkout-session', paymentData);
      console.log('✅ Checkout session created:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error creating checkout session:', error);
      throw new Error(error.response?.data?.error || 'Failed to create payment session');
    }
  },

  // Get payment status
  getPaymentStatus: async (sessionId) => {
    try {
      console.log(`📊 Getting payment status for session: ${sessionId}`);
      const response = await api.get(`/api/payments/status/${sessionId}`);
      console.log('✅ Payment status fetched:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching payment status:', error);
      throw new Error(error.response?.data?.error || 'Failed to fetch payment status');
    }
  },

  // Get payment by offer ID
  getPaymentByOfferId: async (offerId) => {
    try {
      console.log(`💰 Getting payment for offer: ${offerId}`);
      const response = await api.get(`/api/payments/offer/${offerId}`);
      console.log('✅ Payment details fetched:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching payment by offer ID:', error);
      // Return null instead of throwing for better UX
      return { data: { payment: null } };
    }
  },

  // Get user payments
  getUserPayments: async (role = 'buyer', page = 1, limit = 10) => {
    try {
      console.log(`👤 Fetching user payments as ${role}`);
      const response = await api.get(`/api/payments/user-payments?role=${role}&page=${page}&limit=${limit}`);
      console.log('✅ User payments fetched:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error fetching user payments:', error);
      return { data: { payments: [], pagination: {} } };
    }
  },

  // Refund payment
  refundPayment: async (paymentId, reason = 'requested_by_customer') => {
    try {
      console.log(`🔄 Refunding payment: ${paymentId}`);
      const response = await api.post(`/api/payments/refund/${paymentId}`, { reason });
      console.log('✅ Payment refunded:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error refunding payment:', error);
      throw new Error(error.response?.data?.error || 'Failed to process refund');
    }
  },

  // Verify payment webhook (for client-side verification)
  verifyPayment: async (paymentIntentId) => {
    try {
      console.log(`🔍 Verifying payment: ${paymentIntentId}`);
      const response = await api.post('/api/payments/verify', { paymentIntentId });
      console.log('✅ Payment verified:', response.data);
      return response;
    } catch (error) {
      console.error('❌ Error verifying payment:', error);
      throw new Error(error.response?.data?.error || 'Failed to verify payment');
    }
  }
};

// Utility functions for offer management
export const offerUtils = {
  // Check if offer can be accepted
  canAcceptOffer: (offer) => {
    return offer.status === 'sent' && !offer.isExpired;
  },

  // Check if offer can be paid
  canPayOffer: (offer) => {
    return offer.status === 'accepted';
  },

  // Check if offer can be canceled
  canCancelOffer: (offer, currentUserId) => {
    const isSeller = offer.sellerId?._id === currentUserId || offer.sellerId === currentUserId;
    return isSeller && ['sent', 'accepted'].includes(offer.status);
  },

  // Format offer price with currency
  formatOfferPrice: (offer) => {
    const price = offer.price || 0;
    const currency = offer.currency || 'usd';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  },

  // Calculate offer expiry date
  getExpiryDate: (offer) => {
    const createdAt = new Date(offer.createdAt);
    const expiresAt = new Date(offer.expiresAt);
    return expiresAt > createdAt ? expiresAt : new Date(createdAt.getTime() + 7 * 24 * 60 * 60 * 1000); // Default 7 days
  },

  // Check if offer is expired
  isOfferExpired: (offer) => {
    const expiryDate = offerUtils.getExpiryDate(offer);
    return new Date() > expiryDate;
  },

  // Get offer status color
  getStatusColor: (status) => {
    const colors = {
      draft: 'gray',
      sent: 'blue',
      accepted: 'green',
      rejected: 'red',
      paid: 'purple',
      in_progress: 'yellow',
      delivered: 'orange',
      completed: 'green',
      cancelled: 'red',
      disputed: 'red'
    };
    return colors[status] || 'gray';
  },

  // Get offer status text
  getStatusText: (status) => {
    const texts = {
      draft: 'Draft',
      sent: 'Pending Acceptance',
      accepted: 'Accepted - Ready for Payment',
      rejected: 'Rejected',
      paid: 'Paid - Work in Progress',
      in_progress: 'Work in Progress',
      delivered: 'Delivered - Pending Review',
      completed: 'Completed',
      cancelled: 'Cancelled',
      disputed: 'Under Dispute'
    };
    return texts[status] || status;
  }
};

// For backward compatibility
export default { offerAPI, paymentAPI, offerUtils };