import { Link } from 'react-router-dom';
import { FaBell, FaUser } from 'react-icons/fa';

const Header = () => {
  // Mock user for development (no authentication)
  const mockUser = { id: '1', name: 'Demo User' };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="text-2xl font-bold text-gradient">
          UpSkill Me
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/browse" className="text-gray-700 hover:text-primary-600 font-medium transition">
            Browse
          </Link>
          <Link to="/dashboard" className="text-gray-700 hover:text-primary-600 font-medium transition">
            Dashboard
          </Link>
          <Link to="/matches" className="text-gray-700 hover:text-primary-600 font-medium transition">
            Matches
          </Link>
          <Link to="/resources" className="text-gray-700 hover:text-primary-600 font-medium transition">
            Resources
          </Link>
          <Link to="/achievements" className="text-gray-700 hover:text-primary-600 font-medium transition">
            Achievements
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link to="/notifications" className="relative text-gray-700 hover:text-primary-600">
            <FaBell className="text-xl" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
          </Link>
          <Link to={`/profile/${mockUser.id}`} className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
            <FaUser />
            <span className="hidden md:inline">{mockUser.name}</span>
          </Link>
          <Link to="/settings" className="btn-primary">
            Settings
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
