import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedImage } from '../../store/app/appSelectors';
import { useNavigate } from 'react-router-dom';
import cls from './ChatView.module.css';
import { useCallback, useEffect } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import { appActions } from '../../store/app/appSlice';

const ChatView = () => {
  const selectedImage = useSelector(selectSelectedImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const exit = useCallback(() => {
    dispatch(appActions.resetImage());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedImage) {
      navigate('/chats');
    }
  }, [navigate, selectedImage]);

  return (
    <div className={cls.chatView}>
      <img
        src={selectedImage || ''}
        alt=''
        className={cls.image}
        onClick={exit}
      />
      <div className={cls.timer}>
        <CountdownCircleTimer
          isPlaying
          duration={10}
          colors={['#004777', '#F7B801', '#A30000']}
          colorsTime={[7, 5, 2]}
          strokeWidth={6}
          size={50}
        >
          {({ remainingTime }) => {
            if (remainingTime === 0) {
              exit();
            }

            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};
export default ChatView;
