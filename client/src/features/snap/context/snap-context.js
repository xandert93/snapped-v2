import { createContext, useContext } from 'react';

export const snapContext = createContext();

export const useSnap = () => useContext(snapContext);
