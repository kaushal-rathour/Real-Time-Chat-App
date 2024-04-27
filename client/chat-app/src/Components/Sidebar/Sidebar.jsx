import { IconButton } from "@mui/material";
import "./Sidebar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';
import { useNavigate } from "react-router-dom";
import { themeToggle } from "../../Features/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import Conversations from "../Conversations";
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
export default function Sidebar () {
    const navigate = useNavigate();
    const darkTheme = useSelector((state)=> state.themeKey);
    const dispatch = useDispatch();
    let logoutHandler = () => {
        localStorage.removeItem("userData");
        navigate("/");
    };
    const [showChat, setShowChat] = useState(false);
    return (
        <div className="Sidebar">
            <div className={`SidebarHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <div className="SidebarHeaderLeft">
                    
                        <IconButton>
                            <AccountCircleIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/> 
                        </IconButton>

                        <IconButton  className="ShowChatToggle" onClick={()=> {
                            setShowChat(!showChat);
                        }}>
                            <ChatIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/> 
                        </IconButton>
                    
                </div>
                <div className="SidebarHeaderRight">
                   
                        <IconButton onClick ={()=>{navigate("/users")}} >
                            <PersonAddIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/> 
                        </IconButton>

                    
                
                        <IconButton  onClick ={()=>{navigate("/groups")}}>
                            <GroupAddIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/> 
                        </IconButton>
                    

                    <IconButton onClick ={()=>{navigate("/groups/new")}}>
                <AddCircleIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/> 
                </IconButton>
                
                <IconButton onClick={()=> dispatch( themeToggle())}>
                {!darkTheme && <NightlightIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>}
                {darkTheme && <LightModeIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>}
                </IconButton>
                
                <IconButton onClick={logoutHandler}>
                {<LogoutIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>}
                </IconButton>
                </div>
            </div>

           
            <div className={`SidebarSearch ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Search" className={`${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                <SearchIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>

            <div className={`SidebarConversations ${darkTheme? "DarkMode": "LightMode"}`}>
                <Conversations/>
            </div>

            <div className={`${darkTheme? "DarkMode": "LightMode"} ${showChat? "ShowChat": "HideChat"}`}>
                <Conversations/>
            </div>
        </div>
    )
}