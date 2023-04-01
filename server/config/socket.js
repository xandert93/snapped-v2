import { Server as SocketServer } from 'socket.io';
import { verifyAccessToken } from '../utils/auth-utils.js';

const log = (str) => console.log('⚡️ Socket Server: ' + str);

let io;

export const initSocketServer = (httpServer) => {
  io = new SocketServer(httpServer);
  log('running!');

  io.use(ensureSocketAuth);
  io.on('connection', handleConnection);
};

function ensureSocketAuth(socket, next) {
  const { accessToken } = socket.handshake.auth;

  let result;
  if (!accessToken) {
    result = new Error('Socket Server: You have no access token!');
  } else {
    try {
      const { _id: userId, username } = verifyAccessToken(accessToken);
      socket.userId = userId;
      socket.username = username;
    } catch (err) {
      result = err;
    }
  }

  next(result);
}

function handleConnection(socket) {
  const { id: socketId, userId, username } = socket;
  const greetingStr = `${username} (${socketId.slice(0, 5)})`;

  socket.join(userId);
  log(`${greetingStr} connected ✔️`);

  socket.on('disconnect', () => {
    log(`${greetingStr} disconnected ❌`);
  });
}

export const getIO = () => {
  if (!io) throw new Error('Cannot get IO before initiation!');
  else return io;
};
