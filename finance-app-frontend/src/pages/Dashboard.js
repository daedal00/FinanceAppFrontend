import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlaidLinkButton from '../PlaidLinkButton';

function Dashboard() {
  const [isPlaidLinked, setIsPlaidLinked] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const userId = localStorage.getItem('userId'); // Retrieve user ID from local storage

  useEffect(() => {
    const checkPlaidLinkStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/users/check-plaid-link', { params: { userId: userId } });
        setIsPlaidLinked(response.data.isPlaidLinked);
      } catch (error) {
        console.error("Error checking Plaid link status:", error);
      }
    };

    checkPlaidLinkStatus();

    if (isPlaidLinked) {
      // Fetch transactions and balance from your backend
      const fetchPlaidData = async () => {
        try {
          const transactionsResponse = await axios.get('http://localhost:8081/plaid/info/transactions', { params: { userId: userId } });
          setTransactions(transactionsResponse.data);

          const balanceResponse = await axios.get('http://localhost:8081/plaid/info/total-balance', { params: { userId: userId } });
          setBalance(balanceResponse.data);
        } catch (error) {
          console.error("Error fetching Plaid data:", error);
        }
      };

      fetchPlaidData();
    }
  }, [isPlaidLinked, userId]);

  const handlePlaidSuccess = async (publicToken) => {
    try {
      const response = await axios.post('http://localhost:8081/plaid/info/exchange-public-token', { publicToken }, { params: { userId: userId } });
      if (response.data) {
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
          <h2>Your Balance: ${balance}</h2>
          <h3>Transactions:</h3>
          <ul>
            {transactions.map(transaction => (
              <li key={transaction.id}>{transaction.name} - ${transaction.amount}</li>
            ))}
          </ul>
        </>
      ) : (
        <PlaidLinkButton onPlaidSuccess={handlePlaidSuccess} />
      )}
    </div>
  );
}

export default Dashboard;
