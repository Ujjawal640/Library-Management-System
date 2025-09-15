import React from 'react';
import { Typography, Box } from '@mui/material';

export default function Home(){
  return (
    <Box sx={{ py:4 }}>
      <Typography variant="h4" gutterBottom>Welcome to Library Management</Typography>
      <Typography>Use the top navigation to switch between Admin and User views.</Typography>
    </Box>
  );
}
