import { createContext, useState } from "react";

export const DataContext = createContext(null);

export default function DataContextProvider({children})  {
    const [data, setData] = useState([]);
    return <DataContext.Provider value={{data, setData}}>
        {children}
    </DataContext.Provider>
}