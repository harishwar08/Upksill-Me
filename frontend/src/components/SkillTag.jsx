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

export default SkillTag;
