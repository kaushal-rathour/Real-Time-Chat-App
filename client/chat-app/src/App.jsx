import MainContainer from './Components/Main/MainContainer.jsx';
import Login from './Components/Login';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { socket } from './socket.jsx';

export default function App() {
  const userData = JSON.parse(localStorage.getItem("userData"));
    useEffect(()=> {
      if (userData) {
          socket.connect();
          
          return () => {
            socket.disconnect();
          };
        
    };
    },[userData])
  return (
    
      <div className="App">
        
        <Routes>
            <Route path = "/" element={<Login/>}></Route>
              <Route path="*" element={<MainContainer socket={socket}/>}></Route>
        </Routes>
        </div>
    
  )
}
