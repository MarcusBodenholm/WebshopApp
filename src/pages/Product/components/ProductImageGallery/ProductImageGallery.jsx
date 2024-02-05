import { useState } from 'react'
import {Stack} from "@mui/material"
import "./ProductImageGallery.css";

const ProductImageGallery = props => {
    const [activeImage, setActiveImage] = useState(0);

    let images = props.images.slice(0, 5).filter(img => img.includes("width=693") === false)


    const switchMainImage = (event) => {
        setActiveImage(Number(event.target.dataset.key))
    }
    let imageElements = images.map((img,key) => {
        const className = key === activeImage ? "selected-preview-image" : "preview-product-image"
        return <img src={img} key={key} data-key={key} className={className} onClick={switchMainImage} />
    })
    const mainImage = <img src={images[activeImage].split("?")[0] + "?width=693&height=842"} key={activeImage} className={props.mobile ? "main-product-image-mobile" : 'main-product-image'}/>

    return (
        <>
        {props.mobile ? 
        <Stack direction="column" className='product-image-gallery-container'>
            {mainImage}
            <Stack direction="row">
                {imageElements}
            </Stack>
        </Stack>

        :
        <Stack direction="row" className='product-image-gallery-container'>
            <Stack direction="column">
                {imageElements}
            </Stack>
            {mainImage}
        </Stack>
        } 
    </>
    )
}

export default ProductImageGallery