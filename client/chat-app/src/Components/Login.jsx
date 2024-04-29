import { Button, TextField } from "@mui/material";
import "./Login.css";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; 
import { Alert, Spin } from "antd";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";

export default function Login() {
    const userData = JSON.parse(localStorage.getItem("userData"));
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState({ name: "", username: "", email: "", password: "" });
    const navigate = useNavigate();
    const toggleSignup = () => {
        setIsSignUp(!isSignUp);
    };

    const onChangeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const loginHandler = async (event) => {
        try {
            event.preventDefault();
            setAlert(false);
            setLoading(true);
            let response = await axios.post(`${DEPLOYED_ENDPOINT}/login`, data);
            localStorage.setItem("userData", JSON.stringify(response.data));
            setAlert({ type: "success", message: "Login Successful" });
            setLoading(false);
            navigate("welcome");
        } catch (error) {
            console.log(error);
            setAlert({ type: "error", message: error.response.data });
            setLoading(false);
        }
    };

    const signUpHandler = async (event) => {
        try {
            event.preventDefault();
            setAlert(false);
            setLoading(true);
            let response = await axios.post(`${DEPLOYED_ENDPOINT}/register`, data);
            localStorage.setItem("userData", JSON.stringify(response.data));
            setAlert({ type: "success", message: "Registered Successfully" });
            setLoading(false);
            navigate("welcome");
        } catch (error) {
            console.log(error);
            setAlert({ type: "error", message: error.response.data });
            setLoading(false);
        }
    };
    useEffect(()=> {
        if(userData) {
            navigate("/welcome");
        }
    })

    return (
        <div className="LoginContainer">
            <div className="AlertContainer">
                {alert && <Alert type={alert.type} message={alert.message} closable showIcon afterClose={() => { setAlert(false) }} />}
            </div>
            <form className="LoginBox" onSubmit={isSignUp ? signUpHandler : loginHandler} method="POST">
                {loading && <Spin size="small" />}
                <p className="LoginBoxText">{isSignUp ? "Create a new account" : "Login to your account"}</p>
                {isSignUp && (<TextField  autoComplete="off" label="Name" type="text" variant="outlined" name="name" onChange={onChangeHandler} required />)}
                {isSignUp && (<TextField autoComplete="off" label="Email" type="email" variant="outlined" name="email" onChange={onChangeHandler} required />)}
                <TextField autoComplete="off" label="Username" className="username" type="text" variant="outlined" name="username" onChange={onChangeHandler} required />
                <TextField autoComplete="off" label="Password" variant="outlined" name="password" type="password" onChange={onChangeHandler} required />
                <Button variant="contained" type="submit" disabled={loading}>{isSignUp ? "Sign Up" : "Login"}</Button>
                <a className="LoginSwitch" variant="text" onClick={toggleSignup}>
                    {isSignUp ? "Already registered? Login" : `Not registered yet? Sign Up`}
                </a>
            </form>
        </div>
    );
}
