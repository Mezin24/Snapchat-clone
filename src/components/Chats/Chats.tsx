import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton } from '@mui/material';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SyncLoader } from 'react-spinners';
import { auth, db } from '../../../firebase.config';
import { Post } from '../../types/post';
import Chat from './Chat';
import cls from './Chats.module.css';
import { getUser } from '../../store/app/appSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { appActions } from '../../store/app/appslice';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { cameraActions } from '../../store/camera/cameraSlice';

const Chats = () => {
  const [posts, loading] = useCollection(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(getUser);
  const logout = useCallback(() => {
    auth.signOut();
    dispatch(appActions.logout());
  }, [dispatch]);

  const takeSnap = useCallback(() => {
    dispatch(cameraActions.resetCameraImage());
    navigate('/');
  }, [dispatch, navigate]);

  return (
    <div className={cls.chats}>
      <div className={cls.header}>
        <Avatar onClick={logout} className={cls.avatar} src={user?.profilePic}>
          {user?.username[0].toUpperCase()}
        </Avatar>
        <div className={cls.search}>
          <SearchIcon style={{ color: 'white', fontSize: '18px' }} />
          <input type='text' placeholder='Friends' />
        </div>
        <ChatBubbleIcon
          style={{ color: 'white', fontSize: '18px' }}
          className={cls.babelIcon}
        />
      </div>
      <div className={cls.posts}>
        {loading && (
          <div className={cls.spinnerContainer}>
            <SyncLoader color='#059ee0' loading={loading} />
          </div>
        )}
        {posts &&
          posts?.docs.map((post) => (
            <Chat
              key={post.id}
              post={{ id: post.id, ...post.data() } as Post}
            />
          ))}
      </div>
      <IconButton className={cls.radioBtn} onClick={takeSnap}>
        <RadioButtonUncheckedIcon fontSize='large' />
      </IconButton>
    </div>
  );
};
export default Chats;
