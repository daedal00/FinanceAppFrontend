// src/pages/BalancesPage.js

import React from 'react';
import { Typography } from '@mui/material';

function BalancesPage() {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Account Balances
      </Typography>
      {/* Here you can integrate with Plaid or your backend to fetch and display balances */}
    </div>
  );
}

export default BalancesPage;
