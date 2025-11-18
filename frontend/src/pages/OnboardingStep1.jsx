import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaTimes } from 'react-icons/fa';
import Logo from '../assets/images/Logo one.png';
import '../styles/auth.css';

const OnboardingStep1 = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    bio: '',
    phone: '',
    location: {
      city: '',
      country: ''
    },
    languages: [],
    skillsOffered: [],
    skillsNeeded: [],
    socialLinks: {
      linkedIn: '',
      github: '',
      twitter: '',
      portfolio: ''
    }
  });
  const [languageInput, setLanguageInput] = useState('');
  const [skillOfferedInput, setSkillOfferedInput] = useState('');
  const [skillNeededInput, setSkillNeededInput] = useState('');

  useEffect(() => {
    const signupData = JSON.parse(sessionStorage.getItem('onboardingData') || '{}');
    if (signupData.name) {
      setFormData(prev => ({ ...prev, firstName: signupData.name }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('location.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        location: { ...formData.location, [field]: value }
      });
    } else if (name.startsWith('socialLinks.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        socialLinks: { ...formData.socialLinks, [field]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addLanguage = () => {
    if (languageInput.trim() && !formData.languages.includes(languageInput.trim())) {
      setFormData({
        ...formData,
        languages: [...formData.languages, languageInput.trim()]
      });
      setLanguageInput('');
    }
  };

  const removeLanguage = (language) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter(l => l !== language)
    });
  };

  const addSkillOffered = () => {
    if (skillOfferedInput.trim() && !formData.skillsOffered.includes(skillOfferedInput.trim())) {
      setFormData({
        ...formData,
        skillsOffered: [...formData.skillsOffered, skillOfferedInput.trim()]
      });
      setSkillOfferedInput('');
    }
  };

  const removeSkillOffered = (skill) => {
    setFormData({
      ...formData,
      skillsOffered: formData.skillsOffered.filter(s => s !== skill)
    });
  };

  const addSkillNeeded = () => {
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
    setLoading(true);

    try {
      // Get signup data from session
      const signupData = JSON.parse(sessionStorage.getItem('onboardingData') || '{}');

      // Combine all data
      const completeData = {
        name: signupData.name,
        email: signupData.email,
        password: signupData.password,
        bio: formData.bio,
        phone: formData.phone,
        location: formData.location,
        languages: formData.languages,
        skillsOffered: formData.skillsOffered,
        skillsNeeded: formData.skillsNeeded,
        socialLinks: formData.socialLinks
      };

      // Register user
      await register(completeData);

      // Clear session
      sessionStorage.removeItem('onboardingData');

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Onboarding error:', error);
      alert('Failed to complete setup. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLater = () => {
    // Register with minimal data
    const signupData = JSON.parse(sessionStorage.getItem('onboardingData') || '{}');
    
    register({
      name: signupData.name,
      email: signupData.email,
      password: signupData.password,
      location: { isRemote: true }
    }).then(() => {
      sessionStorage.removeItem('onboardingData');
      navigate('/dashboard');
    }).catch((error) => {
      console.error('Registration error:', error);
      alert('Failed to create account. Please try again.');
    });
  };

  return (
    <div className="onboarding-single-container">
      <div className="onboarding-single-content">
        {/* Header */}
        <div className="onboarding-single-header">
          <h1 className="onboarding-single-title">Complete Your Profile</h1>
          <p className="onboarding-single-subtitle">
            Help us personalize your experience by completing your profile
          </p>
        </div>

        {/* Card */}
        <div className="onboarding-single-card">
          <form onSubmit={handleSubmit} className="onboarding-single-form">
            {/* First Name */}
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your first name"
              />
            </div>

            {/* Bio */}
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="form-textarea"
                placeholder="Tell us about yourself, your interests, and what you're passionate about..."
                rows="3"
              />
            </div>

            {/* Location & Phone */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  name="location.city"
                  value={formData.location.city}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., New York"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  name="location.country"
                  value={formData.location.country}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="e.g., USA"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="e.g., +1 234 567 8900"
              />
            </div>

            {/* Languages */}
            <div className="form-group">
              <label className="form-label">Languages</label>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={languageInput}
                  onChange={(e) => setLanguageInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addLanguage();
                    }
                  }}
                  className="form-input"
                  placeholder="e.g., English, Spanish, French"
                />
                <button
                  type="button"
                  onClick={addLanguage}
                  className="tag-add-btn"
                >
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.languages.map((language) => (
                  <div key={language} className="tag-item">
                    {language}
                    <FaTimes onClick={() => removeLanguage(language)} className="tag-remove" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Offered */}
            <div className="form-group">
              <label className="form-label">Skills I Can Teach</label>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={skillOfferedInput}
                  onChange={(e) => setSkillOfferedInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillOffered();
                    }
                  }}
                  className="form-input"
                  placeholder="e.g., JavaScript, Guitar, Cooking"
                />
                <button
                  type="button"
                  onClick={addSkillOffered}
                  className="tag-add-btn"
                >
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.skillsOffered.map((skill) => (
                  <div key={skill} className="tag-item">
                    {skill}
                    <FaTimes onClick={() => removeSkillOffered(skill)} className="tag-remove" />
                  </div>
                ))}
              </div>
            </div>

            {/* Skills Needed */}
            <div className="form-group">
              <label className="form-label">Skills I Want to Learn</label>
              <div className="tag-input-container">
                <input
                  type="text"
                  value={skillNeededInput}
                  onChange={(e) => setSkillNeededInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addSkillNeeded();
                    }
                  }}
                  className="form-input"
                  placeholder="e.g., Python, Photography, French"
                />
                <button
                  type="button"
                  onClick={addSkillNeeded}
                  className="tag-add-btn"
                >
                  Add
                </button>
              </div>
              <div className="tags-container">
                {formData.skillsNeeded.map((skill) => (
                  <div key={skill} className="tag-item">
                    {skill}
                    <FaTimes onClick={() => removeSkillNeeded(skill)} className="tag-remove" />
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="form-group">
              <label className="form-label">Social Links (Optional)</label>
              <div className="social-links-grid">
                <input
                  type="url"
                  name="socialLinks.linkedIn"
                  value={formData.socialLinks.linkedIn}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="LinkedIn URL"
                />
                <input
                  type="url"
                  name="socialLinks.github"
                  value={formData.socialLinks.github}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="GitHub URL"
                />
                <input
                  type="url"
                  name="socialLinks.twitter"
                  value={formData.socialLinks.twitter}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Twitter URL"
                />
                <input
                  type="url"
                  name="socialLinks.portfolio"
                  value={formData.socialLinks.portfolio}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Portfolio URL"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="onboarding-single-actions">
              <button
                type="button"
                onClick={handleSkipLater}
                className="btn-skip"
                disabled={loading}
              >
                Do it later
              </button>
              <button
                type="submit"
                className="btn-complete"
                disabled={loading}
              >
                {loading ? 'Completing...' : 'Complete Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingStep1;
