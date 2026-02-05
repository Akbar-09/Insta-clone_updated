const socketIo = require('socket.io');

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
            if (userId) {
                socket.join(`user:${userId}`);
                console.log(`User ${userId} joined room user:${userId}`);
            }
        });

        socket.on('join-live', ({ sessionId }) => {
            if (sessionId) {
                socket.join(`live:${sessionId}`);
                console.log(`Socket ${socket.id} joined live:${sessionId}`);
            }
        });

        socket.on('leave-live', ({ sessionId }) => {
            if (sessionId) {
                socket.leave(`live:${sessionId}`);
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
