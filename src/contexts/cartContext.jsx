import {createContext, useContext, useState} from "react";


export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({items:[], total:0});

    const addItemToCart = item => {
        const newCart = {...cart}
        if (newCart.items.some(cartItem => cartItem.id === item.id)) {
            const idx = newCart.items.findIndex(cartItem => {
                console.log(cartItem.id, item.id)
                return cartItem.id === item.id
            });
            console.log(idx)
            console.log(newCart.items[idx])
            newCart.items[idx].quantity++;
        }
        else {
            const newItem = {...item, quantity:1}
            newCart.items = [...newCart.items, newItem]
        }
        newCart.total = updateCartTotal(newCart);
        console.log("newCart is: ",newCart);
        setCart(newCart);
    }
    const updateCartTotal = cart => {
        const total = cart.items.reduce((acc,curr) => {
            const itemPrice = Number(curr.price);
            return acc + (itemPrice * curr.quantity)
        },0)
        return total;
    }
    return (
        <CartContext.Provider value={{cart, setCart, addItemToCart}}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartContextProvider");
    }
    return context;
}