import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function User () {
    return (
        <div className="UserGroupsContainer">
            
            <div className="UserGroupsHeader">
                <img src={logo}/>
                <p className="UserGroupsTitle">Active Users</p>
            </div>

            <div className="SidebarSearch">
                <input type="text" placeholder="Search"/>
                <IconButton>
                <SearchIcon/>
                </IconButton>
            </div>

            <div className="UserGroupsList">
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test User</p>
                </div>
            </div>
        </div>
    )
}