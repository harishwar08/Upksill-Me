import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaPaperPlane, FaPaperclip, FaImage, FaSmile, FaBell, FaQuestionCircle, FaPhone, FaVideo, FaChevronRight, FaCheck, FaTimes, FaEdit } from 'react-icons/fa';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/messages.css';

const MessagesPage = () => {
  const [activeChat, setActiveChat] = useState(1);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('all-chats'); // 'all-chats' or 'requests'
  const [requestView, setRequestView] = useState('received'); // 'received' or 'sent'
  const [activeRequest, setActiveRequest] = useState(null);
  const [showCounterModal, setShowCounterModal] = useState(false);
  const [counterOffer, setCounterOffer] = useState('');
  const [allChats, setAllChats] = useState([
    {
      id: 1,
      name: 'Aarav',
      avatar: 'https://ui-avatars.com/api/?name=Aarav&background=3B82F6&color=fff&size=200',
      lastMessage: 'Thanks for the Data Science session!',
      timestamp: '2h ago',
      unread: false,
      email: 'aarav@email.com'
    },
    {
      id: 2,
      name: 'Kavya',
      avatar: 'https://ui-avatars.com/api/?name=Kavya&background=10B981&color=fff&size=200',
      lastMessage: 'The React Fundamentals Guide was really helpful',
      timestamp: '5h ago',
      unread: false,
      email: 'kavya@email.com'
    },
    {
      id: 3,
      name: 'Vikram',
      avatar: 'https://ui-avatars.com/api/?name=Vikram&background=8B5CF6&color=fff&size=200',
      lastMessage: 'Can we schedule the Machine Learning session?',
      timestamp: '1d ago',
      unread: true,
      email: 'vikram@email.com'
    },
    {
      id: 4,
      name: 'Neha',
      avatar: 'https://ui-avatars.com/api/?name=Neha&background=F59E0B&color=fff&size=200',
      lastMessage: 'Great UI UX Design tips!',
      timestamp: '2d ago',
      unread: false,
      email: 'neha@email.com'
    },
    {
      id: 5,
      name: 'Arjun',
      avatar: 'https://ui-avatars.com/api/?name=Arjun&background=EF4444&color=fff&size=200',
      lastMessage: 'Thanks for the Spring Boot resource',
      timestamp: '3d ago',
      unread: false,
      email: 'arjun@email.com'
    }
  ]);

  // Received Requests (people who want to connect with you)
  const [receivedRequests, setReceivedRequests] = useState([
    {
      id: 101,
      senderName: 'Sanjay',
      senderUsername: '@sanjay',
      senderAvatar: 'https://ui-avatars.com/api/?name=Sanjay&background=2563EB&color=fff&size=200',
      reason: 'I saw your profile and I\'m really interested in learning Java and Spring Boot development.',
      skillNeeded: 'Java & Spring Boot',
      skillOffered: 'Data Science & Python',
      mode: 'Remote',
      timeAgo: '2h',
      status: 'pending',
      isNew: true
    },
    {
      id: 102,
      senderName: 'Rohan',
      senderUsername: '@rohan',
      senderAvatar: 'https://ui-avatars.com/api/?name=Rohan&background=10B981&color=fff&size=200',
      reason: 'Looking for someone to help me improve my SQL and database design skills.',
      skillNeeded: 'SQL Database',
      skillOffered: 'Machine Learning & PyTorch',
      mode: 'Remote / In Person',
      timeAgo: '5h',
      status: 'pending',
      isNew: true
    }
  ]);

  // Sent Requests (requests you sent to others)
  const sentRequests = [
    {
      id: 201,
      recipientName: 'Priya',
      recipientUsername: '@priya',
      recipientAvatar: 'https://ui-avatars.com/api/?name=Priya&background=EC4899&color=fff&size=200',
      reason: 'I need help with Python programming and data science basics.',
      skillNeeded: 'Python & Data Science',
      skillOffered: 'Java & Spring Boot',
      mode: 'In Person',
      timeAgo: '1d',
      status: 'pending'
    },
    {
      id: 202,
      recipientName: 'Meera',
      recipientUsername: '@meera',
      recipientAvatar: 'https://ui-avatars.com/api/?name=Meera&background=6366F1&color=fff&size=200',
      reason: 'Want to learn advanced Data Science and ML patterns.',
      skillNeeded: 'Data Science & ML',
      skillOffered: 'React & UI UX Design',
      mode: 'Remote',
      timeAgo: '2d',
      status: 'pending'
    }
  ];

  const messages = activeChat === 1 ? [
    {
      id: 1,
      sender: 'other',
      text: 'Hi Harishwar! Thanks for accepting my connection request. I\'m really excited to learn Java from you!',
      time: '10:30 AM',
      read: true
    },
    {
      id: 2,
      sender: 'me',
      text: 'Hey Aarav! Glad to connect with you. I\'ve been working with Java for about 3 years now, especially Spring Boot. What\'s your current experience level?',
      time: '10:32 AM',
      read: true
    },
    {
      id: 3,
      sender: 'other',
      text: 'I have basic programming knowledge but I\'m new to Java. I\'ve been focusing on Data Science with Python for the past 2 years.',
      time: '10:35 AM',
      read: true
    },
    {
      id: 4,
      sender: 'me',
      text: 'Perfect! That actually works well because I\'ve been wanting to learn Data Science. How about we structure our sessions? I can teach you Java fundamentals and Spring Boot, and you can help me with Python for Data Science.',
      time: '10:38 AM',
      read: true
    },
    {
      id: 5,
      sender: 'other',
      text: 'That sounds like a great plan! I saw your Spring Security resource - it was really helpful. Should we start with Java basics or jump into Spring Boot?',
      time: '10:42 AM',
      read: true
    },
    {
      id: 6,
      sender: 'me',
      text: 'Let\'s start with Java fundamentals first - OOP concepts, collections, and exception handling. Once you\'re comfortable, we\'ll move to Spring Boot. For Data Science, what topics should I focus on?',
      time: '10:45 AM',
      read: true
    },
    {
      id: 7,
      sender: 'other',
      text: 'Great! For Data Science, I\'d recommend starting with NumPy and Pandas for data manipulation, then we can move to visualization with Matplotlib and Seaborn. I\'ve uploaded some resources on data cleaning that might help you get started.',
      time: '10:48 AM',
      read: true
    },
    {
      id: 8,
      sender: 'me',
      text: 'Excellent! I checked out your data cleaning resource - very comprehensive. How about we schedule our first session? Are you free this Saturday at 3 PM?',
      time: '10:52 AM',
      read: true
    },
    {
      id: 9,
      sender: 'other',
      text: 'Saturday at 3 PM works perfectly for me! Should we do a video call? I can share my screen for the Data Science session.',
      time: '10:55 AM',
      read: true
    },
    {
      id: 10,
      sender: 'me',
      text: 'Yes, video call would be ideal. We can use Google Meet. I\'ll send you the link on Saturday morning. Looking forward to our first exchange session!',
      time: '10:58 AM',
      read: true
    },
    {
      id: 11,
      sender: 'other',
      text: 'Thanks for the Data Science session today! Your questions were really insightful. Same time next week for Java?',
      time: '2h ago',
      read: false
    }
  ] : [];

  const activeUser = allChats.find(chat => chat.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessage('');
    }
  };

  const handleAcceptRequest = () => {
    if (activeRequest && requestView === 'received') {
      // Create new chat from accepted request
      const newChat = {
        id: Date.now(),
        name: activeRequest.senderName,
        avatar: activeRequest.senderAvatar,
        lastMessage: 'Request accepted! Start chatting...',
        timestamp: 'Just now',
        unread: true,
        email: activeRequest.senderUsername
      };
      
      setAllChats(prev => [newChat, ...prev]);
      
      // Remove from received requests
      setReceivedRequests(prev => prev.filter(req => req.id !== activeRequest.id));
      
      // Switch to All Chats tab and select new chat
      setActiveTab('all-chats');
      setActiveChat(newChat.id);
      
      alert('Request accepted! You can now start chatting.');
    }
  };

  const handleCounterOffer = () => {
    setShowCounterModal(true);
  };

  const handleSendCounterOffer = () => {
    if (counterOffer.trim()) {
      alert(`Counter offer sent: "${counterOffer}"`);
      setShowCounterModal(false);
      setCounterOffer('');
    }
  };

  const handleDeclineRequest = () => {
    if (activeRequest && requestView === 'received') {
      setReceivedRequests(prev => prev.filter(req => req.id !== activeRequest.id));
      setActiveRequest(null);
      alert('Request declined');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <img src={Logo} alt="UpSkill Me" className="h-10 w-auto object-contain" />
            </div>

            {/* Center Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/dashboard" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaTrophy className="text-sm" />
                Dashboard
              </Link>
              <Link to="/browse" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaSearch className="text-sm" />
                Browse
              </Link>
              <Link to="/connections" className="text-base font-semibold text-blue-600 px-4 py-2 rounded-lg bg-blue-50 flex items-center gap-2">
                <FaUsers className="text-sm" />
                Connections
              </Link>
              <Link to="/leaderboard" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaChartLine className="text-sm" />
                Leaderboard
              </Link>
              <Link to="/profile/1" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaUser className="text-sm" />
                Profile
              </Link>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-lg transition">
                <FaBell className="text-xl" />
              </button>
              <button className="text-base font-medium px-5 py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-2">
                <FaQuestionCircle className="text-lg" />
                Support
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="messages-container">
        {/* Chat List Sidebar */}
        <div className="chat-sidebar">
            <div className="chat-sidebar-header">
              <h2 className="chat-sidebar-title">Chats</h2>
            </div>

            {/* Tabs: All Chats / Requests */}
            <div className="chat-tabs">
              <button
                className={activeTab === 'all-chats' ? 'chat-tab active' : 'chat-tab'}
                onClick={() => setActiveTab('all-chats')}
              >
                All Chats
              </button>
              <button
                className={activeTab === 'requests' ? 'chat-tab active' : 'chat-tab'}
                onClick={() => {
                  setActiveTab('requests');
                  // Mark all requests as seen when user opens requests tab
                  setReceivedRequests(prev => prev.map(req => ({ ...req, isNew: false })));
                  // Auto-select first received request
                  if (receivedRequests.length > 0) {
                    setActiveRequest(receivedRequests[0]);
                  }
                }}
              >
                Requests
                {receivedRequests.filter(req => req.isNew).length > 0 && (
                  <span className="tab-badge">{receivedRequests.filter(req => req.isNew).length}</span>
                )}
              </button>
            </div>

            {/* All Chats View */}
            {activeTab === 'all-chats' && (
              <>
                <div className="chat-list">
                  {allChats.map((chat) => (
                    <div
                      key={chat.id}
                      className={activeChat === chat.id ? 'chat-item-active' : 'chat-item'}
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <img src={chat.avatar} alt={chat.name} className="chat-item-avatar" />
                      <div className="chat-item-content">
                        <div className="chat-item-header">
                          <span className="chat-item-name">
                            {chat.name}
                            {chat.unread && <span className="chat-item-badge">1</span>}
                          </span>
                          <span className="chat-item-time">{chat.timestamp}</span>
                        </div>
                        <p className="chat-item-message">{chat.lastMessage}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="chat-see-all-container">
                  <button className="chat-see-all-btn">See All</button>
                </div>
              </>
            )}

            {/* Requests View */}
            {activeTab === 'requests' && (
              <div className="requests-view">
                {/* Sub-tabs: Received / Sent */}
                <div className="request-sub-tabs">
                  <button
                    className={requestView === 'received' ? 'request-sub-tab active' : 'request-sub-tab'}
                    onClick={() => {
                      setRequestView('received');
                      if (receivedRequests.length > 0) {
                        setActiveRequest(receivedRequests[0]);
                      }
                    }}
                  >
                    Received ({receivedRequests.length})
                  </button>
                  <button
                    className={requestView === 'sent' ? 'request-sub-tab active' : 'request-sub-tab'}
                    onClick={() => {
                      setRequestView('sent');
                      if (sentRequests.length > 0) {
                        setActiveRequest(sentRequests[0]);
                      }
                    }}
                  >
                    Sent ({sentRequests.length})
                  </button>
                </div>

                {/* Received Requests */}
                {requestView === 'received' && (
                  <div className="request-list">
                    {receivedRequests.length === 0 ? (
                      <div className="empty-requests">
                        <p>No received requests</p>
                      </div>
                    ) : (
                      receivedRequests.map((request) => (
                        <div 
                          key={request.id} 
                          className={activeRequest?.id === request.id ? 'chat-item-active' : 'chat-item'}
                          onClick={() => setActiveRequest(request)}
                        >
                          <img src={request.senderAvatar} alt={request.senderName} className="chat-item-avatar" />
                          <div className="chat-item-content">
                            <div className="chat-item-header">
                              <span className="chat-item-name">{request.senderName}</span>
                              <span className="chat-item-time">{request.timeAgo}</span>
                            </div>
                            <p className="chat-item-message">{request.mode}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}

                {/* Sent Requests */}
                {requestView === 'sent' && (
                  <div className="request-list">
                    {sentRequests.length === 0 ? (
                      <div className="empty-requests">
                        <p>No sent requests</p>
                      </div>
                    ) : (
                      sentRequests.map((request) => (
                        <div 
                          key={request.id} 
                          className={activeRequest?.id === request.id ? 'chat-item-active' : 'chat-item'}
                          onClick={() => setActiveRequest(request)}
                        >
                          <img src={request.recipientAvatar} alt={request.recipientName} className="chat-item-avatar" />
                          <div className="chat-item-content">
                            <div className="chat-item-header">
                              <span className="chat-item-name">{request.recipientName}</span>
                              <span className="chat-item-time">{request.timeAgo}</span>
                            </div>
                            <p className="chat-item-message">{request.mode}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Request Details Panel - Show when requests tab is active and a request is selected */}
          {activeTab === 'requests' && activeRequest && (
            <div className="chat-window">
              {/* Request Header */}
              <div className="chat-header">
                <div className="chat-header-user">
                  <img 
                    src={requestView === 'received' ? activeRequest.senderAvatar : activeRequest.recipientAvatar} 
                    alt={requestView === 'received' ? activeRequest.senderName : activeRequest.recipientName} 
                    className="chat-header-avatar" 
                  />
                  <div>
                    <h3 className="chat-header-name">
                      {requestView === 'received' ? activeRequest.senderName : activeRequest.recipientName}
                    </h3>
                    <p className="chat-header-email">
                      {requestView === 'received' ? activeRequest.senderUsername : activeRequest.recipientUsername}
                    </p>
                  </div>
                </div>
                <span className="request-time-badge">{activeRequest.timeAgo}</span>
              </div>

              {/* Request Body */}
              <div className="chat-body">
                <div className="request-details">
                  <div className="request-section">
                    <h4 className="request-section-title">Reason</h4>
                    <p className="request-section-content">{activeRequest.reason}</p>
                  </div>

                  <div className="request-section">
                    <h4 className="request-section-title">What they want to learn</h4>
                    <div className="skill-tags-display">
                      {activeRequest.skillNeeded.split('&').map((skill, index) => (
                        <span key={index} className="skill-tag-blue-display">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>

                  <div className="request-section">
                    <h4 className="request-section-title">What they can teach you</h4>
                    <div className="skill-tags-display">
                      {activeRequest.skillOffered.split('&').map((skill, index) => (
                        <span key={index} className="skill-tag-purple-display">{skill.trim()}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Request Actions - Only show for received requests */}
              {requestView === 'received' && (
                <div className="chat-footer">
                  <button className="request-action-btn decline-btn" onClick={handleDeclineRequest}>
                    <FaTimes /> Decline
                  </button>
                  <button className="request-action-btn counter-btn" onClick={handleCounterOffer}>
                    <FaEdit /> Counter Offer
                  </button>
                  <button className="request-action-btn accept-btn" onClick={handleAcceptRequest}>
                    <FaCheck /> Accept
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Chat Window - Only show when All Chats tab is active */}
          {activeTab === 'all-chats' && (
          <div className="chat-window">
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-user">
                <img src={activeUser?.avatar} alt={activeUser?.name} className="chat-header-avatar" />
                <div>
                  <h3 className="chat-header-name">{activeUser?.name}</h3>
                  <p className="chat-header-email">{activeUser?.email}</p>
                </div>
              </div>
              <div className="chat-header-call-actions">
                <button className="call-icon-btn">
                  <FaPhone />
                </button>
                <button className="call-icon-btn">
                  <FaVideo />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div className="chat-body">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.sender === 'me' ? 'message-group-right' : 'message-group-left'}>
                  {msg.isContactCard ? (
                    <div className="contact-card">
                      <h4 className="contact-card-title">Contact Information</h4>
                      <div className="contact-card-grid">
                        <div className="contact-card-field">
                          <span className="contact-card-label">Name:</span>
                          <span className="contact-card-value">{msg.contactInfo.name}</span>
                        </div>
                        <div className="contact-card-field">
                          <span className="contact-card-label">Email:</span>
                          <span className="contact-card-value">{msg.contactInfo.email}</span>
                        </div>
                        <div className="contact-card-field">
                          <span className="contact-card-label">Phone:</span>
                          <span className="contact-card-value">{msg.contactInfo.phone}</span>
                        </div>
                        <div className="contact-card-field">
                          <span className="contact-card-label">Comment:</span>
                          <span className="contact-card-value">{msg.contactInfo.comment}</span>
                        </div>
                      </div>
                      <p className="contact-card-footer">
                        📋 Alexandra left the chat
                      </p>
                    </div>
                  ) : (
                    <div className={msg.sender === 'me' ? 'message-bubble-outgoing' : 'message-bubble-incoming'}>
                      <p>{msg.text}</p>
                      <span className="message-time">{msg.time} {msg.read && '✓✓'}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Footer */}
            <div className="chat-footer">
              <div className="chat-input-wrapper">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="We'll contact you ..."
                  className="chat-input"
                  rows="2"
                  maxLength="1000"
                />
                <div className="chat-input-actions">
                  <button className="chat-action-btn" title="Attach file">
                    <FaPaperclip />
                  </button>
                  <button className="chat-action-btn" title="Send image">
                    <FaImage />
                  </button>
                  <button className="chat-action-btn" title="Add emoji">
                    <FaSmile />
                  </button>
                </div>
                <span className="character-count">{message.length} / 1000</span>
                <button onClick={handleSendMessage} className="send-button" title="Send message">
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </div>
          )}
      </div>

      {/* Counter Offer Modal */}
      {showCounterModal && (
        <div className="modal-overlay">
          <div className="modal-container" style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Send Counter Offer</h2>
                <p className="modal-subtitle">Propose an alternative skill exchange</p>
              </div>
              <button onClick={() => setShowCounterModal(false)} className="modal-close-btn">
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Your Counter Offer</label>
                <textarea
                  value={counterOffer}
                  onChange={(e) => setCounterOffer(e.target.value)}
                  placeholder="Explain what you'd like to offer instead..."
                  className="form-textarea"
                  rows="4"
                />
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowCounterModal(false)} className="btn-cancel">
                  Cancel
                </button>
                <button onClick={handleSendCounterOffer} className="btn-submit">
                  Send Counter Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
