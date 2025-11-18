import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaCheck, FaTimes } from 'react-icons/fa';
import Logo from '../assets/images/Logo.png';
import '../styles/auth.css';

const OnboardingStep2 = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    skillsOffered: [],
    skillsNeeded: [],
    bio: '',
    experience: '',
    linkedIn: '',
    github: '',
    portfolio: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [skillNeededInput, setSkillNeededInput] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addSkillOffered = (e) => {
    e.preventDefault();
    if (skillInput.trim() && !formData.skillsOffered.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skillsOffered: [...formData.skillsOffered, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkillOffered = (skill) => {
    setFormData({
      ...formData,
      skillsOffered: formData.skillsOffered.filter(s => s !== skill)
    });
  };

  const addSkillNeeded = (e) => {
    e.preventDefault();
    if (skillNeededInput.trim() && !formData.skillsNeeded.includes(skillNeededInput.trim())) {
      setFormData({
        ...formData,
        skillsNeeded: [...formData.skillsNeeded, skillNeededInput.trim()]
      });
      setSkillNeededInput('');
    }
  };

  const removeSkillNeeded = (skill) => {
    setFormData({
      ...formData,
      skillsNeeded: formData.skillsNeeded.filter(s => s !== skill)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (formData.skillsOffered.length === 0 && formData.skillsNeeded.length === 0) {
      return alert('Please add at least one skill you can teach or want to learn');
    }

    setLoading(true);
    try {
      // Get data from previous steps
      const previousData = JSON.parse(sessionStorage.getItem('onboardingData') || '{}');

      // Combine all data
      const completeData = {
        name: previousData.name,
        email: previousData.email,
        password: previousData.password,
        purpose: previousData.purpose,
        skillCategory: previousData.skillCategory,
        goal: previousData.goal,
        skillsOffered: formData.skillsOffered,
        skillsNeeded: formData.skillsNeeded,
        bio: formData.bio,
        experience: formData.experience,
        socialLinks: {
          linkedIn: formData.linkedIn,
          github: formData.github,
          portfolio: formData.portfolio
        },
        location: { isRemote: true }
      };

      // Register user
      await register(completeData);

      // Clear session storage
      sessionStorage.removeItem('onboardingData');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/onboarding/step1');
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-content">
        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-logo">
            <img src={Logo} alt="UpSkill Me" />
            <span className="onboarding-logo-text">UpSkill Me</span>
          </div>

          {/* Progress Steps */}
          <div className="progress-steps">
            <div className="progress-line">
              <div className="progress-line-fill" style={{ width: '100%' }}></div>
            </div>
            
            <div className="progress-step completed">
              <div className="step-number">
                <FaCheck />
              </div>
              <div className="step-title">Preliminary</div>
              <div className="step-label">Complete</div>
            </div>

            <div className="progress-step active">
              <div className="step-number">02</div>
              <div className="step-title">Your Details</div>
              <div className="step-label">Final step</div>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="onboarding-card">
          <h2 className="onboarding-card-title">Tell Us About Your Skills</h2>

          <form onSubmit={handleSubmit} className="onboarding-form">
            {/* Skills I Can Teach */}
            <div className="form-group">
              <label className="form-label">Skills I can teach</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkillOffered(e);
                    }
                  }}
                  className="form-input"
                  placeholder="e.g., JavaScript, Guitar, Spanish"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={addSkillOffered}
                  className="btn-secondary"
                  style={{ width: 'auto', padding: '0 24px' }}
                >
                  Add
                </button>
              </div>
              <div className="multi-select-container">
                {formData.skillsOffered.map((skill) => (
                  <div key={skill} className="multi-select-tag">
                    {skill}
                    <span className="remove" onClick={() => removeSkillOffered(skill)}>
                      <FaTimes />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills I Want to Learn */}
            <div className="form-group">
              <label className="form-label">Skills I want to learn</label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <input
                  type="text"
                  value={skillNeededInput}
                  onChange={(e) => setSkillNeededInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      addSkillNeeded(e);
                    }
                  }}
                  className="form-input"
                  placeholder="e.g., Python, Photography, French"
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  onClick={addSkillNeeded}
                  className="btn-secondary"
                  style={{ width: 'auto', padding: '0 24px' }}
                >
                  Add
                </button>
              </div>
              <div className="multi-select-container">
                {formData.skillsNeeded.map((skill) => (
                  <div key={skill} className="multi-select-tag">
                    {skill}
                    <span className="remove" onClick={() => removeSkillNeeded(skill)}>
                      <FaTimes />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="form-group">
              <label className="form-label">About me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                rows="4"
              />
            </div>

            {/* Experience */}
            <div className="form-group">
              <label className="form-label">Experience level</label>
              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="form-select"
              >
                <option value="">Select your experience level</option>
                <option value="beginner">Beginner - Just starting out</option>
                <option value="intermediate">Intermediate - Some experience</option>
                <option value="advanced">Advanced - Highly experienced</option>
                <option value="expert">Expert - Professional level</option>
              </select>
            </div>

            {/* Social Links */}
            <div className="form-group">
              <label className="form-label">Social links (optional)</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="url"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="LinkedIn profile URL"
                />
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="GitHub profile URL"
                />
                <input
                  type="url"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Portfolio website URL"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="onboarding-nav">
              <button 
                type="button" 
                onClick={handleBack}
                className="btn-secondary"
                disabled={loading}
              >
                Back
              </button>
              <button 
                type="submit"
                className="btn-primary btn-next"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Complete Setup'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep2;
