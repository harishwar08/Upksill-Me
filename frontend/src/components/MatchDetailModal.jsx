import React from 'react';
import { FaTimes, FaComments, FaFolder, FaStar, FaTimesCircle, FaUserFriends } from 'react-icons/fa';

const MatchDetailModal = ({ isOpen, onClose, match }) => {
  if (!isOpen || !match) return null;

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'status-active', text: 'Active Swap' },
      completed: { color: 'status-completed', text: 'Completed' },
      pending: { color: 'status-pending', text: 'Pending Approval' }
    };
    return badges[status] || badges.pending;
  };

  const badge = getStatusBadge(match.status);

  return (
    <div className="modal-overlay">
      <div className="modal-container" style={{ maxWidth: '600px' }}>
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="modal-title">Match Details</h2>
            <p className="modal-subtitle">View and manage your skill swap</p>
          </div>
          <button onClick={onClose} className="modal-close-btn">
            <FaTimes />
          </button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {/* Partner Info */}
          <div className="match-modal-header">
            <img src={match.partner.avatar} alt={match.partner.name} className="match-modal-avatar" />
            <div className="match-modal-info">
              <h3 className="match-modal-name">{match.partner.name}</h3>
              <p className="match-modal-username">{match.partner.username}</p>
            </div>
            <span className={`status-badge ${badge.color}`}>
              {badge.text}
            </span>
          </div>

          {/* Match Details Section */}
          <div className="match-modal-details">
            <h4 className="match-modal-section-title">Skill Exchange</h4>
            
            {match.status === 'pending' ? (
              <>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">You Requested:</span>
                  <span className="match-modal-value">{match.youRequested}</span>
                </div>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">You Offered:</span>
                  <span className="match-modal-value">{match.youOffered}</span>
                </div>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">Sent On:</span>
                  <span className="match-modal-value">{match.sentOn}</span>
                </div>
              </>
            ) : (
              <>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">You Taught:</span>
                  <span className="match-modal-value">{match.youTaught}</span>
                </div>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">You Learned:</span>
                  <span className="match-modal-value">{match.youLearned}</span>
                </div>
                <div className="match-modal-detail-item">
                  <span className="match-modal-label">Mode:</span>
                  <span className="match-modal-value">{match.mode}</span>
                </div>
                {match.status === 'active' ? (
                  <div className="match-modal-detail-item">
                    <span className="match-modal-label">Session Time:</span>
                    <span className="match-modal-value">{match.sessionTime}</span>
                  </div>
                ) : (
                  <>
                    <div className="match-modal-detail-item">
                      <span className="match-modal-label">Date:</span>
                      <span className="match-modal-value">{match.date}</span>
                    </div>
                    <div className="match-modal-detail-item">
                      <span className="match-modal-label">Duration:</span>
                      <span className="match-modal-value">{match.duration}</span>
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Action Buttons */}
          <div className="match-modal-actions">
            {match.status === 'active' && (
              <>
                <button className="match-modal-btn-primary">
                  <FaComments />
                  <span>Open Chat</span>
                </button>
                <button className="match-modal-btn-outline">
                  <FaFolder />
                  <span>View Resources</span>
                </button>
                <button className="match-modal-btn-outline">
                  <FaUserFriends />
                  <span>Trade Partner</span>
                </button>
              </>
            )}
            {match.status === 'completed' && (
              <>
                <button className="match-modal-btn-primary">
                  <FaStar />
                  <span>Rate Partner</span>
                </button>
                <button className="match-modal-btn-outline">
                  <FaFolder />
                  <span>View Resources</span>
                </button>
                <button className="match-modal-btn-outline">
                  View Feedback
                </button>
              </>
            )}
            {match.status === 'pending' && (
              <button className="match-modal-btn-danger">
                <FaTimesCircle />
                <span>Cancel Request</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailModal;
