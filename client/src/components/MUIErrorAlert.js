import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle"
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Modal from '@mui/material/Modal';


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const style = {
    left: '-40%'
};


export default function MUIErrorAlert() {
    const { store } = useContext(GlobalStoreContext);
   


  const handleClose = () => {
    store.hideError();
  };


    let modalJSX = "";
    if (store.error != null) {
        modalJSX = 
        <div>
      <Dialog open={true} onClose={handleClose}>
        <DialogContent>
        <Alert open={false} severity="warning">
      <AlertTitle>Error:</AlertTitle>
       <strong>{store.error}</strong>
      </Alert> 
        </DialogContent>
        <DialogActions>
          <Button sx={style} onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>;
    }
    console.log("Error is " + store.error);
        return (
            <div >
            {modalJSX}
          </div>
      
            
        );
}