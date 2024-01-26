import {Stack, Typography, AppBar, Toolbar, Link, Popper, Paper, Badge} from "@mui/material";
import { NavLink } from "react-router-dom";
import {ShoppingCartSharp} from "@mui/icons-material";
import { useRef, useState } from "react";
import "./header.css"
import CartPopperItem from "../CartPopperItem/CartPopperItem";
import { useCartContext } from "../../contexts/cartContext";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {cart} = useCartContext();
    const popperRef = useRef();
    const handleHover = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    return (
        <AppBar position="relative" sx={{width:"100%"}}>
            <Toolbar sx={{justifyContent: "space-between", justifySelf:"flex-start", alignSelf:"flex-start", flexDirection: "row", gap:"10px", width:"100%", marginBottom:"20px"}}>
                <Stack direction="column" sx={{width:"100%"}}>
                    <Stack direction="row" sx={{justifyContent: "space-between", alignItems:"center", flexDirection: "row", gap:"10px", width:"100%", marginBottom:"20px"}}>
                        <Typography>Sök</Typography>
                        <Typography textAlign="center" variant="h2" sx={{flexGrow:"1"}}>Top Style</Typography>
                        <Stack onMouseEnter={handleHover} onMouseLeave={handleHover} ref={popperRef} className={open ? "supreme-cart-container" : "supreme-cart-container-inactive"} direction="column">
                            <Stack direction="row" spacing={2} className={open ? "cart-container cart-container" : "cart-container-inactive"}>
                                <Badge badgeContent={cart.totalItems} color="info">
                                    <ShoppingCartSharp color={open ? "info" : "black"} />
                                </Badge>
                                <Typography>Varukorg</Typography>
                            </Stack>
                            <Popper id={id} open={open} anchorEl={anchorEl} position="bottom-start">
                                <Paper className="popper-container" elevation={12}>
                                    <CartPopperItem />
                                </Paper>
                            </Popper>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Typography>Logga in</Typography>

                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Link component={NavLink} to="/store/dam">Dam</Link>
                        <Link component={NavLink} to="/store/herr">Herr</Link>
                    </Stack>

                    
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header