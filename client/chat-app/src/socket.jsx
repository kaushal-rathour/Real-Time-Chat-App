import { io } from "socket.io-client";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";
const userData = JSON.parse(localStorage.getItem("userData"));
const token = userData?userData.token: "";
export const socket = io(DEPLOYED_ENDPOINT, {
    query: {token},
    autoConnect: false,
});
