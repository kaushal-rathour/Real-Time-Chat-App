import { useEffect, useState } from "react";
import ConversationItem from "./ConversationItem";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";


export default function Conversations () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    let [conversations, setConversations] = useState([]);
    const refresh = useSelector((state) => state.refresh);
    const fetchChats = async ()=> {
            const config = {
                headers: {
                    Authorization: `${userData.token}`
                }
            };
            let response = await axios.get("http://localhost:3000/chat/", config);
            setConversations(response.data.reverse());
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