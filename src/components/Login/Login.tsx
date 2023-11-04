import { Button } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { auth, provider } from '../../../firebase.config';
import SnapchatLogo from '../../assets/snapchat-logo.svg';
import { appActions } from '../../store/app/appSlice';
import cls from './Login.module.css';

const Login = () => {
  const dispatch = useDispatch();

  const signIn = useCallback(async () => {
    const userCredentials = await signInWithPopup(auth, provider);
    dispatch(
      appActions.login({
        id: userCredentials.user.uid,
        username: userCredentials.user.displayName || '',
        profilePic: userCredentials.user.photoURL || '',
      })
    );
  }, [dispatch]);

  return (
    <div className={cls.login}>
      <div className={cls.loginContainer}>
        <img src={SnapchatLogo} alt='' className={cls.img} />
        <Button variant='outlined' onClick={signIn}>
          Sign In With Google
        </Button>
      </div>
    </div>
  );
};
export default Login;
