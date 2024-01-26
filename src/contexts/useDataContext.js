import { useContext } from "react";
import { DataContext } from "./dataContext";

export default function useDataContext()  {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useDataContext must be used within a DataContextProvider")
    }
    return context;
}