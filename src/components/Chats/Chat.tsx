import { Avatar } from '@mui/material';
import { Post } from '../../types/post';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { doc, setDoc } from 'firebase/firestore';
import cls from './Chat.module.css';
import ReactTimeAgo from 'react-time-ago';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { appActions } from '../../store/app/appSlice';
import { db } from '../../../firebase.config';
import { useNavigate } from 'react-router-dom';

interface ChatProps {
  post: Post;
}

const Chat = ({ post }: ChatProps) => {
  const { id, imageUrl, read, timestamp, username, profilePic } = post;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const open = useCallback(() => {
    if (read) return;

    dispatch(appActions.selectImage(imageUrl));
    const postRef = doc(db, 'posts', id);
    setDoc(postRef, { read: true }, { merge: true });
    navigate('/chat/view');
  }, [dispatch, id, imageUrl, navigate, read]);

  return (
    <div onClick={open} className={cls.chat}>
      <Avatar src={profilePic} className={cls.avatar}>
        {username[0].toUpperCase()}
      </Avatar>
      <div className={cls.info}>
        <h4>{username}</h4>
        <p>
          {!read && 'Tap to view -'}{' '}
          <ReactTimeAgo date={new Date(timestamp?.toDate())} locale='en-US' />
        </p>
      </div>
      {!read && <StopRoundedIcon className={cls.readIcon} />}
    </div>
  );
};
export default Chat;
