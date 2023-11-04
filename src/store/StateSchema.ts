import { AppState } from './app/appSlice';
import { CameraState } from './camera/cameraSlice';

export interface StateSchema {
  camera: CameraState;
  app: AppState;
}
