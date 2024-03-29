import {createContext, useContext, useState} from "react";


export const ThemeContext = createContext(null);

export default function ThemeContextProvider({children}) {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{theme, setTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeContextProvider");
    }
    return context;
}