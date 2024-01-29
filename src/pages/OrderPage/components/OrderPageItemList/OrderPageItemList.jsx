import "./OrderPageItemList.css"
import useCartContext from "../../../../contexts/useCartContext"
import {Typography, Divider, Stack, Button} from "@mui/material"
import OrderPageItem from "../OrderPageItem/OrderPageItem";
import priceFormat from "../../../../helpers/priceFormat";
import {useNavigate} from "react-router-dom";

const OrderPageItemList = () => {
    const {cart, placeOrder} = useCartContext();
    const navigate = useNavigate();
    const handlePlaceOrder = async() => {
        const orderid = await placeOrder();
        navigate("/success?orderid=" + orderid)
    }
    return (
        <Stack direction="column" sx={{marginTop:"20px"}}>
            <Typography sx={{paddingBottom:"10px", fontWeight:"bold"}} textAlign="center" variant="h5">Varukorg</Typography>
            {/* <Typography sx={{paddingBottom:"10px", fontWeight:"bold", fontSize:"1.5rem"}} textAlign="center" variant="subtitle1">Dina varor</Typography> */}
            <Divider />
            <Stack sx={{height:"450px",  marginTop:"20px"}}>
                <Stack direction="column" spacing={1} sx={{height: "100%", width: "100%", alignItems:"center", overflowY:"scroll", scrollbarWidth:"none"}}>
                    {cart.items.map((item,idx) => {
                        return <OrderPageItem item={item} key={item.title + item.price +idx} />
                    })}
                </Stack>

            </Stack>
            <Divider />
            <Typography textAlign="center" variant="h5" sx={{marginTop:"15px", marginBottom:"10px"}}>Justera din varukorg. När du är klar, klicka på beställ för att placera ordern</Typography>
            <Stack direction="row" spacing={4} sx={{justifyContent:"center", alignItems:"center", marginBottom:"15px"}}>
                <Typography textAlign="center" variant="subtitle1" className="checkout-total-sum-title">Totalsumma: </Typography>
                <Typography textAlign="center" variant="body1" className="checkout-total-sum-title">{priceFormat(cart.total)} SEK</Typography>
            </Stack>
            <Stack sx={{justifyContent:"center", alignItems:"center"}}>
                <Button variant="contained" sx={{width:"250px"}} onClick={handlePlaceOrder} className="place-order-button">Beställ</Button>
            </Stack>
        </Stack>
    )
}
export default OrderPageItemList