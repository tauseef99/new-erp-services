// frontend/src/components/common/OfferMessage.jsx
import React from 'react';
import { FaDollarSign, FaClock, FaCheck, FaTimes, FaCreditCard, FaExclamationTriangle, FaSpinner, FaArrowRight, FaInfoCircle } from 'react-icons/fa';

const OfferMessage = ({ offer, currentUser, onAccept, onReject, onPay, isProcessing }) => {
  const isBuyer = currentUser?.role === 'buyer' || !offer.sellerId?._id;
  const isDemoOffer = offer._id?.startsWith('demo-offer-') || offer.isDemo;
  const canAccept = isBuyer && offer.status === 'sent' && !isDemoOffer;
  const canPay = isBuyer && offer.status === 'accepted' && !isDemoOffer;
  const hasPendingPayment = isBuyer && offer.status === 'accepted' && offer.paymentSessionId && !isDemoOffer;
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'sent': return 'Pending Acceptance';
      case 'accepted': return 'Accepted - Ready for Payment';
      case 'rejected': return 'Rejected';
      case 'paid': return 'Paid - Work in Progress';
      case 'in_progress': return 'Work in Progress';
      case 'completed': return 'Completed';
      default: return status;
    }
  };

  // Format price with proper currency
  const formatPrice = (price, currency = 'usd') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(price);
  };

  // Handle offer actions with demo offer check
  const handleAccept = () => {
    if (isDemoOffer) {
      alert('This is a demo offer. Please ask the seller to send a real offer to proceed with payment.');
      return;
    }
    onAccept(offer._id);
  };

  const handleReject = () => {
    if (isDemoOffer) {
      // For demo offers, we can still "reject" them locally
      alert('Demo offer rejected. Ask the seller to send a real offer.');
      return;
    }
    onReject(offer._id);
  };

  const handlePay = () => {
    if (isDemoOffer) {
      alert('This is a demo offer. Please ask the seller to send a real offer to proceed with payment.');
      return;
    }
    onPay(offer._id);
  };

  return (
    <div className={`border-2 rounded-xl p-4 max-w-md shadow-sm ${
      isDemoOffer 
        ? 'bg-yellow-50 border-yellow-200' 
        : 'bg-white border-[#708238]/20'
    }`}>
      {/* Demo Offer Warning */}
      {isDemoOffer && (
        <div className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg">
          <div className="flex items-center">
            <FaInfoCircle className="text-yellow-600 mr-2" />
            <span className="text-yellow-800 font-medium text-sm">Demo Offer</span>
          </div>
          <p className="text-yellow-700 text-xs mt-1">
            This is a demo offer. Ask the seller to send a real offer to proceed with payment.
          </p>
        </div>
      )}

      {/* Offer Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-800 text-lg">{offer.title}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(offer.status)}`}>
              {getStatusText(offer.status)}
            </div>
            {isDemoOffer && (
              <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                Demo
              </div>
            )}
          </div>
        </div>
        <div className="text-right">
          <div className={`text-2xl font-bold ${
            isDemoOffer ? 'text-gray-500' : 'text-[#708238]'
          }`}>
            {formatPrice(offer.price, offer.currency)}
          </div>
          <div className="text-xs text-gray-500">{offer.currency?.toUpperCase() || 'USD'}</div>
        </div>
      </div>

      {/* Offer Details */}
      <div className="space-y-2 mb-4">
        <p className="text-sm text-gray-600">{offer.description}</p>
        
        <div className="flex items-center text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{offer.deliveryTime || offer.deliveryDays} days delivery</span>
          </div>
          <div className="flex items-center">
            <FaDollarSign className="mr-1" />
            <span>{offer.revisions === 99 ? 'Unlimited' : (offer.revisions || 1)} revisions</span>
          </div>
        </div>

        {/* Requirements */}
        {offer.requirements && offer.requirements.length > 0 && offer.requirements[0] !== '' && (
          <div className="mt-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Requirements:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {offer.requirements.slice(0, 3).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
              {offer.requirements.length > 3 && (
                <li className="text-gray-400">+{offer.requirements.length - 3} more</li>
              )}
            </ul>
          </div>
        )}

        {/* Inclusions */}
        {offer.inclusions && offer.inclusions.length > 0 && offer.inclusions[0] !== '' && (
          <div className="mt-2">
            <h4 className="text-xs font-semibold text-gray-700 mb-1">Includes:</h4>
            <ul className="text-xs text-gray-600 list-disc list-inside">
              {offer.inclusions.slice(0, 3).map((inc, index) => (
                <li key={index}>{inc}</li>
              ))}
              {offer.inclusions.length > 3 && (
                <li className="text-gray-400">+{offer.inclusions.length - 3} more</li>
              )}
            </ul>
          </div>
        )}
      </div>

      {/* ✅ FIXED: Action Buttons with Demo Offer Handling */}
      {isBuyer && (
        <div className="flex space-x-2">
          {canAccept && (
            <>
              <button
                onClick={handleAccept}
                disabled={isProcessing || isDemoOffer}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center ${
                  isDemoOffer 
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                    : 'bg-[#708238] hover:bg-[#5a6a2d] text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <FaSpinner className="animate-spin mr-2" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Accept & Pay
                  </>
                )}
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center ${
                  isDemoOffer
                    ? 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                    : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                <FaTimes className="mr-2" />
                {isDemoOffer ? 'Ignore Demo' : 'Reject'}
              </button>
            </>
          )}
          
          {/* Show payment button for accepted offers without session */}
          {canPay && !hasPendingPayment && (
            <button
              onClick={handlePay}
              disabled={isProcessing || isDemoOffer}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition disabled:opacity-50 flex items-center justify-center ${
                isDemoOffer
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-[#FFA500] hover:bg-[#e59400] text-white'
              }`}
            >
              {isProcessing ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <FaCreditCard className="mr-2" />
                  Pay Now
                </>
              )}
            </button>
          )}

          {/* Show pending payment status */}
          {hasPendingPayment && (
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition flex items-center justify-center"
            >
              <FaArrowRight className="mr-2" />
              Complete Payment
            </button>
          )}

          {/* Demo offer message */}
          {isDemoOffer && offer.status === 'sent' && (
            <div className="flex-1 bg-gray-100 text-gray-600 py-2 px-4 rounded-lg text-sm text-center">
              <FaInfoCircle className="inline mr-2" />
              Demo - Ask for Real Offer
            </div>
          )}

          {offer.status === 'paid' && (
            <div className="flex-1 bg-green-100 text-green-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaCheck className="inline mr-2" />
              Payment Complete
            </div>
          )}

          {offer.status === 'rejected' && (
            <div className="flex-1 bg-red-100 text-red-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaTimes className="inline mr-2" />
              {isDemoOffer ? 'Demo Rejected' : 'Offer Rejected'}
            </div>
          )}

          {offer.status === 'in_progress' && (
            <div className="flex-1 bg-yellow-100 text-yellow-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaExclamationTriangle className="inline mr-2" />
              Work in Progress
            </div>
          )}

          {offer.status === 'completed' && (
            <div className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg text-sm font-medium text-center">
              <FaCheck className="inline mr-2" />
              Completed
            </div>
          )}
        </div>
      )}

      {!isBuyer && offer.status === 'sent' && (
        <div className="text-xs text-gray-500 text-center py-2">
          {isDemoOffer ? 'Demo offer - Send a real offer for payment' : 'Waiting for buyer\'s response...'}
        </div>
      )}

      {/* Offer Metadata */}
      <div className="mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex justify-between">
          <span>
            {isDemoOffer ? 'Demo ID: ' : 'Offer ID: '}
            {offer._id?.substring(0, 8)}...
          </span>
          <span>Sent: {new Date(offer.createdAt).toLocaleDateString()}</span>
        </div>
        
        {offer.paymentSessionId && !isDemoOffer && (
          <div className="mt-1 text-blue-600">
            Payment session: {offer.paymentSessionId.substring(0, 8)}...
          </div>
        )}

        {/* Real vs Demo indicator */}
        <div className="mt-1">
          {isDemoOffer ? (
            <span className="text-yellow-600">⚠️ This is a demo offer for testing</span>
          ) : (
            <span className="text-green-600">✅ Real offer - Ready for payment</span>
          )}
        </div>

        {/* Seller info for buyers */}
        {isBuyer && offer.sellerId && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <span className="font-medium">From: </span>
            {offer.sellerId.name || offer.sellerId.username || 'Seller'}
          </div>
        )}
      </div>

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-xs">
          <div className="font-medium text-blue-800">Debug Info:</div>
          <div>ID: {offer._id}</div>
          <div>Type: {isDemoOffer ? 'Demo Offer' : 'Real Offer'}</div>
          <div>Buyer: {isBuyer ? 'Yes' : 'No'}</div>
          <div>Status: {offer.status}</div>
          <div>Can Accept: {canAccept ? 'Yes' : 'No'}</div>
        </div>
      )}
    </div>
  );
};

export default OfferMessage;