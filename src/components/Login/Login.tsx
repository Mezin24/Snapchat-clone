import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/app/appSelectors';
import cls from './Login.module.css';
import { Button } from '@mui/material';
import { useCallback } from 'react';
import SnapchatLogo from '../../assets/snapchat-logo.svg';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../../firebase.config';
import { appActions } from '../../store/app/appslice';

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
