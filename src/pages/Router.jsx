import {Route, Routes} from "react-router-dom";
import pagesData from "./pagesData";
import useMobileContext from "../contexts/useMobileContext";

const Router = () => {
    const {mobileOpen} = useMobileContext();
    const pageRoutes = pagesData.map(({path, title, element}) => {
        return <Route key={title} path={`/${path}`} element={element} />;
    })
    return <>{mobileOpen ? <></> : <Routes>{pageRoutes}</Routes>}</>
}

export default Router;