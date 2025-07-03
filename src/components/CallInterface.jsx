import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Users, 
  Settings, 
  Monitor, 
  MessageSquare,
  MoreVertical,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Camera,
  CameraOff
} from 'lucide-react';
import { users } from '../data/sampleData';

const CallInterface = ({ 
  isOpen, 
  onClose, 
  callType = 'video', // 'video' or 'voice'
  participants = [],
  workspaceId 
}) => {
  const [isVideoEnabled, setIsVideoEnabled] = useState(callType === 'video');
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  
  const localVideoRef = useRef(null);
  const callStartTime = useRef(Date.now());

  // Simulate call duration timer
  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCallDuration(Math.floor((Date.now() - callStartTime.current) / 1000));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  // Format call duration
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onClose();
    setCallDuration(0);
    callStartTime.current = Date.now();
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'You',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In a real implementation, this would start/stop screen sharing
  };

  const participantUsers = participants.map(id => users.find(u => u.id === id)).filter(Boolean);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {callType === 'video' ? (
              <Video className="h-5 w-5 text-green-400" />
            ) : (
              <Phone className="h-5 w-5 text-green-400" />
            )}
            <span className="font-medium">
              {callType === 'video' ? 'Video Call' : 'Voice Call'}
            </span>
          </div>
          <div className="text-sm text-gray-300">
            {formatDuration(callDuration)}
          </div>
          <div className="flex items-center space-x-1 text-sm text-gray-300">
            <Users className="h-4 w-4" />
            <span>{participantUsers.length + 1}</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsChatOpen(!isChatOpen)}
            className={`p-2 rounded-lg transition-colors ${
              isChatOpen ? 'bg-blue-600' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            <MessageSquare className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </button>
          <button className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video/Voice Area */}
        <div className={`flex-1 relative ${isChatOpen ? 'mr-80' : ''}`}>
          {callType === 'video' ? (
            <div className="h-full bg-gray-900 relative">
              {/* Main Video Area */}
              <div className="h-full flex items-center justify-center">
                {participantUsers.length > 0 ? (
                  <div className={`grid gap-2 h-full w-full p-4 ${
                    participantUsers.length === 1 ? 'grid-cols-1' :
                    participantUsers.length <= 4 ? 'grid-cols-2' :
                    'grid-cols-3'
                  }`}>
                    {participantUsers.map((participant) => (
                      <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                          <img
                            src={participant.avatar}
                            alt={participant.name}
                            className="w-20 h-20 rounded-full border-4 border-white/20"
                          />
                        </div>
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-sm">
                          {participant.name}
                        </div>
                        <div className="absolute top-2 right-2 flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Video className="h-16 w-16" />
                    </div>
                    <p className="text-xl font-medium mb-2">Waiting for participants...</p>
                    <p className="text-gray-400">Invite team members to join the call</p>
                  </div>
                )}
              </div>

              {/* Local Video (Picture-in-Picture) */}
              {isVideoEnabled && (
                <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-gray-600">
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Camera className="h-8 w-8 mx-auto mb-2" />
                      <p className="text-sm">You</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Screen Share Indicator */}
              {isScreenSharing && (
                <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                  <Monitor className="h-4 w-4" />
                  <span>Sharing Screen</span>
                </div>
              )}
            </div>
          ) : (
            // Voice Call Interface
            <div className="h-full bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                  {[...participantUsers, { id: 'you', name: 'You', avatar: '/api/placeholder/150/150' }].map((participant) => (
                    <div key={participant.id} className="text-center">
                      <div className="relative mb-4">
                        <img
                          src={participant.avatar}
                          alt={participant.name}
                          className="w-24 h-24 rounded-full mx-auto border-4 border-white/20"
                        />
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-2 border-gray-900"></div>
                      </div>
                      <p className="font-medium">{participant.name}</p>
                      <div className="flex items-center justify-center mt-2">
                        <div className="flex space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-4 rounded-full ${
                                Math.random() > 0.5 ? 'bg-green-400' : 'bg-gray-600'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xl font-medium mb-2">Voice Call Active</p>
                <p className="text-gray-400">{participantUsers.length + 1} participants connected</p>
              </div>
            </div>
          )}
        </div>

        {/* Chat Sidebar */}
        {isChatOpen && (
          <div className="w-80 bg-white border-l border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Chat</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.length === 0 ? (
                <p className="text-gray-500 text-center">No messages yet</p>
              ) : (
                chatMessages.map((message) => (
                  <div key={message.id} className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm text-gray-900">{message.sender}</span>
                      <span className="text-xs text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-700">{message.content}</p>
                  </div>
                ))
              )}
            </div>

            <div className="p-4 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Call Controls */}
      <div className="bg-gray-900 p-4">
        <div className="flex items-center justify-center space-x-4">
          {/* Audio Toggle */}
          <button
            onClick={() => setIsAudioEnabled(!isAudioEnabled)}
            className={`p-4 rounded-full transition-colors ${
              isAudioEnabled 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            {isAudioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </button>

          {/* Video Toggle (only for video calls) */}
          {callType === 'video' && (
            <button
              onClick={() => setIsVideoEnabled(!isVideoEnabled)}
              className={`p-4 rounded-full transition-colors ${
                isVideoEnabled 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-red-600 hover:bg-red-700 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </button>
          )}

          {/* Screen Share (only for video calls) */}
          {callType === 'video' && (
            <button
              onClick={toggleScreenShare}
              className={`p-4 rounded-full transition-colors ${
                isScreenSharing 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-white'
              }`}
            >
              <Monitor className="h-6 w-6" />
            </button>
          )}

          {/* End Call */}
          <button
            onClick={handleEndCall}
            className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
          >
            <PhoneOff className="h-6 w-6" />
          </button>

          {/* More Options */}
          <button className="p-4 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors">
            <MoreVertical className="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CallInterface;