import { configureStore } from '@reduxjs/toolkit';
import reducer from './root-reducer';
import { socketMiddleware, httpMessageMiddleware } from './middleware';

const inProduction = process.env === 'production';

export const store = configureStore({
  reducer,
  middleware: (gDM) => [...gDM(), socketMiddleware, httpMessageMiddleware],
  devTools: !inProduction,
});

// store.subscribe(() => console.log("Redux state updated!"))
