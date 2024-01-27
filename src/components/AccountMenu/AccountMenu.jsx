import "./AccountMenu.css";
import { useState, useRef, useEffect } from "react";
import {Typography, Stack, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem, Link} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth, googleProvider } from "../../config/firebase";
import useUserContext from "../../contexts/useUserContext";
import { useNavigate } from "react-router-dom";
import LoginDialog from "../LoginDialog/LoginDialog";
const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);
    const {authUser} = useUserContext(); 
    const navigate = useNavigate();
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
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
        auth.signOut();
    }
    const handleLoginClick = () => {
        setLoginOpen(true);
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
                            {authUser === null ? <><MenuItem onClick={handleLoginClick}>Logga in</MenuItem> 
                                <MenuItem onClick={handleLoginClick}>Registrera</MenuItem>
                            
                            </>
                            
                            : <> 
                                <MenuItem onClick={handleClose}>Mitt konto</MenuItem>
                                <MenuItem onClick={handleLogoutClick}>Logga ut</MenuItem>
                            
                            </>}
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>
            <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen}/>
        </Stack>
    )
}
export default AccountMenu