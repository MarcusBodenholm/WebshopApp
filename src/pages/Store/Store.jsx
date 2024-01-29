import {Typography, Container, Stack} from "@mui/material"
import BreadcrumbsNavigation from "../../components/BreadcrumbsNavigation/BreadcrumbsNavigation"
import ProductList from "./components/ProductList/ProductList"
import { useSearchParams, useLocation } from "react-router-dom"
import StoreHeader from "./components/StoreHeader/StoreHeader"
import useDataContext from "../../contexts/useDataContext"
import CategorySideBar from "./components/CategorySidebar/CategorySideBar"

const Store = () => {
    const [searchParams,] = useSearchParams();
    const {data} = useDataContext();
    const location = useLocation();
    const getDepartment = () => {
        const pathArray = location.pathname.split("/");
        if (pathArray.length === 3) {
            return pathArray[2];
        }
        return null;
    }
    const department = getDepartment();
    const category = searchParams.get("category");
    const query = searchParams.get("query");
    return (
        <Container sx={{marginTop:"10px"}}>
            <BreadcrumbsNavigation />
            <Stack direction="row">
                <CategorySideBar department={department}/>
                <Stack direction="column" sx={{marginLeft:"10px", width:"100%"}}>
                    {query ? 
                    <Stack sx={{marginBottom:"15px"}}>
                        <Typography variant="h5">Sökresultat för {query}: {data.length} träffar</Typography>
                    </Stack>    
                    : <StoreHeader department={department} category={category} />
                    }
                    <ProductList />
                </Stack>
            </Stack>
        </Container>
    )
}

export default Store