import {Stack, Typography} from "@mui/material";


const HerrHeader = ({amount}) => {
    return (
        <Stack>
            <Typography variant="h5">Herr</Typography>
            <Typography paragraph variant="body1">Här hittar du alla våra {amount} kläder för herrar.</Typography>
        </Stack>
    )
}
export default HerrHeader