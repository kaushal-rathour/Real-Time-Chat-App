import MainContainer from './Components/Main/MainContainer.jsx';
import Login from './Components/Login';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from './socket.jsx';
import { useSelector } from 'react-redux';

export default function App() {
  return (
    
      <div className="App">
        
        <Routes>
            <Route path = "/" element={<Login/>}></Route>
              <Route path="*" element={<MainContainer socket={socket}/>}></Route>
        </Routes>
        </div>
    
  )
}
