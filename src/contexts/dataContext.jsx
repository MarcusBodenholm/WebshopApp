import { createContext, useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const DataContext = createContext(null);

export default function DataContextProvider({children})  {
    const [data, setData] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getAllProducts = async() => {
            const colRef = collection(db, "products");
            const data = await getDocs(colRef);
            const transformedData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))
            setProducts(transformedData);
        }
        getAllProducts();
    }, [])
    return <DataContext.Provider value={{data, setData, products}}>
        {children}
    </DataContext.Provider>
}
