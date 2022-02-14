/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop({ loading }) {
  const [open, setOpen] = React.useState(loading);
  const handleClose = () => {
    setOpen(loading);
  };
  React.useEffect(() => {
    handleClose();
  }, [loading])

  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}