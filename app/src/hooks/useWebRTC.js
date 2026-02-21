import { useEffect, useRef, useState, useCallback } from 'react';
import { startCallLog, updateCallLogStatus } from '../api/callApi';

const useWebRTC = (socket, userId) => {
    const [localStream, setLocalStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [callStatus, setCallStatus] = useState('idle'); // idle, calling, incoming, connected, ended
    const [isAudioMuted, setIsAudioMuted] = useState(false);
    const [isVideoOff, setIsVideoOff] = useState(false);
    const [currentCallLogId, setCurrentCallLogId] = useState(null);
    const [startTime, setStartTime] = useState(null);

    const peerConnection = useRef(null);
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);

    const iceServers = {
        iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            // Add TURN servers here if available from env
        ]
    };

    const cleanup = useCallback(() => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
        }
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        setLocalStream(null);
        setRemoteStream(null);
        setCallStatus('idle');
    }, [localStream]);

    const initLocalStream = async (video = true, audio = true) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video, audio });
            setLocalStream(stream);
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            return stream;
        } catch (err) {
            console.error("Error accessing media devices:", err);
            throw err;
        }
    };

    const createPeerConnection = (targetUserId, stream) => {
        const pc = new RTCPeerConnection(iceServers);

        stream.getTracks().forEach(track => {
            pc.addTrack(track, stream);
        });

        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            if (remoteVideoRef.current) {
                remoteVideoRef.current.srcObject = event.streams[0];
            }
        };

        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.emit('ice_candidate', { to: targetUserId, candidate: event.candidate });
            }
        };

        peerConnection.current = pc;
        return pc;
    };

    const startCall = async (targetUserId, callType) => {
        setCallStatus('calling');
        try {
            const log = await startCallLog(userId, targetUserId, callType);
            setCurrentCallLogId(log.id);
            setStartTime(new Date());

            const stream = await initLocalStream(callType === 'video', true);
            const pc = createPeerConnection(targetUserId, stream);

            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            socket.emit('call_user', {
                userToCall: targetUserId,
                signalData: offer,
                from: userId,
                name: 'User',
                callType,
                callLogId: log.id
            });
        } catch (err) {
            console.error("Failed to start call:", err);
            setCallStatus('idle');
        }
    };

    const acceptCall = async (callerId, offer, callType, logId) => {
        setCallStatus('connected');
        setStartTime(new Date());
        setCurrentCallLogId(logId || null);

        if (logId) {
            await updateCallLogStatus(logId, 'completed', new Date(), 0);
        }

        const stream = await initLocalStream(callType === 'video', true);
        const pc = createPeerConnection(callerId, stream);

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.emit('accept_call', { signal: answer, to: callerId });
    };

    const endCall = async (targetUserId) => {
        socket.emit('end_call', { to: targetUserId });

        if (currentCallLogId) {
            const endTime = new Date();
            const duration = startTime ? Math.floor((endTime - startTime) / 1000) : 0;
            await updateCallLogStatus(currentCallLogId, 'completed', endTime, duration);
        }

        cleanup();
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('webrtc_offer', async ({ from, offer }) => {
            // This is handled via incoming_call usually in this flow
        });

        socket.on('call_accepted', async (signal) => {
            if (peerConnection.current) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(signal));
                setCallStatus('connected');
            }
        });

        socket.on('ice_candidate', async ({ candidate }) => {
            if (peerConnection.current && candidate) {
                try {
                    await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                } catch (e) {
                    console.error("Error adding ice candidate:", e);
                }
            }
        });

        socket.on('call_ended', () => {
            cleanup();
        });

        socket.on('call_rejected', () => {
            alert('Call rejected by user');
            cleanup();
        });

        return () => {
            socket.off('call_accepted');
            socket.off('ice_candidate');
            socket.off('call_ended');
        };
    }, [socket, cleanup]);

    const toggleAudio = () => {
        if (localStream) {
            const audioTrack = localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = !audioTrack.enabled;
                setIsAudioMuted(!audioTrack.enabled);
            }
        }
    };

    const toggleVideo = () => {
        if (localStream) {
            const videoTrack = localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = !videoTrack.enabled;
                setIsVideoOff(!videoTrack.enabled);
            }
        }
    };

    return {
        localStream,
        remoteStream,
        callStatus,
        setCallStatus,
        startCall,
        acceptCall,
        endCall,
        localVideoRef,
        remoteVideoRef,
        toggleAudio,
        toggleVideo,
        isAudioMuted,
        isVideoOff,
        cleanup
    };
};

export default useWebRTC;
