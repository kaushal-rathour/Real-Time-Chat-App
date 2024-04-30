import Sidebar from "../Sidebar/Sidebar.jsx"
import ChatArea from "../ChatArea/ChatArea"
import Welcome from "../Welcome.jsx"
import CreateGroups from "../CreateGroups.jsx"
import "./MainContainer.css"
import User from "../User.jsx"
import Groups from "../Groups.jsx"
import { Route, Routes, useNavigate, Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import PageNotFound from "../PageNotFound.jsx"
export default function MainContainer ({socket}) {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    
    if(!userData) {
        useEffect(()=> {
            console.log("User Not Authenticated");
            navigate("/");
        })
        return;
    } 
    useEffect(()=> {
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
                    <Route path="/*" element={<PageNotFound/>}/>
                </Routes>
        </div>
    )
}