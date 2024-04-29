import Sidebar from "../Sidebar/Sidebar.jsx"
import ChatArea from "../ChatArea/ChatArea"
import Welcome from "../Welcome.jsx"
import CreateGroups from "../CreateGroups.jsx"
import "./MainContainer.css"
import User from "../User.jsx"
import Groups from "../Groups.jsx"
import { Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
export default function MainContainer ({socket}) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    useEffect(()=> {
        if(!userData) {
            console.log("User Not Authenticated");
            navigate("/");
        }
    },[userData]); 
    useEffect(()=> {
      console.log("App Re- Rendered");
      if (userData) {
          socket.connect();
          
          return () => {
            socket.disconnect();
          };
        
    };
    },[userData]);
    return(
        <div className="MainContainer" >
            <Sidebar/>
            <Routes>
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/chat/:_id" element={<ChatArea/>} />
                    <Route path="/users" element={<User />} />
                    <Route path="/groups" element={<Groups />} />
                    <Route path="/groups/new" element={<CreateGroups />} />
                </Routes>
        </div>
    )
}