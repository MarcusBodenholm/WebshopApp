import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import {collection, getDocs, query, where, deleteDoc, doc} from "firebase/firestore"
import { auth, db } from "../config/firebase";

export const UserContext = createContext(null);

export default function UserContextProvider({children})  {
    const [authUser, setAuthUser] = useState(null);
    const getAllOrders = async() => {
        const colRef = collection(db, "orders")
        const q = query(colRef, where("userid", "==", authUser.uid));
        const allOrders = await getDocs(q).catch(error => console.log(error));
        const transformedData = allOrders.docs.map((doc) => ({...doc.data(), id:doc.id}));
        return transformedData;
    }
    const deleteOrder = async(orderid) => {
        const docRef = doc(db, "orders", orderid);
        await deleteDoc(docRef);
        const newOrderList = await getAllOrders();
        return newOrderList
    }
    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null);
            }
        })
    },[])
    return <UserContext.Provider value={{authUser, setAuthUser, getAllOrders, deleteOrder}}>
        {children}
    </UserContext.Provider>
}
