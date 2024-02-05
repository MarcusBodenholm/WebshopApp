import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import {Container, Stack, useTheme, useMediaQuery} from "@mui/material"
import BreadcrumbsNavigation from "../../components/BreadcrumbsNavigation/BreadcrumbsNavigation";
import ProductHeader from "./components/ProductHeader/ProductHeader";
import ProductImageGallery from "./components/ProductImageGallery/ProductImageGallery";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { db } from "../../config/firebase";
import { getDoc, doc } from 'firebase/firestore';
import {SquareLoader} from "react-spinners";


const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [searchParams,] = useSearchParams();
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))

    useEffect(() => {
        const productId = searchParams.get("product");
        const fetchProductFromFireStore = async() => {
            const docRef = doc(db, 'products', productId)
            const fetchedData = await getDoc(docRef)
                .then((doc) => ({...doc.data(), id:doc.id}));
            setProduct(fetchedData);
            setLoading(false)
        }
        fetchProductFromFireStore();
    },[searchParams])
    return (
        <Container>
            <BreadcrumbsNavigation />
            {loading ? <Stack sx={{width:"100%", height:"500px", justifyContent:"center", alignItems:"center"}}><SquareLoader color="#700016" size={300}/></Stack> : 
            mobile ? 
            <Stack direction="column" spacing={2}>
                <ProductHeader brand={product.brand} title={product.title}/>
                <ProductImageGallery images={product.images} mobile={mobile}/>
                <ProductDetails productInfo={product} />
            </Stack>

            :
            <Stack direction="row" spacing={4}>
                <ProductImageGallery images={product.images}/>
                <Stack direction="column" spacing={2}>
                    <ProductHeader brand={product.brand} title={product.title}/>
                    <ProductDetails productInfo={product} />
                </Stack>
            </Stack>}

        </Container>
    )
}

export default Product