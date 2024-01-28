import "./RegisterDialog.css"
import {useState} from 'react';
import Button from '@mui/material/Button';
import {styled} from "@mui/material/styles"
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from "@mui/material/Typography";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const LoginTextField = styled(TextField)({
    '& input:valid + fieldset': {
        borderColor: '#E0E3E7',
        borderWidth: 1,
    },
    '& input:invalid + fieldset': {
        borderColor: 'red',
        borderWidth: 1,
    },
    '& input:valid:focus + fieldset': {
        borderLeftWidth: 4,
        padding: '4px !important', // override inline-style
    },

})



const RegisterDialog = ({registerOpen, setRegisterOpen}) => {
    const [email, setEmail] = useState({error:false, errorText:"", email:""});
    const [password, setPassword] = useState({error:false, errorText:"", password:""})
    const [errorMessage, setErrorMessage] = useState("");
    // eslint-disable-next-line no-useless-escape
    const emailRegex = /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/i;
    const handleClose = () => {
        setEmail({error:false, errorText:"", email:""})
        setErrorMessage("");
        setPassword({error:false, errorText:"", password:""})
        setRegisterOpen(false);
    }
    const handleRegister = async() => {
        if (email.error === true || email.email.length === 0 || 
            password.error === true || password.password.length === 0) {
            setErrorMessage("Vänligen fyll i alla uppgifter först.")
            return;
        }
        const result = await createUserWithEmailAndPassword(auth, email.email, password.password)
                        .catch(() => false);
        console.log(result);
        if (result === false) {
            setErrorMessage("Vänligen kontrollera epost och lösenord.")
        }
        else {
            handleClose();
        }
    }
    const handleEmailChange = (event) => {
        const emailValue = event.target.value;
        const passed = emailRegex.test(emailValue);
        setErrorMessage("");
        if (passed || emailValue.length === 0) {
            setEmail({error:false, errorText:"", email:emailValue});
        }
        else {
            setEmail({error:true, errorText:"Felaktigt format", email:emailValue})
        }
    }
    const handlePasswordChange = (event) => {
        const passwordValue = event.target.value;
        setErrorMessage("");
        if (passwordValue.length >= 6 || passwordValue.length === 0) {
            setPassword({error:false, errorText:"", password: passwordValue});
        }
        else {
            setPassword({error:true, errorText:"Lösenord är för kort", password: passwordValue});
        }
    }
    return (
        <Dialog
            open={registerOpen}
            onClose={handleClose}>
            <DialogTitle variant='h4' textAlign="center" sx={{fontWeight:"bold"}}>Registrera</DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column", width:"350px"}}>
                <DialogContentText>
                Registrera idag för att kunna lägga beställningar på de bästa artiklarna på nätet! 
                </DialogContentText>
                <LoginTextField
                autoFocus
                required
                onChange={(event) => handleEmailChange(event)}
                error={email.error}
                
                margin="dense"
                id="register-email"
                name="register-email"
                label="Epostadress"
                type="email"
                helperText={email.errorText}
                variant="standard"
                />
                <LoginTextField
                autoFocus
                required
                onChange={(event) => handlePasswordChange(event)}
                error={password.error}
                helperText={password.errorText}
                margin="dense"
                id="register-password"
                name="register-password"
                label="Lösenord"
                type="password"
                variant="standard"
                />
                <Typography sx={{color:"red", fontStyle:"italic", fontSize:"0.8rem", marginTop:"10px"}}>{errorMessage}</Typography>
            </DialogContent>
            <DialogActions sx={{justifyContent:"center", gap:"15px", marginBottom:"10px"}}>
                <Button onClick={handleClose} variant="contained" className='button-on-login-form'>Avbryt</Button>
                <Button onClick={handleRegister} variant="contained" className='button-on-login-form'>Registrera</Button>
            </DialogActions>
        </Dialog>
      )
}
export default RegisterDialog