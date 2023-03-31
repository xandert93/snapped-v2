import io from 'socket.io-client';

export const connectToSocketServer = (url, accessToken) => io(url, { auth: { accessToken } });
