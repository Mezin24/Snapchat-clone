import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/user';

export interface AppState {
  user: User | null;
  selectedImage: string | null;
}

const initialState: AppState = {
  user: null,
  selectedImage: null,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    selectImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
    },
    resetImage: (state) => {
      state.selectedImage = null;
    },
  },
});

export const { actions: appActions } = appSlice;
export const { reducer: appReducer } = appSlice;
