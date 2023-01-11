// Imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Home from './components/Home';
// CSS
import './App.css';
import ChatComponent from './components/ChatComponent';

const socket = socketIO.connect("http://localhost:1111");

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path='/' element={<Home socket={socket} />} />
          <Route path='/chat' element={<ChatComponent socket={socket} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
