import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, IndianRupee, Users, Tag } from 'lucide-react';

const IdeaCard = ({ idea, showActions = true }) => {
  const getCategoryColor = (category) => {
    const colors = {
      'Startup': 'bg-blue-100 text-blue-800',
      'Student Project': 'bg-green-100 text-green-800',
      'Social Impact': 'bg-purple-100 text-purple-800',
      'HealthTech': 'bg-red-100 text-red-800',  
      'EdTech': 'bg-yellow-100 text-yellow-800',
      'Fintech': 'bg-indigo-100 text-indigo-800',
      'GreenTech': 'bg-emerald-100 text-emerald-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStageColor = (stage) => {
    const colors = {
      'Idea': 'bg-orange-100 text-orange-800',
      'Prototype': 'bg-blue-100 text-blue-800',
      'MVP': 'bg-green-100 text-green-800',
      'Beta': 'bg-purple-100 text-purple-800',
      'Research': 'bg-gray-100 text-gray-800'
    };
    return colors[stage] || 'bg-gray-100 text-gray-800';
  };

  const formatAmount = (amount) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    }
    return `₹${(amount / 1000).toFixed(0)}K`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {idea.title}
            </h3>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(idea.category)}`}>
                {idea.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStageColor(idea.stage)}`}>
                {idea.stage}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {idea.description}
        </p>

        {/* Tags */}
        <div className="flex items-center space-x-2 mb-4">
          <Tag className="h-4 w-4 text-gray-400" />
          <div className="flex flex-wrap gap-1">
            {idea.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
              >
                #{tag}
              </span>
            ))}
            {idea.tags.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md">
                +{idea.tags.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Needs */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Looking for:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {idea.needs.map((need) => (
              <span
                key={need}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
              >
                {need}
              </span>
            ))}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{idea.location}</span>
            </div>
          </div>
          {idea.fundingRequired && (
            <div className="flex items-center space-x-1 text-green-600 font-medium">
              <IndianRupee className="h-4 w-4" />
              <span>{formatAmount(idea.fundingRequired)}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-3">
            <Link
              to={`/chat/${idea.creatorId}`}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow"
            >
              Connect
            </Link>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IdeaCard;