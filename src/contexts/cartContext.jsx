import {createContext, useEffect, useState} from "react";
import { collection, addDoc, doc, query, where, limit, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useUserContext from "./useUserContext";


export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({items:[], total:0});
    const {authUser} = useUserContext();
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
        uploadCartToFireBase(newCart);
    }
    const checkIfCartExistsAtFireBase = async() => {
        const colRef = collection(db, "carts")
        const q = query(colRef, where("userId", "==", authUser.uid), limit(1));
        const oldCartId = await getDocs(q).then(data => data.docs[0].id).catch(() => {return null});
        if (oldCartId) {
            const docRef = doc(db, "carts", oldCartId);
            const firebaseData = await getDoc(docRef);
            setCart(firebaseData.data().cart)
        }
    }
    const uploadCartToFireBase = async(inputCart) => {
        //Check if a cart already exists
        const colRef = collection(db, "carts")
        const q = query(colRef, where("userId", "==", authUser.uid), limit(1));
        const oldCartId = await getDocs(q).then(data => data.docs[0].id).catch(() => {return null});
        console.log(oldCartId);
        if (oldCartId) {
            const docRef = doc(db, "carts", oldCartId);
            const data = {cart: inputCart, userId: authUser.uid}
            updateDoc(docRef, data).catch(error => console.log(error))
        } else {
            const data = {cart: inputCart, userId: authUser.uid}
            addDoc(colRef, data).catch(error => console.log(error))
        }
    }   
    const removeItemFromCart = id => {
        const newCart = {...cart};
        newCart.items = newCart.items.filter(item => {
            return item.id !== id;
        })
        newCart.total = updateCartTotal(newCart);
        newCart.totalItems = updateCartTotalItems(newCart);
        setCart(newCart);
        uploadCartToFireBase(newCart);
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
    useEffect(() => {
        if (authUser) {
            checkIfCartExistsAtFireBase()

        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])
    return (
        <CartContext.Provider value={{cart, setCart, addItemToCart, removeItemFromCart}}>
            {children}
        </CartContext.Provider>
    )
}

