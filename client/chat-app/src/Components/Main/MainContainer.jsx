import Sidebar from "../Sidebar/Sidebar.jsx"
import ChatArea from "../ChatArea/ChatArea"
import Welcome from "../Welcome.jsx"
import CreateGroups from "../CreateGroups.jsx"
import "./MainContainer.css"
import User from "../User.jsx"
import Groups from "../Groups.jsx"
import { Outlet } from "react-router-dom"
export default function MainContainer () {
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