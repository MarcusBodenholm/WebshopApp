// import './App.css'
import Header from './components/Header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import {useEffect, useState} from "react";
import {Container, ThemeProvider, CssBaseline, Grid} from "@mui/material";
import { LightTheme, DarkTheme } from './theme/theme';
import Sidebar from './components/Sidebar/Sidebar';
import CartContextProvider from './contexts/cartContext';
import DataContextProvider from './contexts/dataContext';
import { db } from './config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import ScrapeForm from './ScrapeForm';
import {Route, Routes} from "react-router";
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
        <CartContextProvider>
          <DataContextProvider>
            <CssBaseline/>
            <Header/>
            <Router />
          </DataContextProvider>
        </CartContextProvider>
      </ThemeProvider>
    )
}

export default App
