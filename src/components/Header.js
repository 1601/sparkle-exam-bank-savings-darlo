import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <header className={`app-header ${darkMode ? 'dark' : 'light'}`}>
      <div className="logo">
        <h1>Bank Savings Organizer</h1>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/transactions">Transactions</Link></li>
          <li><Link to="/goals">Goals</Link></li>
          <li><Link to="/banks">Banks</Link></li>
        </ul>
      </nav>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
