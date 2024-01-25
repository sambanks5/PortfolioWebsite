import React from 'react';
import { Grow, Alert } from '@mui/material';

const ErrorMessage = ({ show, message, onClose }) => (
  <Grow in={show}>
    <Alert
      severity="error"
      sx={{ position: "fixed", top: 10, left: 500 }}
      onClose={onClose}>
      {message}
    </Alert>
  </Grow>
);

export default ErrorMessage;