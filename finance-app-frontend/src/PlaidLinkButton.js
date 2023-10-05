// src/PlaidLinkButton.js

import React from 'react';
import PlaidLink from 'react-plaid-link';

function PlaidLinkButton() {
  const handlePlaidSuccess = (publicToken) => {
    fetch('http://localhost:8081/api/plaid/exchange-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`
      },
      body: JSON.stringify({ publicToken })
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.accessToken) {
        // Handle success, maybe fetch account details or transactions now
      }
    })
    .catch(error => {
      console.error('Error exchanging Plaid token:', error);
    });
  };

  return (
    <PlaidLink
      clientName="Your Client Name"
      env="development"
      product={['auth', 'transactions']}
      publicKey="YOUR_PLAID_PUBLIC_KEY"
      onSuccess={handlePlaidSuccess}
    >
      Connect to Plaid
    </PlaidLink>
  );
}

export default PlaidLinkButton;
