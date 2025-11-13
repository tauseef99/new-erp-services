// frontend/src/hooks/useWebRTC.js
import { useState, useRef, useCallback, useEffect } from 'react';
import socketService from '../services/socketService';
import callAPI from '../services/callService';

const useWebRTC = (localVideoRef, remoteVideoRef) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isCallInProgress, setIsCallInProgress] = useState(false);
  const [callType, setCallType] = useState('audio');
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [currentCall, setCurrentCall] = useState(null);

  const peerConnection = useRef(null);
  const currentCallRef = useRef(null);
  const localStreamRef = useRef(null);

  // STUN servers configuration
  const iceServers = {
    iceServers: [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
    ],
  };

  // Get the other user's ID
  const getOtherUserId = useCallback(() => {
    if (!currentCallRef.current) return null;
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) return null;
    
    return currentCallRef.current.caller._id === user.id 
      ? currentCallRef.current.receiver._id 
      : currentCallRef.current.caller._id;
  }, []);

  // Initialize local media stream
  const initializeLocalStream = useCallback(async (type = 'audio') => {
    try {
      console.log('🎥 Initializing local stream for:', type);
      
      // Stop existing stream if any
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }

      const constraints = {
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: type === 'video' ? {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          frameRate: { ideal: 30 }
        } : false
      };

      console.log('📹 Requesting media with constraints:', constraints);
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      console.log('✅ Local stream obtained:', stream);
      
      setLocalStream(stream);
      localStreamRef.current = stream;
      
      if (localVideoRef.current) {
        localVideoRef.current.srcObject = stream;
        console.log('✅ Local video ref updated');
      }

      return stream;
    } catch (error) {
      console.error('❌ Error accessing media devices:', error);
      throw new Error(`Failed to access ${type} devices: ${error.message}`);
    }
  }, [localVideoRef]);

  // End call function
  const endCall = useCallback(async () => {
    try {
      console.log('📞 Ending call...');
      
      // Send end call notification if we have an active call
      if (currentCallRef.current) {
        console.log('📡 Sending end call API request for:', currentCallRef.current._id);
        try {
          await callAPI.endCall({ callId: currentCallRef.current._id });
        } catch (apiError) {
          console.error('❌ API error ending call:', apiError);
        }

        // Emit socket event to notify other user
        const targetUserId = getOtherUserId();
        if (targetUserId) {
          socketService.emitEndCall({
            callId: currentCallRef.current._id,
            targetUserId
          });
        }
      }

      // Clean up peer connection
      if (peerConnection.current) {
        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.onconnectionstatechange = null;
        peerConnection.current.close();
        peerConnection.current = null;
        console.log('✅ Peer connection closed');
      }

      // Clean up local stream
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => {
          console.log('🛑 Stopping track:', track.kind);
          track.stop();
        });
        localStreamRef.current = null;
        setLocalStream(null);
        console.log('✅ Local stream stopped');
      }

      // Clean up remote stream
      setRemoteStream(null);
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = null;
      }

      // Reset states
      setIsCallActive(false);
      setIsCallInProgress(false);
      setCurrentCall(null);
      currentCallRef.current = null;

      console.log('✅ Call ended completely');
    } catch (error) {
      console.error('❌ Error ending call:', error);
    }
  }, [getOtherUserId, remoteVideoRef]);

  // Initialize peer connection
  const createPeerConnection = useCallback(() => {
    try {
      console.log('🔗 Creating peer connection...');
      const pc = new RTCPeerConnection(iceServers);
      
      // Add local stream to connection
      if (localStreamRef.current) {
        console.log('➕ Adding local tracks to peer connection');
        localStreamRef.current.getTracks().forEach(track => {
          pc.addTrack(track, localStreamRef.current);
          console.log('✅ Added track:', track.kind);
        });
      }

      // Handle remote stream
      pc.ontrack = (event) => {
        console.log('📹 Remote track received:', event.streams[0]);
        const remoteStream = event.streams[0];
        setRemoteStream(remoteStream);
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          console.log('✅ Remote video ref updated');
        }
      };

      // Handle ICE candidates
      pc.onicecandidate = (event) => {
        console.log('❄️ ICE candidate event:', event.candidate ? 'candidate generated' : 'all candidates generated');
        if (event.candidate && currentCallRef.current) {
          const targetUserId = getOtherUserId();
          if (targetUserId) {
            console.log('📤 Sending ICE candidate to:', targetUserId);
            
            socketService.emitICECandidate({
              callId: currentCallRef.current._id,
              candidate: event.candidate,
              targetUserId
            });
          }
        }
      };

      // Handle connection state changes
      pc.onconnectionstatechange = () => {
        console.log('🔗 Connection state changed:', pc.connectionState);
        switch (pc.connectionState) {
          case 'connected':
            setIsCallActive(true);
            console.log('✅ WebRTC connection established');
            break;
          case 'disconnected':
          case 'failed':
            console.log('❌ WebRTC connection failed, ending call');
            endCall();
            break;
          case 'closed':
            console.log('🔒 WebRTC connection closed');
            break;
        }
      };

      // Handle ICE connection state
      pc.oniceconnectionstatechange = () => {
        console.log('🧊 ICE connection state:', pc.iceConnectionState);
        if (pc.iceConnectionState === 'failed' || pc.iceConnectionState === 'disconnected') {
          console.log('❌ ICE connection failed');
        }
      };

      peerConnection.current = pc;
      console.log('✅ Peer connection created successfully');
      return pc;
    } catch (error) {
      console.error('❌ Error creating peer connection:', error);
      throw error;
    }
  }, [endCall, getOtherUserId]);

  // Start a call
  const startCall = useCallback(async (conversationId, type = 'audio') => {
    try {
      console.log('🚀 START CALL PROCESS STARTED');
      console.log('📞 Starting call...', { conversationId, type });
      
      setIsCallInProgress(true);
      setCallType(type);

      // Step 1: Initialize local stream
      console.log('🎥 Step 1: Initializing local stream...');
      await initializeLocalStream(type);
      console.log('✅ Local stream initialized');
      
      // Step 2: Create peer connection
      console.log('🔗 Step 2: Creating peer connection...');
      const pc = createPeerConnection();
      console.log('✅ Peer connection created');

      // Step 3: Create offer
      console.log('📝 Step 3: Creating offer...');
      const offer = await pc.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: type === 'video'
      });
      console.log('✅ Offer created:', offer.type);
      
      await pc.setLocalDescription(offer);
      console.log('✅ Local description set');

      // Step 4: Send offer to server
      console.log('📡 Step 4: Sending offer to server...');
      const response = await callAPI.createCallOffer({
        conversationId,
        callType: type,
        offer
      });

      console.log('✅ Server response:', response);
      
      if (response.data && response.data.call) {
        const call = response.data.call;
        setCurrentCall(call);
        currentCallRef.current = call;
        console.log('✅ Call created on server:', call._id);
        
        // Return the call object - DON'T end the call here
        console.log('⏳ Waiting for receiver to answer the call...');
        return call;
      } else {
        throw new Error('No call data returned from server');
      }

    } catch (error) {
      console.error('❌ ERROR in startCall:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      
      // Clean up on error
      await endCall();
      throw error;
    }
  }, [initializeLocalStream, createPeerConnection, endCall]);

  // Answer incoming call
  const answerCall = useCallback(async (call, type = 'audio') => {
    try {
      console.log('📞 Answering call...', call._id);
      
      setIsCallInProgress(true);
      setCallType(type);
      setCurrentCall(call);
      currentCallRef.current = call;

      // Initialize local stream
      await initializeLocalStream(type);
      
      // Create peer connection
      const pc = createPeerConnection();
      
      // Set remote description from offer
      await pc.setRemoteDescription(new RTCSessionDescription(call.offer));
      console.log('✅ Remote description set from offer');

      // Create answer
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      console.log('✅ Answer created and local description set');

      // Send answer to server
      await callAPI.answerCall({
        callId: call._id,
        answer
      });

      console.log('✅ Call answered successfully');

    } catch (error) {
      console.error('❌ Error answering call:', error);
      // Clean up on error
      await endCall();
      throw error;
    }
  }, [initializeLocalStream, createPeerConnection, endCall]);

  // Handle incoming call offer
  const handleIncomingCall = useCallback(async (data) => {
    try {
      console.log('📞 Incoming call received:', data);
      
      // Store call data for later use
      setCurrentCall(data.call);
      currentCallRef.current = data.call;
      setCallType(data.call.callType);

      return data.call;
    } catch (error) {
      console.error('❌ Error handling incoming call:', error);
      throw error;
    }
  }, []);

  // Handle remote answer
  const handleRemoteAnswer = useCallback(async (data) => {
    try {
      console.log('📞 Remote answer received:', data);
      
      if (peerConnection.current && data.answer) {
        await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.answer));
        console.log('✅ Remote description set from answer');
        setIsCallActive(true);
      }
    } catch (error) {
      console.error('❌ Error handling remote answer:', error);
    }
  }, []);

  // Handle ICE candidate from remote
  const handleRemoteICECandidate = useCallback(async (data) => {
    try {
      console.log('❄️ Handling remote ICE candidate:', data);
      if (peerConnection.current && data.candidate) {
        await peerConnection.current.addIceCandidate(new RTCIceCandidate(data.candidate));
        console.log('✅ Remote ICE candidate added');
      }
    } catch (error) {
      console.error('❌ Error adding remote ICE candidate:', error);
    }
  }, []);

  // Handle call ended by remote
  const handleCallEnded = useCallback(async (data) => {
    console.log('📞 Call ended by remote:', data);
    await endCall();
  }, [endCall]);

  // Handle call rejected by remote
  const handleCallRejected = useCallback(async (data) => {
    console.log('📞 Call rejected by remote:', data);
    await endCall();
  }, [endCall]);

  // Reject call
  const rejectCall = useCallback(async (callId) => {
    try {
      console.log('📞 Rejecting call:', callId);
      await callAPI.rejectCall({ callId });
      
      // Emit socket event to notify caller
      if (currentCallRef.current) {
        const targetUserId = getOtherUserId();
        if (targetUserId) {
          socketService.emitRejectCall({
            callId: currentCallRef.current._id,
            targetUserId
          });
        }
      }
      
      await endCall();
      console.log('✅ Call rejected');
    } catch (error) {
      console.error('❌ Error rejecting call:', error);
      await endCall();
      throw error;
    }
  }, [endCall, getOtherUserId]);

  // Toggle video
  const toggleVideo = useCallback(() => {
    if (!localStreamRef.current) return false;

    const videoTrack = localStreamRef.current.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled;
      console.log('🎥 Video', videoTrack.enabled ? 'enabled' : 'disabled');
      return videoTrack.enabled;
    }
    return false;
  }, []);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    if (!localStreamRef.current) return false;

    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      console.log('🎤 Audio', audioTrack.enabled ? 'enabled' : 'disabled');
      return audioTrack.enabled;
    }
    return false;
  }, []);

  // Setup socket listeners
  useEffect(() => {
    console.log('🔌 Setting up WebRTC socket listeners...');

    // Remove any existing listeners first
    socketService.offIncomingCall();
    socketService.offCallAnswered();
    socketService.offICECandidate();
    socketService.offCallEnded();
    socketService.offCallRejected();

    // Add new listeners
    socketService.onIncomingCall(handleIncomingCall);
    socketService.onCallAnswered(handleRemoteAnswer);
    socketService.onICECandidate(handleRemoteICECandidate);
    socketService.onCallEnded(handleCallEnded);
    socketService.onCallRejected(handleCallRejected);

    return () => {
      console.log('🔌 Cleaning up WebRTC socket listeners...');
      socketService.offIncomingCall();
      socketService.offCallAnswered();
      socketService.offICECandidate();
      socketService.offCallEnded();
      socketService.offCallRejected();
    };
  }, [handleIncomingCall, handleRemoteAnswer, handleRemoteICECandidate, handleCallEnded, handleCallRejected]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      console.log('🧹 Cleaning up WebRTC hook...');
      if (isCallActive || isCallInProgress) {
        endCall();
      }
    };
  }, [isCallActive, isCallInProgress, endCall]);

  return {
    // State
    isCallActive,
    isCallInProgress,
    callType,
    localStream,
    remoteStream,
    currentCall,

    // Methods
    startCall,
    answerCall,
    endCall,
    rejectCall,
    toggleVideo,
    toggleAudio,
    handleIncomingCall,
  };
};

export default useWebRTC;