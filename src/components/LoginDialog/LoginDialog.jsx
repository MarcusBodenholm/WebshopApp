import {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';





const LoginDialog = ({loginOpen, setLoginOpen}) => {


    const handleClose = () => {
        setLoginOpen(false);
    };

    return (
        <Dialog
          open={loginOpen}
          onClose={handleClose}
          PaperProps={{
            component: 'form',
            onSubmit: (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              const formJson = Object.fromEntries(formData.entries());
              const email = formJson.email;
              console.log(email);
              handleClose();
            },
          }}
        >
          <DialogTitle>Logga in</DialogTitle>
          <DialogContent>
            <DialogContentText>
              För att kunna lägga till saker i din varukorg samt beställa behöver du logga in. 
            </DialogContentText>
            <TextField
              autoFocus
              required
              margin="dense"
              id="login-email"
              name="login-email"
              label="Epostadress"
              type="email"
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="login-password"
              name="login-password"
              label="Lösenord"
              type="password"
              fullWidth
              variant="standard"
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Avbryt</Button>
            <Button type="submit">Subscribe</Button>
          </DialogActions>
        </Dialog>
      )
}
export default LoginDialog