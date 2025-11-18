import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const PreRequestModal = ({ isOpen, onClose, recipientName, recipientSkills, recipientNeeds, onSubmit }) => {
  const [formData, setFormData] = useState({
    reason: '',
    skillNeeded: '',
    skillOffered: '',
    isCounterOffer: false,
    counterSkillOffered: ''
  });

  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.reason.trim()) {
      newErrors.reason = 'Please explain why you want to connect';
    } else if (formData.reason.trim().length < 20) {
      newErrors.reason = 'Please provide at least 20 characters';
    }

    if (!formData.skillNeeded.trim()) {
      newErrors.skillNeeded = 'Please specify what skill you need help with';
    }

    if (!formData.skillOffered.trim()) {
      newErrors.skillOffered = 'Please specify what you can offer in return';
    }

    // Validate counter offer if enabled
    if (formData.isCounterOffer && !formData.counterSkillOffered.trim()) {
      newErrors.counterSkillOffered = 'Please specify your counter offer skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
      if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        reason: '',
        skillNeeded: '',
        skillOffered: '',
        isCounterOffer: false,
        counterSkillOffered: ''
      });
      setErrors({});
    }
  };  const handleClose = () => {
    setFormData({
      reason: '',
      skillNeeded: '',
      skillOffered: '',
      isCounterOffer: false,
      counterSkillOffered: ''
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Send Connection Request</h2>
            <p className="modal-subtitle">Connect with {recipientName}</p>
          </div>
          <button onClick={handleClose} className="modal-close-btn">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Recipient Info */}
          <div className="recipient-info">
            <p className="info-label">They offer:</p>
            <div className="skill-tags-small">
              {recipientSkills?.map((skill, index) => (
                <span key={index} className="skill-tag-small">{skill}</span>
              ))}
            </div>
          </div>

          {/* Reason */}
          <div className="form-group">
            <label htmlFor="reason" className="form-label">
              Why are you reaching out? <span className="required">*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Explain what interests you about connecting with this person..."
              className={`form-textarea ${errors.reason ? 'error' : ''}`}
              rows="4"
            />
            {errors.reason && <span className="error-message">{errors.reason}</span>}
          </div>

          {/* Skill Needed */}
          <div className="form-group">
            <label htmlFor="skillNeeded" className="form-label">
              What can you learn from them? <span className="required">*</span>
            </label>
            <input
              type="text"
              id="skillNeeded"
              name="skillNeeded"
              value={formData.skillNeeded}
              onChange={handleChange}
              placeholder="e.g., Web Design, Python Programming, Spanish"
              className={`form-input ${errors.skillNeeded ? 'error' : ''}`}
            />
            {errors.skillNeeded && <span className="error-message">{errors.skillNeeded}</span>}
          </div>

          {/* Skill Offered */}
          <div className="form-group">
            <label htmlFor="skillOffered" className="form-label">
              What do you offer in return? <span className="required">*</span>
            </label>
            <input
              type="text"
              id="skillOffered"
              name="skillOffered"
              value={formData.skillOffered}
              onChange={handleChange}
              placeholder="e.g., Digital Marketing, Content Writing, Photography"
              className={`form-input ${errors.skillOffered ? 'error' : ''}`}
            />
            {errors.skillOffered && <span className="error-message">{errors.skillOffered}</span>}
          </div>

          {/* Counter Offer Section */}
          {recipientNeeds && (
            <div className="counter-offer-section">
              <div className="counter-offer-header">
                <label className="counter-offer-toggle">
                  <input
                    type="checkbox"
                    checked={formData.isCounterOffer}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        isCounterOffer: e.target.checked,
                        counterSkillOffered: e.target.checked ? prev.counterSkillOffered : ''
                      }));
                      if (errors.counterSkillOffered) {
                        setErrors(prev => ({ ...prev, counterSkillOffered: '' }));
                      }
                    }}
                    className="counter-checkbox"
                  />
                  <span className="counter-label">Make a counter offer</span>
                </label>
                <p className="counter-description">
                  They want <strong>{recipientNeeds}</strong>, but you can propose a different skill
                </p>
              </div>

              {formData.isCounterOffer && (
                <div className="form-group counter-input-wrapper">
                  <label htmlFor="counterSkillOffered" className="form-label">
                    Alternative skill you can offer <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="counterSkillOffered"
                    name="counterSkillOffered"
                    value={formData.counterSkillOffered}
                    onChange={handleChange}
                    placeholder={`e.g., Instead of ${recipientNeeds}, offer something else...`}
                    className={`form-input ${errors.counterSkillOffered ? 'error' : ''}`}
                  />
                  {errors.counterSkillOffered && <span className="error-message">{errors.counterSkillOffered}</span>}
                  <p className="counter-hint">
                    They can accept or negotiate your counter offer
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Send Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PreRequestModal;
