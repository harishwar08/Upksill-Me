import React, { useState } from 'react';
import { FaCheck, FaTimes, FaEdit } from 'react-icons/fa';

const ConnectionRequestCard = ({ request, onAccept, onDecline, onCounterOffer }) => {
  const [showCounterOffer, setShowCounterOffer] = useState(false);
  const [counterOfferData, setCounterOfferData] = useState({
    skillICanTeach: '',
    skillIWantToLearn: ''
  });
  const [errors, setErrors] = useState({});

  const handleCounterOfferChange = (e) => {
    const { name, value } = e.target;
    setCounterOfferData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateCounterOffer = () => {
    const newErrors = {};
    
    if (!counterOfferData.skillICanTeach.trim()) {
      newErrors.skillICanTeach = 'Please specify what you can teach';
    }
    
    if (!counterOfferData.skillIWantToLearn.trim()) {
      newErrors.skillIWantToLearn = 'Please specify what you want to learn';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitCounterOffer = () => {
    if (validateCounterOffer()) {
      onCounterOffer(request.id, counterOfferData);
      setShowCounterOffer(false);
      setCounterOfferData({
        skillICanTeach: '',
        skillIWantToLearn: ''
      });
    }
  };

  const handleCancelCounterOffer = () => {
    setShowCounterOffer(false);
    setCounterOfferData({
      skillICanTeach: '',
      skillIWantToLearn: ''
    });
    setErrors({});
  };

  return (
    <div className="request-card">
      <div className="request-header">
        <div className="request-user">
          <img src={request.senderAvatar} alt={request.senderName} className="request-avatar" />
          <div className="request-user-info">
            <h4 className="request-name">{request.senderName}</h4>
            <p className="request-username">{request.senderUsername}</p>
          </div>
        </div>
        <span className="request-time">{request.timeAgo}</span>
      </div>

      <div className="request-body">
        <div className="request-section">
          <p className="request-label">Reason:</p>
          <p className="request-text">{request.reason}</p>
        </div>

        <div className="request-section">
          <p className="request-label">What they want to learn:</p>
          <p className="request-text-highlight">{request.skillNeeded}</p>
        </div>

        <div className="request-section">
          <p className="request-label">What they can teach you:</p>
          <p className="request-text-highlight">{request.skillOffered}</p>
        </div>

        {/* Counter Offer Section */}
        {showCounterOffer && (
          <div className="counter-offer-section">
            <div className="counter-offer-header">
              <h4 className="counter-offer-title">Propose Different Skills</h4>
              <p className="counter-offer-subtitle">Suggest an alternative skill exchange</p>
            </div>

            <div className="counter-offer-form">
              <div className="form-group">
                <label className="form-label">
                  What skill can you teach them? <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="skillICanTeach"
                  value={counterOfferData.skillICanTeach}
                  onChange={handleCounterOfferChange}
                  placeholder="e.g., Python Programming, Digital Marketing"
                  className={`form-input ${errors.skillICanTeach ? 'error' : ''}`}
                />
                {errors.skillICanTeach && (
                  <span className="error-message">{errors.skillICanTeach}</span>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  What skill do you want to learn from them? <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="skillIWantToLearn"
                  value={counterOfferData.skillIWantToLearn}
                  onChange={handleCounterOfferChange}
                  placeholder="e.g., Figma, Content Writing"
                  className={`form-input ${errors.skillIWantToLearn ? 'error' : ''}`}
                />
                {errors.skillIWantToLearn && (
                  <span className="error-message">{errors.skillIWantToLearn}</span>
                )}
              </div>

              <div className="counter-offer-actions">
                <button 
                  type="button"
                  className="btn-cancel-small"
                  onClick={handleCancelCounterOffer}
                >
                  Cancel
                </button>
                <button 
                  type="button"
                  className="btn-submit-small"
                  onClick={handleSubmitCounterOffer}
                >
                  Send Counter Offer
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="request-actions">
        <button 
          className="btn-decline"
          onClick={() => onDecline(request.id)}
        >
          <FaTimes className="btn-icon" />
          Decline
        </button>
        
        {!showCounterOffer && (
          <button 
            className="btn-counter-offer"
            onClick={() => setShowCounterOffer(true)}
          >
            <FaEdit className="btn-icon" />
            Counter Offer
          </button>
        )}
        
        <button 
          className="btn-accept"
          onClick={() => onAccept(request.id)}
        >
          <FaCheck className="btn-icon" />
          Accept
        </button>
      </div>
    </div>
  );
};

export default ConnectionRequestCard;
