
import {Stack, Typography, AppBar, Toolbar} from "@mui/material";
import { useCartContext } from "../../contexts/cartContext";

const Header = () => {
    const {cart, setCart} = useCartContext();
    const handleClick = () => {
        setCart({value: cart.value+1})
    }
    return (
        <AppBar position="relative" sx={{width:"100%"}}>
            <Toolbar sx={{justifyContent: "space-between", justifySelf:"flex-start", alignSelf:"flex-start", flexDirection: "row", gap:"10px", width:"100%"}}>
                <Stack direction="row" spacing={2}>
                    <Typography>Women</Typography>
                    <Typography>Men</Typography>
                </Stack>
                <Typography variant="h2">Top Style</Typography>
                <Stack direction="row" spacing={1}>
                    <button onClick={handleClick}>Click me</button>
                    <Typography>Search</Typography>
                    <Typography>Log in</Typography>
                    <Typography>Cart</Typography>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default Header