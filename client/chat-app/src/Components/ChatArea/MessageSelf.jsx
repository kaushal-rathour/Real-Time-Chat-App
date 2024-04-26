import "./MessageSelf.css"
export default function MessageSelf ({message, time}) {
    time = new Date(time);
    let hours = time.getHours();
    const minutes = time.getMinutes();
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const formattedTime = `${hours}:${minutes}${meridiem}`;
    return (
        <div className="MessageSelfContainer">
            <div className="SelfMessageBox">
                <p className="ConversationMessage">{message}</p>
                <p className="SelfTimeStamp">{formattedTime}</p>
            </div>
        </div>
    )
}