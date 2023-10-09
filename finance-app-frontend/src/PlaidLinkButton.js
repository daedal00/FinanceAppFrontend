import { usePlaidLink } from 'react-plaid-link';

function PlaidLinkButton() {
  const onSuccess = (publicToken, metadata) => {
    // Send the publicToken to your backend to exchange for an access token
    fetch('/plaid/set_access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ public_token: publicToken })
    });
  };

  const config = {
    token: '<GENERATED_LINK_TOKEN>',
    onSuccess,
    // ... other Link configurations
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default PlaidLinkButton;
