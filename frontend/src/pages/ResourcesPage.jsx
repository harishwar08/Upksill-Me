import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle,
  FaFolder, FaFileAlt, FaLink, FaDownload, FaEye, FaStar, FaUpload, FaTimes
} from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import Sidebar from '../components/Sidebar';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/resources.css';

const ResourcesPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Latest');
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'myUploads'
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    name: '',
    description: '',
    files: []
  });

  // Check if upload parameter is in URL and open modal
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('upload') === 'true') {
      setShowUploadModal(true);
    }
  }, [location]);

  const resources = [
    {
      id: 1,
      type: 'file',
      icon: '📄',
      title: 'Data Cleaning & Preprocessing Guide',
      skill: 'Data Science',
      sharedBy: 'Aarav',
      username: '@aarav',
      description: 'Complete guide on data cleaning techniques, handling missing values, and preprocessing for ML.',
      uploadedAt: '3 days ago',
      rating: 4.8,
      fileSize: '2.4 MB'
    },
    {
      id: 2,
      type: 'link',
      icon: '🔗',
      title: 'Python Collections',
      skill: 'Python',
      sharedBy: 'Priya',
      username: '@priya',
      description: 'Deep dive into Python lists, tuples, sets, and dictionaries with practical examples.',
      uploadedAt: '1 week ago',
      rating: 5.0,
      url: 'https://notion.so/python-collections'
    },
    {
      id: 3,
      type: 'file',
      icon: '🗂️',
      title: 'PyTorch Beginner Notes',
      skill: 'Machine Learning',
      sharedBy: 'Rohan',
      username: '@rohan',
      description: 'Beginner-friendly notes covering PyTorch basics, tensors, and neural network fundamentals.',
      uploadedAt: '2 weeks ago',
      rating: 4.2,
      fileSize: '1.8 MB'
    },
    {
      id: 4,
      type: 'link',
      icon: '🔗',
      title: 'Spring Security Essentials',
      skill: 'Java',
      sharedBy: 'Harishwar Goud',
      username: '@harishwar',
      description: 'Essential guide to Spring Security covering authentication, authorization, and JWT implementation.',
      uploadedAt: '1 week ago',
      rating: 4.9,
      url: 'https://spring-security-guide.dev',
      isMyUpload: true
    },
    {
      id: 5,
      type: 'file',
      icon: '📄',
      title: 'React Fundamentals Guide',
      skill: 'React',
      sharedBy: 'Harishwar Goud',
      username: '@harishwar',
      description: 'Comprehensive guide covering React components, hooks, state management, and best practices.',
      uploadedAt: '3 weeks ago',
      rating: 4.6,
      fileSize: '5.2 MB',
      isMyUpload: true
    },
    {
      id: 6,
      type: 'link',
      icon: '🔗',
      title: 'React + API Integration Notes',
      skill: 'React',
      sharedBy: 'Arjun',
      username: '@arjun',
      description: 'Practical notes on integrating REST APIs with React using Axios and Fetch.',
      uploadedAt: '4 days ago',
      rating: 4.7,
      url: 'https://react-api-guide.com'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="rating-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            className={star <= Math.floor(rating) ? 'star-filled' : 'star-empty'}
          />
        ))}
        <span className="rating-value">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    // Check file count limit
    if (selectedFiles.length > 5) {
      alert('You can upload a maximum of 5 files at once');
      e.target.value = '';
      return;
    }
    
    // Check each file size (200MB = 200 * 1024 * 1024 bytes)
    for (let file of selectedFiles) {
      if (file.size > 200 * 1024 * 1024) {
        alert(`File "${file.name}" exceeds 200MB size limit`);
        e.target.value = '';
        return;
      }
    }
    
    setUploadForm({ ...uploadForm, files: selectedFiles });
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadForm.name || !uploadForm.description || uploadForm.files.length === 0) {
      alert('Please fill in all fields and select at least one file');
      return;
    }
    // TODO: Implement actual upload functionality
    console.log('Upload:', uploadForm);
    // Reset form and close modal
    setUploadForm({ name: '', description: '', files: [] });
    setShowUploadModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleClearFilters = () => {
    setSkillFilter('All');
    setSortBy('Latest');
  };

  // Filter resources based on search and filters
  const filteredResources = resources.filter((resource) => {
    // Tab filter - My Uploads
    if (activeTab === 'myUploads' && !resource.isMyUpload) {
      return false;
    }

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchableText = [
        resource.title,
        resource.skill,
        resource.sharedBy,
        resource.username,
        resource.description
      ].join(' ').toLowerCase();
      
      if (!searchableText.includes(query)) {
        return false;
      }
    }

    // Skill filter
    if (skillFilter !== 'All' && resource.skill !== skillFilter) {
      return false;
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
      
        <div className="resources-container">
          {/* Page Header */}
          <div className="resources-header">
            <div>
              <h1 className="resources-title">Resources Library</h1>
              <p className="resources-subtitle">View all resources shared from your completed skill swaps.</p>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="resources-filters" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px', alignItems: 'end' }}>
            <div className="filter-group">
              <label className="filter-label">Search</label>
              <div className="filter-search-container">
                <FiSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'end' }}>
              <div className="filter-group" style={{ flex: 1 }}>
                <label className="filter-label">Skill</label>
                <select 
                  value={skillFilter}
                  onChange={(e) => setSkillFilter(e.target.value)}
                  className="filter-select"
                >
                  <option>All</option>
                  <option>Copywriting</option>
                  <option>Design</option>
                  <option>Marketing</option>
                  <option>UX</option>
                  <option>Development</option>
                </select>
              </div>

              <div className="filter-group" style={{ flex: 1 }}>
                <label className="filter-label">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option>Latest</option>
                  <option>Highest Rated</option>
                  <option>Oldest</option>
                </select>
              </div>

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
                  height: '42px',
                  whiteSpace: 'nowrap'
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

          {/* Tab Filter with Upload Button */}
          <div className="resources-tabs-container">
            <div className="resources-tabs">
              <button 
                className={activeTab === 'all' ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab('all')}
              >
                All Resources
              </button>
              <button 
                className={activeTab === 'myUploads' ? 'tab-button active' : 'tab-button'}
                onClick={() => setActiveTab('myUploads')}
              >
                My Uploads
              </button>
            </div>
            <button className="upload-button" onClick={() => setShowUploadModal(true)}>
              <FaUpload style={{ fontSize: '14px' }} />
              Upload
            </button>
          </div>

          {/* Resources Grid */}
          <div className="resources-grid">
            {filteredResources.length === 0 ? (
              <div style={{ 
                gridColumn: '1 / -1', 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#6B7280'
              }}>
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>
                  No resources found
                </p>
                <p style={{ fontSize: '14px' }}>
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              filteredResources.map((resource) => (
              <div key={resource.id} className="resource-card">
                {/* Resource Header */}
                <div className="resource-header">
                  <div className="resource-icon">{resource.icon}</div>
                  <div className="resource-title-section">
                    <h3 className="resource-title">{resource.title}</h3>
                    <span className="skill-tag">{resource.skill}</span>
                  </div>
                </div>

                {/* Resource Body */}
                <div className="resource-body">
                  <p className="uploaded-by">
                    Shared by <strong>{resource.username}</strong>
                  </p>
                  <p className="resource-description">{resource.description}</p>
                </div>

                {/* Resource Footer */}
                <div className="resource-footer">
                  <div className="resource-actions">
                    <button className="btn-primary-sm">
                      <FaEye />
                      View
                    </button>
                    <button className="btn-outline-sm">
                      <FaDownload />
                      Download
                    </button>
                    <span className="resource-time">{resource.uploadedAt}</span>
                  </div>
                </div>
              </div>
            ))
            )}
          </div>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay" onClick={() => setShowUploadModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h2 className="modal-title">Upload Resource</h2>
                <p className="modal-subtitle">Share a helpful resource with the community</p>
              </div>
              <button className="modal-close-btn" onClick={() => setShowUploadModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUploadSubmit} className="modal-body">
                <div className="form-group">
                  <label className="form-label">Resource Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter resource name"
                    value={uploadForm.name}
                    onChange={(e) => setUploadForm({ ...uploadForm, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Describe your resource"
                    rows="4"
                    value={uploadForm.description}
                    onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Select Files</label>
                  <input
                    type="file"
                    className="form-input"
                    onChange={handleFileChange}
                    multiple
                    required
                  />
                  {uploadForm.files.length > 0 && (
                    <p className="form-help-text" style={{ color: '#2563EB', marginTop: '8px', marginBottom: '4px' }}>
                      {uploadForm.files.length} file{uploadForm.files.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                  <p className="form-help-text">
                    Upload up to 5 files at once. Max 200MB per file. Supports all file types.
                  </p>
                </div>
                <div className="modal-actions">
                  <button type="button" className="btn-cancel" onClick={() => setShowUploadModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-submit">
                    Upload Resource
                  </button>
                </div>
              </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourcesPage;
