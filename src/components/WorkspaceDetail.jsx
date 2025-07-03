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
  MessageSquare,
  BarChart3,
  Target,
  TrendingUp,
  Video,
  Phone,
  Monitor
} from 'lucide-react';
import { workspaces, users, currentUser } from '../data/sampleData';
import CallInterface from './CallInterface';

const WorkspaceDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [isCallOpen, setIsCallOpen] = useState(false);
  const [callType, setCallType] = useState('video');

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

  const getProgressStats = () => {
    const totalTasks = workspace.tasks.length;
    const completedTasks = workspace.tasks.filter(t => t.status === 'Completed').length;
    const inProgressTasks = workspace.tasks.filter(t => t.status === 'In Progress').length;
    const todoTasks = workspace.tasks.filter(t => t.status === 'Todo').length;
    
    const totalEstimatedHours = workspace.tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const totalActualHours = workspace.tasks.reduce((sum, task) => sum + task.actualHours, 0);
    
    return {
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0,
      totalEstimatedHours,
      totalActualHours,
      efficiency: totalEstimatedHours > 0 ? Math.round((totalEstimatedHours / Math.max(totalActualHours, 1)) * 100) : 100
    };
  };

  const getMemberContributions = () => {
    return members.map(member => {
      const memberTasks = workspace.tasks.filter(task => task.assignedTo === member.id);
      const completedTasks = memberTasks.filter(task => task.status === 'Completed').length;
      const totalHours = memberTasks.reduce((sum, task) => sum + task.actualHours, 0);
      
      return {
        ...member,
        tasksAssigned: memberTasks.length,
        tasksCompleted: completedTasks,
        hoursContributed: totalHours,
        completionRate: memberTasks.length > 0 ? Math.round((completedTasks / memberTasks.length) * 100) : 0
      };
    });
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      // In a real app, this would update the backend
      console.log('Adding task:', newTaskTitle);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  const startCall = (type) => {
    setCallType(type);
    setIsCallOpen(true);
  };

  const progressStats = getProgressStats();
  const memberContributions = getMemberContributions();

  return (
    <>
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
            
            {/* Call Controls */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => startCall('voice')}
                className="p-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                title="Start Voice Call"
              >
                <Phone className="h-5 w-5" />
                <span className="hidden sm:inline">Voice Call</span>
              </button>
              <button
                onClick={() => startCall('video')}
                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
                title="Start Video Call"
              >
                <Video className="h-5 w-5" />
                <span className="hidden sm:inline">Video Call</span>
              </button>
              {isOwner && (
                <Link
                  to={`/workspace/${workspace.id}/settings`}
                  className="p-3 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Settings className="h-5 w-5" />
                </Link>
              )}
            </div>
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
                  {progressStats.completionRate}% Complete
                </span>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-orange-900">
                  {progressStats.totalActualHours}h Worked
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
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Overview</span>
                </div>
              </button>
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
                  <span>Team ({members.length})</span>
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
              <button
                onClick={() => setActiveTab('timeline')}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === 'timeline'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Timeline</span>
                </div>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* Progress Overview */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Progress</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Completion Chart */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Task Completion</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Completed</span>
                          <span className="text-sm font-medium text-green-600">
                            {progressStats.completedTasks}/{progressStats.totalTasks}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                          <div
                            className="bg-green-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${progressStats.completionRate}%` }}
                          ></div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                          {progressStats.completionRate}%
                        </div>
                      </div>
                    </div>

                    {/* Time Tracking */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h4 className="font-medium text-gray-900 mb-4">Time Tracking</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Estimated</span>
                          <span className="text-sm font-medium">{progressStats.totalEstimatedHours}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Actual</span>
                          <span className="text-sm font-medium">{progressStats.totalActualHours}h</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Efficiency</span>
                          <span className={`text-sm font-medium ${
                            progressStats.efficiency >= 100 ? 'text-green-600' : 'text-orange-600'
                          }`}>
                            {progressStats.efficiency}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Milestones</h3>
                  <div className="space-y-4">
                    {workspace.milestones?.map((milestone) => (
                      <div key={milestone.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-medium text-gray-900">{milestone.title}</h4>
                            <p className="text-sm text-gray-600">{milestone.description}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTaskStatusColor(milestone.status)}`}>
                            {milestone.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex-1 mr-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${milestone.progress}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="text-sm text-gray-500">
                            Due: {new Date(milestone.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Contributions */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Contributions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {memberContributions.map((member) => (
                      <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{member.name}</h4>
                            <p className="text-sm text-gray-500">{member.location}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-3 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{member.tasksCompleted}</div>
                            <div className="text-xs text-gray-500">Tasks Done</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{member.hoursContributed}h</div>
                            <div className="text-xs text-gray-500">Hours</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">{member.completionRate}%</div>
                            <div className="text-xs text-gray-500">Success Rate</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

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
                              <p className="text-sm text-gray-600 mb-3">{task.description}</p>
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
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{task.actualHours}h / {task.estimatedHours}h</span>
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
                  {memberContributions.map((member) => (
                    <div key={member.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-4 mb-4">
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
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => startCall('video')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Video Call"
                          >
                            <Video className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => startCall('voice')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Voice Call"
                          >
                            <Phone className="h-4 w-4" />
                          </button>
                          <Link
                            to={`/chat/${member.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <MessageSquare className="h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                      
                      {/* Member Stats */}
                      <div className="grid grid-cols-3 gap-3 text-center bg-gray-50 rounded-lg p-3">
                        <div>
                          <div className="text-sm font-bold text-blue-600">{member.tasksCompleted}</div>
                          <div className="text-xs text-gray-500">Tasks</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-green-600">{member.hoursContributed}h</div>
                          <div className="text-xs text-gray-500">Hours</div>
                        </div>
                        <div>
                          <div className="text-sm font-bold text-purple-600">{member.completionRate}%</div>
                          <div className="text-xs text-gray-500">Success</div>
                        </div>
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

            {/* Timeline Tab */}
            {activeTab === 'timeline' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
                
                {workspace.timeline && workspace.timeline.length > 0 ? (
                  <div className="space-y-6">
                    {workspace.timeline.map((event, index) => (
                      <div key={event.id} className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.type === 'milestone' ? 'bg-green-100' : 'bg-blue-100'
                          }`}>
                            {event.type === 'milestone' ? (
                              <Target className={`h-5 w-5 ${event.type === 'milestone' ? 'text-green-600' : 'text-blue-600'}`} />
                            ) : (
                              <Calendar className={`h-5 w-5 ${event.type === 'milestone' ? 'text-green-600' : 'text-blue-600'}`} />
                            )}
                          </div>
                          {index < workspace.timeline.length - 1 && (
                            <div className="w-0.5 h-8 bg-gray-200 mx-auto mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{event.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{event.participants.length} participants</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No timeline events yet</h3>
                    <p className="text-gray-500">Project milestones and events will appear here</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Call Interface */}
      <CallInterface
        isOpen={isCallOpen}
        onClose={() => setIsCallOpen(false)}
        callType={callType}
        participants={workspace.members}
        workspaceId={workspace.id}
      />
    </>
  );
};

export default WorkspaceDetail;