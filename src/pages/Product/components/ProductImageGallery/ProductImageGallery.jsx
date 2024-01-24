import React, { useState } from 'react'
import {Stack} from "@mui/material"
import "./ProductImageGallery.css";

const ProductImageGallery = props => {
    const [activeImage, setActiveImage] = useState(0);
    // let images = [
    //     "https://static.miinto.net/ca53175d310d8bcd7869a156a15872d3.avif?width=85&height=127",
    //     "https://static.miinto.net/c42454860cc2be34cd7eafa7ffb08284.avif?width=85&height=127",
    //     "https://static.miinto.net/92dec07e331f758ed8685a1585d12c17.avif?width=85&height=127",
    //     "https://static.miinto.net/a794e0bb681b60417fd5740d8cbe7312.avif?width=85&height=127",
    //     "https://static.miinto.net/3d47b9af63378a7a8e7e988777ab9e26.avif?width=85&height=127",
    //     "https://static.miinto.net/7c55b1cbbe448a5c77ad2b604a081fcb.avif?width=85&height=127",
    //     "https://static.miinto.net/c1bd539523a322f9fdf51e7f42f0558e.avif?width=85&height=127",
    //     "https://static.miinto.net/ca53175d310d8bcd7869a156a15872d3.avif?width=693&height=842"
    // ].filter(img => img.includes("width=693") === false)

    let images = props.images.slice(0, 5).filter(img => img.includes("width=693") === false)


    const switchMainImage = (event) => {
        console.log(event.target.dataset.key)
        setActiveImage(Number(event.target.dataset.key))
    }
    console.log(images)
    let imageElements = images.map((img,key) => {
        const className = key === activeImage ? "selected-preview-image" : "preview-product-image"
        console.log(key, activeImage)
        return <img src={img} key={key} data-key={key} className={className} onClick={switchMainImage} />
    })
    const mainImage = <img src={images[activeImage].split("?")[0] + "?width=693&height=842"} key={activeImage} className='main-product-image'/>

    return (
        <Stack direction="row" className='product-image-gallery-container'>
            <Stack direction="column">
                {imageElements}
            </Stack>
            {mainImage}
        </Stack>
    )
}

export default ProductImageGallery