import { IconButton } from "@mui/material";
import "./Sidebar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle'
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from "../ConversationItem";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { themeToggle } from "../../Features/themeSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar () {
    const navigate = useNavigate();
    let [conversations, setConversations] = useState([
        {
            name: "Name 1",
            lastMessage: "LastMessage1",
            timeStamp: "today",
        },
        {
            name: "Name 2",
            lastMessage: "LastMessage2",
            timeStamp: "today",
        },
        {
            name: "Name 3",
            lastMessage: "LastMessage3",
            timeStamp: "today",
        }
    ]);
   const darkTheme = useSelector((state)=> state.themeKey);
    const dispatch = useDispatch();
    return (
        <div className="Sidebar">
            <div className={`SidebarHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <div className="SidebarHeaderLeft">
                    
                        <IconButton>
                            <AccountCircleIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/> 
                        </IconButton>
                    
                </div>
                <div className="SidebarHeaderRight">
                   
                        <IconButton onClick ={()=>{navigate("/users")}} >
                            <PersonAddIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/> 
                        </IconButton>

                    
               
                        <IconButton  onClick ={()=>{navigate("/groups")}}>
                            <GroupAddIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/> 
                        </IconButton>
                    

                    <IconButton onClick ={()=>{navigate("/groups/new")}}>
                <AddCircleIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/> 
                </IconButton>
                
                <IconButton onClick={()=> dispatch( themeToggle())}>
                {!darkTheme && <NightlightIcon className={darkTheme? "DarkMode": "LightMode"}/>}
                {darkTheme && <LightModeIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/>}
                </IconButton>
                </div>
            </div>
            <div className={`SidebarSearch ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Search" className={`${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                <SearchIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/>
                </IconButton>
            </div>
            <div className={`SidebarConversations ${darkTheme? "DarkMode": "LightMode"}`}>
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
            </div>
        </div>
    )
}