import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { cameraReducer } from './camera/cameraSlice';

export const store = configureStore<StateSchema>({
  reducer: {
    camera: cameraReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
