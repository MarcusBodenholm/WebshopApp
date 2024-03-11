import "./OrderPageItem.css"
import useCartContext from "../../../../contexts/useCartContext";
import {Stack, Typography, useTheme, useMediaQuery} from "@mui/material"
import AddSharpIcon from '@mui/icons-material/AddSharp';
import RemoveSharpIcon from '@mui/icons-material/RemoveSharp';
import priceFormat from "../../../../helpers/priceFormat";


const OrderPageItem = ({item}) => {
    const {changeQuantityOfItem, addItemToCart} = useCartContext();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))
    const handleRemoveItemClick = () => {
        changeQuantityOfItem(item);
    }
    const handleAddItemClick = () => {
        addItemToCart(item);
    }

    return (
        <>
        {mobile ?
        <Stack direction="row" sx={{width: "400px"}}>
            <img className="checkout-item-card-image" src={item.images[0]} />
            <Stack direction="row" sx={{marginLeft: "5px", width: "100%", height:"150px", justifyContent:"space-between"}} >
                <Stack direction="column" spacing={2} sx={{width:"120px"}}>
                    <Typography variant="body2" className="checkout-item-card-brand">Märke: {item.brand}</Typography>
                    <Typography variant="body1" className="checkout-item-card-title">{item.title}</Typography>
                    <Typography variant="body1" className="checkout-item-card-size">Storlek: {item.size.toUpperCase()}</Typography>
                </Stack>
                <Stack direction="column" sx={{justifyContent:"center", width:"120px"}} spacing={3}>
                    <Stack direction="row" spacing={1}>
                        <RemoveSharpIcon className="checkout-item-button" onClick={handleRemoveItemClick}/>
                        <Typography variant="body1" className="checkout-item-card-quantity">{item.quantity}</Typography>
                        <AddSharpIcon className="checkout-item-button" onClick={handleAddItemClick}/>
                    </Stack>
                <Stack sx={{justifyContent:"center"}}>
                    <Typography variant="body1" className="checkout-item-card-price">{priceFormat(Number(item.price.replace(',', '.')) * item.quantity)} SEK</Typography>
                 </Stack>

                </Stack>
            </Stack>
        </Stack>

        :
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

        }
        </>
    )
}
export default OrderPageItem