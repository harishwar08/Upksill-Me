import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import ConnectionRequestCard from '../components/ConnectionRequestCard';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/requests.css';

const RequestsPage = () => {
  const navigate = useNavigate();
  
  // Mock data - will be replaced with API call
  const [requests, setRequests] = useState([
    {
      id: 1,
      senderName: 'Aarav',
      senderUsername: '@aarav',
      senderAvatar: 'https://ui-avatars.com/api/?name=Aarav&background=2563EB&color=fff&size=200',
      reason: 'I saw your profile and I\'m really interested in learning Java and Spring Boot. I noticed you have strong skills in Java development, which is exactly what I want to learn.',
      skillNeeded: 'Java & Spring Boot',
      skillOffered: 'Data Science & Python',
      timeAgo: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      senderName: 'Priya',
      senderUsername: '@priya',
      senderAvatar: 'https://ui-avatars.com/api/?name=Priya&background=10B981&color=fff&size=200',
      reason: 'Looking for someone to help me improve my React skills. I can teach you advanced Python and Django in return!',
      skillNeeded: 'React Development',
      skillOffered: 'Python & Django',
      timeAgo: '5 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      senderName: 'Rohan',
      senderUsername: '@rohan',
      senderAvatar: 'https://ui-avatars.com/api/?name=Rohan&background=D97706&color=fff&size=200',
      reason: 'I need help with SQL database design and optimization. I can help you with Machine Learning and PyTorch in exchange.',
      skillNeeded: 'SQL Database',
      skillOffered: 'Machine Learning',
      timeAgo: '1 day ago',
      status: 'pending'
    }
  ]);

  const handleAccept = (requestId) => {
    // TODO: Call API to accept request and create chat room
    alert('Connection request accepted! Redirecting to messages...');
    
    setRequests(prev => prev.filter(req => req.id !== requestId));
    navigate('/connections');
  };

  const handleDecline = (requestId) => {
    // TODO: Call API to decline request
    alert('Connection request declined.');
    
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  const handleCounterOffer = (requestId, counterOfferData) => {
    const request = requests.find(req => req.id === requestId);
    
    // TODO: Call API to send counter offer notification to sender
    alert(`Counter offer sent to ${request.senderName}!\n\nYou offered to teach: ${counterOfferData.skillICanTeach}\nYou want to learn: ${counterOfferData.skillIWantToLearn}\n\nThey will be notified to review your proposal.`);
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
              <Link to="/connections" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
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
              <Link to="/requests" className="relative text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-2.5 rounded-lg transition">
                <FaBell className="text-xl" />
                {requests.length > 0 && (
                  <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {requests.length}
                  </span>
                )}
              </Link>
              <button className="text-base font-medium px-5 py-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition flex items-center gap-2">
                <FaQuestionCircle className="text-lg" />
                Support
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <Sidebar />

        <div className="requests-container">
          <div className="requests-header">
            <div>
              <h1 className="page-title">Connection Requests</h1>
              <p className="page-subtitle">
                {requests.length} pending {requests.length === 1 ? 'request' : 'requests'}
              </p>
            </div>
          </div>

          {requests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <FaBell />
              </div>
              <h3 className="empty-title">No pending requests</h3>
              <p className="empty-text">
                When people want to connect with you, their requests will appear here.
              </p>
              <Link to="/browse" className="empty-action">
                Browse Listings
              </Link>
            </div>
          ) : (
            <div className="requests-list">
              {requests.map((request) => (
                <ConnectionRequestCard
                  key={request.id}
                  request={request}
                  onAccept={handleAccept}
                  onDecline={handleDecline}
                  onCounterOffer={handleCounterOffer}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsPage;
