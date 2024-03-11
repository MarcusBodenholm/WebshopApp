import { createContext, useState } from "react";

export const MobileContext = createContext(null);

export default function MobileContextProvider({children})  {
    const [mobileOpen, setMobileOpen] = useState(false);
    return <MobileContext.Provider value={{mobileOpen, setMobileOpen}}>
        {children}
    </MobileContext.Provider>
}
