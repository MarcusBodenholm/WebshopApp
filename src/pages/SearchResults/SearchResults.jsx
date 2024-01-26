import {Typography, Container} from "@mui/material"
import BreadcrumbsNavigation from "../../components/BreadcrumbsNavigation/BreadcrumbsNavigation"
import ProductList from "../../components/ProductList/ProductList"



const SearchResults = () => {
    return (
        <Container sx={{marginTop:"10px"}}>
          <BreadcrumbsNavigation />
          <Typography variant="h5">Dam</Typography>
          <Typography paragraph variant="body1">Här hittar du alla våra kläder för damer.</Typography>
          <ProductList />
        </Container>
    )
}
export default SearchResults