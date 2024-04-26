import Sidebar from "../Sidebar/Sidebar.jsx"
import ChatArea from "../ChatArea/ChatArea"
import Welcome from "../Welcome.jsx"
import CreateGroups from "../CreateGroups.jsx"
import "./MainContainer.css"
import User from "../User.jsx"
import Groups from "../Groups.jsx"
import { Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react"
export default function MainContainer () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const navigate = useNavigate();
    useEffect(()=> {
        if(!userData) {
            console.log("User Not Authenticated");
            navigate("/");
        }
    })
    return(
        <div className="MainContainer" >
            <Sidebar/>
            <Outlet/>
            {/* <Welcome/> */}
            {/* <ChatArea/> */}
            {/* <User/> */}
            {/* <Groups/> */}
            {/* <CreateGroups/> */}
        </div>
    )
}