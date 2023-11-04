import { BrowserRouter, Routes, Route } from 'react-router-dom';

import socketIO from 'socket.io-client';
import Home from './core/Home/Home';
import ChatPage from './core/ChatPage';

const socket = socketIO.connect(process.env.REACT_APP_BACKEND_ENDPOINT);
function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home socket={socket} />}></Route>
          <Route path="/chat" element={<ChatPage socket={socket} />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;