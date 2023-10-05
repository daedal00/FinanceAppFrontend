// Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaidLinkButton from '../PlaidLinkButton';


function Dashboard() {
  const [isPlaidLinked, setIsPlaidLinked] = useState(false);

    useEffect(() => {
        if (isPlaidLinked) {
        // Fetch balances, transactions, and other data from your backend
        // Update the frontend state with the fetched data
        }
    }, [isPlaidLinked]);
    

  const handlePlaidSuccess = async (publicToken) => {
    try {
      const response = await axios.post('http://localhost:8081/api/plaid/exchange_token', { publicToken });
      if (response.data && response.data.access_token) {
        setIsPlaidLinked(true);
      }
    } catch (error) {
      console.error("Error exchanging Plaid public token:", error);
    }
  };

  return (
    <div>
      {isPlaidLinked ? (
        <>
          {/* Display financial data */}
        </>
      ) : (
        <PlaidLinkButton onPlaidSuccess={handlePlaidSuccess} />
      )}
    </div>
  );
}

export default Dashboard;
