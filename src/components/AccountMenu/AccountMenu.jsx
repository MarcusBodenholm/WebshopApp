import "./AccountMenu.css";
import { useState, useRef, useEffect } from "react";
import {Typography, Stack, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem, Link} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from "../../config/firebase";
import useUserContext from "../../contexts/useUserContext";
import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";
const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);

    const {authUser} = useUserContext(); 
    const anchorRef = useRef(null);

    const handleToggle = () => {
        if (loginOpen === false) {
            setOpen((prevOpen) => !prevOpen);
        }
        
    };
  
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
    
        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }    
    const prevOpen = useRef(open);
    const handleLogoutClick= () => {
        setOpen(false);
        auth.signOut();
    }
    const handleLoginClick = () => {
        setOpen(false);
        setLoginOpen(true);
    }
    const handleRegisterClick = () => {
        setOpen(false);
        setRegisterOpen(true);
    }

    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
    
        prevOpen.current = open;
    }, [open]);
    
    return (
        <Stack direction="row" spacing={1}
        ref={anchorRef} id="account-menu-container" aria-controls={open ? 'account-menu' : undefined} aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true" onClick={handleToggle}
        >
            <Typography>Profil</Typography>
            <AccountCircleIcon color={authUser ? "info" : "black"}/>
            <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-end"
            transition
            disablePortal
            >
            {({ TransitionProps, placement }) => (
                <Grow
                {...TransitionProps}
                style={{
                    transformOrigin:
                    placement === 'bottom-end',
                }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                        <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                        >
                            {authUser === null ? [<MenuItem onClick={handleLoginClick} key={"logga in"}>Logga in</MenuItem>, 
                                <MenuItem onClick={handleRegisterClick} key={"Registrera"}>Registrera</MenuItem>]
                            
                            : [
                                <MenuItem onClick={handleClose} key={"myaccount"}>Mitt konto</MenuItem>,
                                <MenuItem onClick={handleLogoutClick} key={"logout"}>Logga ut</MenuItem>
                            
                            ]}
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
            <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen}/>
            <RegisterDialog registerOpen={registerOpen} setRegisterOpen={setRegisterOpen}/>
        </Stack>
    )
}
export default AccountMenu