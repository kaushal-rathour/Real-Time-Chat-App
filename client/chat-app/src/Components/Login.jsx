import { Button, TextField } from "@mui/material";
import logo from "../assets/message_icon-512px.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
export default function Login () {
    const navigate = useNavigate();
    return (
        <div className="LoginContainer">
            <div className="ImageContainer">
                <img src={logo}/>
            </div>
            {/* <div className="LoginBox"> */}
            <form className="LoginBox" onSubmit={(event)=>{event.preventDefault(); navigate("welcome")}}>
            <p className="LoginBoxText">Login to your account</p>
            <TextField label="Username" type="text" variant="outlined" name="username" required></TextField>
            <TextField label="Password" variant="outlined" name="password" type="password" required></TextField>
            <Button variant="contained"  type="submit">Login</Button>
            {/* </div> */}
            </form>
        </div>
    )
}