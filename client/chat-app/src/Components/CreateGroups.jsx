import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded"
import { IconButton } from "@mui/material";
import "./CreateGroups.css"
import { useSelector } from "react-redux";
export default function CreateGroups () {
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <div className="CreateGroupsContainer">
            <div className={`CreateGroupsTitle ${darkTheme? "DarkMode": "LightMode"}`}>
                <p>Create Group</p>
            </div>
            <div className={`CreateGroupsInput ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Enter the group name" className={`SearchBox ${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                    <DoneOutlineRoundedIcon className={` ${darkTheme? "DarkMode": "LightMode"}`}/>
                </IconButton>
            </div>

        </div>
    )
}