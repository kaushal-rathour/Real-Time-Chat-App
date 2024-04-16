import { useSelector } from "react-redux";
import "./ConversationItem.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
export default function ConversationItem ({ props }) {
    const navigate = useNavigate();
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.99}} className={`Conversation ${darkTheme? "DarkMode": "LightMode"}`} onClick={ ()=> { navigate("/chat")} }>
            <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>{props.name[0]}</p>
            <p className="ConversationTitle">{props.name}</p>
            <p className="ConversationLastMessage">{props.lastMessage}</p>
            <p className="ConversationTime">{props.timeStamp}</p>
        </motion.div>
    )
}