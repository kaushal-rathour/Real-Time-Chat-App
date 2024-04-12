import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded"
import { IconButton } from "@mui/material";
import "./CreateGroups.css"
export default function CreateGroups () {
    return (
        <div className="CreateGroupsContainer">
            <div className="CreateGroupsTitle">
                <p>Create Group</p>
            </div>
            <div className="CreateGroupsInput">
                <input type="text" placeholder="Enter the group name" className="SearchBox"/>
                <IconButton>
                    <DoneOutlineRoundedIcon/>
                </IconButton>
            </div>

        </div>
    )
}