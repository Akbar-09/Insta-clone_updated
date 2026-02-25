const callSocketHandlers = (io, socket) => {
    // 1. Initiate Call
    socket.on('call_user', ({ to, callerId, callerName, callerAvatar, callType, session }) => {
        console.log(`[CallSocket] call_user from ${callerId} to ${to} type ${callType}`);
        io.to(`user:${to}`).emit('incoming_call', {
            from: callerId,
            name: callerName,
            avatar: callerAvatar,
            callType,
            session
        });
    });

    // 2. Accept Call
    socket.on('accept_call', ({ to, session }) => {
        console.log(`[CallSocket] accept_call from ${socket.id} to ${to}`);
        io.to(`user:${to}`).emit('call_accepted', {
            session
        });
    });

    // 3. Reject Call
    socket.on('reject_call', ({ to, session_id }) => {
        console.log(`[CallSocket] reject_call to ${to}`);
        io.to(`user:${to}`).emit('call_rejected', { session_id });
    });

    // 4. End Call
    socket.on('end_call', ({ to, session_id }) => {
        console.log(`[CallSocket] end_call to ${to}`);
        io.to(`user:${to}`).emit('call_ended', { session_id });
    });

    // 5. Toggle Audio/Video (Sync UI states if needed)
    socket.on('call:toggle_media', ({ to, type, enabled }) => {
        io.to(`user:${to}`).emit('call:media_toggled', { type, enabled });
    });
};

module.exports = callSocketHandlers;
