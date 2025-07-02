import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Users, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Calendar,
  FileText,
  Download,
  Upload,
  Settings,
  MessageSquare
} from 'lucide-react';
import { workspaces, users, currentUser } from '../data/sampleData';

const WorkspaceDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('tasks');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const workspace = workspaces.find(w => w.id === id);
  
  if (!workspace) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Workspace not found</p>
      </div>
    );
  }

  const members = workspace.members.map(memberId => users.find(u => u.id === memberId)).filter(Boolean);
  const isOwner = workspace.ownerId === currentUser.id;
  const isMember = workspace.members.includes(currentUser.id);

  const getTaskStatusColor = (status) => {
    const colors = {
      'Todo': 'bg-orange-100 text-orange-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-green-100 text-green-800',
      'On Hold': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority] || 'text-gray-600';
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      // In a real app, this would update the backend
      console.log('Adding task:', newTaskTitle);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4 mb-4">
          <Link
            to="/workspaces"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{workspace.name}</h1>
            <p className="text-gray-600 mt-1">{workspace.description}</p>
          </div>
          {isOwner && (
            <Link
              to={`/workspace/${workspace.id}/settings`}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Settings className="h-5 w-5" />
            </Link>
          )}
        </div>

        {/* Workspace Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <span className="font-medium text-blue-900">{members.length} Members</span>
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-green-900">
                {workspace.tasks.filter(t => t.status === 'Completed').length} Completed
              </span>
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <span className="font-medium text-orange-900">
                {workspace.tasks.filter(t => t.status === 'In Progress').length} In Progress
              </span>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <span className="font-medium text-purple-900">{workspace.resources.length} Resources</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('tasks')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'tasks'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4" />
                <span>Tasks ({workspace.tasks.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('members')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'members'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>Members ({members.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'resources'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Resources ({workspace.resources.length})</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {/* Tasks Tab */}
          {activeTab === 'tasks' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Tasks</h3>
                {isMember && (
                  <button
                    onClick={() => setShowAddTask(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Task</span>
                  </button>
                )}
              </div>

              {/* Add Task Form */}
              {showAddTask && (
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      onClick={handleAddTask}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowAddTask(false)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Tasks List */}
              <div className="space-y-4">
                {workspace.tasks.length === 0 ? (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks yet</h3>
                    <p className="text-gray-500">Add your first task to get started</p>
                  </div>
                ) : (
                  workspace.tasks.map((task) => {
                    const assignedUser = users.find(u => u.id === task.assignedTo);
                    return (
                      <div key={task.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 mb-2">{task.title}</h4>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(task.status)}`}>
                                {task.status}
                              </span>
                              <span className={`font-medium ${getPriorityColor(task.priority)}`}>
                                {task.priority} Priority
                              </span>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>Due {new Date(task.dueDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          {assignedUser && (
                            <div className="flex items-center space-x-2">
                              <img
                                src={assignedUser.avatar}
                                alt={assignedUser.name}
                                className="w-8 h-8 rounded-full"
                              />
                              <span className="text-sm text-gray-600">{assignedUser.name}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
                {isOwner && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Invite Member</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {members.map((member) => (
                  <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-12 h-12 rounded-full"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.location}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {member.skills.slice(0, 3).map((skill) => (
                            <span
                              key={skill}
                              className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <Link
                        to={`/chat/${member.id}`}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <MessageSquare className="h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
                {isMember && (
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Upload className="h-4 w-4" />
                    <span>Upload Resource</span>
                  </button>
                )}
              </div>

              {workspace.resources.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No resources yet</h3>
                  <p className="text-gray-500">Upload documents, images, or other files to share with your team</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {workspace.resources.map((resource) => {
                    const uploader = users.find(u => u.id === resource.uploadedBy);
                    return (
                      <div key={resource.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-blue-50 rounded-lg">
                              <FileText className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{resource.name}</h4>
                              <p className="text-sm text-gray-500">
                                Uploaded by {uploader?.name} on {new Date(resource.uploadedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                            <Download className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceDetail;