import { io } from "socket.io-client";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";

export const socket = io(DEPLOYED_ENDPOINT, {
    autoConnect: false,
});
