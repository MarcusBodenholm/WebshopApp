import {Container, Typography, Stack} from "@mui/material"
import { useSearchParams } from "react-router-dom"

const Success = () => {
    const [searchParams,] = useSearchParams();
    const orderid = searchParams.get("orderid");
    return (
        <Container>
            <Stack direction="column" spacing={3} sx={{alignItems:"center", marginTop:"30px"}}>
                <Typography variant="h2">
                    Tack för din order!
                </Typography>
                <Typography variant="subtitle1" sx={{fontWeight:"bold", marginTop:"5px"}}>Ditt ordernummer är: {orderid}</Typography>
                <Stack spacing={1}>
                    <Typography variant="body1" sx={{fontStyle:"italic"}}>Då detta inte är en riktig webshop bör du inte förvänta dig någon leverans.</Typography>
                    <Typography variant="body1"sx={{fontWeight:"bold", fontSize:"1.2rem"}}>Från alla oss här på Top Style önskar vi dig en riktigt trevlig dag.</Typography>
                </Stack>
            </Stack>
        </Container>
    )
}
export default Success