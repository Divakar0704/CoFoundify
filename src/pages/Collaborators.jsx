import React, { useState } from 'react';
import { Search, Filter, Users, Star } from 'lucide-react';
import { users, skillCategories } from '../data/sampleData';
import UserCard from '../components/UserCard';

const Collaborators = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('All');
  const [userType, setUserType] = useState('All');
  const [location, setLocation] = useState('All');

  const skills = ['All', 'React', 'Node.js', 'Python', 'UI/UX Design', 'Digital Marketing', 'Blockchain', 'Machine Learning'];
  const locations = ['All', 'Mumbai', 'Bangalore', 'Delhi', 'Pune', 'Hyderabad'];
  const userTypes = ['All', 'Investors', 'Developers', 'Designers', 'Marketers'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = selectedSkill === 'All' || user.skills.includes(selectedSkill);
    const matchesType = userType === 'All' || 
                       (userType === 'Investors' && user.isInvestor) ||
                       (userType === 'Developers' && user.skills.some(s => ['React', 'Node.js', 'Python', 'Blockchain'].includes(s))) ||
                       (userType === 'Designers' && user.skills.some(s => s.includes('Design'))) ||
                       (userType === 'Marketers' && user.skills.some(s => s.includes('Marketing')));
    
    const matchesLocation = location === 'All' || user.location.includes(location);

    return matchesSearch && matchesSkill && matchesType && matchesLocation;
  });

  const investorCount = users.filter(u => u.isInvestor).length;
  const totalInvestment = users.reduce((sum, u) => sum + u.investment, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Find Collaborators
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Connect with talented individuals who can help bring your ideas to life
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{users.length}+</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{investorCount}</div>
            <div className="text-gray-600">Active Investors</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl">₹</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">
              ₹{(totalInvestment / 100000).toFixed(1)}L+
            </div>
            <div className="text-gray-600">Available Capital</div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {userTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {skills.map(skill => (
                <option key={skill} value={skill}>{skill}</option>
              ))}
            </select>

            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>

            <button className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
              <Filter className="h-5 w-5" />
              <span className="hidden sm:inline">More</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredUsers.length} of {users.length} collaborators
          </p>
          {(searchTerm || selectedSkill !== 'All' || userType !== 'All' || location !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('All');
                setUserType('All');
                setLocation('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filteredUsers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No collaborators found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or filters to find the right people
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedSkill('All');
                setUserType('All');
                setLocation('All');
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Collaborators;