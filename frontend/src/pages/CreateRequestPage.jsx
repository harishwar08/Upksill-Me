import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestService } from '../services/requestService';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import { SkillTag } from '../components/Card';

const CreateRequestPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    skillOffered: '',
    skillNeeded: '',
    description: '',
    preferredMode: 'both',
    availability: '',
    duration: 'flexible',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await requestService.createRequest(formData);
      toast.success('Request created successfully!');
      navigate('/browse');
    } catch (error) {
      toast.error('Failed to create request');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Create Skill Swap Request</h1>

          <form onSubmit={handleSubmit} className="card">
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Skill I Can Offer *</label>
              <input
                type="text"
                name="skillOffered"
                value={formData.skillOffered}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Web Development, Guitar Lessons"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Skill I Need *</label>
              <input
                type="text"
                name="skillNeeded"
                value={formData.skillNeeded}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Spanish Language, Photography"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="input-field"
                rows="4"
                placeholder="Describe what you can teach and what you hope to learn..."
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Preferred Mode</label>
                <select
                  name="preferredMode"
                  value={formData.preferredMode}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="remote">Remote</option>
                  <option value="in-person">In-Person</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Expected Duration</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="input-field"
                >
                  <option value="1-2 hours">1-2 hours</option>
                  <option value="2-4 hours">2-4 hours</option>
                  <option value="4-8 hours">4-8 hours</option>
                  <option value="8+ hours">8+ hours</option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">Availability</label>
              <input
                type="text"
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Weekends, Evenings after 6pm"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">Tags (optional)</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="input-field"
                  placeholder="Add tags..."
                />
                <button type="button" onClick={addTag} className="btn-outline px-4">
                  Add
                </button>
              </div>
              <div className="flex flex-wrap">
                {formData.tags.map(tag => (
                  <SkillTag key={tag} skill={tag} onRemove={removeTag} />
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Creating...' : 'Create Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequestPage;
