import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle,
  FaCheckCircle, FaClock
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import MatchDetailModal from '../components/MatchDetailModal';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/matches.css';
import '../styles/modal.css';

const MatchesPage = () => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [skillFilter, setSkillFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All Time');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Applied filters (actual filters used for display)
  const [appliedFilters, setAppliedFilters] = useState({
    status: 'All',
    skill: 'All',
    mode: 'All Time',
    search: ''
  });

  const matches = [
    {
      id: 1,
      partner: {
        name: 'Aarav',
        username: '@aarav',
        avatar: 'https://ui-avatars.com/api/?name=Aarav&background=2563EB&color=fff&size=200'
      },
      status: 'active',
      youTaught: 'Java Basics',
      youLearned: 'Data Science Fundamentals',
      mode: 'Remote',
      sessionTime: '1 hr scheduled',
      date: 'Nov 8, 2025'
    },
    {
      id: 2,
      partner: {
        name: 'Priya',
        username: '@priya',
        avatar: 'https://ui-avatars.com/api/?name=Priya&background=10B981&color=fff&size=200'
      },
      status: 'completed',
      youTaught: 'React Development',
      youLearned: 'Python Programming',
      mode: 'Remote',
      date: 'Oct 21, 2025',
      duration: '1 hr'
    },
    {
      id: 3,
      partner: {
        name: 'Rohan',
        username: '@rohan',
        avatar: 'https://ui-avatars.com/api/?name=Rohan&background=6366F1&color=fff&size=200'
      },
      status: 'pending',
      youRequested: 'Help with Machine Learning',
      youOffered: 'SQL Database Design',
      mode: 'Remote',
      sentOn: 'Nov 10, 2025'
    },
    {
      id: 4,
      partner: {
        name: 'Meera',
        username: '@meera',
        avatar: 'https://ui-avatars.com/api/?name=Meera&background=EC4899&color=fff&size=200'
      },
      status: 'active',
      youTaught: 'UI UX Design',
      youLearned: 'Data Science',
      mode: 'In Person',
      sessionTime: '2 hrs scheduled',
      date: 'Nov 5, 2025'
    },
    {
      id: 5,
      partner: {
        name: 'Arjun',
        username: '@arjun',
        avatar: 'https://ui-avatars.com/api/?name=Arjun&background=F59E0B&color=fff&size=200'
      },
      status: 'completed',
      youTaught: 'Java Spring Boot',
      youLearned: 'Python Machine Learning',
      mode: 'Remote',
      date: 'Oct 15, 2025',
      duration: '1.5 hrs'
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      active: { color: 'status-active', text: 'Active Swap', icon: <FaClock /> },
      completed: { color: 'status-completed', text: 'Completed', icon: <FaCheckCircle /> },
      pending: { color: 'status-pending', text: 'Pending Approval', icon: <FaClock /> }
    };
    return badges[status] || badges.pending;
  };

  const handleViewMore = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
  };

  const handleSearch = () => {
    setAppliedFilters({
      status: statusFilter,
      skill: skillFilter,
      mode: timeFilter,
      search: appliedFilters.search // Keep current search as it updates in real-time
    });
  };

  const handleClearFilters = () => {
    setStatusFilter('All');
    setSkillFilter('All');
    setTimeFilter('All Time');
    setAppliedFilters({
      status: 'All',
      skill: 'All',
      mode: 'All Time',
      search: appliedFilters.search // Keep search as it's separate
    });
  };

  // Update search in real-time
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setAppliedFilters(prev => ({
      ...prev,
      search: query
    }));
  };

  // Filter matches based on applied filters
  const filteredMatches = matches.filter((match) => {
    // Status filter
    if (appliedFilters.status !== 'All' && match.status.toLowerCase() !== appliedFilters.status.toLowerCase()) {
      return false;
    }

    // Mode filter
    if (appliedFilters.mode !== 'All Time' && appliedFilters.mode !== 'All') {
      const matchMode = match.mode?.toLowerCase() || '';
      const filterMode = appliedFilters.mode.toLowerCase();
      if (filterMode === 'remote' && matchMode !== 'remote') return false;
      if (filterMode === 'local' && matchMode !== 'in person') return false;
    }

    // Search query filter (search in name, username, skills)
    if (appliedFilters.search) {
      const query = appliedFilters.search.toLowerCase();
      const searchableText = [
        match.partner.name,
        match.partner.username,
        match.youTaught,
        match.youLearned,
        match.youRequested,
        match.youOffered
      ].filter(Boolean).join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    return true;
  });

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
              <Link to="/profile/me" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
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

      <div className="flex">
        <Sidebar />
      
        <div className="matches-container">
          {/* Page Header with Search */}
          <div className="matches-header">
            <div>
              <h1 className="matches-title">My Matches</h1>
              <p className="matches-subtitle">View all your active, completed, and pending skill swaps.</p>
            </div>
            <div className="header-search">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by user or skill..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>

          {/* Filters Card */}
          <div className="filters-card">
            <div className="filters-row">
              <div className="filter-group">
                <label className="filter-label">Skill Needed</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option>All</option>
                  <option>Active</option>
                  <option>Completed</option>
                  <option>Pending</option>
                </select>
              </div>

              <div className="filter-group">
                <label className="filter-label">Mode</label>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="filter-select"
                >
                  <option>All</option>
                  <option>Remote</option>
                  <option>Local</option>
                  <option>Hybrid</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
                <button className="search-button" onClick={handleSearch}>
                  <FiSearch />
                  Search
                </button>
                <button 
                  className="clear-button" 
                  onClick={handleClearFilters}
                  style={{
                    padding: '11px 24px',
                    background: 'transparent',
                    color: '#6B7280',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    height: '42px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#2563EB';
                    e.target.style.background = '#EFF6FF';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#6B7280';
                    e.target.style.background = 'transparent';
                  }}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Matches Grid */}
          <div className="matches-grid">
            {filteredMatches.length === 0 ? (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#6B7280'
              }}>
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                  No matches found
                </p>
                <p style={{ fontSize: '14px' }}>
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredMatches.map((match) => {
              const badge = getStatusBadge(match.status);
              return (
                <div key={match.id} className="match-card">
                  {/* Match Header */}
                  <div className="match-header">
                    <div className="partner-info">
                      <img src={match.partner.avatar} alt={match.partner.name} className="partner-avatar" />
                      <div>
                        <h3 className="partner-name">{match.partner.name}</h3>
                        <p className="partner-username">{match.partner.username}</p>
                      </div>
                    </div>
                    <span className={`status-badge ${badge.color}`}>
                      {badge.icon}
                      {badge.text}
                    </span>
                  </div>

                  {/* Simplified Match Details - Show only 2 key fields */}
                  <div className="match-details">
                    {match.status === 'pending' ? (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">You Requested:</span>
                          <span className="detail-value">{match.youRequested}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">You Offered:</span>
                          <span className="detail-value">{match.youOffered}</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="detail-row">
                          <span className="detail-label">You Taught:</span>
                          <span className="detail-value">{match.youTaught}</span>
                        </div>
                        <div className="detail-row">
                          <span className="detail-label">You Learned:</span>
                          <span className="detail-value">{match.youLearned}</span>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="match-actions">
                    <button className="btn-feedback">
                      Give Feedback
                    </button>
                    <button 
                      className="btn-view-more"
                      onClick={() => handleViewMore(match)}
                    >
                      View More
                    </button>
                  </div>
                </div>
              );
            })
            )}
          </div>
        </div>
      </div>

      {/* Match Detail Modal */}
      <MatchDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        match={selectedMatch}
      />
    </div>
  );
};

export default MatchesPage;
