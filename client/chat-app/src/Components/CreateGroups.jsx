import DoneOutlineRoundedIcon from "@mui/icons-material/DoneOutlineRounded"
import { IconButton } from "@mui/material";
import "./CreateGroups.css"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { toggleRefresh } from "../Features/refreshSlice";
export default function CreateGroups () {
    const darkTheme = useSelector((state)=> state.themeKey);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [name, setName] = useState("");
    const navigate = useNavigate();
    const onChangeHandler = (event) => {
        setName(event.target.value);
    };
    const createGroup = async() => {
        const config = {
            headers: {
                Authorization: `${userData.token}`
            }
        };
        await axios.post("http://localhost:3000/creategroup/", {
            name: name,
            participants: [userData._id]
        },config);
        navigate("/groups");
    }
    return (
        <div className="CreateGroupsContainer">
            <div className={`CreateGroupsTitle ${darkTheme? "DarkMode": "LightMode"}`}>
                <p>Create Group</p>
            </div>
            <div className={`CreateGroupsInput ${darkTheme? "DarkMode": "LightMode"}`}>
                <input onChange={onChangeHandler} onKeyDown={(event)=> {
                    if(event.code == "Enter") {
                        createGroup()
                    }
                }} value={name} type="text" placeholder="Enter the group name" className={`SearchBox ${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton onClick={ ()=> {createGroup()}}>
                    <DoneOutlineRoundedIcon className={` ${darkTheme? "DarkMode": "LightMode"}`}/>
                </IconButton>
            </div>

        </div>
    )
}