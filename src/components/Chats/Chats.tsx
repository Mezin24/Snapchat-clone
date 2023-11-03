import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar } from '@mui/material';
import { collection, orderBy, query } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SyncLoader } from 'react-spinners';
import { db } from '../../../firebase.config';
import { Post } from '../../types/post';
import Chat from './Chat';
import cls from './Chats.module.css';

const Chats = () => {
  const [posts, loading] = useCollection(
    query(collection(db, 'posts'), orderBy('timestamp', 'desc'))
  );

  return (
    <div className={cls.chats}>
      <div className={cls.header}>
        <Avatar className={cls.avatar} />
        <div className={cls.search}>
          <SearchIcon />
          <input type='text' placeholder='Friends' />
        </div>
        <ChatBubbleIcon className={cls.babelIcon} />
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
    </div>
  );
};
export default Chats;
