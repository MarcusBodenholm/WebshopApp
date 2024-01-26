import {createContext, useContext, useState} from "react";


export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({items:[], total:0});

    const addItemToCart = item => {
        const newCart = {...cart}
        if (newCart.items.some(cartItem => cartItem.id === item.id && cartItem.size === item.size)) {
            const idx = newCart.items.findIndex(cartItem => {
                console.log(cartItem.id, item.id)
                return cartItem.id === item.id && cartItem.size === item.size
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
        newCart.totalItems = updateCartTotalItems(newCart);
        console.log("newCart is: ",newCart);
        setCart(newCart);
    }
    const removeItemFromCart = id => {
        const newCart = {...cart};
        newCart.items = newCart.items.filter(item => {
            return item.id !== id;
        })
        newCart.total = updateCartTotal(newCart);
        newCart.totalItems = updateCartTotalItems(newCart);
        setCart(newCart);
    }
    const updateCartTotal = cart => {
        const total = cart.items.reduce((acc,curr) => {
            const itemPrice = Math.round(Number(curr.price));
            return acc + (itemPrice * curr.quantity)
        },0)
        return total;
    }
    const updateCartTotalItems = cart => {
        const totalItems = cart.items.reduce((acc, curr) => {
            return acc + curr.quantity;
        }, 0)
        return totalItems;
    }
    return (
        <CartContext.Provider value={{cart, setCart, addItemToCart, removeItemFromCart}}>
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