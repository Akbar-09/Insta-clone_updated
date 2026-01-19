const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');

let io;
const userSockets = new Map(); // userId -> socketId

const initSocket = (server) => {
    io = socketIo(server, {
        cors: {
            origin: "*", // Adjust for production
            methods: ["GET", "POST"]
        }
    });

    io.use((socket, next) => {
        // Auth Middleware
        const token = socket.handshake.query.token;
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
                if (err) return next(new Error('Authentication error'));
                socket.user = decoded;
                next();
            });
        } else {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.user.id}`);
        userSockets.set(socket.user.id, socket.id);

        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.user.id}`);
            userSockets.delete(socket.user.id);
        });
    });
};

const emitToUser = (userId, event, data) => {
    if (!io) return;
    const socketId = userSockets.get(userId);
    if (socketId) {
        io.to(socketId).emit(event, data);
        console.log(`Emitted ${event} to user ${userId}`);
    }
};

module.exports = { initSocket, emitToUser };
