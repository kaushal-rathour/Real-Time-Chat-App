import "./ChatArea.css"
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import MessageOthers from "./MessageOthers";
import MessageSelf from "./MessageSelf";
export default function ChatArea () {
    let props =
        {
            name: "Name 1",
            lastMessage: "LastMessage1",
            timeStamp: "today",
        };
    return (
        <div className="ChatArea">
            <div className="ChatAreaHeader">
                <p className="ConversationTitle">{props.name[0]}</p>
                <div className="HeaderText">
                    <p className="ConversationTitle">{props.name}</p>
                    <p className="ConversationTime">{props.timeStamp}</p>
                </div>
                <IconButton>
                    <DeleteIcon/>
                </IconButton>
            </div>
            <div className="MessageContainer">
            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>
            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>

            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>

            <div className="MessageArea">
                <MessageOthers/>
                <MessageSelf/>
            </div>
    </div>

            <div className="TextInputArea">
                <input type="text" placeholder="Type a message" className="SearchBox"/>
                <IconButton>
                    <SendIcon/>
                </IconButton>
            </div>
        </div>
    )
}