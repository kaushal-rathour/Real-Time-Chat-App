import "./MessageOthers.css"
export default function MessageOthers () {
    let props = {name: "Kaushal Rathour", message: "This is a simple message by Kaushal Rathour Please Move To Next Line"}
    return (
        <div className="MessageOthersContainer">
            <div className="OthersConversationContainer">
                <p className="ConversationIcon">{props.name[0]}</p>
                <div className="OthersMessageBox">
                    <p className="ConversationTitle">{props.name}</p>
                    <p className="ConversationMessage">{props.message}</p>
                    <p className="OthersTimeStamp">12:00 PM</p>
                </div>
            </div>
        </div>
    )
}