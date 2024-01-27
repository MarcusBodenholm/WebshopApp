import {Stack, Typography} from "@mui/material";
import DamHeader from "./DamHeader";
import HerrHeader from "./HerrHeader";
import useDataContext from "../../../../contexts/useDataContext";

const StoreHeader = ({department, category}) => {
    const {data} = useDataContext();
    if (department === "herr") {
        console.log("triggered herr")
        return <HerrHeader amount={data.length} category={category}/>
    }
    if (department === "dam") {
        console.log("triggered dam")

        return <DamHeader amount={data.length} category={category}/>
    }
    return (
        <Stack>
            <Typography variant="h5">Alla kläder</Typography>
            <Typography paragraph variant="body1">Här hittar du alla våra {data.length} produkter, oavsett kategori.</Typography>            
        </Stack>
    )
}
export default StoreHeader