import "./OrderPageItem.css"
import useCartContext from "../../../../contexts/useCartContext";
import {Stack, Typography} from "@mui/material"
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import priceFormat from "../../../../helpers/priceFormat";


const OrderPageItem = ({item}) => {
    const {changeQuantityOfItem, addItemToCart} = useCartContext();
    const handleRemoveItemClick = () => {
        changeQuantityOfItem(item);
    }
    const handleAddItemClick = () => {
        addItemToCart(item);
    }

    return (
        <Stack direction="row" sx={{width: "700px"}}>
            <img className="checkout-item-card-image" src={item.images[0]} />
            <Stack direction="row" sx={{marginLeft: "5px", width: "100%", height:"150px", justifyContent:"space-between"}} >
                <Stack direction="column" spacing={2} sx={{width:"300px"}}>
                    <Typography variant="body2" className="checkout-item-card-brand">Märke: {item.brand}</Typography>
                    <Typography variant="body1" className="checkout-item-card-title">{item.title}</Typography>
                    <Typography variant="body1" className="checkout-item-card-size">Storlek: {item.size.toUpperCase()}</Typography>
                </Stack>
                <Stack sx={{justifyContent:"center", alignItems:"center", width:"100px"}}>
                    <Stack direction="row" spacing={1}>
                        <RemoveSharpIcon className="checkout-item-button" onClick={handleRemoveItemClick}/>
                        <Typography variant="body1" className="checkout-item-card-quantity">{item.quantity}</Typography>
                        <AddSharpIcon className="checkout-item-button" onClick={handleAddItemClick}/>
                    </Stack>
                </Stack>
                <Stack sx={{justifyContent:"center", alignItems:"center", width:"150px"}}>
                    <Typography variant="body1" className="checkout-item-card-price">{priceFormat(Number(item.price.replace(',', '.')) * item.quantity)} SEK</Typography>
                </Stack>
            </Stack>
        </Stack>
    )
}
export default OrderPageItem