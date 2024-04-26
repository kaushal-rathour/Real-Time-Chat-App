import { Button, TextField } from "@mui/material";
import logo from "../assets/message_icon-512px.png";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Alert, Spin } from "antd";

export default function Login() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [data, setData] = useState({ name: "", username: "", email: "", password: "" });

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
            let response = await axios.post("http://localhost:3000/login", data);
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
            let response = await axios.post("http://localhost:3000/register", data);
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

    const navigate = useNavigate();

    return (
        <div className="LoginContainer">
            <div className="AlertContainer">
                {alert && <Alert type={alert.type} message={alert.message} closable showIcon afterClose={() => { setAlert(false) }} />}
            </div>
            <div className="ImageContainer">
                <img src={logo} alt="Logo" />
            </div>
            
            <form className="LoginBox" onSubmit={isSignUp ? signUpHandler : loginHandler} method="POST">
                {loading && <Spin size="small" />}
                <p className="LoginBoxText">{isSignUp ? "Create a new account" : "Login to your account"}</p>
                {isSignUp && (<TextField label="Name" type="text" variant="outlined" name="name" onChange={onChangeHandler} required />)}
                {isSignUp && (<TextField label="Email" type="email" variant="outlined" name="email" onChange={onChangeHandler} required />)}
                <TextField label="Username" className="username" type="text" variant="outlined" name="username" onChange={onChangeHandler} required />
                <TextField label="Password" variant="outlined" name="password" type="password" onChange={onChangeHandler} required />
                <Button variant="contained" type="submit" disabled={loading}>{isSignUp ? "Sign Up" : "Login"}</Button>
                <Button variant="text" onClick={toggleSignup}>
                    {isSignUp ? "Already registered? Login" : "Not registered yet? Sign Up"}
                </Button>
            </form>
        </div>
    );
}
