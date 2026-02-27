const socketIo = require('socket.io');
const callSocketHandlers = require('../webrtc/call.socket');

let io;

const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*", // Allow all for dev, restrict in prod
            methods: ["GET", "POST"]
        }
    });

    io.on('connection', (socket) => {
        console.log('New client connected:', socket.id);

        // Join user to their personal room
        socket.on('join', (userId) => {
            console.log(`[SocketManager] Handle join: userId=${userId}, socketId=${socket.id}`);
            if (userId) {
                socket.join(`user:${userId}`);
                console.log(`[SocketManager] Socket ${socket.id} joined room user:${userId}`);
            } else {
                console.warn(`[SocketManager] Join attempted with null userId for socket ${socket.id}`);
            }
        });

        socket.on('join_live_room', ({ streamId }) => {
            if (streamId) {
                const roomName = `live_stream_${streamId}`;
                socket.join(roomName);
                console.log(`Socket ${socket.id} joined ${roomName}`);

                // Broadcast updated viewer count
                const room = io.sockets.adapter.rooms.get(roomName);
                const numClients = room ? room.size : 0;
                io.to(roomName).emit('viewer_count_update', numClients);
            }
        });

        socket.on('leave_live_room', ({ streamId }) => {
            if (streamId) {
                const roomName = `live_stream_${streamId}`;
                socket.leave(roomName);

                const room = io.sockets.adapter.rooms.get(roomName);
                const numClients = room ? room.size : 0;
                io.to(roomName).emit('viewer_count_update', numClients);
            }
        });

        socket.on('disconnecting', () => {
            // Calculate and emit viewer count for all live stream rooms this socket was in before leaving
            for (const room of socket.rooms) {
                if (room.startsWith('live_stream_')) {
                    const roomSockets = io.sockets.adapter.rooms.get(room);
                    // the socket is still in the room, so subtract 1
                    const numClients = roomSockets ? roomSockets.size - 1 : 0;
                    io.to(room).emit('viewer_count_update', numClients);
                }
            }
        });

        socket.on('send_live_message', (data) => {
            // data: { streamId, message, username }
            if (data.streamId) {
                const roomName = `live_stream_${data.streamId}`;
                // Avoid echoing to sender if they add optimistic update, but normally we just broadcast
                // For simplicity, we broadcast to the room. The frontend handles deduplication or just displays it.
                socket.to(roomName).emit('new_live_message', {
                    id: Date.now(),
                    user_id: socket.userId || 'user',
                    username: data.username || 'User',
                    message: data.message,
                    created_at: new Date().toISOString()
                });
            }
        });

        socket.on('send_reaction', ({ streamId, emoji }) => {
            if (streamId) {
                socket.to(`live_stream_${streamId}`).emit('new_reaction', { emoji });
            }
        });

        socket.on('request_cohost', ({ streamId, userId, username }) => {
            if (streamId) {
                console.log(`[Socket] Cohost request from ${username} for stream ${streamId}`);
                socket.to(`live_stream_${streamId}`).emit('cohost_request_received', { userId, username });
            }
        });

        socket.on('accept_cohost', ({ streamId, userId }) => {
            if (streamId) {
                console.log(`[Socket] Cohost request accepted for user ${userId} in stream ${streamId}`);
                // Emit to specifically that user's private room
                io.to(`user:${userId}`).emit('cohost_request_accepted', { streamId });
            }
        });

        socket.on('user:typing', ({ conversationId, receiverId, isTyping }) => {
            if (receiverId) {
                io.to(`user:${receiverId}`).emit('user:typing', { conversationId, isTyping });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

        // Register WebRTC handlers
        callSocketHandlers(io, socket);
    });

    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

module.exports = { initSocket, getIO };
