import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";

export default function Groups () {
    return (
        <div className="UserGroupsContainer">
            
            <div className="UserGroupsHeader">
                <img src={logo}/>
                <p className="UserGroupsTitle">Available Groups</p>
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
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>
                <div className="ListItem">
                    <p className="ConversationIcon">T</p>
                    <p className="ConversationTitle">Test Group</p>
                </div>

            </div>
        </div>
    )
}