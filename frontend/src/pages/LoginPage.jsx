import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaBook, FaUsers } from 'react-icons/fa';
import Logo from '../assets/images/Light mode Logo.png';
import '../styles/auth.css';

const LoginPage = () => {
  const { login } = useAuth();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(credentials);
    } catch (error) {
      console.error('Login error:', error);
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
              <h3>Your Progress</h3>
              <button className="show-more">Show more</button>
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
                    strokeDashoffset="66"
                  />
                </svg>
                <div className="stat-number">75</div>
              </div>

              {/* Stats */}
              <div className="stat-items">
                <div className="stat-item">
                  <div className="stat-icon blue">
                    <FaBook />
                  </div>
                  <div>
                    <div className="stat-label">Skills Learned</div>
                    <div className="stat-value">12</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-icon pink">
                    <FaUsers />
                  </div>
                  <div>
                    <div className="stat-label">Connections</div>
                    <div className="stat-value">48</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="stat-tags">
              <span className="tag blue">JavaScript</span>
              <span className="tag green">Design</span>
              <span className="tag purple">Marketing</span>
              <span className="tag gray">+5</span>
              <span className="tag-link">more skills</span>
            </div>
          </div>

          {/* Subtext */}
          <p className="auth-left-subtext">
            Join thousands of learners exchanging skills and growing together. 
            Start your journey today!
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="auth-right-panel">
        <div className="auth-form-container">
          <div className="auth-card">
            <h1 className="auth-title">Welcome Back</h1>
            <p className="auth-subtitle">Login to continue your skill swap journey</p>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
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
                  value={credentials.password}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="••••••••"
                  required
                />
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  Remember me
                </label>
                <Link to="/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="auth-footer-text">
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
