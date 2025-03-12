import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const Transactions = () => {
  const { transactions, categories, banks, addTransaction, deleteTransaction } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    categoryId: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    bankId: '',
  });
  const [showForm, setShowForm] = useState(false);
  const [filter, setFilter] = useState({
    type: 'all',
    startDate: '',
    endDate: '',
    categoryId: '',
    bankId: '',
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'amount' ? parseFloat(value) || '' : value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.categoryId || !formData.bankId) {
      alert('Please fill in all required fields');
      return;
    }
    addTransaction(formData);
    setFormData({
      type: 'expense',
      amount: '',
      categoryId: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      bankId: '',
    });
    setShowForm(false);
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  // Apply filters to transactions
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by type (income/expense/all)
    if (filter.type !== 'all' && transaction.type !== filter.type) return false;
    
    // Filter by date range
    if (filter.startDate && new Date(transaction.date) < new Date(filter.startDate)) return false;
    if (filter.endDate && new Date(transaction.date) > new Date(filter.endDate)) return false;
    
    // Filter by category
    if (filter.categoryId && transaction.categoryId !== filter.categoryId) return false;
    
    // Filter by bank
    if (filter.bankId && transaction.bankId !== filter.bankId) return false;
    
    return true;
  });

  // Sort transactions by date (newest first)
  const sortedTransactions = [...filteredTransactions].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  // Calculate totals
  const totalIncome = sortedTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalExpenses = sortedTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className={`transactions-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <h2>Transactions</h2>
        <button 
          className="add-button" 
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Add Transaction'}
        </button>
      </div>
      
      {/* Add Transaction Form */}
      {showForm && (
        <form className="transaction-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Type</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Amount</label>
              <input 
                type="number" 
                name="amount" 
                value={formData.amount} 
                onChange={handleChange} 
                min="0.01" 
                step="0.01" 
                placeholder="Amount" 
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select 
                name="categoryId" 
                value={formData.categoryId} 
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories
                  .filter(cat => cat.type === formData.type)
                  .map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Bank Account</label>
              <select 
                name="bankId" 
                value={formData.bankId} 
                onChange={handleChange}
                required
              >
                <option value="">Select a bank account</option>
                {banks.map(bank => (
                  <option key={bank.id} value={bank.id}>
                    {bank.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Description</label>
              <input 
                type="text" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Description" 
              />
            </div>
            
            <div className="form-group">
              <label>Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-button">
            Add Transaction
          </button>
        </form>
      )}
      
      {/* Filters */}
      <div className="filters">
        <h3>Filters</h3>
        <div className="filter-controls">
          <div className="filter-group">
            <label>Type</label>
            <select name="type" value={filter.type} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expenses</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>From</label>
            <input 
              type="date" 
              name="startDate" 
              value={filter.startDate} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label>To</label>
            <input 
              type="date" 
              name="endDate" 
              value={filter.endDate} 
              onChange={handleFilterChange} 
            />
          </div>
          
          <div className="filter-group">
            <label>Category</label>
            <select name="categoryId" value={filter.categoryId} onChange={handleFilterChange}>
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Bank</label>
            <select name="bankId" value={filter.bankId} onChange={handleFilterChange}>
              <option value="">All Banks</option>
              {banks.map(bank => (
                <option key={bank.id} value={bank.id}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      {/* Transactions Summary */}
      <div className="transactions-summary">
        <div className="summary-item income">
          <h4>Total Income</h4>
          <p>₱{totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="summary-item expenses">
          <h4>Total Expenses</h4>
          <p>₱{totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className="summary-item balance">
          <h4>Balance</h4>
          <p>₱{(totalIncome - totalExpenses).toFixed(2)}</p>
        </div>
      </div>
      
      {/* Transactions List */}
      {sortedTransactions.length === 0 ? (
        <p className="no-data">No transactions found. Try changing your filters or add a new transaction.</p>
      ) : (
        <div className="transactions-container">
          <table className="transactions-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Bank</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTransactions.map(transaction => {
                const category = categories.find(c => c.id === transaction.categoryId);
                const bank = banks.find(b => b.id === transaction.bankId);
                
                return (
                  <tr key={transaction.id} className={transaction.type}>
                    <td>{transaction.date}</td>
                    <td>{transaction.description}</td>
                    <td>{category ? category.name : transaction.categoryId}</td>
                    <td>{bank ? bank.name : 'Unknown Bank'}</td>
                    <td className={transaction.type === 'income' ? 'income-amount' : 'expense-amount'}>
                      {transaction.type === 'income' ? '+' : '-'}₱{Math.abs(transaction.amount).toFixed(2)}
                    </td>
                    <td>
                      <button 
                        className="delete-button" 
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
