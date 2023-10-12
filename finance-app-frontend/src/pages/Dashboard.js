import React, { useState, useEffect } from 'react';
import axios from 'axios';
import App from '../PlaidLinkButton'; // Import the App component which contains the Plaid Link logic

function Dashboard() {
  const [isPlaidLinked, setIsPlaidLinked] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const checkPlaidLinkStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/users/check-plaid-link', { params: { userId: userId }, withCredentials: true });
        setIsPlaidLinked(response.data.isPlaidLinked);
      } catch (error) {
        console.error("Error checking Plaid link status:", error);
      }
    };

    checkPlaidLinkStatus();
  }, [userId]);

  useEffect(() => {
    if (isPlaidLinked) {
      const fetchPlaidData = async () => {
        try {
          const transactionsResponse = await axios.get('http://localhost:8081/plaid/info/transactions', { params: { userId: userId }, withCredentials: true });
          setTransactions(transactionsResponse.data);

          const balanceResponse = await axios.get('http://localhost:8081/plaid/info/total-balance', { params: { userId: userId }, withCredentials: true });
          setBalance(balanceResponse.data);
        } catch (error) {
          console.error("Error fetching Plaid data:", error);
        }
      };

      fetchPlaidData();
    }
  }, [isPlaidLinked, userId]);

  const handlePlaidSuccess = async (publicToken, linkToken) => {
    try {
      const response = await axios.post('http://localhost:8081/plaid/info/exchange-public-token', { publicToken, linkToken }, { params: { userId: userId }, withCredentials: true });
      if (response.data) {
        setIsPlaidLinked(true);
      }
    } catch (error) {
      console.error("Error exchanging Plaid public token:", error);
    }
  };

  async function logout() {
    // ... (same as before)
  }

  return (
    <div>
      <button onClick={logout}>Logout</button>
      {isPlaidLinked ? (
        <>
          <h2>Your Balance: ${balance}</h2>
          <h3>Transactions:</h3>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>{transaction.name} - ${transaction.amount}</li>
            ))}
          </ul>
        </>
      ) : (
        <App userId={userId} onPlaidSuccess={handlePlaidSuccess} />
      )}
    </div>
  );
}

export default Dashboard;
