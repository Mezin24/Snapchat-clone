import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CameraState {
  cameraImage: string | null;
}

const initialState: CameraState = {
  cameraImage: null,
};

export const cameraSlice = createSlice({
  name: 'camera',
  initialState,
  reducers: {
    setCameraImage: (state, action: PayloadAction<string>) => {
      state.cameraImage = action.payload;
    },
    resetCameraImage: (state) => {
      state.cameraImage = null;
    },
  },
});

export const { actions: cameraActions } = cameraSlice;
export const { reducer: cameraReducer } = cameraSlice;
