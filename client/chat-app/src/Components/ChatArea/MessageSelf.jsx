import "./MessageSelf.css"
export default function MessageSelf () {
    let props = {name: "You", message: "This is a simple message by you This is a simple message by you This is a simple message by you"}
    return (
        <div className="MessageSelfContainer">
            <div className="SelfMessageBox">
                <p className="ConversationMessage">{props.message}</p>
                <p className="SelfTimeStamp">12:00 AM</p>
            </div>
        </div>
    )
}