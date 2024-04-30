import MainContainer from './Components/Main/MainContainer.jsx';
import Login from './Components/Login';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import { socket } from './socket.jsx';


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
