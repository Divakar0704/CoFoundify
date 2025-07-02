import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, Star, IndianRupee, MessageSquare } from 'lucide-react';

const UserCard = ({ user }) => {
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
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900">{user.name}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Briefcase className="h-4 w-4" />
              <span>{user.experience} experience</span>
            </div>
          </div>
          {user.isInvestor && (
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
              <Star className="h-3 w-3" />
              <span>Investor</span>
            </div>
          )}
        </div>

        {/* Skills */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Skills</h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md border border-blue-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="px-2 py-1 bg-purple-50 text-purple-700 text-xs rounded-md border border-purple-200"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Investment Capacity */}
        {user.isInvestor && user.investment > 0 && (
          <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <IndianRupee className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">
                Investment Capacity: {formatAmount(user.investment)}
              </span>
            </div>
          </div>
        )}

        {/* Action Button */}
        <Link
          to={`/chat/${user.id}`}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
        >
          <MessageSquare className="h-4 w-4" />
          <span>Connect</span>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;