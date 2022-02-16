import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "./Modal.css" 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({success, setSuccess, newName, link, newAddress}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  

  return (
    <div>
      <Modal
        open={success}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Exito!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Tu Token {newName} se deployo en: <a href={link + newAddress}target="_blank" rel="noreferrer">{link + newAddress}</a>
          </Typography>
          <Button variant="contained" id="modal" color="success" onClick={() => setSuccess(false)}>
            Aceptar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
