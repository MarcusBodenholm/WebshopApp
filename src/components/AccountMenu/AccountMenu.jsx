import "./AccountMenu.css";
import { useState, useRef, useEffect } from "react";
import {Typography, Stack, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth } from "../../config/firebase";
import useUserContext from "../../contexts/useUserContext";
import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";
import {useNavigate} from "react-router-dom"
const AccountMenu = ({mobile}) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [registerOpen, setRegisterOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null)
    const {authUser} = useUserContext(); 
    const anchorRef = useRef(null);
    const navigate = useNavigate();
    const handleToggle = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        
    };
  
    const handleClose = () => {
        setAnchorEl(null);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setAnchorEl(null)
        } else if (event.key === 'Escape') {
            setAnchorEl(null)
        }
    }    
    const open = Boolean(anchorEl);
    const prevOpen = useRef(open);
    const handleLogoutClick= () => {
        setAnchorEl(null)
        auth.signOut();
    }
    const handleLoginClick = () => {
        setAnchorEl(null)
        setLoginOpen(true);
    }
    const handleRegisterClick = () => {
        setAnchorEl(null)
        setRegisterOpen(true);
    }
    const handleAccountClick = () => {
        setAnchorEl(null)
        navigate("account")
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
            <Typography>{mobile ? "" : "Profil"}</Typography>
            <AccountCircleIcon color={authUser ? "info" : "black"}/>
            <Popper
            open={open}
            anchorEl={anchorEl}
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
                                <MenuItem onClick={handleAccountClick} key={"myaccount"}>Mitt konto</MenuItem>,
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