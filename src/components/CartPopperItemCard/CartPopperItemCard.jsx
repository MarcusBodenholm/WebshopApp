import "./CartPopperItemCard.css";
import {Stack, Typography} from "@mui/material"
import { CloseSharp } from "@mui/icons-material";


const CartPopperItemCard = ({item}) => {
    const priceFormat = input => {
        const price = String(input);
        let result = price.length > 3 ? `${price.slice(0, price.length - 3)} ${price.slice(price.length - 3)}` : price;
        return result
    }
    return (
        <Stack direction="row" sx={{width: "100%", maxHeight:"200px"}}>
            <img className="cart-popper-item-card-image" src={item.images[0]} />
            <Stack direction="column" sx={{marginLeft: "5px", width:"160px"}} >
                <Typography variant="body2" className="cart-popper-item-card-brand">{item.brand}</Typography>
                <Typography variant="body1" className="cart-popper-item-card-title">{item.title}</Typography>
                <Typography variant="body1" className="cart-popper-item-card-size">Storlek: {item.size.toUpperCase()}</Typography>
                <Typography variant="body1" className="cart-popper-item-card-quantity">Mängd: {item.quantity}</Typography>
                <Typography variant="body1" className="cart-popper-item-card-price">{priceFormat(item.price * item.quantity)} SEK</Typography>
            </Stack>
            <CloseSharp className="cart-popper-item-remove-button" />
        </Stack>
    )
}
export default CartPopperItemCard