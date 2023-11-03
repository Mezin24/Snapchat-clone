import { StateSchema } from '../StateSchema';

export const selectSelectedImage = (state: StateSchema) =>
  state.app.selectedImage;
