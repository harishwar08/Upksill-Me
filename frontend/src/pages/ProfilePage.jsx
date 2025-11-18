import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FaTrophy, FaSearch, FaUsers, FaChartLine, FaUser, FaBell, FaQuestionCircle,
  FaGlobe, FaCreditCard, FaFileAlt, FaWallet, FaLock, FaKey, FaClock,
  FaUpload, FaEdit, FaLinkedin, FaGithub, FaGlobe as FaPortfolio, FaSignOutAlt, FaTimes
} from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../assets/images/Logo.png';
import '../styles/global.css';
import '../styles/profile.css';

const ProfilePage = () => {
  const [activeSection, setActiveSection] = useState('edit-profile');
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillNeeded, setNewSkillNeeded] = useState('');
  const [errors, setErrors] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: ''
  });
  
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const [profileData, setProfileData] = useState({
    fullName: 'Harishwar Goud',
    email: 'harishwar@upskillme.com',
    countryCode: '+91',
    phone: '9874563210',
    location: 'India',
    bio: 'Hi 👋, I\'m Harishwar, a passionate developer and designer with expertise in full-stack development and UI/UX design. With a strong background in Java, SQL, React, and design principles, I am dedicated to creating innovative and user-centered solutions.',
    languages: 'English, Hindi, Telugu',
    skillsOffered: ['Java', 'SQL', 'React', 'UI UX Design'],
    skillsNeeded: ['Python', 'Data Science', 'Machine Learning'],
    experienceLevel: 'Intermediate (3 years)',
    linkedin: 'linkedin.com/in/theharishwar',
    portfolio: 'harishwar.design',
    github: 'github.com/harishwar'
  });

  const profileProgress = {
    percentage: 70,
    items: [
      { label: 'Setup account', completed: true, value: 10 },
      { label: 'Upload your photo', completed: true, value: 5 },
      { label: 'Personal Info', completed: true, value: 10 },
      { label: 'Location', completed: true, value: 20 },
      { label: 'Biography', completed: true, value: 15 },
      { label: 'Notifications', completed: false, value: 10 },
      { label: 'Bank details', completed: false, value: 30 }
    ]
  };

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Optionally: reset to original values
  };

  const handleSave = () => {
    // Validation
    const newErrors = {};
    
    if (!profileData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required';
    }
    
    if (profileData.skillsOffered.length === 0) {
      newErrors.skillsOffered = 'At least one skill must be offered';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsEditing(false);
    setErrors({});
    // TODO: Save to backend
    alert('Profile updated successfully!');
  };

  const handleAddSkillOffered = (e) => {
    if (e.key === 'Enter' && newSkillOffered.trim()) {
      e.preventDefault();
      setProfileData(prev => ({
        ...prev,
        skillsOffered: [...prev.skillsOffered, newSkillOffered.trim()]
      }));
      setNewSkillOffered('');
      setErrors(prev => ({ ...prev, skillsOffered: '' }));
    }
  };

  const handleAddSkillNeeded = (e) => {
    if (e.key === 'Enter' && newSkillNeeded.trim()) {
      e.preventDefault();
      setProfileData(prev => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, newSkillNeeded.trim()]
      }));
      setNewSkillNeeded('');
    }
  };

  const handleRemoveSkillOffered = (index) => {
    setProfileData(prev => ({
      ...prev,
      skillsOffered: prev.skillsOffered.filter((_, i) => i !== index)
    }));
  };

  const handleRemoveSkillNeeded = (index) => {
    setProfileData(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((_, i) => i !== index)
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePasswordChange = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      alert('Please fill in all password fields');
      return;
    }
    // TODO: Send to backend
    alert('Password changed successfully!');
    setPasswordData({ currentPassword: '', newPassword: '' });
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
              <Link to="/profile/1" className="text-base font-semibold text-blue-600 px-4 py-2 rounded-lg bg-blue-50 flex items-center gap-2">
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

      <div className="profile-layout">
        {/* Left Sidebar Navigation */}
        <aside className="profile-sidebar">
          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Profile</h3>
            <nav className="sidebar-nav">
              <button
                className={activeSection === 'edit-profile' ? 'sidebar-nav-item active' : 'sidebar-nav-item'}
                onClick={() => setActiveSection('edit-profile')}
              >
                <FaUser className="sidebar-nav-icon" />
                <span>Edit Profile</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-section">
            <h3 className="sidebar-section-title">Secure</h3>
            <nav className="sidebar-nav">
              <button
                className={activeSection === 'password' ? 'sidebar-nav-item active' : 'sidebar-nav-item'}
                onClick={() => setActiveSection('password')}
              >
                <FaLock className="sidebar-nav-icon" />
                <span>Password</span>
              </button>
              <button
                className='sidebar-nav-item'
                onClick={() => setShowLogoutModal(true)}
              >
                <FaSignOutAlt className="sidebar-nav-icon" />
                <span>Log Out</span>
              </button>
            </nav>
          </div>

          <div className="sidebar-danger">
            <button className="btn-delete-account">
              Delete account
            </button>
          </div>
        </aside>

        {/* Main Content - Edit Profile */}
        <main className="profile-content">
          {activeSection === 'edit-profile' && (
            <>
              <div className="profile-header">
                <div>
                  <h1 className="profile-title">Edit Profile</h1>
                  <p className="profile-subtitle">Manage your personal details, skill information, and account visibility.</p>
                </div>
              </div>

              {/* Avatar Section */}
              <div className="profile-card">
                <div className="avatar-section">
                  <div className="avatar-placeholder">
                    {profilePhoto ? (
                      <img src={profilePhoto} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <FaUser className="avatar-icon" />
                    )}
                  </div>
                  <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <button className="btn-upload" onClick={() => document.getElementById('photoUpload').click()}>
                    <FaUpload className="btn-icon" />
                    Upload new photo
                  </button>
                  <p className="avatar-note">At least 800×800 px recommended. JPG or PNG is allowed</p>
                </div>
              </div>

          {/* Personal Info */}
          <div className="profile-card">
            <div className="card-header">
              <h2 className="card-title">Personal Info</h2>
              {!isEditing && (
                <button className="btn-edit" onClick={handleEdit}>
                  <FaEdit className="btn-icon-sm" />
                  Edit
                </button>
              )}
            </div>
            
            {/* Basic Information */}
            <div className="form-grid">
              <div className="form-field">
                <label className="form-label">Full Name <span style={{ color: '#EF4444' }}>*</span></label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) => {
                    handleInputChange('fullName', e.target.value);
                    setErrors(prev => ({ ...prev, fullName: '' }));
                  }}
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  disabled={!isEditing}
                />
                {errors.fullName && <span style={{ color: '#EF4444', fontSize: '13px', marginTop: '4px' }}>{errors.fullName}</span>}
              </div>
              <div className="form-field">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="form-input"
                  disabled={!isEditing}
                />
              </div>
              <div className="form-field">
                <label className="form-label">Phone</label>
                {isEditing ? (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      value={profileData.countryCode}
                      onChange={(e) => handleInputChange('countryCode', e.target.value)}
                      className="form-input"
                      style={{ width: '100px' }}
                    >
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                      <option value="+91">+91</option>
                      <option value="+86">+86</option>
                      <option value="+81">+81</option>
                      <option value="+49">+49</option>
                      <option value="+33">+33</option>
                    </select>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input"
                      placeholder="555 123 4567"
                      style={{ flex: 1 }}
                    />
                  </div>
                ) : (
                  <input
                    type="tel"
                    value={`${profileData.countryCode} ${profileData.phone}`}
                    className="form-input"
                    disabled
                  />
                )}
              </div>
              <div className="form-field">
                <label className="form-label">Location</label>
                <input
                  type="text"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="form-input"
                  placeholder="Country name"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Bio */}
            <div className="form-field" style={{ marginTop: '48px' }}>
              <label className="form-label">About You</label>
              <textarea
                value={profileData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="form-textarea"
                rows="4"
                placeholder="Write about your background, what you teach, or what you're learning..."
                disabled={!isEditing}
              />
            </div>

            {/* Languages Known */}
            <div className="form-field" style={{ marginTop: '32px', maxWidth: '400px' }}>
              <label className="form-label">Languages Known</label>
              <input
                type="text"
                value={profileData.languages}
                onChange={(e) => handleInputChange('languages', e.target.value)}
                className="form-input"
                placeholder="e.g., English, Spanish, French"
                disabled={!isEditing}
              />
            </div>

            {/* Skills & Experience */}
            <div style={{ marginTop: '48px' }}>
              <h3 className="form-section-title">Skills & Experience</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">Skills Offered <span style={{ color: '#EF4444' }}>*</span></label>
                  <div className="skill-tags-input">
                    {profileData.skillsOffered.map((skill, index) => (
                      <span key={index} className="skill-tag-blue">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkillOffered(index)}
                            style={{ marginLeft: '6px', cursor: 'pointer', background: 'none', border: 'none', color: 'white', fontWeight: 'bold' }}
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <input
                      type="text"
                      value={newSkillOffered}
                      onChange={(e) => setNewSkillOffered(e.target.value)}
                      onKeyPress={handleAddSkillOffered}
                      className="form-input"
                      placeholder="Type skill and press Enter"
                      style={{ marginTop: '8px' }}
                    />
                  )}
                  {errors.skillsOffered && <span style={{ color: '#EF4444', fontSize: '13px', marginTop: '4px', display: 'block' }}>{errors.skillsOffered}</span>}
                </div>
                <div className="form-field">
                  <label className="form-label">Skills Needed</label>
                  <div className="skill-tags-input">
                    {profileData.skillsNeeded.map((skill, index) => (
                      <span key={index} className="skill-tag-purple">
                        {skill}
                        {isEditing && (
                          <button
                            onClick={() => handleRemoveSkillNeeded(index)}
                            style={{ marginLeft: '6px', cursor: 'pointer', background: 'none', border: 'none', color: 'white', fontWeight: 'bold' }}
                          >
                            ×
                          </button>
                        )}
                      </span>
                    ))}
                  </div>
                  {isEditing && (
                    <input
                      type="text"
                      value={newSkillNeeded}
                      onChange={(e) => setNewSkillNeeded(e.target.value)}
                      onKeyPress={handleAddSkillNeeded}
                      className="form-input"
                      placeholder="Type skill and press Enter"
                      style={{ marginTop: '8px' }}
                    />
                  )}
                </div>
              </div>
              <div className="form-field" style={{ marginTop: '20px', maxWidth: '400px' }}>
                <label className="form-label">Experience Level</label>
                <input
                  type="text"
                  value={profileData.experienceLevel}
                  onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
                  className="form-input"
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Social Links */}
            <div style={{ marginTop: '48px' }}>
              <h3 className="form-section-title">Social Links</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label className="form-label">
                    <FaLinkedin className="inline mr-2 text-blue-600" />
                    LinkedIn
                  </label>
                  <input
                    type="text"
                    value={profileData.linkedin}
                    onChange={(e) => handleInputChange('linkedin', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaPortfolio className="inline mr-2 text-blue-600" />
                    Portfolio
                  </label>
                  <input
                    type="text"
                    value={profileData.portfolio}
                    onChange={(e) => handleInputChange('portfolio', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">
                    <FaGithub className="inline mr-2 text-gray-700" />
                    GitHub / Behance
                  </label>
                  <input
                    type="text"
                    value={profileData.github}
                    onChange={(e) => handleInputChange('github', e.target.value)}
                    className="form-input"
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="card-actions" style={{ marginTop: '32px' }}>
                <button className="btn-cancel" onClick={handleCancel}>Cancel</button>
                <button className="btn-save" onClick={handleSave}>Save changes</button>
              </div>
            )}
          </div>
            </>
          )}

          {/* Password Section */}
          {activeSection === 'password' && (
            <>
              <div className="profile-header">
                <div>
                  <h1 className="profile-title">Change Password</h1>
                  <p className="profile-subtitle">Update your password to keep your account secure.</p>
                </div>
              </div>

              <div className="profile-card">
                <div style={{ maxWidth: '500px' }}>
                  <div className="form-field">
                    <label className="form-label">Current Password</label>
                    <input
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                      className="form-input"
                      placeholder="Enter current password"
                    />
                  </div>
                  
                  <div className="form-field" style={{ marginTop: '20px' }}>
                    <label className="form-label">New Password</label>
                    <input
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                      className="form-input"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div style={{ marginTop: '24px' }}>
                    <button className="btn-save" onClick={handlePasswordChange}>
                      Save Password
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <div className="modal-header">
              <h2 className="modal-title">Log Out</h2>
              <button className="modal-close" onClick={() => setShowLogoutModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '24px' }}>
                Are you sure you want to log out? You'll need to sign in again to access your account.
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  className="btn-secondary" 
                  onClick={() => setShowLogoutModal(false)}
                  style={{ padding: '10px 24px' }}
                >
                  Cancel
                </button>
                <button 
                  className="btn-primary" 
                  onClick={() => {
                    setShowLogoutModal(false);
                    logout();
                  }}
                  style={{ padding: '10px 24px', backgroundColor: '#EF4444' }}
                >
                  Yes, Log Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
