import { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { IconButton } from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { cameraActions } from '../../store/camera/cameraSlice';
import { useNavigate } from 'react-router-dom';
import cls from './WebcamCapture.module.css';

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: 'user',
};

const WebcamCapture = () => {
  const webcamRef = useRef<Webcam>(null);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        dispatch(cameraActions.setCameraImage(imageSrc));
        navigate('/preview');
      }
    }
  }, [dispatch, navigate]);

  return (
    <div className={cls.capture}>
      <Webcam
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat='image/jpeg'
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
      />
      <IconButton className={cls.webcamBtn} onClick={capture}>
        <RadioButtonUncheckedIcon fontSize='large' />
      </IconButton>
    </div>
  );
};

export default WebcamCapture;
