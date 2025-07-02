import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Lightbulb, TrendingUp, Users, Eye, Heart, Calendar, Briefcase } from 'lucide-react';
import { ideas, users, messages, workspaces, currentUser } from '../data/sampleData';
import IdeaCard from './IdeaCard';
import WorkspaceCard from './WorkspaceCard';

const DashboardSection = () => {
  const [activeTab, setActiveTab] = useState('ideas');

  // Filter user's ideas
  const userIdeas = ideas.filter(idea => idea.creatorId === currentUser.id);

  // Filter user's workspaces
  const userWorkspaces = workspaces.filter(workspace => 
    workspace.ownerId === currentUser.id || workspace.members.includes(currentUser.id)
  );

  // Get user's conversations
  const userConversations = messages
    .filter(msg => msg.senderId === currentUser.id || msg.receiverId === currentUser.id)
    .reduce((acc, msg) => {
      const otherId = msg.senderId === currentUser.id ? msg.receiverId : msg.senderId;
      if (!acc[otherId]) {
        acc[otherId] = [];
      }
      acc[otherId].push(msg);
      return acc;
    }, {});

  const conversations = Object.entries(userConversations).map(([userId, msgs]) => {
    const otherUser = users.find(u => u.id === userId);
    const lastMessage = msgs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];
    return {
      user: otherUser,
      lastMessage,
      messageCount: msgs.length
    };
  });

  const stats = [
    {
      title: 'Your Ideas',
      value: userIdeas.length,
      icon: Lightbulb,
      color: 'text-blue-600 bg-blue-100'
    },
    {
      title: 'Workspaces',
      value: userWorkspaces.length,
      icon: Briefcase,
      color: 'text-purple-600 bg-purple-100'
    },
    {
      title: 'Connections',
      value: conversations.length,
      icon: Users,
      color: 'text-green-600 bg-green-100'
    },
    {
      title: 'Messages',
      value: messages.filter(m => m.senderId === currentUser.id || m.receiverId === currentUser.id).length,
      icon: MessageSquare,
      color: 'text-orange-600 bg-orange-100'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser.name}!</h1>
        <p className="text-white/90 mb-6">
          Track your ideas, manage workspaces, and grow your network.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/post-idea"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Post New Idea
          </Link>
          <Link
            to="/workspace/create"
            className="border border-white/30 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            Create Workspace
          </Link>
          <Link
            to="/ideas"
            className="border border-white/30 text-white px-6 py-2 rounded-lg font-medium hover:bg-white/10 transition-colors"
          >
            Browse Ideas
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'ideas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4" />
                <span>My Ideas ({userIdeas.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('workspaces')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'workspaces'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Briefcase className="h-4 w-4" />
                <span>Workspaces ({userWorkspaces.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab('chats')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'chats'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-4 w-4" />
                <span>Conversations ({conversations.length})</span>
              </div>
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'ideas' && (
            <div>
              {userIdeas.length === 0 ? (
                <div className="text-center py-12">
                  <Lightbulb className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No ideas yet</h3>
                  <p className="text-gray-500 mb-6">Share your first idea with the community</p>
                  <Link
                    to="/post-idea"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Post Your First Idea
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userIdeas.map((idea) => (
                    <IdeaCard key={idea.id} idea={idea} showActions={false} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'workspaces' && (
            <div>
              {userWorkspaces.length === 0 ? (
                <div className="text-center py-12">
                  <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No workspaces yet</h3>
                  <p className="text-gray-500 mb-6">Create your first workspace to start collaborating</p>
                  <Link
                    to="/workspace/create"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Create Your First Workspace
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {userWorkspaces.map((workspace) => (
                    <WorkspaceCard key={workspace.id} workspace={workspace} />
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'chats' && (
            <div>
              {conversations.length === 0 ? (
                <div className="text-center py-12">
                  <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No conversations yet</h3>
                  <p className="text-gray-500 mb-6">Start connecting with other entrepreneurs</p>
                  <Link
                    to="/ideas"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transition-shadow"
                  >
                    Browse Ideas
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {conversations.map(({ user, lastMessage, messageCount }) => (
                    <Link
                      key={user.id}
                      to={`/chat/${user.id}`}
                      className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {user.name}
                            </h4>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(lastMessage.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 truncate mt-1">
                            {lastMessage.content}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-gray-400">{user.location}</span>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {messageCount} messages
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;