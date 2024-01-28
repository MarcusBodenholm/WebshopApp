import Homepage from "./Homepage/Homepage";
import OrderPage from "./OrderPage/OrderPage";
import Product from "./Product/Product";
import Store from "./Store/Store";
import Success from "./Success/Success";
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
        path:"checkout",
        element:<OrderPage />,
        title:"Beställ"
    },
    {
        path:"success",
        element:<Success />,
        title:"Framgång!"
    }
]

export default pagesData;