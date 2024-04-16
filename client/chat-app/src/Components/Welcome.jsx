import logo from "../assets/message_icon-512px.png";
import "./Welcome.css"
export default function Welcome () {
    return (
        <div className="WelcomeContainer">
           <img src={logo}/>
          <p>Here's where your messages will show up. Stay connected and keep the conversation going!</p>
        </div>
    )
}