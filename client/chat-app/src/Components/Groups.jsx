import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import { toggleRefresh } from "../Features/refreshSlice";
const LOCAL_ENDPOINT = "http://localhost:3000";
const DEPLOYED_ENDPOINT = "https://real-time-chat-app-yg74.onrender.com/";
export default function Groups () {
    const darkTheme = useSelector((state)=> state.themeKey);
    const [groups, setGroups] = useState([]);
    const userData = JSON.parse(localStorage.getItem("userData"));
    const dispatch = useDispatch();
    const config = {
        headers: {
            Authorization: `${userData.token}`
        }
    };
    const fetchGroups = async ()=> {
        try{
        let response = await axios.get(`${DEPLOYED_ENDPOINT}/fetchgroups`, config);
        setGroups(response.data);
        }catch(err) {
            console.log(err.message);
        }
    }
    useEffect(()=> {
        fetchGroups();
    }, []);
    return (
        <AnimatePresence>
        <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="UserGroupsContainer"
        >
            <div className={`UserGroupsHeader ${darkTheme ? "DarkMode" : "LightMode"}`}>
                <img src={logo} alt="Logo" />
                <p className={`UserGroupsTitle ${darkTheme ? "DarkMode" : "LightMode"}`}>Available Groups</p>
            </div>
    
            <div className={`SidebarSearch ${darkTheme ? "DarkMode" : "LightMode"}`}>
                <input type="text" placeholder="Search" className={`${darkTheme ? "DarkMode" : "LightMode"}`} />
                <IconButton>
                    <SearchIcon className={`${darkTheme? "DarkModeIcon": "LightModeIcon"}`}/>
                </IconButton>
            </div>
    
            <motion.div 
                className={`UserGroupsList ${darkTheme ? "DarkMode" : "LightMode"}`}
                variants={{
                    visible: { opacity: 1, y: 0 },
                    hidden: { opacity: 0, y: -20 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.2 }}>

                

                {groups.map((group, index)=> {
                    return<motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`} key={index} onClick={async()=> {
                        await axios.put("http://localhost:3000/addselftogroup/", {
                                chatId: group._id,
                                userId: userData._id,
                        },config);
                        dispatch(toggleRefresh());
                    }}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>{group.chatName}</p>
                </motion.div>
                })}
                
                </motion.div>
        </motion.div>
    </AnimatePresence>
    
    )
}