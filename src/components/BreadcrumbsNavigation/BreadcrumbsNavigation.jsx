
import {Breadcrumbs, Typography, Link, useTheme, useMediaQuery} from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Capitalize = string => {
    return string.slice(0,1).toUpperCase() + string.slice(1);
}

const BreadcrumbsNavigation = () => {
    const [searchParams,] = useSearchParams();
    const location= useLocation();
    const crumbs = ["start", ...location.pathname.split("/").slice(1)]
    const name = searchParams.get("title");
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down('sm'))
    return (
        <div role="presentation" style={{marginBottom:"10px", marginLeft:(mobile ? "10px" : "")}}>
            <Breadcrumbs aria-label="breadcrumb">
                {crumbs.map((crumb, idx) => {
                    let href = "";
                    if (idx === 0) {
                        href = "/"
                    }
                    else if (idx === crumbs.length - 1) {
                        href = "?" + searchParams.toString();
                    }
                    else {
                        href = "/" + crumbs.slice(1, idx+1).join("/")
                    }
                    const text = <Typography variant="subtitle1">{Capitalize(crumb)}</Typography>
                    const current = idx === crumbs.length - 1;
                    return current ? <Link key={crumb} underline="hover" color="text.primary" aria-current="page" component={NavLink} to={href}>{name ? decodeURI(name) : text}</Link>
                                : <Link key={crumb} underline="hover" color="text.secondary" component={NavLink} to={href}>{text}</Link>
                })}
            </Breadcrumbs>
        </div>
    )
}


export default BreadcrumbsNavigation