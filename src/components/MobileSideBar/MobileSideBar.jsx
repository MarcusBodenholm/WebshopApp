import "./MobileSideBar.css";
import {Container, Stack, Typography, Divider} from "@mui/material"
import useMobileContext from "../../contexts/useMobileContext";
import CategoryList from "../../pages/Store/components/CategoryList/CategoryList";
import MobileCategoryList from "../MobileCategoryList/MobileCategoryList";
import useUserContext from "../../contexts/useUserContext";
import LoginDialog from "../LoginDialog/LoginDialog";
import RegisterDialog from "../RegisterDialog/RegisterDialog";
import MobileAccountMenu from "../MobileAccountMenu/MobileAccountMenu";

const MobileSideBar = () => {

    const {mobileOpen} = useMobileContext();

    return (
        mobileOpen ? 
        <Container sx={{width:"100%", height:"100vh", backgroundColor:"grey", paddingTop:"10px"}}>
            <MobileAccountMenu />
            <Stack>
                <MobileCategoryList />
            </Stack>
            
        </Container>




        : <></>
    )
}


export default MobileSideBar;