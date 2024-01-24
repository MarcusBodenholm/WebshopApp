import {Typography, Stack} from "@mui/material"
import "./ProductHeader.css"

const ProductHeader = ({brand, title}) => {
  return (
    <Stack direction="column">
        <Typography variant="h4" className="product-brand">{brand}</Typography>
        <Typography variant="h3" className="product-title">{title}</Typography>
    </Stack>

  )
}

export default ProductHeader