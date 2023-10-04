// src/components/MainLayout.js

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function MainLayout({ children }) {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Finance App
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/transactions">Transactions</Button>
          <Button color="inherit" component={Link} to="/balances">Balances</Button>
          <Button color="inherit" component={Link} to="/monthly-spendings">Monthly Spendings</Button>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: '20px' }}>
        {children}
      </Container>
    </div>
  );
}

export default MainLayout;
