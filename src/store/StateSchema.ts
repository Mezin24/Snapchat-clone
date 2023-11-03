import { AppState } from './app/appslice';
import { CameraState } from './camera/cameraSlice';

export interface StateSchema {
  camera: CameraState;
  app: AppState;
}
