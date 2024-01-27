import "./LoginRegister.css";
import {useRef} from "react";
import {useLocation} from "react-router-dom"
import {Container, Stack, Typography} from "@mui/material";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";


const LoginRegister = () => {
    const loginEmailRef = useRef();
    const loginPasswordRef = useRef();
    const registerEmailRef = useRef();
    const registerPasswordRef = useRef();
    const registerErrorRef = useRef();
    const location = useLocation();
    const loginOrRegister = () => {
        if (location.pathname.includes("login")) {
            return "login";
        }
        else {
            return "register";
        }
    }
    const mode = loginOrRegister();
    const register = async() => {
        try {
            const user = await createUserWithEmailAndPassword(auth, registerEmailRef.current.value, registerPasswordRef.current.value)
            console.log(user);
        }
        catch (error) {
            console.log(error.message)

        }
    }
    const login = async() => {
        const user = await signInWithEmailAndPassword(auth, loginEmailRef.current.value, loginPasswordRef.current.value)
        console.log(user);
    }
    const getLoggedinUser = async() => {
        const user = auth.currentUser;
        console.log(user);
    }
    const signOutUser = async() => {
        auth.signOut();
    }
    return (
        <Container>
            <Stack spacing={2} sx={{justifyContent:"center", alignItems:"center"}}>
                <Stack sx={{width: "300px"}}>
                    <Typography variant="h3">Logga in</Typography>
                    <label htmlFor="email-input-login" >Email</label>
                    <input name="email-input-login" id="email-input-login" ref={loginEmailRef}/>
                    <label htmlFor="password-input-login">Lösenord</label>
                    <input name="password-input-login" id="password-input-login" ref={loginPasswordRef}/>
                    <button onClick={login}>Logga in</button>

                </Stack>
                <Stack sx={{width: "300px"}}>
                    <Typography variant="h3">Registrera</Typography>

                    <label htmlFor="email-input-register">Email</label>
                    <input name="email-input-register" id="email-input-register" ref={registerEmailRef}/>
                    <label htmlFor="password-input-register">Lösenord</label>
                    <input name="password-input-register" id="password-input-register" ref={registerPasswordRef}/>
                    <button onClick={register}>Registrera</button>
                    <p ref={registerErrorRef}></p>

                </Stack>
                <button onClick={getLoggedinUser}>Verifiera</button>
                <button onClick={signOutUser}>Logga ut</button>

            </Stack>
        </Container>
    )
}
export default LoginRegister