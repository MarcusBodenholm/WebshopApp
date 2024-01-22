import { createTheme, responsiveFontSizes } from "@mui/material";
const BaseLightTheme = createTheme({
    palette: {
        mode: "light",
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
                elevation: 0,
            }
        }
    }
})

const BaseDarkTheme = createTheme({
    palette: {
        mode: "dark",
        background: {
            default: "rgb(5, 39, 102)"
        },
        secondary: {
            main: "rgb(175, 175, 175)"
        }
    },
    components: {
        MuiAppBar: {
            defaultProps: {
                color: "transparent",
                elevation: 0,
            }
        }
    }
})

const DarkTheme = responsiveFontSizes(BaseDarkTheme);
const LightTheme = responsiveFontSizes(BaseLightTheme)

export {DarkTheme, LightTheme}