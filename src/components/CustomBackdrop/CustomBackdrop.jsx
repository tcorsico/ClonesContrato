/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';

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
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, display: 'flex', flexDirection: 'column' }}
        open={open}
      >
        <CircularProgress color="inherit" sx={{ marginBottom: '1.5rem' }} />
        <Typography variant="h6" component="h3">Creating your new token...</Typography>
      </Backdrop>
    </div>
  );
}