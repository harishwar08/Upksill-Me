import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiStar } from 'react-icons/fi';
import { FaTrophy, FaSearch as FaSearchIcon, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import PreRequestModal from '../components/PreRequestModal';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/browse.css';
import '../styles/modal.css';

const BrowsePage = () => {
  const [filters, setFilters] = useState({
    skillNeeded: 'All',
    skillOffered: 'All',
    mode: 'All'
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [appliedFilters, setAppliedFilters] = useState({
    skillNeeded: 'All',
    mode: 'All',
    search: ''
  });

  const users = [
    {
      id: 1,
      name: 'Aarav',
      avatar: 'https://ui-avatars.com/api/?name=Aarav&background=3B82F6&color=fff&size=200',
      location: 'Mumbai, India',
      rating: 4.9,
      offers: 'Data Science',
      needs: 'Java',
      offersTags: ['Python', 'ML', 'Analytics'],
      price: 0,
      priceType: '(Skill Swap)',
      mode: 'Remote'
    },
    {
      id: 2,
      name: 'Priya',
      avatar: 'https://ui-avatars.com/api/?name=Priya&background=10B981&color=fff&size=200',
      location: 'Bangalore, India',
      rating: 5.0,
      offers: 'Python Development',
      needs: 'React',
      offersTags: ['Django', 'Flask', 'Data'],
      price: 0,
      priceType: '(Exchange)',
      mode: 'Remote / Local'
    },
    {
      id: 3,
      name: 'Rohan',
      avatar: 'https://ui-avatars.com/api/?name=Rohan&background=8B5CF6&color=fff&size=200',
      location: 'Delhi, India',
      rating: 4.7,
      offers: 'Machine Learning',
      needs: 'SQL',
      offersTags: ['PyTorch', 'TensorFlow', 'AI'],
      price: 0,
      priceType: '(Swap)',
      mode: 'Local'
    }
  ];

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setAppliedFilters({
      skillNeeded: filters.skillNeeded,
      mode: filters.mode,
      search: appliedFilters.search
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setAppliedFilters(prev => ({
      ...prev,
      search: query
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      skillNeeded: 'All',
      skillOffered: 'All',
      mode: 'All'
    });
    setAppliedFilters({
      skillNeeded: 'All',
      mode: 'All',
      search: appliedFilters.search
    });
  };

  const handleConnectClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleSubmitRequest = (formData) => {
    // TODO: Send request to backend API
    let message = `Connection request sent to ${selectedUser.name}!`;
    
    if (formData.isCounterOffer) {
      message += `\n\nCounter Offer: Instead of "${selectedUser.needs}", you're offering "${formData.counterSkillOffered}"`;
    }
    
    alert(message);
    
    handleCloseModal();
  };

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={star <= Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            style={{ width: '16px', height: '16px' }}
          />
        ))}
      </div>
    );  
  };

  // Filter users based on applied filters and search
  const filteredUsers = users.filter((user) => {
    // Skill needed filter
    if (appliedFilters.skillNeeded !== 'All') {
      const skillMatch = user.offers.toLowerCase().includes(appliedFilters.skillNeeded.toLowerCase());
      if (!skillMatch) return false;
    }

    // Mode filter
    if (appliedFilters.mode !== 'All') {
      const userMode = user.mode.toLowerCase();
      const filterMode = appliedFilters.mode.toLowerCase();
      if (filterMode === 'remote' && !userMode.includes('remote')) return false;
      if (filterMode === 'local' && !userMode.includes('local')) return false;
      if (filterMode === 'hybrid' && userMode !== 'remote / local') return false;
    }

    // Search query filter
    if (appliedFilters.search) {
      const query = appliedFilters.search.toLowerCase();
      const searchableText = [
        user.name,
        user.location,
        user.offers,
        user.needs,
        ...user.offersTags
      ].join(' ').toLowerCase();
      
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
              <Link to="/browse" className="text-base font-semibold text-blue-600 px-4 py-2 rounded-lg bg-blue-50 flex items-center gap-2">
                <FaSearchIcon className="text-sm" />
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
      
        <div className="browse-container">
        <div className="filter-card">
          <h2 className="filter-title">Find the right match</h2>
          <p className="filter-description">Filter listings by skill type and mode.</p>
          
          <div className="grid grid-cols-3 gap-4 items-end">
            <div>
              <label className="filter-label">Skill Needed</label>
              <select
                value={filters.skillNeeded}
                onChange={(e) => setFilters({ ...filters, skillNeeded: e.target.value })}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="web-design">Web Design</option>
                <option value="copywriting">Copywriting</option>
                <option value="ui-ux">UI/UX Design</option>
                <option value="video-editing">Video Editing</option>
              </select>
            </div>

            <div>
              <label className="filter-label">Mode</label>
              <select
                value={filters.mode}
                onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="remote">Remote</option>
                <option value="local">Local</option>
                <option value="hybrid">Remote / Local</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleSearch} className="search-button">
                <FiSearch style={{ width: '16px', height: '16px' }} />
                Search
              </button>
              <button 
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

      <div className="section-header">
        <div>
          <h2 className="section-title">Best Skill Swaps for You</h2>
          <p className="section-subtitle">Based on your profile & skills</p>
        </div>
        
        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <FiSearch className="search-bar-icon" />
          <input
            type="text"
            placeholder="Search for user..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar-input"
          />
        </div>
      </div>

        <div className="user-grid">
          {filteredUsers.length === 0 ? (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '60px 20px',
              color: '#6B7280'
            }}>
              <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                No users found
              </p>
              <p style={{ fontSize: '14px' }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            filteredUsers.map((user) => (
            <div key={user.id} className="user-card">
              <div className="user-header">
                <img src={user.avatar} alt={user.name} className="user-avatar" />
                <div className="user-info">
                  <h3 className="user-name">{user.name}</h3>
                  <p className="user-location">{user.location}</p>
                </div>
              </div>

              <div className="skill-section">
                <p className="skill-label">
                  <span className="skill-label-blue">Offers:</span> <span className="skill-label-text">{user.offers}</span>
                </p>
                <p className="skill-label">
                  <span className="skill-label-blue">Needs:</span> <span className="skill-label-text">{user.needs}</span>
                </p>
              </div>

              <div className="skill-tags">
                {user.offersTags.map((tag, index) => (
                  <span key={index} className="skill-tag">{tag}</span>
                ))}
              </div>

              <div className="price-section">
                <p className="mode-info">{user.mode}</p>
              </div>

              <div className="action-buttons">
                <button 
                  className="connect-button"
                  onClick={() => handleConnectClick(user)}
                >
                  Connect
                </button>
                <button className="view-profile-button">View Profile</button>
              </div>
            </div>
          ))
          )}
        </div>

        {/* See All Button */}
        <div className="see-all-container">
          <button className="see-all-button">See All</button>
        </div>
      </div>

      {/* Pre-Request Modal */}
      <PreRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        recipientName={selectedUser?.name}
        recipientSkills={selectedUser?.offersTags}
        recipientNeeds={selectedUser?.needs}
        onSubmit={handleSubmitRequest}
      />
    </div>
    </div>
  );
};

export default BrowsePage;