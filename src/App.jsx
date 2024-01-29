import Header from './components/Header/Header'
import { ThemeProvider, CssBaseline} from "@mui/material";
import { LightTheme } from './theme/theme';
import CartContextProvider from './contexts/cartContext';
import DataContextProvider from './contexts/dataContext';
import UserContextProvider from './contexts/userContext';
import Router from './pages/Router';

function App() {
  const theme =  LightTheme

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
