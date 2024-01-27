import {Stack, Typography} from "@mui/material";


const DamHeader = ({amount, category}) => {
    return (
        <Stack>
            <Typography variant="h5">Dam</Typography>
            <Typography paragraph variant="body1">Här hittar du alla våra {amount} {category ? category : "kläder"} för damer.</Typography>
        </Stack>
    )
}
export default DamHeader