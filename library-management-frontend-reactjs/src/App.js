import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import AdminView from './views/AdminView';
import UserView from './views/UserView';
import Home from './pages/Home';

export default function App(){
  const navigate = useNavigate();
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Library Management</Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/admin')}>Admin</Button>
          <Button color="inherit" onClick={() => navigate('/user')}>User</Button>
        </Toolbar>
      </AppBar>
      <Box sx={{ py: 3 }}>
        <Container maxWidth="lg">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminView />} />
            <Route path="/user" element={<UserView />} />
          </Routes>
        </Container>
      </Box>
    </>
  );
}
