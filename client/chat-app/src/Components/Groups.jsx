import "./UserGroups.css";
import logo from "../assets/message_icon-512px.png";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton } from "@mui/material";
import { useSelector } from "react-redux";
import {AnimatePresence, motion} from "framer-motion";
 
export default function Groups () {
    const darkTheme = useSelector((state)=> state.themeKey);
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

                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                <motion.div 
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={`ListItem ${darkTheme ? "DarkMode" : "LightMode"}`}>
                    <p className={`ConversationIcon ${darkTheme ? "DarkMode" : "LightMode"}`}>T</p>
                    <p className={`ConversationTitle`}>Test Group</p>
                </motion.div>
                

            </motion.div>
        </motion.div>
    </AnimatePresence>
    
    )
}