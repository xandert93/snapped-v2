import { configureStore } from '@reduxjs/toolkit';
import reducer from './root-reducer';
import { socketMiddleware, httpMessageMiddleware } from './middleware';

export const store = configureStore({
  reducer,
  middleware: (gDM) => [...gDM(), socketMiddleware, httpMessageMiddleware],
});

// store.subscribe(() => console.log("Redux state updated!"))
