import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBook, FaUsers } from 'react-icons/fa';
import Logo from '../assets/images/Light mode Logo.png';
import '../styles/auth.css';

const SignUpPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      return alert('Passwords do not match');
    }

    if (!termsAccepted) {
      return alert('Please accept the terms and conditions');
    }

    setLoading(true);
    try {
      // Store user data for onboarding
      sessionStorage.setItem('onboardingData', JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      }));

      // Redirect to onboarding
      navigate('/onboarding');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Left Panel - Gradient with Visual */}
      <div className="auth-left-panel">
        <div className="auth-left-content">
          {/* Logo */}
          <div className="auth-logo">
            <img src={Logo} alt="UpSkill Me" className="auth-logo-icon" />
          </div>

          {/* Visual Card - Statistics */}
          <div className="auth-visual-card">
            <div className="visual-card-header">
              <h3>Community Stats</h3>
              <button className="show-more">View all</button>
            </div>

            <div className="stats-grid">
              {/* Circular Progress */}
              <div className="stat-circle">
                <svg className="progress-ring" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3A8BF6" />
                      <stop offset="100%" stopColor="#38B6F8" />
                    </linearGradient>
                  </defs>
                  <circle className="progress-bg" cx="50" cy="50" r="42" />
                  <circle 
                    className="progress-value" 
                    cx="50" 
                    cy="50" 
                    r="42"
                    strokeDasharray="264"
                    strokeDashoffset="33"
                  />
                </svg>
                <div className="stat-number">87</div>
              </div>

              {/* Stats */}
              <div className="stat-items">
                <div className="stat-item">
                  <div className="stat-icon blue">
                    <FaBook />
                  </div>
                  <div>
                    <div className="stat-label">Active Users</div>
                    <div className="stat-value">2.4K</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon pink">
                    <FaUsers />
                  </div>
                  <div>
                    <div className="stat-label">Skills Shared</div>
                    <div className="stat-value">8.7K</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="stat-tags">
              <span className="tag blue">Web Dev</span>
              <span className="tag green">Design</span>
              <span className="tag purple">Marketing</span>
              <span className="tag gray">+25</span>
              <span className="tag-link">categories</span>
            </div>
          </div>

          {/* Subtext */}
          <p className="auth-left-subtext">
            Join a growing community of learners and teachers. Share your expertise, 
            learn new skills, and grow together!
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-card">
            <h1 className="auth-title">Create Account</h1>
            <p className="auth-subtitle">Start your skill exchange journey today</p>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="terms-checkbox">
                <input 
                  type="checkbox" 
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  required
                />
                <div className="terms-text">
                  I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="auth-footer-text">
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
