import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaTrophy, FaExchangeAlt } from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold text-gradient mb-6">
            UpSkill Me
          </h1>
          <p className="text-2xl text-gray-700 mb-4">
            Teach what you know. Learn what you need. Swap skills. Grow together.
          </p>
          <p className="text-lg text-gray-600 mb-10">
            Join a community where knowledge is currency and everyone's a teacher and learner.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/signup" className="btn-primary">
              Get Started
            </Link>
            <Link to="/browse" className="btn-outline">
              Browse Skills
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">Why UpSkill Me?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<FaExchangeAlt className="text-5xl text-primary-600" />}
            title="Skill Exchange"
            description="Trade your expertise for new knowledge. No money, just time and passion."
          />
          <FeatureCard
            icon={<FaUsers className="text-5xl text-primary-600" />}
            title="Smart Matching"
            description="Our algorithm connects you with the perfect learning partners."
          />
          <FeatureCard
            icon={<FaTrophy className="text-5xl text-primary-600" />}
            title="Earn Badges"
            description="Get recognized for your contributions and track your progress."
          />
          <FeatureCard
            icon={<FaRocket className="text-5xl text-primary-600" />}
            title="Grow Together"
            description="Build a portfolio of skills while helping others achieve their goals."
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="gradient-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8">Join thousands of learners and teachers today.</p>
          <Link to="/signup" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:scale-105">
            Create Free Account
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="card text-center">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default LandingPage;
