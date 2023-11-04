import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { cameraReducer } from './camera/cameraSlice';
import { appReducer } from './app/appSlice';

export const store = configureStore<StateSchema>({
  reducer: {
    camera: cameraReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
