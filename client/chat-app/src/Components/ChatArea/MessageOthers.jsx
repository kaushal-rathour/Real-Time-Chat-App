import "./MessageOthers.css"
export default function MessageOthers ({message, sender, time}) {
    time = new Date(time);
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes}${meridiem}`;
    return (
        <div className="MessageOthersContainer">
            <div className="OthersConversationContainer">
                <p className="ConversationIcon">{sender[0]}</p>
                <div className="OthersMessageBox">
                    <p className="ConversationTitle">{sender}</p>
                    <p className="ConversationMessage">{message}</p>
                    <p className="OthersTimeStamp">{formattedTime}</p>
                </div>
            </div>
        </div>
    )
}