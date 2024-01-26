import "./ProductListCard.css";
import priceFormat from "../../helpers/priceFormat";
import {Grid, Typography, Card, Link, Stack} from "@mui/material";
import {NavLink} from "react-router-dom"

const ProductsListCard = ({product, department}) => {
  const generateURL = () => {
    let base = "/store";
    if (department) {
      base += `/${department}/product`
    } else  {
      base += "/product";
    }
    const urlId = "?product=" + product.id;
    const title = "&title=" + encodeURI(product.title); 
    
    return base + urlId + title;
  }
  const imageUrl = product.images[0].split('?')[0] + "?width=268&height=402";
  return (
    <Grid item>
        <Link underline="none" component={NavLink} to={generateURL()}>
          <Card sx={{width:"200px", height:"330px", padding:"10px", display:"flex"}} className="product-card-container">
            <Stack direction="column" sx={{width:"100%"}}>
              <img src={imageUrl} className="product-card-image" />
              <Stack direction="column" sx={{height:"100%"}}>
                <Typography className="product-card-brand">{product.brand}</Typography>
                <Typography className="product-card-title">{product.title}</Typography>
                <Typography className="product-card-price">{priceFormat(product.price)} SEK</Typography>
              </Stack>
            </Stack>
          </Card>
        </Link>
    </Grid>
    
  )
}
export default ProductsListCard