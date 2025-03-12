import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { transactions, goals, banks, loadDemoData, resetAllData } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);

  // Calculate total balance across all banks
  const totalBalance = banks.reduce((total, bank) => total + bank.balance, 0);
  
  // Get total income and expenses for the current month
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const monthlyTransactions = transactions.filter(transaction => {
    const transDate = new Date(transaction.date);
    return transDate.getMonth() === currentMonth && transDate.getFullYear() === currentYear;
  });
  
  const totalIncome = monthlyTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = monthlyTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  
  // Get recent transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Handle demo data loading with confirmation
  const handleLoadDemoData = () => {
    if (window.confirm('This will replace your current data with demo data. Continue?')) {
      loadDemoData();
    }
  };
  
  // Handle data reset with confirmation
  const handleResetData = () => {
    if (window.confirm('This will delete ALL your data and cannot be undone. Are you sure?')) {
      resetAllData();
    }
  };

  return (
    <div className={`dashboard ${darkMode ? 'dark' : 'light'}`}>
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <div className="data-management-buttons">
          <button 
            className="demo-data-button" 
            onClick={handleLoadDemoData}
            title="Load example data to see how the app works"
          >
            Load Demo Data
          </button>
          <button 
            className="reset-data-button" 
            onClick={handleResetData}
            title="Clear all data and start fresh"
          >
            Reset All Data
          </button>
        </div>
      </div>
      
      {/* Summary Section */}
      <div className="summary-cards">
        <div className="card total-balance">
          <h3>Total Balance</h3>
          <p className="amount">₱{totalBalance.toFixed(2)}</p>
        </div>
        
        <div className="card monthly-income">
          <h3>Monthly Income</h3>
          <p className="amount">₱{totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="card monthly-expenses">
          <h3>Monthly Expenses</h3>
          <p className="amount">₱{totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="card savings-rate">
          <h3>Savings Rate</h3>
          <p className="amount">
            {totalIncome > 0 ? 
              `${(((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1)}%` : 
              '0%'}
          </p>
        </div>
      </div>
      
      {/* Bank Accounts */}
      <div className="banks-overview">
        <div className="section-header">
          <h3>Bank Accounts</h3>
          <Link to="/banks" className="view-all">View All</Link>
        </div>
        
        <div className="banks-list">
          {banks.length === 0 ? (
            <p>No bank accounts added yet. <Link to="/banks">Add your first bank account</Link>.</p>
          ) : (
            banks.map(bank => (
              <div key={bank.id} className="bank-card">
                <h4>{bank.name}</h4>
                <p className="bank-balance">₱{bank.balance.toFixed(2)}</p>
                <p className="interest-rate">{bank.interestRate}% {bank.interestFrequency}</p>
              </div>
            ))
          )}
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="recent-transactions">
        <div className="section-header">
          <h3>Recent Transactions</h3>
          <Link to="/transactions" className="view-all">View All</Link>
        </div>
        
        {recentTransactions.length === 0 ? (
          <p>No transactions recorded yet. <Link to="/transactions">Add your first transaction</Link>.</p>
        ) : (
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map(transaction => (
                <tr key={transaction.id} className={transaction.type === 'income' ? 'income' : 'expense'}>
                  <td>{transaction.date}</td>
                  <td>{transaction.description}</td>
                  <td>{transaction.categoryId}</td>
                  <td className={transaction.type === 'income' ? 'income-amount' : 'expense-amount'}>
                    {transaction.type === 'income' ? '+' : '-'}₱{Math.abs(transaction.amount).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      {/* Savings Goals */}
      <div className="savings-goals">
        <div className="section-header">
          <h3>Savings Goals</h3>
          <Link to="/goals" className="view-all">View All</Link>
        </div>
        
        <div className="goals-list">
          {goals.length === 0 ? (
            <p>No savings goals set yet. <Link to="/goals">Create your first goal</Link>.</p>
          ) : (
            goals.map(goal => {
              const progressPercent = (goal.currentAmount / goal.targetAmount) * 100;
              
              return (
                <div key={goal.id} className="goal-card">
                  <h4>{goal.name}</h4>
                  <p className="goal-description">{goal.description}</p>
                  <div className="goal-progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    ></div>
                  </div>
                  <div className="goal-stats">
                    <p>₱{goal.currentAmount.toFixed(2)} of ₱{goal.targetAmount.toFixed(2)}</p>
                    <p>{progressPercent.toFixed(1)}% complete</p>
                  </div>
                  <p>Target date: {goal.targetDate}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
