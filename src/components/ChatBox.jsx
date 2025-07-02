import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Send, ArrowLeft, MoreVertical } from 'lucide-react';
import { messages, users, currentUser } from '../data/sampleData';

const ChatBox = () => {
  const { id } = useParams();
  const [newMessage, setNewMessage] = useState('');
  const [chatMessages, setChatMessages] = useState(messages);

  const otherUser = users.find(u => u.id === id);
  const currentUserId = currentUser.id;

  const conversationMessages = chatMessages.filter(
    msg => 
      (msg.senderId === currentUserId && msg.receiverId === id) ||
      (msg.senderId === id && msg.receiverId === currentUserId)
  ).sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: `msg${Date.now()}`,
      senderId: currentUserId,
      receiverId: id,
      content: newMessage,
      createdAt: new Date().toISOString()
    };

    setChatMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!otherUser) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="hover:bg-white/20 p-2 rounded-lg transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <img
                src={otherUser.avatar}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full border-2 border-white/30"
              />
              <div>
                <h2 className="font-semibold">{otherUser.name}</h2>
                <p className="text-sm text-white/80">{otherUser.location}</p>
              </div>
            </div>
            <button className="hover:bg-white/20 p-2 rounded-lg transition-colors">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {conversationMessages.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-2">No messages yet</p>
              <p className="text-sm text-gray-400">Start a conversation with {otherUser.name}</p>
            </div>
          ) : (
            conversationMessages.map((message) => {
              const isCurrentUser = message.senderId === currentUserId;
              const sender = users.find(u => u.id === message.senderId);
              
              return (
                <div
                  key={message.id}
                  className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} space-x-3`}
                >
                  {!isCurrentUser && (
                    <img
                      src={sender?.avatar}
                      alt={sender?.name}
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      isCurrentUser
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        isCurrentUser ? 'text-white/70' : 'text-gray-500'
                      }`}
                    >
                      {formatTime(message.createdAt)}
                    </p>
                  </div>
                  {isCurrentUser && (
                    <img
                      src={users.find(u => u.id === currentUserId)?.avatar}
                      alt="You"
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={`Message ${otherUser.name}...`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;