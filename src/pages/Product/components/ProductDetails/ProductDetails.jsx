import {useState} from 'react'
import {Stack, Typography, FormControl, InputLabel, Select, MenuItem, Button, Accordion, AccordionDetails, AccordionSummary} from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import "./ProductDetails.css"
import useCartContext from '../../../../contexts/useCartContext';
import priceFormat from '../../../../helpers/priceFormat';
import useUserContext from '../../../../contexts/useUserContext';

const ProductDetails = ({productInfo}) => {
    const [size, setSize] = useState("s")
    const {authUser} = useUserContext();
    const handleSizeChange = event => {
        setSize(event.target.value);
    }
    const {addItemToCart} = useCartContext();
    const handleAddToCart = () => {
        const itemToAdd = {
            size: size,
            title: productInfo.title,
            description: productInfo.description,
            price: productInfo.price,
            brand: productInfo.brand,
            category: productInfo.category,
            for: productInfo.for,
            id: productInfo.id,
            images: productInfo.images
        }
        addItemToCart(itemToAdd);
    }
    const price = priceFormat(productInfo.price)
    return (
        <Stack direction="column" spacing={2}>
            <Typography variant="h5" className='product-price' paragraph>Pris: <Typography component="span" variant="h5">{price} SEK</Typography></Typography>
            <FormControl className="product-size-selector">
                <InputLabel id="product-size-label">Storlek</InputLabel>
                <Select labelId="product-size-label" id="product-size-select" value={size} label="Storlek" onChange={handleSizeChange}>
                    {productInfo.sizes.map((size, idx) => {
                        return <MenuItem value={size} key={idx}>{size.toUpperCase()}</MenuItem>
                    })}
                </Select>
            </FormControl>
            <Typography variant="body1" className="product-delivery-time">
                Leveranstid: 
                <Typography variant="body2" component="span" className="product-delivery-time-details"> {productInfo.deliveryTime}</Typography>
            </Typography>
            <Button variant="outlined" disabled={authUser === null} className="add-to-cart-button" onClick={handleAddToCart}>Lägg i varukorg</Button>
            {productInfo.description.length > 0 ? 
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="description-content" id='description-header'>
                    <Typography>Produktbeskrivning</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{productInfo.description}</Typography>
                </AccordionDetails>
            </Accordion> : <></>}
            <Accordion>
                <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls="delivery-time-content" id='delivery-time-header'>
                    <Typography>Övrigt</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Märke: {productInfo.brand}</Typography>
                    <Typography>Leveranstid: {productInfo.deliveryTime}</Typography>
                </AccordionDetails>
            </Accordion>
        </Stack>
    )
}

export default ProductDetails