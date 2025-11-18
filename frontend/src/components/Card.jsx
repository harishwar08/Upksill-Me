import { FaStar } from 'react-icons/fa';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  );
};

export default Card;

// Skill Tag Component
export const SkillTag = ({ skill, onRemove }) => {
  return (
    <span className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2">
      {skill}
      {onRemove && (
        <button
          onClick={() => onRemove(skill)}
          className="ml-2 text-primary-600 hover:text-primary-800"
        >
          ×
        </button>
      )}
    </span>
  );
};

// Rating Display Component
export const RatingDisplay = ({ rating, count }) => {
  return (
    <div className="flex items-center">
      <FaStar className="text-yellow-500 mr-1" />
      <span className="font-semibold">{rating?.toFixed(1) || 0}</span>
      {count && <span className="text-gray-500 ml-1">({count})</span>}
    </div>
  );
};
