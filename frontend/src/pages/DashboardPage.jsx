import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrophy, FaExchangeAlt, FaBook, FaLightbulb, FaPlus, FaSearch, 
  FaUpload, FaUser, FaFile, FaMedal, FaCog, FaUsers, FaChartLine, FaBell, FaQuestionCircle
} from 'react-icons/fa';
import { Line } from 'react-chartjs-2';
import CreateRequestModal from '../components/CreateRequestModal';
import Logo from '../assets/images/Logo.png';
import '../styles/modal.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DashboardPage = () => {
  const navigate = useNavigate();
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for development
  const [dashboard] = useState({
    stats: {
      swapCount: 7,
      skillsTaught: 5,
      resourcesShared: 4,
      skillsLearned: 3
    },
    recentActivity: [
      { id: 1, user: 'Aarav', action: 'matched with you for Data Science', time: '2h ago' },
      { id: 2, resource: 'React Fundamentals Guide', action: 'uploaded for match with Priya', time: 'Yesterday' },
      { id: 3, badge: 'Top Teacher', action: 'badge earned', time: '3 days ago' }
    ],
    skillsOffered: ['Java', 'SQL', 'React', 'UI UX Design'],
    skillsNeeded: ['Python', 'Data Science', 'Machine Learning'],
    badges: [
      { id: 1, name: 'Swap Star', icon: 'star' },
      { id: 2, name: 'Top Teacher', icon: 'medal' },
      { id: 3, name: 'Community Mentor', icon: 'trophy' }
    ]
  });

  // Chart data for Skill Exchange Overview
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Skill Exchanges',
        data: [3, 5, 4, 7, 6, 12],
        fill: true,
        backgroundColor: 'rgba(37, 99, 235, 0.1)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverRadius: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        borderRadius: 8,
        displayColors: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
          drawBorder: false
        },
        ticks: {
          stepSize: 3,
          color: '#6B7280'
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  };

  // Modal handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitRequest = (formData) => {
    // TODO: Send request to backend API
    console.log('New skill swap request:', formData);
    alert('Your skill swap request has been posted!');
    handleCloseModal();
    // Navigate to browse page to see the posted request
    navigate('/browse');
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
              <Link to="/dashboard" className="text-base font-semibold text-blue-600 px-4 py-2 rounded-lg bg-blue-50 flex items-center gap-2">
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
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-screen mr-6">
          {/* User Profile Section */}
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <div>
                <div className="text-base font-bold text-gray-900">Harishwar Goud</div>
                <div className="text-sm text-gray-500 mt-0.5">Member since 2025</div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="px-3 py-4 space-y-2">
            <Link
              to="/matches"
              className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
            >
              <FaExchangeAlt className="text-lg" />
              <span className="text-base font-medium">My Matches</span>
            </Link>
            <Link
              to="/resources"
              className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
            >
              <FaBook className="text-lg" />
              <span className="text-base font-medium">Resources</span>
            </Link>
            <Link
              to="/achievements"
              className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
            >
              <FaTrophy className="text-lg" />
              <span className="text-base font-medium">Achievements</span>
            </Link>
            <Link
              to="/settings"
              className="flex items-center space-x-3 px-4 py-3.5 text-gray-700 hover:bg-gray-50 rounded-lg transition-all"
            >
              <FaCog className="text-lg" />
              <span className="text-base font-medium">Settings</span>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                label="Swaps Completed"
                value={dashboard.stats.swapCount}
                icon={<FaExchangeAlt />}
                color="blue"
              />
              <StatCard
                label="Skills Taught"
                value={dashboard.stats.skillsTaught}
                icon={<FaLightbulb />}
                color="blue"
              />
              <StatCard
                label="Resources Shared"
                value={dashboard.stats.resourcesShared}
                icon={<FaBook />}
                color="blue"
              />
              <StatCard
                label="Skills Learned"
                value={dashboard.stats.skillsLearned}
                icon={<FaTrophy />}
                color="blue"
              />
            </div>

            {/* Two Column Layout - 1/3 and 2/3 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Quick Actions - 1/3 width */}
              <div className="lg:col-span-1 bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Quick Actions</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Start a new swap, browse skills, or upload resources.
                </p>
                <div className="space-y-3">
                  <button
                    onClick={handleOpenModal}
                    className="flex items-center justify-center space-x-2 w-full px-5 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold shadow-sm"
                  >
                    <FaPlus className="text-xs" />
                    <span>Post New Request</span>
                  </button>
                  <Link
                    to="/browse"
                    className="flex items-center justify-center space-x-2 w-full px-5 py-3.5 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition text-sm font-semibold"
                  >
                    <FaSearch className="text-xs" />
                    <span>Browse Listings</span>
                  </Link>
                  <Link
                    to="/resources?upload=true"
                    className="flex items-center justify-center space-x-2 w-full px-5 py-3.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-sm font-semibold shadow-sm"
                  >
                    <FaUpload className="text-xs" />
                    <span>Upload Resource</span>
                  </Link>
                </div>
              </div>

              {/* Recent Activity - 2/3 width */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                  {dashboard.recentActivity.map((activity) => (
                    <ActivityItem key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            </div>

            {/* Two Column Layout - Chart & Skills */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Skill Exchange Overview Chart */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Skill Exchange Overview</h2>
                <div className="h-64">
                  <Line data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* Your Skills & Badges */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-6">Your Skills & Badges</h2>
                
                {/* Skills Offered */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-700 mb-3">Skills Offered</h3>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Skills Needed */}
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-700 mb-3">Skills Needed</h3>
                  <div className="flex flex-wrap gap-2">
                    {dashboard.skillsNeeded.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div>
                  <h3 className="text-base font-semibold text-gray-700 mb-3">Badges</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {dashboard.badges.map((badge) => (
                      <BadgeCard key={badge.id} badge={badge} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitRequest}
      />
    </div>
  );
};

// StatCard Component
const StatCard = ({ label, value, icon, color }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 transition-all">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-600 font-medium mb-2">{label}</div>
          <div className="text-3xl font-bold text-gray-900">{value}</div>
        </div>
        <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// ActivityItem Component
const ActivityItem = ({ activity }) => {
  const getIcon = () => {
    if (activity.user) return { icon: <FaUser />, color: 'bg-blue-100 text-blue-600' };
    if (activity.resource) return { icon: <FaFile />, color: 'bg-blue-100 text-blue-600' };
    if (activity.badge) return { icon: <FaTrophy />, color: 'bg-blue-100 text-blue-600' };
    return { icon: <FaUser />, color: 'bg-blue-100 text-blue-600' };
  };

  const { icon, color } = getIcon();
  const highlight = activity.user || activity.resource || activity.badge;

  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
      <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-base text-gray-900 leading-relaxed">
          <span className="font-bold text-gray-900">{highlight}</span>{' '}
          {activity.action}
        </p>
        <p className="text-sm text-gray-500 mt-1.5">{activity.time}</p>
      </div>
    </div>
  );
};

// BadgeCard Component
const BadgeCard = ({ badge }) => {
  const getIcon = () => {
    switch (badge.icon) {
      case 'star':
        return <FaTrophy className="text-lg" />;
      case 'medal':
        return <FaMedal className="text-lg" />;
      case 'trophy':
        return <FaTrophy className="text-lg" />;
      default:
        return <FaTrophy className="text-lg" />;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition">
      <div className="text-blue-600 mb-2">
        {getIcon()}
      </div>
      <p className="text-xs font-medium text-gray-700 text-center">{badge.name}</p>
    </div>
  );
};

export default DashboardPage;
