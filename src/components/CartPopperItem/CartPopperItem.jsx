import useCartContext from "../../contexts/useCartContext"
import {Stack, Typography, Button, Divider} from "@mui/material"
import CartPopperItemCard from "../CartPopperItemCard/CartPopperItemCard"
import "./CartPopperItem.css"
import useUserContext from "../../contexts/useUserContext"

const CartPopperItem = () => {
    const {cart} = useCartContext();
    const {authUser} = useUserContext();
    let total = String(Math.round(Number(cart.total)));
    total = total.length > 3 ? `${total.slice(0, total.length - 3)} ${total.slice(total.length - 3)}` : total;
    return (
        <>
            <Divider/>
            <Stack direction="column" sx={{width:"100%", maxHeight:"480px", justifyContent:"space-between", marginTop:"5px"}}>
                <Stack direction="column"className="cart-item-scrollable-list" spacing={1} sx={{overflow:"scroll", scrollbarWidth:"none"}}>
                    
                    <Stack sx={{height: "100%", width: "100%"}}>
                        {cart.items.length === 0 ? 
                            <Typography variant="body1">Din varukorg är tom</Typography>
                                                 :
                            cart.items.map((item, idx) => {
                                return (<CartPopperItemCard item={item} key={idx}/>)
                            })
                        }

                    </Stack>
                </Stack>
                <Stack direction="column" className="cart-summary" spacing={1}>
                    <Divider/>
                    <Typography variant="h5" className="order-summary-text">Ordersammanfattning</Typography>
                    <Stack direction="row" sx={{justifyContent:"space-between"}}>
                        <Typography variant="subtitle1" className="cart-total-sum-title">Totalsumma: </Typography>
                        <Typography variant="body1">{total} SEK</Typography>
                    </Stack>
                    <Button variant="outlined" disabled={authUser === null} className="go-to-checkout-button">Gå till kassan</Button>
                </Stack>
            </Stack>
        </>
    )
}
export default CartPopperItem