import { useState } from "react";
import ConversationItem from "./ConversationItem";

export default function Conversations () {
    let [conversations, setConversations] = useState([
        {
            name: "Name 1",
            lastMessage: "LastMessage1",
            timeStamp: "today",
        },
        {
            name: "Name 2",
            lastMessage: "LastMessage2",
            timeStamp: "today",
        },
        {
            name: "Name 3",
            lastMessage: "LastMessage3",
            timeStamp: "today",
        }
    ]);
    return (
        <>
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
                {conversations.map((conversation, i)=>{
                    return(<ConversationItem props={conversation} key={i}/>)
                })}
        </>
    )
}