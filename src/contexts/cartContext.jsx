import {createContext, useContext, useState} from "react";


export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({value:0});

    return (
        <CartContext.Provider value={{cart, setCart}}>
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