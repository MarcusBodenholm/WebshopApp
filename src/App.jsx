import Header from './components/Header/Header'
import { ThemeProvider, CssBaseline} from "@mui/material";
import { LightTheme } from './theme/theme';
import CartContextProvider from './contexts/cartContext';
import DataContextProvider from './contexts/dataContext';
import UserContextProvider from './contexts/userContext';
import MobileContextProvider from './contexts/mobileContext';
import Router from './pages/Router';
import MobileSideBar from './components/MobileSideBar/MobileSideBar';
import "./App.css";

function App() {
  const theme =  LightTheme

  return (
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <CartContextProvider>
            <DataContextProvider>
              <MobileContextProvider>
                <CssBaseline/>
                <Header/>
                <MobileSideBar />
                <Router />
              </MobileContextProvider>
            </DataContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </ThemeProvider>
    )
}

export default App
