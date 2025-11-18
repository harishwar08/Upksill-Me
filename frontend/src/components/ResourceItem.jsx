import { FaPaperclip, FaFile, FaLink } from 'react-icons/fa';

const ResourceItem = ({ resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'file':
        return <FaFile className="text-2xl text-primary-600" />;
      case 'link':
        return <FaLink className="text-2xl text-primary-600" />;
      default:
        return <FaPaperclip className="text-2xl text-primary-600" />;
    }
  };

  return (
    <div className="card flex items-center space-x-4">
      <div>{getIcon()}</div>
      <div className="flex-1">
        <h3 className="font-bold">{resource.title}</h3>
        <p className="text-sm text-gray-600">{resource.description}</p>
        <div className="flex items-center space-x-2 mt-1">
          <span className="text-xs text-gray-500">{resource.skillRelated}</span>
          {resource.ratings && (
            <span className="text-xs text-yellow-600">
              ⭐ {resource.ratings.average?.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <button className="btn-outline">View</button>
    </div>
  );
};

export default ResourceItem;
