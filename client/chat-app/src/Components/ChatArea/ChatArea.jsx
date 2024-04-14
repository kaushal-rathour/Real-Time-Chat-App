import "./ChatArea.css"
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
export default function ChatArea () {
    const darkTheme = useSelector((state)=> state.themeKey);
    let props =
        {
            name: "Name 1",
            lastMessage: "LastMessage1",
            timeStamp: "today",
        };
    return (
        <div className="ChatArea">
            <div className={`ChatAreaHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <p className="ConversationIcon">{props.name[0]}</p>
                <div className="HeaderText">
                    <p className={`ConversationTitle ${darkTheme? "DarkMode": "LightMode"}`}>{props.name}</p>
                    <p className={`ConversationTime ${darkTheme? "DarkMode": "LightMode"}`}>{props.timeStamp}</p>
                </div>
                <IconButton>
                    <DeleteIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/>
                </IconButton>
            </div>
            <div className={`MessageContainer ${darkTheme? "DarkMode": "LightMode"}`}>
            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>
            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>

            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>

            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>
    </div>

            <div className={`TextInputArea ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Type a message" className={`SearchBox ${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                    <SendIcon className={`Icon ${darkTheme? "DarkMode": "LightMode"}`}/>
                </IconButton>
            </div>
        </div>
    )
}