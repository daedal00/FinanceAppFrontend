import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import HomePage from './pages/HomePage';
import TransactionsPage from './pages/TransactionsPage';
import BalancesPage from './pages/BalancesPage';
import MonthlySpendingsPage from './pages/MonthlySpendingsPage';
import PlaidLinkButton from './PlaidLinkButton'; // Assuming you've created this component as previously instructed

function App() {
  const handlePlaidSuccess = async (publicToken) => {
    try {
      const response = await fetch("http://localhost:8081/api/plaid/exchange-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ publicToken })
      });
  
      const data = await response.json();
      if (data.accessToken) {
        // Fetch accounts
        const accountsResponse = await fetch("http://localhost:8081/api/accounts", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.accessToken}`
          }
        });
        const accounts = await accountsResponse.json();
  
        // Fetch transactions
        const transactionsResponse = await fetch("http://localhost:8081/api/transactions", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${data.accessToken}`
          }
        });
        const transactions = await transactionsResponse.json();
  
        // Now you can set these in your state or context to display them in your components
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  

  return (
    <Router>
      <MainLayout>
        <Switch>
          <Route path="/" exact>
            <HomePage />
            <PlaidLinkButton onSuccess={handlePlaidSuccess} />
          </Route>
          <Route path="/transactions" component={TransactionsPage} />
          <Route path="/balances" component={BalancesPage} />
          <Route path="/monthly-spendings" component={MonthlySpendingsPage} />
        </Switch>
      </MainLayout>
    </Router>
  );
}

export default App;
