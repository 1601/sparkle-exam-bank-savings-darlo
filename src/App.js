import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';

// Components
import Header from './components/Header';

// Pages
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Goals from './pages/Goals';
import Banks from './pages/Banks';

function App() {
  return (
    <ThemeProvider>
      <DataProvider>
        <Router>
          <div className="App">
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/banks" element={<Banks />} />
              </Routes>
            </main>
            <footer className="app-footer">
              <p>&copy; {new Date().getFullYear()} Bank Savings Organizer</p>
            </footer>
          </div>
        </Router>
      </DataProvider>
    </ThemeProvider>
  );
}

export default App;
