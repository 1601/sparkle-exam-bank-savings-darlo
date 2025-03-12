import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const Banks = () => {
  const { banks, addBank, updateBankBalance, applyBankInterest, deleteBank } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    initialBalance: '',
    interestRate: '',
    interestFrequency: 'monthly'
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['initialBalance', 'interestRate'].includes(name) ? parseFloat(value) || '' : value
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.initialBalance) {
      alert('Please fill in all required fields');
      return;
    }
    addBank(formData);
    setFormData({
      name: '',
      initialBalance: '',
      interestRate: '',
      interestFrequency: 'monthly'
    });
    setShowForm(false);
  };

  // Handle applying interest to all banks
  const handleApplyAllInterest = () => {
    banks.forEach(bank => {
      if (bank.interestRate) {
        applyBankInterest(bank.id);
      }
    });
  };

  // Sort banks by balance (highest first)
  const sortedBanks = [...banks].sort((a, b) => b.balance - a.balance);

  // Calculate total balance across all banks
  const totalBalance = banks.reduce((total, bank) => total + bank.balance, 0);

  return (
    <div className={`banks-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <h2>Bank Accounts</h2>
        <div className="header-buttons">
          <button 
            className="add-button" 
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? 'Cancel' : 'Add Bank Account'}
          </button>
          <button 
            className="apply-button" 
            onClick={handleApplyAllInterest}
            disabled={banks.length === 0}
          >
            Apply All Interest
          </button>
        </div>
      </div>
      
      {/* Add Bank Form */}
      {showForm && (
        <form className="bank-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Bank Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Bank name" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Initial Balance</label>
              <input 
                type="number" 
                name="initialBalance" 
                value={formData.initialBalance} 
                onChange={handleChange} 
                min="0" 
                step="0.01" 
                placeholder="Initial balance" 
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Interest Rate (%)</label>
              <input 
                type="number" 
                name="interestRate" 
                value={formData.interestRate} 
                onChange={handleChange} 
                min="0" 
                step="0.01" 
                placeholder="Interest rate" 
              />
            </div>
            
            <div className="form-group">
              <label>Interest Frequency</label>
              <select 
                name="interestFrequency" 
                value={formData.interestFrequency} 
                onChange={handleChange}
              >
                <option value="daily">Daily</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>
          
          <button type="submit" className="submit-button">
            Add Bank Account
          </button>
        </form>
      )}
      
      {/* Summary Card */}
      <div className="bank-summary-card">
        <h3>Total Balance</h3>
        <p className="total-amount">${totalBalance.toFixed(2)}</p>
        <p>Across {banks.length} accounts</p>
      </div>
      
      {/* Banks List */}
      {sortedBanks.length === 0 ? (
        <p className="no-data">No bank accounts yet. Add your first bank account to get started!</p>
      ) : (
        <div className="banks-container">
          {sortedBanks.map(bank => (
            <div key={bank.id} className="bank-card">
              <div className="bank-header">
                <h3>{bank.name}</h3>
                <div className="bank-actions">
                  <button 
                    className="interest-button" 
                    onClick={() => applyBankInterest(bank.id)}
                    disabled={!bank.interestRate}
                    title={bank.interestRate ? 'Apply interest to this account' : 'No interest rate set'}
                  >
                    Apply Interest
                  </button>
                  <button 
                    className="delete-button" 
                    onClick={() => deleteBank(bank.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="bank-balance">
                <p className="balance-label">Current Balance</p>
                <p className="balance-amount">${bank.balance.toFixed(2)}</p>
              </div>
              
              <div className="bank-details">
                <div className="detail-item">
                  <p className="detail-label">Initial Deposit</p>
                  <p className="detail-value">${bank.initialBalance.toFixed(2)}</p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Interest Rate</p>
                  <p className="detail-value">
                    {bank.interestRate ? `${bank.interestRate}%` : 'None'}
                  </p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Interest Frequency</p>
                  <p className="detail-value">
                    {bank.interestFrequency === 'daily' ? 'Daily' : 'Monthly'}
                  </p>
                </div>
                
                <div className="detail-item">
                  <p className="detail-label">Created</p>
                  <p className="detail-value">
                    {new Date(bank.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Banks;
