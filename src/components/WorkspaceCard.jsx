import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Calendar, CheckCircle, Clock, AlertCircle, FileText, Settings } from 'lucide-react';
import { users } from '../data/sampleData';

const WorkspaceCard = ({ workspace }) => {
  const getStatusColor = (status) => {
    const colors = {
      'Active': 'bg-green-100 text-green-800',
      'Planning': 'bg-blue-100 text-blue-800',
      'On Hold': 'bg-yellow-100 text-yellow-800',
      'Completed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getTaskStats = () => {
    const total = workspace.tasks.length;
    const completed = workspace.tasks.filter(task => task.status === 'Completed').length;
    const inProgress = workspace.tasks.filter(task => task.status === 'In Progress').length;
    const todo = workspace.tasks.filter(task => task.status === 'Todo').length;
    
    return { total, completed, inProgress, todo };
  };

  const taskStats = getTaskStats();
  const members = workspace.members.map(memberId => users.find(u => u.id === memberId)).filter(Boolean);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {workspace.name}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
              {workspace.description}
            </p>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(workspace.status)}`}>
              {workspace.status}
            </span>
          </div>
          <Link
            to={`/workspace/${workspace.id}/settings`}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Settings className="h-5 w-5" />
          </Link>
        </div>

        {/* Members */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Team ({members.length})</span>
          </div>
          <div className="flex -space-x-2">
            {members.slice(0, 4).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-8 h-8 rounded-full border-2 border-white"
                title={member.name}
              />
            ))}
            {members.length > 4 && (
              <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">+{members.length - 4}</span>
              </div>
            )}
          </div>
        </div>

        {/* Task Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm text-gray-500">
              {taskStats.completed}/{taskStats.total} tasks
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0}%` }}
            ></div>
          </div>
        </div>

        {/* Task Stats */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{taskStats.completed}</div>
            <div className="text-xs text-gray-500">Done</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{taskStats.inProgress}</div>
            <div className="text-xs text-gray-500">In Progress</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center mb-1">
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </div>
            <div className="text-sm font-medium text-gray-900">{taskStats.todo}</div>
            <div className="text-xs text-gray-500">To Do</div>
          </div>
        </div>

        {/* Resources */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              Resources ({workspace.resources.length})
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>Created {new Date(workspace.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <Link
            to={`/workspace/${workspace.id}`}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 rounded-lg font-medium hover:shadow-lg transition-shadow"
          >
            Open Workspace
          </Link>
          <Link
            to={`/chat/${workspace.ownerId}`}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Chat
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceCard;