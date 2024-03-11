import "./header.css"
import {Stack, Typography, AppBar, Toolbar, Link, Popper, Paper, Badge, Box, useTheme, useMediaQuery} from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import {ShoppingCartSharp} from "@mui/icons-material";
import { useRef, useState } from "react";
import CartPopperItem from "../CartPopperItem/CartPopperItem";
import useCartContext from "../../contexts/useCartContext";
import TopStyleLogo2 from "../../assets/topstylemk2.png"
import SearchBar from "../SearchBar/SearchBar";
import AccountMenu from "../AccountMenu/AccountMenu";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import useMobileContext from "../../contexts/useMobileContext";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const {cart} = useCartContext();
    const {mobileOpen, setMobileOpen} = useMobileContext();
    const popperRef = useRef();
    const handleHover = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };
    const location = useLocation();
    const getDepartment = () => {
        const pathArray = location.pathname.split("/");
        if (pathArray.length === 3) {
            return pathArray[2];
        }
        return null;
    }
    const toggleMobileSideBar = () => {
        setMobileOpen(!mobileOpen)
    }
    const department = getDepartment();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        
        <AppBar position="relative" sx={{width:"100%"}}>
            {mobile ? 
            <Stack direction="column">
                <Stack direction="row">
                    <Stack onClick={toggleMobileSideBar} sx={{justifyContent:"center", alignItems:"center", marginLeft:"10px"}}>
                        { mobileOpen ? <CloseIcon  className="opensidebaricon" /> : <MenuIcon  className="opensidebaricon"/>}
                    </Stack>
                        
                    <div style={{display:"flex", justifyContent:"center", paddingLeft:"25px"}}>
                        <Link component={NavLink} to="/store"><img src={TopStyleLogo2} style={{width: "200px", height:"65px"}}/></Link>
                    </div>
                    <Stack component={NavLink} to="/checkout" sx={{marginBottom:"10px"}}  ref={popperRef} className={open ? "supreme-cart-container-mobile-inactive" : "supreme-cart-container-inactive-mobile"} direction="column">
                        <Stack direction="row" spacing={1} className={open ? "cart-container cart-container" : "cart-container-inactive"}>
                            <Badge badgeContent={cart.totalItems} color="info">
                                <ShoppingCartSharp color={open ? "info" : "info"} />
                            </Badge>
                            <Typography sx={{color: "rgb(112, 0, 22)", textDecoration:"none"}}></Typography>
                        </Stack>
                    </Stack>

                    {/* <AccountMenu mobile={mobile} /> */}
                    
                </Stack>
                <Stack sx={{justifyContent:"center", alignItems:"center"}}>
                    <SearchBar mobile={mobile}/>
                </Stack>
            </Stack>
            
            :
            
            <Toolbar sx={{justifyContent: "space-between", justifySelf:"flex-start", alignSelf:"flex-start", flexDirection: "row", gap:"10px", width:"100%", marginBottom:"5px"}}>
                <Stack direction="column" sx={{width:"100%"}}>
                    <Stack direction="row" sx={{justifyContent: "space-between", alignItems:"center", flexDirection: "row", gap:"10px", width:"100%", marginBottom:"10px"}}>
                        <SearchBar />
                        <div style={{display:"flex", flexGrow:"1", justifyContent:"center"}}>
                            <Link component={NavLink} to="/"><img src={TopStyleLogo2} style={{width: "200px", height:"65px"}}/></Link>
                        </div>
                        
                        {/* <Typography textAlign="center" variant="h2" sx={{flexGrow:"1", paddingLeft:"50px"}}>Top Style</Typography> */}
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
                    <Stack direction="row" sx={{justifyContent:"space-between"}} spacing={3}>
                        <div style={{width: "240px"}}></div>
                        <Stack direction="row"  sx={{justifyContent:"center", flexGrow:"1"}}>
                            <Stack direction="row" spacing={5} sx={{width:"200px", marginLeft:"75px", justifyContent:"space-around"}}>
                                <Link underline="none" component={NavLink} to="/store/dam">
                                    <Box className="header-department-label-container">
                                        <Typography className={department === "dam" ? "header-department-label-active" : "header-department-label" } variant="body1">DAM</Typography>
                                    </Box>
                                </Link>
                                <Link underline="none" component={NavLink} to="/store/herr">
                                    <Box className="header-department-label-container">
                                        <Typography className={department === "herr" ? "header-department-label-active" : "header-department-label" } variant="body1">HERR</Typography>
                                    </Box>
                                </Link>

                            </Stack>
                        </Stack>
                        <Stack sx={{width: "300px", alignItems:"flex-end"}}>
                            <AccountMenu />
                        </Stack>
                        
                    </Stack>
                </Stack>
            </Toolbar>
            }
        </AppBar>
    )
}

export default Header