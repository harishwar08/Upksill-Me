import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle,
  FaCog, FaShieldAlt, FaPalette, FaGlobe, FaLock
} from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/settings.css';

const SettingsPage = () => {
  // Notification preferences
  const [notifications, setNotifications] = useState({
    connectionRequests: true,
    requestAccepted: true,
    newMessages: true,
    resourceShared: false,
    badgeEarned: true,
    weeklyDigest: true
  });

  // Security & Privacy
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [profileVisibility, setProfileVisibility] = useState('public');

  // Appearance
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');

  const handleNotificationToggle = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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
      
        <div className="settings-container">
          {/* Page Header */}
          <div className="settings-header">
            <h1 className="settings-title">Settings</h1>
            <p className="settings-subtitle">Manage your preferences and account settings</p>
          </div>

          {/* Notifications Section */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaBell />
              </div>
              <div>
                <h2 className="card-title">Notifications</h2>
                <p className="card-description">Choose what notifications you want to receive</p>
              </div>
            </div>
            
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Connection Requests</span>
                  <span className="setting-sublabel">Get notified when someone wants to connect</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.connectionRequests}
                    onChange={() => handleNotificationToggle('connectionRequests')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Request Accepted</span>
                  <span className="setting-sublabel">When your connection request is accepted</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.requestAccepted}
                    onChange={() => handleNotificationToggle('requestAccepted')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">New Messages</span>
                  <span className="setting-sublabel">Receive notifications for new chat messages</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.newMessages}
                    onChange={() => handleNotificationToggle('newMessages')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Resource Shared</span>
                  <span className="setting-sublabel">When someone shares a resource with you</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.resourceShared}
                    onChange={() => handleNotificationToggle('resourceShared')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Badge Earned</span>
                  <span className="setting-sublabel">Celebrate when you unlock achievements</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.badgeEarned}
                    onChange={() => handleNotificationToggle('badgeEarned')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Weekly Digest</span>
                  <span className="setting-sublabel">Summary of your activity every week</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={notifications.weeklyDigest}
                    onChange={() => handleNotificationToggle('weeklyDigest')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Security & Privacy Section */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaShieldAlt />
              </div>
              <div>
                <h2 className="card-title">Security & Privacy</h2>
                <p className="card-description">Manage your account security and privacy</p>
              </div>
            </div>
            
            <div className="settings-group">
              <div className="setting-item">
                <div className="setting-info">
                  <span className="setting-label">Two-Factor Authentication</span>
                  <span className="setting-sublabel">Add extra security to your account</span>
                </div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={twoFactorEnabled}
                    onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Profile Visibility</span>
                  <span className="setting-sublabel">Control who can see your profile</span>
                </div>
                <select 
                  className="setting-select"
                  value={profileVisibility}
                  onChange={(e) => setProfileVisibility(e.target.value)}
                >
                  <option value="public">Public - Everyone can see</option>
                  <option value="matches">Matches Only</option>
                  <option value="private">Private - Hidden from search</option>
                </select>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Change Password</span>
                  <span className="setting-sublabel">Update your account password</span>
                </div>
                <button className="btn-outline">Change Password</button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaPalette />
              </div>
              <div>
                <h2 className="card-title">Appearance</h2>
                <p className="card-description">Customize how UpSkill Me looks</p>
              </div>
            </div>
            
            <div className="settings-group">
              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Theme</span>
                  <span className="setting-sublabel">Choose your preferred color scheme</span>
                </div>
                <div className="theme-options">
                  <button 
                    className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    ☀️ Light
                  </button>
                  <button 
                    className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    🌙 Dark
                  </button>
                  <button 
                    className={`theme-btn ${theme === 'auto' ? 'active' : ''}`}
                    onClick={() => setTheme('auto')}
                  >
                    🔄 Auto
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Language & Region Section */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaGlobe />
              </div>
              <div>
                <h2 className="card-title">Language & Region</h2>
                <p className="card-description">Set your language and regional preferences</p>
              </div>
            </div>
            
            <div className="settings-group">
              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Language</span>
                  <span className="setting-sublabel">Choose your preferred language</span>
                </div>
                <select 
                  className="setting-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="pt">Português</option>
                  <option value="zh">中文</option>
                </select>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Time Zone</span>
                  <span className="setting-sublabel">Set your local time zone</span>
                </div>
                <select className="setting-select">
                  <option value="utc">UTC (Coordinated Universal Time)</option>
                  <option value="est">EST (Eastern Standard Time)</option>
                  <option value="pst">PST (Pacific Standard Time)</option>
                  <option value="gmt">GMT (Greenwich Mean Time)</option>
                  <option value="ist">IST (Indian Standard Time)</option>
                  <option value="jst">JST (Japan Standard Time)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Data & Privacy Section */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaLock />
              </div>
              <div>
                <h2 className="card-title">Data & Privacy</h2>
                <p className="card-description">Manage your data and account</p>
              </div>
            </div>
            
            <div className="settings-group">
              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Download Your Data</span>
                  <span className="setting-sublabel">Get a copy of your account data</span>
                </div>
                <button className="btn-outline">Request Data Export</button>
              </div>

              <div className="setting-item full-width">
                <div className="setting-info">
                  <span className="setting-label">Delete Account</span>
                  <span className="setting-sublabel">Permanently delete your account</span>
                </div>
                <button className="btn-danger">Delete Account</button>
              </div>
            </div>
          </div>

          {/* Help & Support */}
          <div className="settings-card">
            <div className="card-header">
              <div className="header-icon">
                <FaQuestionCircle />
              </div>
              <div>
                <h2 className="card-title">Help & Support</h2>
                <p className="card-description">Get help and view documentation</p>
              </div>
            </div>
            
            <div className="help-links">
              <a href="#" className="help-link">
                <span>📚 Help Center</span>
                <span className="arrow">→</span>
              </a>
              <a href="#" className="help-link">
                <span>💬 Contact Support</span>
                <span className="arrow">→</span>
              </a>
              <a href="#" className="help-link">
                <span>📄 Terms of Service</span>
                <span className="arrow">→</span>
              </a>
              <a href="#" className="help-link">
                <span>🔒 Privacy Policy</span>
                <span className="arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
