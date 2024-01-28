import "./OrderPage.css"
import {Container, Typography, Stack} from "@mui/material"
import OrderPageItemList from "./components/OrderPageItemList/OrderPageItemList";

const OrderPage = () => {
    return (
        <Container>
            <Typography textAlign="center" sx={{marginTop:"20px", fontWeight:"bold"}} variant="h4">Din beställning</Typography>

            <Stack direction="column">
                <OrderPageItemList />
            </Stack>
        </Container>
    )
}
export default OrderPage