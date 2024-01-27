import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../config/firebase";

export const UserContext = createContext(null);

export default function UserContextProvider({children})  {
    const [authUser, setAuthUser] = useState(null);

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
    return <UserContext.Provider value={{authUser, setAuthUser}}>
        {children}
    </UserContext.Provider>
}
