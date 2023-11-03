import { Route, Routes } from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';
import Chats from './components/Chats/Chats';
import ChatView from './components/Chats/ChatView';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/preview' index element={<Preview />} />
        <Route path='/chats' index element={<Chats />} />
        <Route path='/chat/view' index element={<ChatView />} />
        <Route path='/' index element={<WebcamCapture />} />
      </Routes>
    </div>
  );
}

export default App;
