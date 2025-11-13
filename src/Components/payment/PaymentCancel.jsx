//frontend/src/Component/payment/PaymentCancel.jsx
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaTimesCircle } from 'react-icons/fa';

const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const offerId = searchParams.get('offer_id');

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <FaTimesCircle className="text-6xl text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p className="text-gray-600 mb-6">
          Your payment was cancelled. You can try again anytime from your messages.
        </p>
        
        <div className="space-y-3">
          <button
            onClick={() => navigate('/buyer/messages')}
            className="w-full bg-[#708238] hover:bg-[#5a6a2d] text-white py-3 rounded-lg font-medium transition"
          >
            Return to Messages
          </button>
          {offerId && (
            <button
              onClick={() => navigate(`/buyer/messages?offer=${offerId}`)}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 rounded-lg font-medium transition"
            >
              Try Payment Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCancel;