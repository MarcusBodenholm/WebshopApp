import Homepage from "./Homepage/Homepage";
import Product from "./Product/Product";
import Store from "./Store/Store";
import LoginRegister from "./LoginRegister/LoginRegister";
const pagesData = [
    {
        path: "",
        element: <Homepage />,
        title: "home"
    },
    {
        path: "home",
        element: <h1>Hello Home2!</h1>,
        title: "home2"
    },
    {
        path: "store/product",
        element: <Product/>,
        title: "product"
    },
    {
        path: "store",
        element: <Store/>,
        title: "product"
    },
    {
        path: "store/herr",
        element: <Store department="dam"/>,
        title: "product"
    },
    {
        path: "store/dam",
        element: <Store department="dam"/>,
        title: "product"
    },
    {
        path: "store/herr/product",
        element: <Product/>,
        title: "product"
    },
    {
        path: "store/dam/product",
        element: <Product/>,
        title: "product"
    },
    {
        path: "login",
        element: <LoginRegister/>,
        title: "Login"
    },
    {
        path: "register",
        element: <LoginRegister/>,
        title: "Register"
    }
]

export default pagesData;