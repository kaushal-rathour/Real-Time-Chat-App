import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import {useEffect, useState} from "react";
import RefreshIcon from '@mui/icons-material/Refresh';
import { toggleRefresh } from "../Features/refreshSlice";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com";
export default function User () {
    const darkTheme = useSelector((state)=> state.themeKey);
    const refresh = useSelector((state) => state.refresh);
    const dispatch = useDispatch();
    const [users, setUsers] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const fetchUser = async ()=> {
        try{
        const config = {
            headers: {
                Authorization: `${userData.token}`
            }
        };
        let response = await axios.get(`${DEPLOYED_ENDPOINT}/fetchusers`, config);
        setUsers(response.data);
        }catch(err) {
            console.log(err.message);
        }
    }
    useEffect(()=> {
        fetchUser();
    }, [refresh]);
    return (
        <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
         className={`UserGroupsContainer`}>
            
            <div className={`UserGroupsHeader ${darkTheme? "DarkMode": "LightMode"}`}>
                <img src={logo}/>
                <p className={`UserGroupsTitle ${darkTheme? "DarkMode": "LightMode"}`}>Active Users</p>
                <RefreshIcon className={`UserGroupsRefresh ${darkTheme? "DarkModeIcon": "LightModeIcon"}`} onClick={(()=> {dispatch(toggleRefresh())})}/>
            </div>

            <div className={`SidebarSearch ${darkTheme? "DarkMode": "LightMode"}`}>
                <input type="text" placeholder="Search" className={`${darkTheme? "DarkMode": "LightMode"}`}/>
                <IconButton>
                <SearchIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>

            <motion.div className={`UserGroupsList ${darkTheme? "DarkMode": "LightMode"}`}
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: -20 }
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
            >
                {users.map((user, i)=> {
                    return <motion.div className={`ListItem ${darkTheme? "DarkMode": "LightMode"}`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }} key={i} id={user._id} onClick={async()=> {
                        const config = {
                            headers: {
                                Authorization: `${userData.token}`
                            }
                        };
                        await axios.post(`${DEPLOYED_ENDPOINT}/chat`, {userId: user._id}, config);
                        dispatch(toggleRefresh());
                    }}>
                        <p className={`ConversationIcon ${darkTheme? "DarkMode": "LightMode"}`}>{user.name[0]}</p>
                    <p className={`ConversationTitle`}>{user.name}</p>
                    </motion.div>
                })}

                </motion.div>
        </motion.div>
        </AnimatePresence>
    )
}