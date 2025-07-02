import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Filter, Briefcase } from 'lucide-react';
import { workspaces, currentUser } from '../data/sampleData';
import WorkspaceCard from '../components/WorkspaceCard';
import { useAuth } from '../context/AuthContext';

const Workspaces = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewFilter, setViewFilter] = useState('All');
  const { isAuthenticated } = useAuth();

  const statuses = ['All', 'Active', 'Planning', 'On Hold', 'Completed'];

  const filteredWorkspaces = workspaces.filter(workspace => {
    const matchesSearch = workspace.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workspace.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'All' || workspace.status === statusFilter;
    
    const matchesView = viewFilter === 'All' || 
                       (viewFilter === 'My Workspaces' && workspace.ownerId === currentUser.id) ||
                       (viewFilter === 'Member Of' && workspace.members.includes(currentUser.id));

    return matchesSearch && matchesStatus && matchesView;
  });

  const myWorkspacesCount = workspaces.filter(w => w.ownerId === currentUser.id).length;
  const memberOfCount = workspaces.filter(w => w.members.includes(currentUser.id) && w.ownerId !== currentUser.id).length;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Workspaces
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Collaborate with your team in dedicated project workspaces
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <Briefcase className="h-8 w-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{workspaces.length}</div>
            <div className="text-gray-600">Total Workspaces</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl">👑</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{myWorkspacesCount}</div>
            <div className="text-gray-600">My Workspaces</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-center mb-2">
              <span className="text-2xl">🤝</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{memberOfCount}</div>
            <div className="text-gray-600">Member Of</div>
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
              placeholder="Search workspaces..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={viewFilter}
              onChange={(e) => setViewFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All">All Workspaces</option>
              <option value="My Workspaces">My Workspaces</option>
              <option value="Member Of">Member Of</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>

            {isAuthenticated && (
              <Link
                to="/workspace/create"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center justify-center space-x-2"
              >
                <Plus className="h-5 w-5" />
                <span className="hidden sm:inline">New Workspace</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredWorkspaces.length} of {workspaces.length} workspaces
          </p>
          {(searchTerm || statusFilter !== 'All' || viewFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setViewFilter('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {filteredWorkspaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || statusFilter !== 'All' || viewFilter !== 'All' 
                ? "Try adjusting your search terms or filters"
                : "Create your first workspace to start collaborating"
              }
            </p>
            {isAuthenticated && (
              <Link
                to="/workspace/create"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
              >
                Create Workspace
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredWorkspaces.map((workspace) => (
              <WorkspaceCard key={workspace.id} workspace={workspace} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspaces;