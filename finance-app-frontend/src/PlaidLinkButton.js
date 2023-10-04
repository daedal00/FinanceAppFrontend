import React, { useState, useEffect } from 'react';
import PlaidLink from 'react-plaid-link';

function PlaidLinkButton({ onPlaidSuccess }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    // Fetch the link token from your backend
    const fetchLinkToken = async () => {
      try {
        const response = await fetch('http://your-backend-url/get-link-token');
        const data = await response.json();
        setLinkToken(data.linkToken); // Assuming your backend returns the token with this key
      } catch (error) {
        console.error('Error fetching link token:', error);
      }
    };

    fetchLinkToken();
  }, []);

  if (!linkToken) {
    return <div>Loading...</div>;
  }

  return (
    <PlaidLink
      token={linkToken}
      onExit={console.log}
      onSuccess={onPlaidSuccess}
    >
      Connect to Plaid
    </PlaidLink>
  );
}

export default PlaidLinkButton;
