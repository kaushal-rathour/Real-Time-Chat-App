import { useSelector } from "react-redux";
import logo from "../assets/message_icon-512px.png";
import "./Welcome.css"
export default function Welcome () {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const darkTheme = useSelector((state)=> state.themeKey);
    return (
        <div className={`WelcomeContainer ${darkTheme? `DarkMode`: `LightMode`}`}>
           <img src={logo}/>
          <p><b>Happy to see you {userData && userData.name}</b> <br/>Here's where your messages will show up. Stay connected and keep the conversation going!</p>
        </div>
    )
}