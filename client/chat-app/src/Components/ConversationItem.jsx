import { useSelector } from "react-redux";
import "./ConversationItem.css"
import { useNavigate } from "react-router-dom"
export default function ConversationItem ({ props }) {
    const navigate = useNavigate();
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <div className={`Conversation ${darkTheme? "DarkMode": "LightMode"}`} onClick={ ()=> { navigate("/chat")} }>
            <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>{props.name[0]}</p>
            <p className="ConversationTitle">{props.name}</p>
            <p className="ConversationLastMessage">{props.lastMessage}</p>
            <p className="ConversationTime">{props.timeStamp}</p>
        </div>
    )
}