import "./ProductList.css";
import {useEffect, useState} from "react"
import ProductsListCard from "../../ProductListCard/ProductsListCard";
import {Grid, Stack, FormControl, Select, InputLabel, MenuItem, Divider} from "@mui/material"
import { useSearchParams, useLocation } from "react-router-dom"
import useDataContext from "../../../../contexts/useDataContext";
import {SquareLoader} from "react-spinners";

const ProductList = ({mobile}) => {
    const {data, setData, products} = useDataContext();
    const [loading, setLoading] = useState(true);
    const [searchParams,] = useSearchParams();
    const [sortByState, setSortByState] = useState("");
    const location = useLocation();
    const query = searchParams.get("query");
    const category = searchParams.get("category");
    const getDepartment = () => {
        const pathArray = location.pathname.split("/");
        if (pathArray.length === 3) {
            return pathArray[2];
        }
        return null;
    }
    const department = getDepartment();
    const handleSortChange = event => {
        setSortByState(event.target.value);
        sortData(event.target.value);
    }
    const sortData = (sortBy) => {
        let newData = [...data];
        const formatPriceToCompare = input => {
            return Number(String(input).split(',')[0])
        }
        if (sortBy === "price-high") {
            newData.sort((a, b) => {
                return formatPriceToCompare(b.price) - formatPriceToCompare(a.price);
            });
        }
        if (sortBy === "price-low") {
            newData.sort((a, b) => {
                return formatPriceToCompare(a.price) - formatPriceToCompare(b.price);
            });        }
        if (sortBy === "alphabetical") {
            newData.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (sortBy === "alphabetical-brand") {
            newData.sort((a, b) => a.brand.localeCompare(b.brand));
        }

        setData(newData);
        
    }
    const capitalize = word => {
        return word.slice(0,1).toUpperCase() + word.slice(1);
    }
    useEffect(() => {
        setLoading(true);
        setSortByState("");
        const mode = "all products";
        const fetchProducts = () => {
            if (mode === "all products") {
                return products;
            }
        }
        const filterProducts = (input) => {
            let output = input;
            if (query) {
                output = input.filter(item => {
                    const lowerQuery = query.toLowerCase();
                    if (item.title.toLowerCase().includes(lowerQuery) || item.description.toLowerCase().includes(lowerQuery)) {
                        return item;
                    }
                })    
            }
            if (department) {
                output = output.filter(item => {
                    if (item.for === capitalize(department)) {
                        return item;
                    }
                })
            }
            if (category) {
                output = output.filter(item => {
                    if (item.category.includes(capitalize(category))) {
                        return item;
                    }
                })
            }
            return output;
        }
        const fetchedData = fetchProducts();
        const filteredProducts = filterProducts(fetchedData);
        setData(filteredProducts);
        setLoading(false);
    },[query, location, products])
    
    return (
        <>
            {loading ? <Stack sx={{width:"100%", height:"500px", justifyContent:"center", alignItems:"center"}}><SquareLoader color="#700016" size={300}/></Stack> : 
                <Stack>
                    <Stack sx={{marginBottom:"5px"}}>
                        <FormControl  className="product-list-sort-container">
                            <InputLabel id="sort-products-by-label">Sortera efter</InputLabel>
                            <Select  labelId="sort-products-by-label" id="sort-products-by" value={sortByState}  label="Sortera efter" onChange={handleSortChange}>
                                <MenuItem value="price-high">Pris - Högt till lågt</MenuItem>
                                <MenuItem value="price-low">Pris - Lågt till högt</MenuItem>
                                <MenuItem value="alphabetical">Alfabetisk - titel</MenuItem>
                                <MenuItem value="alphabetical-brand">Alfabetisk - märke</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Divider sx={{marginTop:"10px"}}/>
                    <Grid container spacing={mobile ? 0 : 2} sx={mobile ? {gap:"40px"} : {marginTop:"2px", justifyContent:"space-around"}}>
                        {data.map((product, idx) => {
                            return <ProductsListCard product={product} key={idx} department={department} mobile={mobile}/>
                        })}
                    </Grid>

                </Stack>
            }
        </>
    )
}
export default ProductList