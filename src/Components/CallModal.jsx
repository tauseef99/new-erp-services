// frontend/src/components/CallModal.jsx
import React from 'react';
import { FaPhone, FaVideo, FaMicrophone, FaMicrophoneSlash, FaVideoSlash, FaTimes, FaUser } from 'react-icons/fa';

const CallModal = ({
  call,
  isIncoming,
  isActive,
  onAnswer,
  onReject,
  onEnd,
  onClose,
  localVideoRef,
  remoteVideoRef,
  localStream,
  remoteStream
}) => {
  const isVideoCall = call?.callType === 'video';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full mx-auto overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#708238] to-[#FFA500] p-6 text-white text-center">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-bold flex-1 text-center">
              {isIncoming ? 'Incoming Call' : isActive ? 'Call in Progress' : 'Calling...'}
            </h2>
            <div className="w-6"></div> {/* Spacer for balance */}
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              {call?.caller?.profileImage ? (
                <img 
                  src={call.caller.profileImage} 
                  alt={call.caller.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
              ) : (
                <FaUser size={24} />
              )}
            </div>
            <div className="text-left">
              <h3 className="font-semibold text-lg">
                {call?.caller?.name || 'Unknown User'}
              </h3>
              <p className="text-white text-opacity-80">
                {isVideoCall ? 'Video Call' : 'Audio Call'}
              </p>
              <p className="text-white text-opacity-60 text-sm">
                {isIncoming ? 'is calling you' : isActive ? 'Connected' : 'Ringing...'}
              </p>
            </div>
          </div>
        </div>

        {/* Video Feeds */}
        {isVideoCall && (
          <div className="relative bg-black h-64">
            {/* Remote Video */}
            {remoteStream && (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                muted={false}
                className="w-full h-full object-cover"
              />
            )}
            
            {/* Local Video Preview */}
            {localStream && (
              <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white">
                <video
                  ref={localVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            {/* Placeholder when no video */}
            {!remoteStream && !localStream && (
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <FaVideo size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Video feed will appear here</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Audio Only UI */}
        {!isVideoCall && (
          <div className="py-8 bg-gray-50">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#708238] to-[#FFA500] rounded-full flex items-center justify-center">
                {call?.caller?.profileImage ? (
                  <img 
                    src={call.caller.profileImage} 
                    alt={call.caller.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser size={32} className="text-white" />
                )}
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {call?.caller?.name || 'Unknown User'}
              </h3>
              <p className="text-gray-600">
                {isIncoming ? 'Incoming audio call' : isActive ? 'Audio call connected' : 'Calling...'}
              </p>
              {isActive && (
                <div className="mt-4 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Call Controls */}
        <div className="p-6 bg-white">
          <div className="flex justify-center space-x-6">
            {isIncoming ? (
              // Incoming call controls
              <>
                <button
                  onClick={onReject}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition transform hover:scale-105"
                  title="Reject Call"
                >
                  <FaTimes size={24} />
                </button>
                <button
                  onClick={() => onAnswer(call?.callType)}
                  className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center text-white transition transform hover:scale-105"
                  title="Answer Call"
                >
                  <FaPhone size={20} />
                </button>
              </>
            ) : isActive ? (
              // Active call controls
              <>
                <button
                  onClick={() => {/* Toggle mute - implement if needed */}}
                  className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 transition"
                  title="Toggle Microphone"
                >
                  <FaMicrophone size={20} />
                </button>
                {isVideoCall && (
                  <button
                    onClick={() => {/* Toggle video - implement if needed */}}
                    className="w-14 h-14 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-700 transition"
                    title="Toggle Video"
                  >
                    <FaVideo size={20} />
                  </button>
                )}
                <button
                  onClick={onEnd}
                  className="w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition"
                  title="End Call"
                >
                  <FaTimes size={20} />
                </button>
              </>
            ) : (
              // Outgoing call controls (waiting for answer)
              <>
                <button
                  onClick={onEnd}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition transform hover:scale-105"
                  title="Cancel Call"
                >
                  <FaTimes size={24} />
                </button>
                <div className="flex items-center">
                  <div className="animate-pulse text-gray-600">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <p className="text-sm mt-2">Waiting for answer...</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Call duration or status */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-600">
              {isActive 
                ? 'Call in progress' 
                : isIncoming 
                  ? 'Answer the call to connect' 
                  : 'Calling...'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CallModal;