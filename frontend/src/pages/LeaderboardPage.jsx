import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { FaTrophy, FaSearch as FaSearchIcon, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle, FaAward, FaComments, FaBook } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Logo from '../assets/images/Logo.png';
import BadgeGold from '../assets/images/badge-gold.png';
import BadgeSilver from '../assets/images/badge-silver.png';
import BadgeBronze from '../assets/images/badge-bronze.png';
import '../styles/global.css';
import '../styles/leaderboard.css';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('thisWeek');
  const [searchQuery, setSearchQuery] = useState('');

  // Top 3 Contributors
  const topThree = [
    {
      id: 1,
      rank: 1,
      name: 'Harishwar Goud',
      username: '@harishwar',
      avatar: 'https://ui-avatars.com/api/?name=Harishwar+Goud&background=2563EB&color=fff&size=200',
      swaps: 785,
      badges: 12,
      reviews: 307,
      skillsTaught: 358,
      badgeColor: '#FACC15',
      badgeType: 'legend'
    },
    {
      id: 2,
      rank: 2,
      name: 'Aarav',
      username: '@aarav',
      avatar: 'https://ui-avatars.com/api/?name=Aarav&background=10B981&color=fff&size=200',
      swaps: 562,
      badges: 9,
      reviews: 368,
      skillsTaught: 138,
      badgeColor: '#9CA3AF',
      badgeType: 'master'
    },
    {
      id: 3,
      rank: 3,
      name: 'Priya',
      username: '@priya',
      avatar: 'https://ui-avatars.com/api/?name=Priya&background=D97706&color=fff&size=200',
      swaps: 550,
      badges: 8,
      reviews: 334,
      skillsTaught: 142,
      badgeColor: '#D97706',
      badgeType: 'expert'
    }
  ];

  // Remaining leaderboard users
  const leaderboardUsers = [
    {
      id: 4,
      rank: 4,
      name: 'Tomas Porostowski',
      username: '@tomas_ui',
      avatar: 'https://ui-avatars.com/api/?name=Tomas+Porostowski&background=6366F1&color=fff&size=200',
      swaps: 413,
      badges: 7,
      reviews: 245,
      skillsTaught: 103,
      badgeType: 'advanced'
    },
    {
      id: 5,
      rank: 5,
      name: 'Jakub Bartczak',
      username: '@bartolini',
      avatar: 'https://ui-avatars.com/api/?name=Jakub+Bartczak&background=8B5CF6&color=fff&size=200',
      swaps: 390,
      badges: 6,
      reviews: 236,
      skillsTaught: 97,
      badgeType: 'advanced'
    },
    {
      id: 6,
      rank: 6,
      name: 'Grzegorz Zasada',
      username: '@lamiezasady',
      avatar: 'https://ui-avatars.com/api/?name=Grzegorz+Zasada&background=EC4899&color=fff&size=200',
      swaps: 357,
      badges: 5,
      reviews: 211,
      skillsTaught: 85,
      badgeType: 'intermediate'
    },
    {
      id: 7,
      rank: 7,
      name: 'Krzysztof Zawoja',
      username: '@krzysloo',
      avatar: 'https://ui-avatars.com/api/?name=Krzysztof+Zawoja&background=F59E0B&color=fff&size=200',
      swaps: 290,
      badges: 4,
      reviews: 135,
      skillsTaught: 70,
      badgeType: 'intermediate'
    }
  ];

  const filteredUsers = leaderboardUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                <FaSearchIcon className="text-sm" />
                Browse
              </Link>
              <Link to="/connections" className="text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition flex items-center gap-2">
                <FaUsers className="text-sm" />
                Connections
              </Link>
              <Link to="/leaderboard" className="text-base font-semibold text-blue-600 px-4 py-2 rounded-lg bg-blue-50 flex items-center gap-2">
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

        <div className="leaderboard-container">
          {/* Header Section */}
          <div className="leaderboard-header">
            <div className="header-content">
              <div>
                <h1 className="page-title">Top Skill Swappers</h1>
                <p className="page-subtitle">Leaderboard based on total swaps and contributions</p>
              </div>

              {/* Filter Tabs */}
              <div className="filter-tabs">
                <button
                  className={activeTab === 'thisWeek' ? 'filter-tab active' : 'filter-tab'}
                  onClick={() => setActiveTab('thisWeek')}
                >
                  This Week
                </button>
                <button
                  className={activeTab === 'lastWeek' ? 'filter-tab active' : 'filter-tab'}
                  onClick={() => setActiveTab('lastWeek')}
                >
                  Last Week
                </button>
                <button
                  className={activeTab === 'thisMonth' ? 'filter-tab active' : 'filter-tab'}
                  onClick={() => setActiveTab('thisMonth')}
                >
                  This Month
                </button>
              </div>
            </div>
          </div>

          {/* Top 3 Cards */}
          <div className="top-three-section">
            {topThree.map((user) => (
              <div key={user.id} className="top-card">
                <div className="rank-badge-corner">
                  <img 
                    src={user.rank === 1 ? BadgeGold : user.rank === 2 ? BadgeSilver : BadgeBronze} 
                    alt="Badge" 
                    className="badge-corner-icon"
                  />
                </div>
                
                <div className="card-avatar-small">
                  <img src={user.avatar} alt={user.name} />
                </div>

                <h3 className="card-name">{user.name}</h3>
                <p className="card-username">{user.username}</p>

                <div className="card-swaps">
                  <span className="swaps-count">{user.swaps}</span> Swaps Completed
                </div>

                <div className="card-metrics">
                  <div className="metric-item">
                    <FaAward className="metric-icon-blue" />
                    <span className="metric-value-normal">{user.badges}</span>
                  </div>
                  <div className="metric-item">
                    <FaComments className="metric-icon-blue" />
                    <span className="metric-value-normal">{user.reviews}</span>
                  </div>
                  <div className="metric-item">
                    <FaBook className="metric-icon-blue" />
                    <span className="metric-value-normal">{user.skillsTaught}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <label className="filter-label">Search</label>
            <div className="filter-search-container">
              <FiSearch className="search-icon-filter" />
              <input
                type="text"
                placeholder="Search for user..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input-filter"
              />
            </div>
          </div>

          {/* Table Headers */}
          <div className="table-header">
            <div className="header-col header-col-user">User</div>
            <div className="header-col header-col-stat">Swaps</div>
            <div className="header-col header-col-stat">Badges</div>
            <div className="header-col header-col-stat">Reviews</div>
            <div className="header-col header-col-stat">Skills Taught</div>
          </div>

          {/* Leaderboard Rows */}
          <div className="leaderboard-list">
            {filteredUsers.map((user) => (
              <div key={user.id} className="leaderboard-row">
                <div className="row-rank">{user.rank}th</div>
                
                <div className="row-user">
                  <img src={user.avatar} alt={user.name} className="row-avatar" />
                  <div className="row-user-info">
                    <span className="row-name">{user.name}</span>
                    <span className="row-username">{user.username}</span>
                  </div>
                </div>

                <div className="row-stat">
                  <span className="stat-value">{user.swaps}</span>
                </div>

                <div className="row-stat">
                  <FaAward className="stat-icon-blue" />
                  <span className="stat-value">{user.badges}</span>
                </div>

                <div className="row-stat">
                  <FaComments className="stat-icon-blue" />
                  <span className="stat-value">{user.reviews}</span>
                </div>

                <div className="row-stat">
                  <FaBook className="stat-icon-blue" />
                  <span className="stat-value">{user.skillsTaught}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
