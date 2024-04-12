import logo from "../assets/message_icon-512px.png";
import "./Welcome.css"
export default function Welcome () {
    return (
        <div className="WelcomeContainer">
           <img src={logo}/>
           <div className="WelcomeLogo">
                <p>Your Messages Will Appear Here.</p>
           </div>
        </div>
    )
}