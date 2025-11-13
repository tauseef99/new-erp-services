// frontend/src/components/seller/CustomOfferModal.jsx
import React, { useState } from 'react';
import { FiX, FiClock, FiDollarSign, FiFileText } from 'react-icons/fi';

const CustomOfferModal = ({ isOpen, onClose, buyer, onSendOffer }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    deliveryDays: 7,
    revisions: 1,
    requirements: [''],
    inclusions: ['']
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Filter out empty requirements and inclusions
      const filteredRequirements = formData.requirements.filter(req => req.trim() !== '');
      const filteredInclusions = formData.inclusions.filter(inc => inc.trim() !== '');
      
      const offerData = {
        ...formData,
        requirements: filteredRequirements,
        inclusions: filteredInclusions,
        buyerId: buyer._id,
        price: parseFloat(formData.price)
      };

      console.log('📦 Modal: Sending offer data:', offerData);
      
      await onSendOffer(offerData);
      
      // If we get here without error, the offer was sent successfully
      console.log('✅ Modal: Offer sent successfully');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        deliveryDays: 7,
        revisions: 1,
        requirements: [''],
        inclusions: ['']
      });
      
      onClose();
      
    } catch (error) {
      console.error('❌ Modal: Error sending offer:', error);
      
      // Check if it's a socket-related error (non-critical)
      const errorMessage = error.message || '';
      const isSocketError = errorMessage.includes('socket') || 
                           errorMessage.includes('Socket') || 
                           errorMessage.includes('notification failed');
      
      if (isSocketError) {
        console.log('⚠️ Modal: Non-critical socket error, offer was created');
        // Offer was created successfully, just close the modal
        setFormData({
          title: '',
          description: '',
          price: '',
          deliveryDays: 7,
          revisions: 1,
          requirements: [''],
          inclusions: ['']
        });
        onClose();
      } else {
        // Show error for actual API failures
        setError(errorMessage || 'Failed to send offer. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const updateRequirement = (index, value) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const removeRequirement = (index) => {
    setFormData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addInclusion = () => {
    setFormData(prev => ({
      ...prev,
      inclusions: [...prev.inclusions, '']
    }));
  };

  const updateInclusion = (index, value) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.map((inc, i) => i === index ? value : inc)
    }));
  };

  const removeInclusion = (index) => {
    setFormData(prev => ({
      ...prev,
      inclusions: prev.inclusions.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Send Custom Offer</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Buyer Info */}
        <div className="p-6 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#708238] to-[#FFA500] flex items-center justify-center text-white font-bold">
              {buyer.name?.charAt(0).toUpperCase() || 'B'}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{buyer.name || 'Buyer'}</h3>
              <p className="text-sm text-gray-600">Custom offer for this buyer</p>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mx-6 mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Offer Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Offer Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="e.g., Website Development, Logo Design, etc."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe what you'll deliver in detail..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent resize-none"
            />
          </div>

          {/* Price and Delivery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiDollarSign className="inline mr-1" />
                Price ($) *
              </label>
              <input
                type="number"
                required
                min="1"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="0.00"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FiClock className="inline mr-1" />
                Delivery Time (Days) *
              </label>
              <input
                type="number"
                required
                min="1"
                value={formData.deliveryDays}
                onChange={(e) => setFormData(prev => ({ ...prev, deliveryDays: parseInt(e.target.value) || 7 }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
              />
            </div>
          </div>

          {/* Revisions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of Revisions
            </label>
            <select
              value={formData.revisions}
              onChange={(e) => setFormData(prev => ({ ...prev, revisions: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
            >
              <option value={0}>No revisions</option>
              <option value={1}>1 revision</option>
              <option value={2}>2 revisions</option>
              <option value={3}>3 revisions</option>
              <option value={99}>Unlimited revisions</option>
            </select>
          </div>

          {/* Requirements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FiFileText className="inline mr-1" />
              Requirements from Buyer
            </label>
            <div className="space-y-2">
              {formData.requirements.map((requirement, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={requirement}
                    onChange={(e) => updateRequirement(index, e.target.value)}
                    placeholder={`Requirement ${index + 1} (optional)`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
                  />
                  {formData.requirements.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 transition"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addRequirement}
                className="text-sm text-[#708238] hover:text-[#5a6a2d] font-medium flex items-center space-x-1"
              >
                <span>+ Add Requirement</span>
              </button>
            </div>
          </div>

          {/* Inclusions */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What's Included
            </label>
            <div className="space-y-2">
              {formData.inclusions.map((inclusion, index) => (
                <div key={index} className="flex space-x-2">
                  <input
                    type="text"
                    value={inclusion}
                    onChange={(e) => updateInclusion(index, e.target.value)}
                    placeholder={`Inclusion ${index + 1} (e.g., Source files, 1 year support)`}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#708238] focus:border-transparent"
                  />
                  {formData.inclusions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeInclusion(index)}
                      className="px-3 py-2 text-red-600 hover:text-red-800 transition"
                    >
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addInclusion}
                className="text-sm text-[#708238] hover:text-[#5a6a2d] font-medium flex items-center space-x-1"
              >
                <span>+ Add Inclusion</span>
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2">Offer Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between">
                <span>Price:</span>
                <span className="font-semibold">${formData.price || '0.00'}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{formData.deliveryDays} days</span>
              </div>
              <div className="flex justify-between">
                <span>Revisions:</span>
                <span>{formData.revisions === 99 ? 'Unlimited' : formData.revisions}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.title || !formData.description || !formData.price}
              className="px-6 py-3 bg-[#708238] text-white rounded-lg hover:bg-[#5a6a2d] transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Custom Offer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomOfferModal;