// import './App.css'
import Header from './components/Header/Header'
import useMediaQuery from '@mui/material/useMediaQuery';
import {useEffect, useState} from "react";
import {Container, ThemeProvider, CssBaseline, Grid} from "@mui/material";
import { LightTheme, DarkTheme } from './theme/theme';
import Sidebar from './components/Sidebar/Sidebar';
import CartContextProvider from './contexts/cartContext';
import { db } from './config/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import ScrapeForm from './ScrapeForm';

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
          <CssBaseline/>
          <Header/>
          <Container sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <Grid container>
              <Grid item md={3}>
                <Sidebar />
              </Grid>
              <Grid item md={9}>
                <h1>Hello World!</h1>
                <ScrapeForm />
              </Grid>
            </Grid>
          </Container>
        </CartContextProvider>
      </ThemeProvider>
    )
}

export default App
