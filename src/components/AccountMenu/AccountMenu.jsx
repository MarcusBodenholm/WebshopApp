import "./AccountMenu.css";
import { useState, useRef, useEffect } from "react";
import {Typography, Stack, Popper, Paper, Grow, ClickAwayListener, MenuList, MenuItem} from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { auth, googleProvider } from "../../config/firebase";
import useUserContext from "../../contexts/useUserContext";
const AccountMenu = () => {
    const [open, setOpen] = useState(false);
    const {authUser} = useUserContext(); 
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
                            <MenuItem onClick={handleClose}>Profile</MenuItem>
                            <MenuItem onClick={handleClose}>My account</MenuItem>
                            <MenuItem onClick={handleClose}>{authUser === null ? "Login" : "Logout"}</MenuItem>
                        </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
            </Popper>

        </Stack>
    )
}
export default AccountMenu