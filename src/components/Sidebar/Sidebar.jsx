import { useCartContext } from "../../contexts/cartContext"
const Sidebar = () => {
    const {cart,} = useCartContext();

    return (
        <ul>
            <li>{cart.value}</li>
            <li>All Products</li>
            <li>Suits</li>
            <li>Blazers</li>
            <li>Shirts</li>
            <li>Jeans</li>
            <li>Trousers</li>
        </ul>
    )
}

export default Sidebar