import Sidebar from "../Sidebar/Sidebar.jsx"
import WorkArea from "../WorkArea/WorkArea"
import "./MainContainer.css"
export default function MainContainer () {
    return(
        <div className="MainContainer">
            <Sidebar/>
            <WorkArea/>
        </div>
    )
}