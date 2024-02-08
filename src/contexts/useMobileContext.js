import { useContext } from "react";
import { MobileContext } from "./mobileContext";

export default function useMobileContext()  {
    const context = useContext(MobileContext);
    if (!context) {
        throw new Error("useMobileContext must be used within a MobileContextProvider")
    }
    return context;
}