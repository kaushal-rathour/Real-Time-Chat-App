import "./ConversationItem.css"
export default function ConversationItem ({ props }) {
    return (
        <div className="Conversation">
            <p className="ConversationIcon">{props.name[0]}</p>
            <p className="ConversationTitle">{props.name}</p>
            <p className="ConversationLastMessage">{props.lastMessage}</p>
            <p className="ConversationTime">{props.timeStamp}</p>
        </div>
    )
}