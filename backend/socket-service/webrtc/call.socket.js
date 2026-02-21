const callSocketHandlers = (io, socket) => {
    // 1. Call Initiation
    socket.on('call_user', ({ userToCall, signalData, from, name, callType }) => {
        console.log(`[CallSocket] call_user from ${from} to ${userToCall} type ${callType}`);
        io.to(`user:${userToCall}`).emit('incoming_call', {
            signal: signalData,
            from,
            name,
            callType
        });
    });

    // 2. Accept Call
    socket.on('accept_call', (data) => {
        console.log(`[CallSocket] accept_call to ${data.to}`);
        io.to(`user:${data.to}`).emit('call_accepted', data.signal);
    });

    // 3. Reject Call
    socket.on('reject_call', (data) => {
        console.log(`[CallSocket] reject_call to ${data.to}`);
        io.to(`user:${data.to}`).emit('call_rejected', { reason: 'rejected' });
    });

    // 4. End Call
    socket.on('end_call', ({ to }) => {
        console.log(`[CallSocket] end_call to ${to}`);
        io.to(`user:${to}`).emit('call_ended');
    });

    // 5. WebRTC Offer (Optional if using simple call_user)
    socket.on('webrtc_offer', ({ to, offer }) => {
        io.to(`user:${to}`).emit('webrtc_offer', { from: socket.userId, offer });
    });

    // 6. WebRTC Answer
    socket.on('webrtc_answer', ({ to, answer }) => {
        io.to(`user:${to}`).emit('webrtc_answer', { from: socket.userId, answer });
    });

    // 7. ICE Candidate
    socket.on('ice_candidate', ({ to, candidate }) => {
        io.to(`user:${to}`).emit('ice_candidate', { from: socket.userId, candidate });
    });
};

module.exports = callSocketHandlers;
