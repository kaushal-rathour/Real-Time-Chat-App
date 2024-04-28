import MainContainer from './Components/Main/MainContainer.jsx'
import Login from './Components/Login'
import './App.css'
import { Routes, Route, useNavigate } from 'react-router-dom'
import ChatArea from './Components/ChatArea/ChatArea'
import User from './Components/User'
import Welcome from './Components/Welcome'
import Groups from './Components/Groups'
import CreateGroups from './Components/CreateGroups'
export default function App() {
  return (
    
      <div className="App">
        
        <Routes>
            <Route path = "/" element={<Login/>}></Route>
              <Route path="" element={<MainContainer/>}>
                  <Route path="chat/:_id" element={<ChatArea/>}></Route>
                  <Route path="users" element={<User/>}></Route>
                  <Route path="groups" element={<Groups/>}></Route>
                  <Route path="groups/new" element={<CreateGroups/>}></Route>
                  <Route path="welcome" element={<Welcome/>}></Route>
              </Route>
        </Routes>
        </div>
    
  )
}
