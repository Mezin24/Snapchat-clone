import { useDispatch, useSelector } from 'react-redux';
import { getCameraImage } from '../../store/camera/cameraSelectors';
import cls from './Preview.module.css';
import { Navigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useCallback } from 'react';
import { cameraActions } from '../../store/camera/cameraSlice';

const Preview = () => {
  const cameraImg = useSelector(getCameraImage);
  const dispatch = useDispatch();
  const closePreview = useCallback(() => {
    dispatch(cameraActions.resetCameraImage());
  }, [dispatch]);

  if (!cameraImg) return <Navigate to='/' replace />;

  return (
    <div className={cls.preview}>
      <CloseIcon onClick={closePreview} className={cls.closeBtn} />
      <img src={cameraImg} alt='camera image' />
    </div>
  );
};
export default Preview;
