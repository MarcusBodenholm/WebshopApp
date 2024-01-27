import {Container, Typography, Stack} from "@mui/material"

const Homepage = () => {
    return (
        <Container sx={{width:"60%"}}>
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Typography variant="h1" textAlign="center" sx={{color:"rgb(112, 0, 22)"}}>Top Style</Typography>
                    <Typography variant="h3" textAlign="center" sx={{color:"rgb(112, 0, 22)"}}>Din destination för stil och trend!</Typography>

                </Stack>
                <Stack direction="column" spacing={2}>
                    <Typography>Top Style är din ultimata webshop när det kommer till att omfamna den senaste modetrenderna. Vi strävar efter att erbjuda ett brett urval av kläder, skor och accessoarer som inte bara håller dig i takt med moden, utan också låter dig uttrycka din unika stil.</Typography>
                    <Typography>Utforska vårt handplockade sortiment av trendiga kläder och upptäck det perfekta plagget för varje tillfälle. Oavsett om det är den senaste streetwear-stilen, eleganta festklänningar eller avslappnade vardagsplagg - vi har något för varje smak och preferens.</Typography>
                    <Typography>Vårt utbud av skor är noggrant utvalt för att erbjuda komfort, stil och hållbarhet. Från trendiga sneakers till eleganta klackar, Top Style har skor som passar alla stilar och tillfällen. Glöm inte att kolla in vårt sortiment av accessoarer för att komplettera din look och lägga till den där sista touchen.</Typography>
                    <Typography>Vi strävar efter att erbjuda en sömlös och tillfredsställande shoppingupplevelse. Med säkra betalningsalternativ och snabb leverans kan du vara säker på att din Top Style-upplevelse är bekväm och pålitlig.</Typography>
                    <Typography>Gör dig redo att omfamna din inre fashionista och upptäck det bästa inom kläder, skor och accessoarer hos Top Style. Välkommen till en värld av stil, trendsättning och självuttryck - Välkommen till Top Style!</Typography>

                </Stack>
            </Stack>
        </Container>
    )
}
export default Homepage