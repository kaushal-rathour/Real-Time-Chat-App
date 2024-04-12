import "./ConversationItem.css"
import { useNavigate } from "react-router-dom"
export default function ConversationItem ({ props }) {
    const navigate = useNavigate();
    return (
        <div className="Conversation" onClick={ ()=> { navigate("/chat")} }>
            <p className="ConversationIcon">{props.name[0]}</p>
            <p className="ConversationTitle">{props.name}</p>
            <p className="ConversationLastMessage">{props.lastMessage}</p>
            <p className="ConversationTime">{props.timeStamp}</p>
        </div>
    )
}