import "./CategoryList.css";
import {Stack, Typography, List, ListItem, ListItemText, Divider, Collapse} from "@mui/material"
import { NavLink, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {ExpandMore, ExpandLess} from "@mui/icons-material"


const CategoryList = ({department}) => {
    const [herrOpen, setHerrOpen] = useState(department === "herr")
    const [damOpen, setDamOpen] = useState(department === "dam")
    const [searchParams,] = useSearchParams();
    const generateCategories = (input) => {
        if (input === "Dam") {
            return ["Accessoarer","Blusar", "Byxor", "Jackor", "Jeans", "Kjolar", "Koftor", "Klänningar" 
                    , "Skor", "Smycken", "Toppar", "Väskor"]
        }
        if (input === "Herr") {
            return ["Accessoarer", "Byxor", "Jackor", "Jeans", "Kostymer", "Shorts", "Skjortor", "Skor",
                    "Smycken", "T-shirts", "Tröjor", "Väskor"]
        }
    }
    const mapCategories = (departmentName, listOfCategories) => {
        return <List dense className="category-list-list-container">
            {listOfCategories.map((category, idx) => {
                const active = searchParams.get("category")
                const url = `/store/${departmentName.toLowerCase()}?category=${encodeURI(category.toLowerCase())}`
                return <ListItem component={NavLink} to={url} key={idx + departmentName + category} 
                         className={active === category.toLowerCase() && department === departmentName.toLowerCase() ? "category-list-item-active" : "category-list-item"}>
                    <ListItemText>{category}</ListItemText>
                </ListItem>
            })}
        </List>
    }
    const handleExpandHerr = () => {
        setHerrOpen(!herrOpen);
    }
    const handleExpandDam = () => {
        setDamOpen(!damOpen);
    }

    useEffect(() => {
        setHerrOpen(department === "herr")
        setDamOpen(department === "dam")
    },[department])
    return (
        <Stack direction="column" sx={{marginRight:"10px"}}>
            <Typography variant="h5" gutterBottom sx={{fontWeight:"bold"}}>Kategorier</Typography>
            <Stack direction="column" sx={{marginRight:"10px"}}>
                <Stack direction="row" onClick={handleExpandDam} spacing={1} sx={{marginTop:"5px"}}>
                    <Typography variant="subtitle1" 
                    className={department === "dam" ? "category-list-department-link-active" : "category-list-department-link"}>Dam</Typography>
                    {damOpen ? <ExpandLess /> : <ExpandMore/>}
                </Stack>
                <Divider />
                <Collapse in={damOpen}>
                    {mapCategories("Dam", generateCategories("Dam"))}
                </Collapse>

                <Stack direction="row" onClick={handleExpandHerr} spacing={1} sx={{marginTop:"5px"}}>
                    <Typography variant="subtitle1" 
                    className={department === "herr" ? "category-list-department-link-active" : "category-list-department-link"}>Herr</Typography>
                    {herrOpen ? <ExpandLess /> : <ExpandMore/>}
                </Stack>
                <Collapse in={herrOpen}>
                    {mapCategories("Herr", generateCategories("Herr"))} 
                </Collapse>
            </Stack>
        </Stack>

    )
}
export default CategoryList