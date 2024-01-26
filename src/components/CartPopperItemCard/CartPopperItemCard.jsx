import "./CartPopperItemCard.css";
import {Stack, Typography} from "@mui/material"
import { CloseSharp } from "@mui/icons-material";
import { useCartContext } from "../../contexts/cartContext";
import priceFormat from "../../helpers/priceFormat";

const CartPopperItemCard = ({item}) => {
    const {removeItemFromCart} = useCartContext();

    const handleRemoveItemClick = () => {
        removeItemFromCart(item.id);
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
            <CloseSharp onClick={handleRemoveItemClick} className="cart-popper-item-remove-button" />
        </Stack>
    )
}
export default CartPopperItemCard