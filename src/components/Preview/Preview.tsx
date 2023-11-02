import { useDispatch, useSelector } from 'react-redux';
import { getCameraImage } from '../../store/camera/cameraSelectors';
import cls from './Preview.module.css';
import { Navigate, useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Close';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { useCallback } from 'react';
import { cameraActions } from '../../store/camera/cameraSlice';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../../../firebase.config';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { IconButton } from '@mui/material';

const Preview = () => {
  const cameraImg = useSelector(getCameraImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const closePreview = useCallback(() => {
    dispatch(cameraActions.resetCameraImage());
  }, [dispatch]);

  const sendImage = useCallback(async () => {
    if (!cameraImg) return;
    const imgId = uuidv4();
    const storageRef = ref(storage, `images/${imgId}`);
    const snapshot = await uploadString(storageRef, cameraImg, 'data_url');
    const downloadURL = await getDownloadURL(snapshot.ref);
    await addDoc(collection(db, 'posts'), {
      imageUrl: downloadURL,
      username: 'Mezin24',
      read: false,
      timestamp: serverTimestamp(),
    });
    navigate('/chats');
  }, [cameraImg, navigate]);

  if (!cameraImg) return <Navigate to='/' replace />;

  return (
    <div className={cls.preview}>
      <CloseIcon onClick={closePreview} className={cls.closeBtn} />
      <div className={cls.toolbarRight}>
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <img src={cameraImg} alt='camera image' />
      <div className={cls.footer}>
        <IconButton onClick={sendImage}>
          <span>Send now</span>
          <SendIcon />
        </IconButton>
      </div>
    </div>
  );
};
export default Preview;
