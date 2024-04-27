import { useSelector } from "react-redux";
import "./ConversationItem.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion";
import { formatDistance } from 'date-fns';
export default function ConversationItem ({ props, chatName }) {
    const navigate = useNavigate();
    const darkTheme = useSelector((state)=> state.themeKey);
    const timeStamp = (props.latestMessage?
        formatDistance(new Date(props.latestMessage.timeStamp), new Date()): 
        formatDistance(new Date(props.timeStamp), new Date()));
    return (
        <motion.div whileHover={{scale: 1.02}} whileTap={{scale: 0.99}} className={`Conversation ${darkTheme? "DarkMode": "LightMode"}`} 
        onClick={ ()=> { navigate(`/chat/${props._id}/?name=${chatName}`)} }>
            <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>{chatName[0]}</p>
            <p className="ConversationTitle">{chatName}</p>
            <p className="ConversationLastMessage">{props.latestMessage? props.latestMessage.content: "No Previous Message"}</p>
            <p className="ConversationTime">{timeStamp}</p>
        </motion.div>
    )
}