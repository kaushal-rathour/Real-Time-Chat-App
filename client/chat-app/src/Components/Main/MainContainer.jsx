import Sidebar from "../Sidebar/Sidebar.jsx"
import ChatArea from "../ChatArea/ChatArea"
import "./MainContainer.css"
export default function MainContainer () {
    return(
        <div className="MainContainer" >
            <Sidebar/>
            <ChatArea/>
        </div>
    )
}