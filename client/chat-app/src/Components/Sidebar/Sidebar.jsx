import { IconButton } from "@mui/material";
import "./Sidebar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import ConversationItem from "../ConversationItem";
import { useState } from "react";

export default function Sidebar () {
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
    ])
    return (
        <div className="Sidebar">
            <div className="SidebarHeader">
                <div className="SidebarHeaderLeft">
                <IconButton>
                <AccountCircleIcon/> 
                </IconButton>
                </div>
                <div className="SidebarHeaderRight">
                <IconButton>
                <PersonAddIcon/> 
                </IconButton>

                <IconButton>
                <GroupAddIcon/> 
                </IconButton>

                <IconButton>
                <AccountCircleIcon/> 
                </IconButton>

                <IconButton>
                <NightlightIcon/> 
                </IconButton>
                </div>
            </div>
            <div className="SidebarSearch">
                <input type="text" placeholder="Search"/>
                <IconButton>
                <SearchIcon/>
                </IconButton>
            </div>
            <div className="SidebarConversations">
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