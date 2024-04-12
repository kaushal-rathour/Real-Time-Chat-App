import { Button, TextField } from "@mui/material";
import logo from "../assets/message_icon-512px.png";
import "./Login.css";
export default function Login () {
    return (
        <div className="LoginContainer">
            <div className="ImageContainer">
                <img src={logo}/>
            </div>
            <div className="LoginBox">
            <p className="LoginBoxText">Login to your account</p>
            <TextField label="Username" type="text" variant="outlined" name="username"></TextField>
            <TextField label="Password" variant="outlined" name="password" type="password"></TextField>
            <Button variant="contained">Login</Button>
            </div>
        </div>
    )
}