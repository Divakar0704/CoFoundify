import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, FileText, Target } from 'lucide-react';
import { ideas, users, currentUser } from '../data/sampleData';
import { useAuth } from '../context/AuthContext';

const CreateWorkspace = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    ideaId: '',
    selectedMembers: [],
    isPrivate: false
  });

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMemberToggle = (userId) => {
    setFormData(prev => ({
      ...prev,
      selectedMembers: prev.selectedMembers.includes(userId)
        ? prev.selectedMembers.filter(id => id !== userId)
        : [...prev.selectedMembers, userId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Creating workspace:', formData);
    
    // For now, just navigate to workspaces page
    navigate('/workspaces');
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  // Filter out current user from available members
  const availableMembers = users.filter(user => user.id !== currentUser.id);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-8">
          <div className="flex items-center space-x-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Workspace</h1>
              <p className="text-gray-600">
                Set up a collaborative workspace for your project
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Target className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Workspace Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., EcoDeliver Development Hub"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe the purpose and goals of this workspace..."
                  required
                />
              </div>

              <div>
                <label htmlFor="ideaId" className="block text-sm font-medium text-gray-700 mb-2">
                  Link to Idea (Optional)
                </label>
                <select
                  id="ideaId"
                  name="ideaId"
                  value={formData.ideaId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select an idea (optional)</option>
                  {ideas.filter(idea => idea.creatorId === currentUser.id).map(idea => (
                    <option key={idea.id} value={idea.id}>{idea.title}</option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-1">
                  Link this workspace to one of your posted ideas
                </p>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isPrivate"
                  name="isPrivate"
                  checked={formData.isPrivate}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isPrivate" className="ml-2 text-sm text-gray-700">
                  Make this workspace private (invite-only)
                </label>
              </div>
            </div>

            {/* Team Members */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">Invite Team Members</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableMembers.map((user) => (
                  <div
                    key={user.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.selectedMembers.includes(user.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleMemberToggle(user.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <input
                        type="checkbox"
                        checked={formData.selectedMembers.includes(user.id)}
                        onChange={() => handleMemberToggle(user.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{user.name}</h4>
                        <p className="text-sm text-gray-500">{user.location}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skills.slice(0, 2).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                Selected {formData.selectedMembers.length} members. You can invite more members later.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Create Workspace
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkspace;