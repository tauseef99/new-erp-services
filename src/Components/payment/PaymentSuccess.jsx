// frontend/src/components/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { paymentAPI, offerAPI } from '../../services/offerService';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const sessionId = searchParams.get('session_id');
        const offerId = searchParams.get('offer_id');
        
        console.log('🔍 Verifying payment...', { sessionId, offerId });
        
        if (!sessionId) {
          throw new Error('No session ID provided');
        }

        // Verify payment status with Stripe
        const paymentResponse = await paymentAPI.getPaymentStatus(sessionId);
        setPaymentStatus(paymentResponse.data);

        // Update offer status to paid if payment is successful
        if (paymentResponse.data.status === 'complete' && offerId) {
          try {
            await offerAPI.updateOfferStatus(offerId, 'paid');
            console.log('✅ Offer status updated to paid');
          } catch (updateError) {
            console.error('❌ Failed to update offer status:', updateError);
            // Continue even if status update fails
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('❌ Error verifying payment:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-[#708238] mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Verifying your payment...</h2>
          <p className="text-gray-600 mt-2">Please wait while we confirm your payment details.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <FaExclamationTriangle className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Verification Issue</h1>
          <p className="text-gray-600 mb-6">
            {error || 'There was an issue verifying your payment. Please contact support.'}
          </p>
          
          <div className="space-y-3">
            <button
              onClick={() => navigate('/buyer/messages')}
              className="w-full bg-[#708238] hover:bg-[#5a6a2d] text-white py-3 rounded-lg font-medium transition"
            >
              Return to Messages
            </button>
            <button
              onClick={() => navigate('/support')}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaCheckCircle className="text-6xl text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your payment. The seller has been notified and will start working on your order.
        </p>
        
        {paymentStatus && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Details:</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Amount:</span>
                <span className="font-semibold">
                  ${(paymentStatus.amount_total / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Status:</span>
                <span className="text-green-600 font-semibold">
                  {paymentStatus.payment_status === 'paid' ? 'Completed' : paymentStatus.payment_status}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Payment ID:</span>
                <span className="font-mono text-xs">
                  {paymentStatus.id.substring(0, 8)}...
                </span>
              </div>
            </div>
          </div>
        )}
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/buyer/messages')}
            className="w-full bg-[#708238] hover:bg-[#5a6a2d] text-white py-3 rounded-lg font-medium transition"
          >
            Return to Messages
          </button>
          <button
            onClick={() => navigate('/buyer/orders')}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition"
          >
            View My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;