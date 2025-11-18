import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle,
  FaAward, FaFire, FaMedal
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/achievements.css';

const AchievementsPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const progressMetrics = {
    completion: 68,
    swapsCompleted: 15,
    skillsTaught: 7,
    resourcesShared: 22,
    badgesEarned: 5
  };

  const badges = [
    {
      id: 1,
      unlocked: true,
      icon: '🏆',
      title: 'Skill Mentor',
      description: 'Completed 10 successful skill swaps.',
      earnedOn: 'Oct 12, 2025',
      color: '#2563EB'
    },
    {
      id: 2,
      unlocked: true,
      icon: '💡',
      title: 'Knowledge Giver',
      description: 'Taught 5 unique skills to others.',
      earnedOn: 'Sep 25, 2025',
      color: '#10B981'
    },
    {
      id: 3,
      unlocked: true,
      icon: '🗂️',
      title: 'Resource Hero',
      description: 'Shared 10 resources with learners.',
      earnedOn: 'Nov 4, 2025',
      color: '#F59E0B'
    },
    {
      id: 4,
      unlocked: true,
      icon: '📚',
      title: 'Fast Learner',
      description: 'Completed 3 swaps in first week.',
      earnedOn: 'Aug 15, 2025',
      color: '#8B5CF6'
    },
    {
      id: 5,
      unlocked: true,
      icon: '🌟',
      title: 'Community Star',
      description: 'Received 5-star ratings on 5 swaps.',
      earnedOn: 'Oct 28, 2025',
      color: '#EC4899'
    },
    {
      id: 6,
      unlocked: false,
      icon: '🔥',
      title: 'Swap Streak',
      description: 'Complete 5 swaps in a single week.',
      color: '#9CA3AF'
    },
    {
      id: 7,
      unlocked: false,
      icon: '🚀',
      title: 'Rising Star',
      description: 'Complete your first 20 skill swaps.',
      color: '#9CA3AF'
    },
    {
      id: 8,
      unlocked: false,
      icon: '⭐',
      title: 'Top Rated',
      description: 'Maintain 4.8+ rating across 15 swaps.',
      color: '#9CA3AF'
    },
    {
      id: 9,
      unlocked: false,
      icon: '🎯',
      title: 'Goal Achiever',
      description: 'Complete 50 successful skill swaps.',
      color: '#9CA3AF'
    }
  ];

  const streaks = [
    { label: '🔥 Active Swap Streak', value: '7 days' },
    { label: '🏅 Highest Rating', value: '4.9 / 5.0' },
    { label: '🎓 Skills Mastered', value: '3' }
  ];

  const filteredBadges = activeFilter === 'all' 
    ? badges 
    : activeFilter === 'unlocked' 
    ? badges.filter(b => b.unlocked) 
    : badges.filter(b => !b.unlocked);

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
      
        <div className="achievements-container">
          {/* Page Header */}
          <div className="achievements-header">
            <div>
              <h1 className="achievements-title">Achievements & Badges</h1>
              <p className="achievements-subtitle">Celebrate your progress! Earn badges as you grow, teach, and learn new skills.</p>
            </div>
          </div>

          {/* Badges Section */}
          <div className="badges-section">
            <div className="section-header-with-filter">
              <h2 className="section-title">Your Badges</h2>
              <div className="badge-filters">
                <button 
                  className={activeFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setActiveFilter('all')}
                >
                  All ({badges.length})
                </button>
                <button 
                  className={activeFilter === 'unlocked' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setActiveFilter('unlocked')}
                >
                  Unlocked ({badges.filter(b => b.unlocked).length})
                </button>
                <button 
                  className={activeFilter === 'locked' ? 'filter-btn active' : 'filter-btn'}
                  onClick={() => setActiveFilter('locked')}
                >
                  Locked ({badges.filter(b => !b.unlocked).length})
                </button>
              </div>
            </div>

            <div className="badge-grid">
              {filteredBadges.map((badge) => (
                <div 
                  key={badge.id} 
                  className={badge.unlocked ? 'badge-card unlocked' : 'badge-card locked'}
                >
                  <div className="badge-icon">
                    {badge.icon}
                  </div>
                  <h3 className="badge-title">{badge.title}</h3>
                  <p className="badge-description">{badge.description}</p>
                  {badge.unlocked ? (
                    <span className="badge-earned">Earned on {badge.earnedOn}</span>
                  ) : (
                    <span className="badge-locked-label">🔒 Locked</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Streaks & Milestones Section */}
          <div className="streaks-section">
            <h2 className="section-title">Streaks & Milestones</h2>
            <div className="streak-cards">
              {streaks.map((streak, index) => (
                <div key={index} className="streak-card">
                  <span className="streak-label">{streak.label}</span>
                  <span className="streak-value">{streak.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
