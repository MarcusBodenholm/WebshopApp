import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import {Container, Stack} from "@mui/material"
import BreadcrumbsNavigation from "../../components/BreadcrumbsNavigation/BreadcrumbsNavigation";
import ProductHeader from "./components/ProductHeader/ProductHeader";
import ProductImageGallery from "./components/ProductImageGallery/ProductImageGallery";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { products } from "../../DummyData";

const productInfo = {
    "images": [
        "https://static.miinto.net/ca53175d310d8bcd7869a156a15872d3.avif?width=85&height=127",
        "https://static.miinto.net/c42454860cc2be34cd7eafa7ffb08284.avif?width=85&height=127",
        "https://static.miinto.net/92dec07e331f758ed8685a1585d12c17.avif?width=85&height=127",
        "https://static.miinto.net/a794e0bb681b60417fd5740d8cbe7312.avif?width=85&height=127",
        "https://static.miinto.net/3d47b9af63378a7a8e7e988777ab9e26.avif?width=85&height=127",
        "https://static.miinto.net/7c55b1cbbe448a5c77ad2b604a081fcb.avif?width=85&height=127",
        "https://static.miinto.net/c1bd539523a322f9fdf51e7f42f0558e.avif?width=85&height=127",
        "https://static.miinto.net/ca53175d310d8bcd7869a156a15872d3.avif?width=693&height=842"
    ],
    "brand": "Thom Browne",
    "description": "Höj din stil med denna Thom Browne rundhalsade stickade tröja för män. Tillverkad med precision och uppmärksamhet på detaljer, utstrålar denna stickade tröja sofistikation och tidlös elegans. Tillverkad av det välrenommerade varumärket Thom Browne, är detta plagg ett måste för varje modeintresserad gentleman. Shoppa nu och lägg till en touch av lyx i din garderob.",
    "sizes": [
        "s",
        "m",
        "l",
        "xl"
    ],
    "title": "Blåa Tröjor av Thom Browne",
    "category": "Tröjor",
    "for": "Herr",
    "price": "16644",
    "deliveryTime": "Leverans inom 1-6 arbetsdagar",
    "id": "bqhOOSKf4RkRCLxXS9MS"
}

const Product = () => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState({});
    const [searchParams,] = useSearchParams();
    console.log(productInfo.images)
    useEffect(() => {
        const productId = searchParams.get("product");
        const getProductInfo = async(id) => {
            const idx = products.findIndex(prod => prod.id === id);
            setProduct(products[idx])
            setLoading(false)
        }
        getProductInfo(productId);
        console.log(productId)
    })
    return (
        <Container>
            <BreadcrumbsNavigation />
            {loading ? <h1>Loading...</h1> : 
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