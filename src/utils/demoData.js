// Function to generate demo data for first-time users
export const generateDemoData = () => {
  const currentDate = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(currentDate.getMonth() - 1);
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(currentDate.getMonth() - 2);
  
  // Format dates as YYYY-MM-DD
  const formatDate = (date) => date.toISOString().split('T')[0];
  const today = formatDate(currentDate);
  const lastMonth = formatDate(oneMonthAgo);
  const twoMonthsAgoDate = formatDate(twoMonthsAgo);
  
  // Create date for last week and two weeks ago
  const lastWeek = new Date();
  lastWeek.setDate(currentDate.getDate() - 7);
  const lastWeekDate = formatDate(lastWeek);
  
  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(currentDate.getDate() - 14);
  const twoWeeksAgoDate = formatDate(twoWeeksAgo);
  
  // Demo banks (Philippine banks with PHP currency)
  const banks = [
    {
      id: 'bank-1',
      name: 'BPI Savings',
      initialBalance: 25000,
      balance: 25000,
      interestRate: 0.25, // 0.25% (typical for Philippine savings accounts)
      interestFrequency: 'monthly',
      createdAt: twoMonthsAgoDate,
    },
    {
      id: 'bank-2',
      name: 'Landbank Emergency Fund',
      initialBalance: 15000,
      balance: 15000,
      interestRate: 0.1, // 0.1%
      interestFrequency: 'monthly',
      createdAt: lastMonth,
    },
    {
      id: 'bank-3',
      name: 'CIMB GSave',
      initialBalance: 10000,
      balance: 10000,
      interestRate: 2.6, // 2.6% (digital banks offer higher rates)
      interestFrequency: 'daily',
      createdAt: lastMonth,
    },
    {
      id: 'bank-4',
      name: 'ING Digital',
      initialBalance: 8000,
      balance: 8000,
      interestRate: 2.5, // 2.5%
      interestFrequency: 'daily',
      createdAt: twoWeeksAgoDate,
    },
  ];
  
  // Demo transactions (with Philippine-specific items and PHP currency)
  const transactions = [
    {
      id: 'trans-1',
      type: 'income',
      amount: 25000,
      categoryId: 'salary',
      description: 'Monthly Salary',
      date: lastMonth,
      bankId: 'bank-1',
    },
    {
      id: 'trans-2',
      type: 'expense',
      amount: 12000,
      categoryId: 'housing',
      description: 'Rent for Condo',
      date: lastMonth,
      bankId: 'bank-1',
    },
    {
      id: 'trans-3',
      type: 'expense',
      amount: 3500,
      categoryId: 'food',
      description: 'Grocery at SM Supermarket',
      date: twoWeeksAgoDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-4',
      type: 'expense',
      amount: 500,
      categoryId: 'entertainment',
      description: 'Movie tickets at SM Cinema',
      date: lastWeekDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-5',
      type: 'income',
      amount: 2500,
      categoryId: 'investment',
      description: 'Stock dividends from Jollibee stocks',
      date: lastWeekDate,
      bankId: 'bank-3',
    },
    {
      id: 'trans-6',
      type: 'expense',
      amount: 1200,
      categoryId: 'transportation',
      description: 'Grab rides for the week',
      date: today,
      bankId: 'bank-1',
    },
    {
      id: 'trans-7',
      type: 'expense',
      amount: 2500,
      categoryId: 'utilities',
      description: 'Meralco Electricity Bill',
      date: lastWeekDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-8',
      type: 'expense',
      amount: 1500,
      categoryId: 'utilities',
      description: 'Manila Water Bill',
      date: lastWeekDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-9',
      type: 'expense',
      amount: 999,
      categoryId: 'utilities',
      description: 'PLDT Fiber Internet',
      date: lastWeekDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-10',
      type: 'income',
      amount: 5000,
      categoryId: 'other-income',
      description: 'Freelance Project Payment',
      date: today,
      bankId: 'bank-4',
    },
    {
      id: 'trans-11',
      type: 'expense',
      amount: 800,
      categoryId: 'food',
      description: 'Dinner at Jollibee with friends',
      date: today,
      bankId: 'bank-1',
    },
    {
      id: 'trans-12',
      type: 'expense',
      amount: 3000,
      categoryId: 'personal',
      description: 'New clothes at SM Department Store',
      date: lastWeekDate,
      bankId: 'bank-1',
    },
    {
      id: 'trans-13',
      type: 'expense',
      amount: 1000,
      categoryId: 'healthcare',
      description: 'Medicine at Mercury Drug',
      date: twoWeeksAgoDate,
      bankId: 'bank-2',
    },
    {
      id: 'trans-14',
      type: 'expense',
      amount: 1500,
      categoryId: 'entertainment',
      description: 'Karaoke night with friends',
      date: lastMonth,
      bankId: 'bank-1',
    },
  ];
  
  // Demo savings goals (with Philippine-specific goals)
  const goals = [
    {
      id: 'goal-1',
      name: 'Boracay Vacation',
      targetAmount: 30000,
      currentAmount: 5000,
      targetDate: formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 6))),
      description: 'Summer vacation to Boracay Island',
      createdAt: lastMonth,
    },
    {
      id: 'goal-2',
      name: 'New MacBook',
      targetAmount: 65000,
      currentAmount: 15000,
      targetDate: formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 5))),
      description: 'Save for a new MacBook for work',
      createdAt: lastMonth,
    },
    {
      id: 'goal-3',
      name: 'Emergency Fund',
      targetAmount: 150000,
      currentAmount: 25000,
      targetDate: formatDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 1))),
      description: '6 months of living expenses',
      createdAt: twoMonthsAgoDate,
    },
    {
      id: 'goal-4',
      name: 'Down Payment for Condo',
      targetAmount: 500000,
      currentAmount: 50000,
      targetDate: formatDate(new Date(currentDate.setFullYear(currentDate.getFullYear() + 2))),
      description: '20% down payment for a condo in Makati',
      createdAt: twoMonthsAgoDate,
    },
    {
      id: 'goal-5',
      name: 'New iPhone',
      targetAmount: 55000,
      currentAmount: 10000,
      targetDate: formatDate(new Date(currentDate.setMonth(currentDate.getMonth() + 4))),
      description: 'Latest iPhone model',
      createdAt: lastMonth,
    },
  ];
  
  return { banks, transactions, goals };
};
