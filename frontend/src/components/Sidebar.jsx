import { Link, useLocation } from 'react-router-dom';
import { FaTrophy, FaExchangeAlt, FaBook, FaCog } from 'react-icons/fa';
import '../styles/global.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/matches', icon: <FaExchangeAlt />, label: 'My Matches' },
    { path: '/resources', icon: <FaBook />, label: 'Resources' },
    { path: '/achievements', icon: <FaTrophy />, label: 'Achievements' },
    { path: '/settings', icon: <FaCog />, label: 'Settings' },
  ];

  return (
    <aside className="sidebar">
      {/* User Profile Section */}
      <div className="sidebar-profile-section">
        <div className="sidebar-profile-wrapper">
          <div className="sidebar-profile-avatar">
            <span className="sidebar-profile-avatar-text">H</span>
          </div>
          <div>
            <div className="sidebar-profile-name">Harishwar Goud</div>
            <div className="sidebar-profile-meta">Member since 2025</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={isActive ? 'sidebar-nav-link-active' : 'sidebar-nav-link'}
            >
              <span className="sidebar-nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
