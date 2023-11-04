import { StateSchema } from '../StateSchema';

export const selectSelectedImage = (state: StateSchema) =>
  state.app.selectedImage;

export const getUser = (state: StateSchema) => state.app.user;
