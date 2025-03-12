import React, { createContext, useState, useEffect } from 'react';
import { generateDemoData } from '../utils/demoData';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([
    { id: 'salary', name: 'Salary', type: 'income' },
    { id: 'investment', name: 'Investment', type: 'income' },
    { id: 'bonus', name: 'Bonus', type: 'income' },
    { id: 'other-income', name: 'Other Income', type: 'income' },
    { id: 'food', name: 'Food & Dining', type: 'expense' },
    { id: 'shopping', name: 'Shopping', type: 'expense' },
    { id: 'housing', name: 'Housing', type: 'expense' },
    { id: 'transportation', name: 'Transportation', type: 'expense' },
    { id: 'entertainment', name: 'Entertainment', type: 'expense' },
    { id: 'utilities', name: 'Utilities', type: 'expense' },
    { id: 'healthcare', name: 'Healthcare', type: 'expense' },
    { id: 'personal', name: 'Personal Care', type: 'expense' },
    { id: 'education', name: 'Education', type: 'expense' },
    { id: 'travel', name: 'Travel', type: 'expense' },
    { id: 'other-expense', name: 'Other Expense', type: 'expense' },
  ]);
  
  const [isFirstVisit, setIsFirstVisit] = useState(true);

  // Load data from localStorage on first render
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    const savedGoals = localStorage.getItem('goals');
    const savedBanks = localStorage.getItem('banks');
    const savedCategories = localStorage.getItem('categories');
    const visitStatus = localStorage.getItem('firstVisit');
    
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
    if (savedGoals) setGoals(JSON.parse(savedGoals));
    if (savedBanks) setBanks(JSON.parse(savedBanks));
    if (savedCategories) setCategories(JSON.parse(savedCategories));
    
    if (visitStatus === null) {
      // First time user, load demo data
      const demoData = generateDemoData();
      setTransactions(demoData.transactions);
      setGoals(demoData.goals);
      setBanks(demoData.banks);
      localStorage.setItem('firstVisit', 'false');
    } else {
      setIsFirstVisit(false);
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    localStorage.setItem('goals', JSON.stringify(goals));
    localStorage.setItem('banks', JSON.stringify(banks));
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [transactions, goals, banks, categories]);

  // Add new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString(),
      date: transaction.date || new Date().toISOString().split('T')[0],
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Add new goal
  const addGoal = (goal) => {
    const newGoal = {
      ...goal,
      id: Date.now().toString(),
      currentAmount: goal.currentAmount || 0,
      createdAt: new Date().toISOString(),
    };
    setGoals([...goals, newGoal]);
  };

  // Add new bank
  const addBank = (bank) => {
    const newBank = {
      ...bank,
      id: Date.now().toString(),
      balance: bank.initialBalance || 0,
      createdAt: new Date().toISOString(),
      transactions: [],
    };
    setBanks([...banks, newBank]);
  };

  // Update bank balance (for interest calculations)
  const updateBankBalance = (bankId, newBalance) => {
    setBanks(banks.map(bank => 
      bank.id === bankId ? { ...bank, balance: newBalance } : bank
    ));
  };

  // Apply bank interest
  const applyBankInterest = (bankId) => {
    const bank = banks.find(b => b.id === bankId);
    if (bank && bank.interestRate) {
      const interestRate = parseFloat(bank.interestRate) / 100;
      let newBalance;
      
      if (bank.interestFrequency === 'daily') {
        newBalance = bank.balance * (1 + interestRate / 365);
      } else { // monthly
        newBalance = bank.balance * (1 + interestRate / 12);
      }
      
      updateBankBalance(bankId, newBalance);
      
      // Add interest as a transaction
      const interestAmount = newBalance - bank.balance;
      if (interestAmount > 0) {
        addTransaction({
          type: 'income',
          amount: interestAmount,
          categoryId: 'investment',
          description: `Interest from ${bank.name}`,
          bankId: bankId,
          date: new Date().toISOString().split('T')[0],
        });
      }
    }
  };

  // Update goal progress
  const updateGoalProgress = (goalId, amount) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, currentAmount: goal.currentAmount + amount } : goal
    ));
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Delete goal
  const deleteGoal = (id) => {
    setGoals(goals.filter(goal => goal.id !== id));
  };

  // Delete bank
  const deleteBank = (id) => {
    setBanks(banks.filter(bank => bank.id !== id));
  };

  return (
    <DataContext.Provider value={{
      transactions,
      goals,
      banks,
      categories,
      isFirstVisit,
      addTransaction,
      addGoal,
      addBank,
      updateBankBalance,
      applyBankInterest,
      updateGoalProgress,
      deleteTransaction,
      deleteGoal,
      deleteBank,
    }}>
      {children}
    </DataContext.Provider>
  );
};
