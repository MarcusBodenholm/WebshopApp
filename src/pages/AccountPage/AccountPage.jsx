import "./AccountPage.css";
import {Container, Typography, Stack, Divider, Button} from "@mui/material";
import useUserContext from "../../contexts/useUserContext"
import { useState, useEffect } from "react";
import priceFormat from "../../helpers/priceFormat";

const AccountPage = () => {
    const {authUser,deleteOrder, getAllOrders} = useUserContext();
    const [orders, setOrders] = useState([]);
    const capitalize = word => {
        return word.slice(0,1).toUpperCase() + word.slice(1);
    }
    const getUsername = email => {
        const firstPart = email.split('@')[0]
        const username = firstPart.split('.').map(word => capitalize(word)).join(' ');
        return username
    }
    const ZeroPadding = nr => {
        return nr > 9 ? nr : "0" + nr;
    }
    const formatDate = date => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        return `${ZeroPadding(year)}-${ZeroPadding(month)}-${ZeroPadding(day)} ${ZeroPadding(hours)}:${ZeroPadding(minutes)}`;
    }
    const handleOrderRemovalClick = async(id) => {
        const removeAndFetch = await deleteOrder(id)
        setOrders(removeAndFetch);
    }
    useEffect(() => {
        const fetchOrders = async() => {
            const fetchedOrders = await getAllOrders();
            setOrders(fetchedOrders);
        }
        if (authUser !== null) {
            fetchOrders();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])
    return (
        <Container>
            <Stack direction="column" sx={{width:"100%", marginTop:"30px"}}>
                {authUser === null ? <Typography textAlign="center" variant="h3">Ingen inloggad</Typography> :
                <Stack direction="column" spacing={2}> 
                    <Typography textAlign="center" variant="h4">Användare: {getUsername(authUser.email)}</Typography>
                    <Stack direction="column">
                        <Typography variant="h5" textAlign="center" sx={{marginBottom:"15px"}}>Lagda ordrar</Typography>
                        <Divider />
                        <Stack spacing={3} sx={{justifyContent:"center", alignItems:"center", width:"100%", marginTop:"15px"}}>
                            {orders.map((order,idx) => {
                                return <Stack key={order.id + idx} direction="column" spacing={1} sx={{width: "300px"}}>
                                        <Typography sx={{fontWeight:"bold"}}>Orderid: {order.id}</Typography>
                                        <Typography>Order lagd: {formatDate(new Date(order.date.seconds * 1000))}</Typography>
                                        <Typography>Summa: {priceFormat(order.total)} SEK</Typography>
                                        <Button onClick={(event) => {
                                            event.target.disabled = true;
                                            event.target.value = "Makulerar";
                                            handleOrderRemovalClick(order.id)
                                        }} variant="contained" className="cancel-order-button">Makulera order</Button>
                                    </Stack>
                            })}

                        </Stack>
                    </Stack>
                </Stack>
                }
            </Stack>
        </Container>
    )
}
export default AccountPage