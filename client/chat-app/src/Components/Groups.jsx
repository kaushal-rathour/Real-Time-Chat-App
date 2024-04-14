import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";

export default function Groups () {
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <div className="UserGroupsContainer">
            
            <div className={`UserGroupsHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <img src={logo}/>
                <p className={`UserGroupsTitle ${darkTheme? "DarkMode": "LightMode"}`}>Available Groups</p>
            </div>

            <div className={`SidebarSearch ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Search" className={`${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                <SearchIcon/>
                </IconButton>
            </div>

            <div className={`UserGroupsList ${darkTheme? "DarkMode": "LightMode"}`}>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>

                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>
                <div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </div>

            </div>
        </div>
    )
}