import { Route, Routes } from 'react-router-dom';
import WebcamCapture from './components/WebcamCapture/WebcamCapture';
import Preview from './components/Preview/Preview';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/preview' index element={<Preview />} />
        <Route path='/' index element={<WebcamCapture />} />
      </Routes>
    </div>
  );
}

export default App;
