import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const CreateRequestModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    skillNeeded: '',
    skillOffered: '',
    description: '',
    mode: 'remote',
    experience: 'beginner'
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
    
    if (!formData.title.trim()) {
      newErrors.title = 'Please provide a title for your request';
    } else if (formData.title.trim().length < 10) {
      newErrors.title = 'Title should be at least 10 characters';
    }

    if (!formData.skillNeeded.trim()) {
      newErrors.skillNeeded = 'Please specify what skill you want to learn';
    }

    if (!formData.skillOffered.trim()) {
      newErrors.skillOffered = 'Please specify what skill you can offer';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please provide a description';
    } else if (formData.description.trim().length < 30) {
      newErrors.description = 'Description should be at least 30 characters';
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
        title: '',
        skillNeeded: '',
        skillOffered: '',
        description: '',
        mode: 'remote',
        experience: 'beginner'
      });
      setErrors({});
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      skillNeeded: '',
      skillOffered: '',
      description: '',
      mode: 'remote',
      experience: 'beginner'
    });
    setErrors({});
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Post New Skill Swap Request</h2>
            <p className="modal-subtitle">Share what you want to learn and what you can teach</p>
          </div>
          <button onClick={handleClose} className="modal-close-btn">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="modal-body">
          {/* Title */}
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Request Title <span className="required">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Looking to learn Spanish in exchange for Web Development"
              className={`form-input ${errors.title ? 'error' : ''}`}
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-2 gap-4">
            {/* Skill Needed */}
            <div className="form-group">
              <label htmlFor="skillNeeded" className="form-label">
                Skill You Want to Learn <span className="required">*</span>
              </label>
              <input
                type="text"
                id="skillNeeded"
                name="skillNeeded"
                value={formData.skillNeeded}
                onChange={handleChange}
                placeholder="e.g., Spanish"
                className={`form-input ${errors.skillNeeded ? 'error' : ''}`}
              />
              {errors.skillNeeded && <span className="error-message">{errors.skillNeeded}</span>}
            </div>

            {/* Skill Offered */}
            <div className="form-group">
              <label htmlFor="skillOffered" className="form-label">
                Skill You Can Teach <span className="required">*</span>
              </label>
              <input
                type="text"
                id="skillOffered"
                name="skillOffered"
                value={formData.skillOffered}
                onChange={handleChange}
                placeholder="e.g., Web Development"
                className={`form-input ${errors.skillOffered ? 'error' : ''}`}
              />
              {errors.skillOffered && <span className="error-message">{errors.skillOffered}</span>}
            </div>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description <span className="required">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe your learning goals, availability, and what you can offer..."
              className={`form-textarea ${errors.description ? 'error' : ''}`}
              rows="5"
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          {/* Two Column Layout for Mode and Experience */}
          <div className="grid grid-cols-2 gap-4">
            {/* Mode */}
            <div className="form-group">
              <label htmlFor="mode" className="form-label">
                Learning Mode
              </label>
              <select
                id="mode"
                name="mode"
                value={formData.mode}
                onChange={handleChange}
                className="form-input"
              >
                <option value="remote">Remote</option>
                <option value="local">Local</option>
                <option value="hybrid">Remote / Local</option>
              </select>
            </div>

            {/* Experience Level */}
            <div className="form-group">
              <label htmlFor="experience" className="form-label">
                Your Experience Level
              </label>
              <select
                id="experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="form-input"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="modal-actions">
            <button type="button" onClick={handleClose} className="btn-cancel">
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Post Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequestModal;
