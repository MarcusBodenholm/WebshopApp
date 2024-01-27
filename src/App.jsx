// import './App.css'
import Header from './components/Header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useState} from "react";
import { ThemeProvider, CssBaseline, Grid} from "@mui/material";
import { LightTheme, DarkTheme } from './theme/theme';
import CartContextProvider from './contexts/cartContext';
import DataContextProvider from './contexts/dataContext';
import UserContextProvider from './contexts/userContext';
import { db } from './config/firebase';
import { collection } from 'firebase/firestore';
import Router from './pages/Router';

function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark');
  const [useDarkMode, setDarkMode] = useState(false);

  const dataCollectionRef = collection(db, "products")
  // useEffect(() => {
  //   const getData = async() => {
  //     try {
  //       // const q = query(dataCollectionRef, where("for", "==", "Dam"), where("category", "==", "Accessoarer"));
  //       const data = await getDocs(dataCollectionRef);
  //       const filteredData = data.docs.map((doc) => ({...doc.data(), id:doc.id}))

  //       console.log(filteredData);
  //     }
  //     catch(err) {
  //       console.log(err);
  //     }
      
  //   }
  //   getData();
  // }, [])
  const theme=  useDarkMode ? DarkTheme : LightTheme

  return (
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <CartContextProvider>
            <DataContextProvider>
                <CssBaseline/>
                <Header/>
                <Router />
            </DataContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    )
}

export default App
