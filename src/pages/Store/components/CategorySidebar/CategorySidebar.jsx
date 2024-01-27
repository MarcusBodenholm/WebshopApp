import CategoryList from "../CategoryList/CategoryList"
import "./CategorySideBar.css"
import {Stack, Divider} from "@mui/material"


const CategorySideBar = ({department}) => {
    return (
        <Stack direction="row" className="category-sidebar-container">
            <CategoryList department={department} />
            <Divider orientation="vertical" />
        </Stack>
    )
}
export default CategorySideBar