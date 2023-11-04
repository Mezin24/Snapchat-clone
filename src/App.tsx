import { Route, Routes } from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import ChatView from './components/Chats/ChatView';
import { getUser } from './store/app/appSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase.config';
import { appActions } from './store/app/appslice';

function App() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          appActions.login({
            id: user.uid,
            username: user.displayName || '',
            profilePic: user.photoURL || '',
          })
        );
      }
    });
  }, [dispatch]);

  return (
    <div className='app'>
      <Routes>
        {!user ? (
          <>
            <Route path='/login' index element={<Login />} />
            <Route path='*' element={<Navigate to='/login' />} />
          </>
        ) : (
          <>
            <Route path='/preview' index element={<Preview />} />
            <Route path='/chats' index element={<Chats />} />
            <Route path='/chat/view' index element={<ChatView />} />
            <Route path='/' index element={<WebcamCapture />} />
            <Route path='*' element={<Navigate to='/chats' />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
