import "./MobileAccountMenu.css";
import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";
import { auth } from "../../config/firebase";
import { useState, useRef, useEffect } from "react";
import useUserContext from "../../contexts/useUserContext";
import {useNavigate} from "react-router-dom"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import useMobileContext from "../../contexts/useMobileContext";

import {Typography, Stack, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem, Divider} from "@mui/material";


const MobileAccountMenu = () => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const {authUser} = useUserContext(); 
    const {setMobileOpen} = useMobileContext();
    const navigate = useNavigate();
    const handleLogoutClick= () => {
        setMobileOpen(false)
        auth.signOut();
    }
    const handleLoginClick = () => {
        setMobileOpen(false)
        setLoginOpen(true);
    }
    const handleRegisterClick = () => {
        setMobileOpen(false)
        setRegisterOpen(true);
    }
    const handleAccountClick = () => {
        setMobileOpen(false)
        navigate("account")
    }
    
    return (
        <Stack direction="column" spacing={1}
         id="account-menu-container"
        >
            <Typography variant="h4">Profil</Typography>
            <Divider />
            <Stack direction="column">
                <MenuList>
                {authUser === null ?
                [<MenuItem onClick={handleLoginClick} key={"logga in"}>Logga in</MenuItem>, 
                <MenuItem onClick={handleRegisterClick} key={"Registrera"}>Registrera</MenuItem>]
                    :
                    [
                        <MenuItem onClick={handleAccountClick} key={"myaccount"}>Mitt konto</MenuItem>,
                        <MenuItem onClick={handleLogoutClick} key={"logout"}>Logga ut</MenuItem>
                    
                    ]
                }

                </MenuList>
            </Stack>
            <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen}/>
            <RegisterDialog registerOpen={registerOpen} setRegisterOpen={setRegisterOpen}/>
        </Stack>
    )
}

export default MobileAccountMenu;