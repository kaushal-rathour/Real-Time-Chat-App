import "./ChatArea.css";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toggleRefresh } from "../../Features/refreshSlice";
import { formatDistance } from 'date-fns';
import { useRef } from "react";
import { socket } from "../../socket";
import { Alert } from "antd";

export default function ChatArea() {
    const darkTheme = useSelector((state) => state.themeKey);
    const refresh = useSelector((state) => state.refresh);
    const scrollableRef = useRef(null);
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const userData = JSON.parse(localStorage.getItem("userData"));
    let [messages, setMessages] = useState([]);
    let [alert, setAlert] = useState(null);
    let timeStamp = "";
    if (messages.length > 0) {
        timeStamp = formatDistance(new Date(messages[messages.length - 1].timeStamp), new Date());
    }
    const [content, setContent] = useState("");
    const { _id: chatId } = useParams();
    const chatName = queryParams.get("name");
    const dispatch = useDispatch();
    const onChangeHandler = (event) => {
        setContent(event.target.value);
    };
    const sendMessage = async () => {
        try {
            setLoading(true);
            socket.emit("sendMessage", { chatId, content });
            setLoading(false);
            setContent("");
        } catch (error) {
            setLoading(false);
            setAlert({ type: 'error', message: 'Failed to send message' });
        }
    };
    useEffect(() => {
        socket.on("error", (data) => {
            setAlert({ type: 'error', message: data.message });
        });
    }, []);
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                socket.emit("fetchMessage", { chatId });
                socket.on("messages", (data) => {
                    setMessages(data);
                });
            } catch (error) {
                setAlert({ type: 'error', message: 'Failed to fetch messages' });
            }
        };
        fetchMessages();
    }, [chatId, refresh, messages]);
    useEffect(() => {
        const scrollToBottom = () => {
            if (scrollableRef.current) {
                scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
            }
        };
        scrollToBottom();
    }, [messages]);
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }} className="ChatArea">
                <div className={`ChatAreaHeader ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className="ConversationIcon">X</p>
                    <div className="HeaderText">
                        <p className={`ConversationTitle ${darkTheme ? "DarkMode" : "LightMode"}`}>{chatName}</p>
                        <p className={`ConversationTime ${darkTheme ? "DarkMode" : "LightMode"}`}>{timeStamp}</p>
                    </div>
                </div>
                <motion.div variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -20 }
                }}
                    initial="hidden"
                    animate="visible"
                    ref={scrollableRef}
                    transition={{ duration: 0.5, delay: 0.2 }} className={`MessageContainer ${darkTheme ? "DarkMode" : "LightMode"} scrollable`}>
                    
                    {alert && ( 
                    <Alert type={alert.type} message={alert.message} afterClose={() => setAlert(null)}  showIcon closable/>
                )}
                    <div className="MessageArea">
                        {messages.map((message, index) => {
                            if (message.sender._id === userData._id) {
                                return <MessageSelf key={index} message={message.content} time={message.timeStamp} />;
                            } else {
                                return <MessageOthers key={index} message={message.content} sender={message.sender.name} time={message.timeStamp} />;
                            }
                        })}
                    </div>
                </motion.div>
                <div className={`TextInputArea ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <input autoComplete="off" onKeyDown={(async (event) => {
                        if (event.code == "Enter") {
                            await sendMessage();
                            dispatch(toggleRefresh());
                        }
                    })} onChange={onChangeHandler} disabled={loading} type="text" name="content" value={content} placeholder="Type a message" className={`SearchBox ${darkTheme ? "DarkMode" : "LightMode"}`} required />
                    <IconButton onClick={async () => {
                        await sendMessage();
                        dispatch(toggleRefresh());
                    }} disabled={loading}>
                        <SendIcon className={`${darkTheme ? "DarkModeIcon" : "LightModeIcon"}`} />
                    </IconButton>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
