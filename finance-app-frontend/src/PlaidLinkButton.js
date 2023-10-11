import React, { useEffect, useState, useCallback } from 'react';
import { usePlaidLink } from 'react-plaid-link';

function App({ userId, onPlaidSuccess }) {
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    const generateToken = async () => {
      try {
        const response = await fetch('http://localhost:8081/plaid/get-link-token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: userId }),
        });
        if (!response.ok) {
          throw new Error(`Failed to get link token: ${response.statusText}`);
        }
        const { link_token } = await response.json();
        setLinkToken(link_token);
      } catch (error) {
        console.error('Error creating link token:', error);
      }
    };
    generateToken();
  }, [userId]);

  return linkToken != null ? <Link linkToken={linkToken} onPlaidSuccess={onPlaidSuccess} /> : <></>;
}

const Link = ({ linkToken, onPlaidSuccess }) => {
  const onSuccessCallback = useCallback(async (public_token, metadata) => {
    try {
      const response = await fetch('/api/set_access_token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ public_token }),
      });

      if (!response.ok) {
          throw new Error(`Failed to set access token: ${response.statusText}`);
      }

        const data = await response.json();
        console.log(data); // You can handle the response as needed
      } catch (error) {
      console.error('Error setting access token:', error);
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: onSuccessCallback,
    // You can also add onEvent and onExit handlers if needed
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link account
    </button>
  );
};

export default App;
