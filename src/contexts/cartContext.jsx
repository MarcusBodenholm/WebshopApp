import {createContext, useEffect, useState} from "react";
import { collection, addDoc, doc, query, where, limit, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import useUserContext from "./useUserContext";


export const CartContext = createContext(null);

export default function CartContextProvider({children}) {
    const [cart, setCart] = useState({items:[], total:0, totalItems:0});
    const {authUser} = useUserContext();
    const addItemToCart = item => {
        const newCart = {...cart}
        if (newCart.items.some(cartItem => cartItem.id === item.id && cartItem.size === item.size)) {
            const idx = newCart.items.findIndex(cartItem => {
                console.log(cartItem.id, item.id)
                return cartItem.id === item.id && cartItem.size === item.size
            });
            newCart.items[idx].quantity++;
        }
        else {
            const newItem = {...item, quantity:1}
            newCart.items = [...newCart.items, newItem]
        }
        newCart.total = updateCartTotal(newCart);
        newCart.totalItems = updateCartTotalItems(newCart);
        setCart(newCart);
        uploadCartToFireBase(newCart);
    }
    const changeQuantityOfItem = item => {
        const newCart = {...cart};
        const idx = newCart.items.findIndex(cartItem => {
            return cartItem.id === item.id && cartItem.size === item.size
        });
        if (newCart.items[idx].quantity > 1) {
            newCart.items[idx].quantity--;
        }
        else {
            newCart.items = [...newCart.items.slice(0, idx),...newCart.items.slice(idx+1)]
        }
        newCart.total = updateCartTotal(newCart);
        newCart.totalItems = updateCartTotalItems(newCart);
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
        if (oldCartId) {
            const docRef = doc(db, "carts", oldCartId);
            const data = {cart: inputCart, userId: authUser.uid}
            updateDoc(docRef, data).catch(error => console.log(error))
        } else {
            const data = {cart: inputCart, userId: authUser.uid}
            addDoc(colRef, data).catch(error => console.log(error))
        }
    }   
    const placeOrder = async() => {
        const userid = authUser.uid;
        const items = cart.items;
        const total = cart.total;
        const colRef = collection(db, "orders");
        const date = new Date();
        const data = {userid, items, total, date}
        const orderId = await addDoc(colRef, data).then(res => res.id).catch(error => console.log(error))
        const newCart = {items:[], total:0, totalItems:0}
        setCart(newCart);
        uploadCartToFireBase(newCart);
        return orderId;
    }
    const removeItemFromCart = (id, size) => {
        const newCart = {...cart};
        newCart.items = newCart.items.filter(item => {
            return item.id !== id || item.size !== size;
        })
        newCart.total = updateCartTotal(newCart);
        newCart.totalItems = updateCartTotalItems(newCart);
        setCart(newCart);
        uploadCartToFireBase(newCart);
    }
    const updateCartTotal = cart => {
        const total = cart.items.reduce((acc,curr) => {
            const itemPrice = Math.round(Number(curr.price.replace(',', '.')));
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
        else {
            setCart({items:[], total:0});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authUser])
    return (
        <CartContext.Provider value={{cart, setCart, addItemToCart, removeItemFromCart, changeQuantityOfItem, placeOrder}}>
            {children}
        </CartContext.Provider>
    )
}

