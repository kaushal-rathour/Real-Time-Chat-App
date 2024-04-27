import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import axios from "axios";
import { useSelector} from "react-redux";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";

export default function Conversations () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let [conversations, setConversations] = useState([]);
    const refresh = useSelector((state) => state.refresh);
    const config = {
        headers: {
            Authorization: `${userData.token}`
        }
    };
    const fetchChats = async ()=> {
        try {
            let response = await axios.get(`${DEPLOYED_ENDPOINT}/chat`, config);
            setConversations(response.data.reverse());
        }catch(error) {
        }
        }
    useEffect(()=> {
        fetchChats();
    },[refresh])
    return (
        <>
                {conversations.map((conversation, i)=>{
                    let chatName;
                    if(conversation.isGroupChat) {
                        chatName = conversation.chatName;
                    }else {
                        conversation.participants.map((participant)=> {
                            if(participant._id != userData._id) {
                                chatName = participant.name;
                            }
                        })
                    }
                    return(<ConversationItem props={conversation} chatName={chatName} key={i}/>)
                })}
        </>
    )
}