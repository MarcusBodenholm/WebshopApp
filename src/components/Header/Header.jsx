
import {Stack, Typography, AppBar, Toolbar, Link} from "@mui/material";
import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <AppBar position="relative" sx={{width:"100%"}}>
            <Toolbar sx={{justifyContent: "space-between", justifySelf:"flex-start", alignSelf:"flex-start", flexDirection: "row", gap:"10px", width:"100%", marginBottom:"20px"}}>
                <Stack direction="row" spacing={2}>
                    <Link component={NavLink} to="/store/dam">Dam</Link>
                    <Link component={NavLink} to="/store/herr">Herr</Link>
                </Stack>
                <Typography textAlign="center" variant="h2" sx={{flexGrow:"1"}}>Top Style</Typography>
                <Stack direction="row" spacing={1}>
                    <Typography>Search</Typography>
                    <Typography>Log in</Typography>
                    <Typography>Cart</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header