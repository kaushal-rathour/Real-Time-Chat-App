import "./ChatArea.css"
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
export default function ChatArea () {
    const darkTheme = useSelector((state)=> state.themeKey);
    let props =
        {
            name: "Name 1",
            lastMessage: "LastMessage1",
            timeStamp: "today",
        };
    return (
        <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }} className="ChatArea">
            <div className={`ChatAreaHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <p className="ConversationIcon">{props.name[0]}</p>
                <div className="HeaderText">
                    <p className={`ConversationTitle ${darkTheme? "DarkMode": "LightMode"}`}>{props.name}</p>
                    <p className={`ConversationTime ${darkTheme? "DarkMode": "LightMode"}`}>{props.timeStamp}</p>
                </div>
                <IconButton>
                    <DeleteIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>
            <motion.div variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -20 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }} className={`MessageContainer ${darkTheme? "DarkMode": "LightMode"}`}>
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
    </motion.div>

            <div className={`TextInputArea ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Type a message" className={`SearchBox ${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                    <SendIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>
        </motion.div>
        </AnimatePresence>
    )
}