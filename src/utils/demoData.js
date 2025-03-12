// Function to generate demo data for first-time users
export const generateDemoData = () => {
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  
  // Format dates as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];
  const today = formatDate(currentDate);
  const lastMonth = formatDate(oneMonthAgo);
  
  // Demo banks
  const banks = [
    {
      id: 'bank-1',
      name: 'Main Savings',
      initialBalance: 5000,
      balance: 5000,
      interestRate: 2.5, // 2.5%
      interestFrequency: 'monthly',
      createdAt: lastMonth,
    },
    {
      id: 'bank-2',
      name: 'Emergency Fund',
      initialBalance: 3000,
      balance: 3000,
      interestRate: 1.8, // 1.8%
      interestFrequency: 'monthly',
      createdAt: lastMonth,
    },
    {
      id: 'bank-3',
      name: 'High-Yield Savings',
      initialBalance: 1000,
      balance: 1000,
      interestRate: 3.2, // 3.2%
      interestFrequency: 'daily',
      createdAt: lastMonth,
    },
  ];
  
  // Demo transactions
  const transactions = [
    {
      id: 'trans-1',
      type: 'income',
      amount: 3500,
      categoryId: 'salary',
      description: 'Monthly Salary',
      date: lastMonth,
      bankId: 'bank-1',
    },
    {
      id: 'trans-2',
      type: 'expense',
      amount: 800,
      categoryId: 'housing',
      description: 'Rent',
      date: lastMonth,
      bankId: 'bank-1',
    },
    {
      id: 'trans-3',
      type: 'expense',
      amount: 200,
      categoryId: 'food',
      description: 'Groceries',
      date: today,
      bankId: 'bank-1',
    },
    {
      id: 'trans-4',
      type: 'expense',
      amount: 50,
      categoryId: 'entertainment',
      description: 'Movie tickets',
      date: today,
      bankId: 'bank-1',
    },
    {
      id: 'trans-5',
      type: 'income',
      amount: 200,
      categoryId: 'investment',
      description: 'Stock dividends',
      date: today,
      bankId: 'bank-3',
    },
    {
      id: 'trans-6',
      type: 'expense',
      amount: 100,
      categoryId: 'transportation',
      description: 'Gas',
      date: today,
      bankId: 'bank-1',
    },
  ];
  
  // Demo savings goals
  const goals = [
    {
      id: 'goal-1',
      name: 'Vacation Fund',
      targetAmount: 2000,
      currentAmount: 500,
      targetDate: formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 6))),
      description: 'Summer vacation to the beach',
      createdAt: lastMonth,
    },
    {
      id: 'goal-2',
      name: 'New Laptop',
      targetAmount: 1500,
      currentAmount: 300,
      targetDate: formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 3))),
      description: 'Save for a new work laptop',
      createdAt: lastMonth,
    },
    {
      id: 'goal-3',
      name: 'Emergency Fund',
      targetAmount: 10000,
      currentAmount: 3000,
      targetDate: formatDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))),
      description: '6 months of living expenses',
      createdAt: lastMonth,
    },
  ];
  
  return { banks, transactions, goals };
};
