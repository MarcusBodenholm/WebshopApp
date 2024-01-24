
import {Breadcrumbs, Typography, Link} from "@mui/material";
import { NavLink, useSearchParams } from "react-router-dom";

const Capitalize = string => {
    return string.slice(0,1).toUpperCase() + string.slice(1);
}

const BreadcrumbsNavigation = props => {
    const [searchParams,] = useSearchParams();
    console.log(searchParams.toString())
    const name = searchParams.get("title");
    return (
        <div role="presentation" onClick={() => console.log("You clicked")} style={{marginBottom:"10px"}}>
            <Breadcrumbs aria-label="breadcrumb">
                {props.input.map((crumb, idx) => {
                    let href = "";
                    if (idx === 0) {
                        href = "/"
                        console.log(href)
                    }
                    else if (idx === props.input.length - 1) {
                        console.log("I got triggered")
                        href = "?" + searchParams.toString();
                    }
                    else {
                        href = "/" + props.input.slice(1, idx+1).join("/")
                    }
                    const text = <Typography variant="subtitle1">{Capitalize(crumb)}</Typography>
                    const current = idx === props.input.length - 1;
                    return current ? <Link key={crumb} underline="hover" color="text.primary" aria-current="page" component={NavLink} to={href}>{name ? decodeURI(name) : text}</Link>
                                : <Link key={crumb} underline="hover" color="text.secondary" component={NavLink} to={href}>{text}</Link>
                })}
            </Breadcrumbs>
        </div>
    )
}


export default BreadcrumbsNavigation