
import Product from "./Product/Product";
import Store from "./Store/Store";
const pagesData = [
    {
        path: "",
        element: <h1>Hello World!</h1>,
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
    }
]

export default pagesData;