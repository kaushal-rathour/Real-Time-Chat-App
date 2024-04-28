import "./ChatArea.css"
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";
import { toggleRefresh } from "../../Features/refreshSlice";
import { io } from "socket.io-client";
import { formatDistance } from 'date-fns';
import { useRef } from "react";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";
export default function ChatArea () {
    const darkTheme = useSelector((state)=> state.themeKey);
    const refresh = useSelector((state) => state.refresh);
    const scrollableRef = useRef(null);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userData = JSON.parse(localStorage.getItem("userData"));
    let [messages, setMessages] = useState([]);
    let timeStamp  = "";
    if(messages.length>0) {
        timeStamp = formatDistance(new Date(messages[messages.length-1].timeStamp), new Date());
    }
    const [content, setContent] = useState("");
    const { _id: chatId } = useParams();
    const chatName = queryParams.get("name");
    const dispatch = useDispatch();
    const socket = io();
    const config = {
        headers: {
            Authorization: `${userData.token}`
        }
    };
        const onChangeHandler = (event) => {
            setContent(event.target.value);
        };
        
        // useEffect(() => {
        //     socket.emit("setup", userData);
        // }, []);
    
        // useEffect(() => {
        //     socket.on("messageReceived", (newMessage) => {
        //         setMessages((prevMessages) => [...prevMessages, newMessage]);
        //     });
        // }, []);
    
        const sendMessage = async () => {
            try {
                const response = await axios.post(`${DEPLOYED_ENDPOINT}/message`, {
                content: content,
                chatId: chatId,
            }, config);
    
                setContent("");
                // socket.emit("newMessage", response.data);
            }catch(error) {

            }
            
        };
        useEffect(() => {
            const scrollToBottom = () => {
              if (scrollableRef.current) {
                scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
              }
            };
            scrollToBottom();
          }, [messages]);

        useEffect(() => {
            
                const fetchMessages = async () => {
                    const response = await axios.get(
                        `${DEPLOYED_ENDPOINT}/message/${chatId}`,
                    config);
                    setMessages(response.data);
                    // socket.emit("joinChat", chatId);
                    dispatch(toggleRefresh());
                };

            fetchMessages();
        }, [chatId, refresh, messages]);
    

    
    return (
        <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }} className="ChatArea">
            <div className={`ChatAreaHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <p className="ConversationIcon">X</p>
                <div className="HeaderText">
                    <p className={`ConversationTitle ${darkTheme? "DarkMode": "LightMode"}`}>{chatName}</p>
                    <p className={`ConversationTime ${darkTheme? "DarkMode": "LightMode"}`}>{timeStamp}</p>
                </div>
                {/* <IconButton>
                    <DeleteIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton> */}
            </div>
            <motion.div variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -20 }
                }}
                initial="hidden"
                animate="visible"
                ref={scrollableRef}
                transition={{ duration: 0.5, delay: 0.2 }} className={`MessageContainer ${darkTheme? "DarkMode": "LightMode"} scrollable`}>
            <div className="MessageArea">
                        {messages.map((message, index)=> {
                            if (message.sender._id === userData._id) {
                                return <MessageSelf key={index} message={message.content} time={message.timeStamp} />;
                            } else {
                                return <MessageOthers key={index} message={message.content}  sender={message.sender.name} time={message.timeStamp}/>;
                            }
                        })}
            </div>
    </motion.div>

            <div className={`TextInputArea ${darkTheme? "DarkMode": "LightMode"}`}>
                <input autoComplete="off" onKeyDown={(async(event)=> {
                    if(event.code == "Enter") {
                        await sendMessage();
                        dispatch(toggleRefresh());
                    }
                })} onChange={onChangeHandler} type="text" name="content" value={content} placeholder="Type a message" className={`SearchBox ${darkTheme? "DarkMode": "LightMode"}`} required/>
                <IconButton onClick={async()=> {
                    await sendMessage();
                    dispatch(toggleRefresh());
                }}>
                    <SendIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>
        </motion.div>
        </AnimatePresence>
    )
}