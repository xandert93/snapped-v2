import { connectToSocketServer } from '../../services/socket';
import {
  reauthorise,
  login,
  googleLogin,
  facebookLogin,
  logout,
  reauthenticate,
} from '../../features/auth/state/auth-actions';

import { socketSnapReceived } from '../../features/snap/state';
import {
  addNotification,
  deleteNotification,
} from '../../features/notification/state/notification-slice';

export const socketMiddleware = ({ dispatch, getState }) => {
  let socket; // this variable exists for the lifetime of the application

  return (next) => (action) => {
    switch (action.type) {
      case reauthenticate.fulfilled.type:
      // case reauthorise.fulfilled.type:
      case login.fulfilled.type:
      case googleLogin.fulfilled.type:
      case facebookLogin.fulfilled.type:
        const serverURL = process.env.REACT_APP_SERVER_ORIGIN;
        const { accessToken } = action.payload;

        socket = connectToSocketServer(serverURL, accessToken);

        //debugging handlers (maybe delete):
        socket.on('connect', () => console.log(`⚡️ Socket Middleware: connected to SS`));
        socket.on('disconnect', () => console.log(`⚡️ Socket Middleware: disconnected from SS`));
        socket.on('connect_error', (err) => console.log(`⚡️ Socket Middleware: ${err.message}`));

        //actual handlers:
        socket.on('new-notification', (notification) => {
          dispatch(addNotification(notification));
        });

        socket.on('undo-notification', (id) => {
          dispatch(deleteNotification(id));
        });

        socket.on('new-snap', (snap) => {
          dispatch(socketSnapReceived(snap));
        });

        break;

      case logout.fulfilled.type:
        // case reauthorise.pending.type:
        socket?.disconnect();
        break;
    }

    return next(action);
  };
};
