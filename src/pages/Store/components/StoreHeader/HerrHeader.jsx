import {Stack, Typography} from "@mui/material";


const HerrHeader = ({amount, category}) => {
    return (
        <Stack>
            <Typography variant="h5">Herr</Typography>
            <Typography paragraph variant="body1">Här hittar du alla våra {amount} {category ? category : "kläder"} för herrar.</Typography>
        </Stack>
    )
}
export default HerrHeader