import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { ThemeContext } from '../context/ThemeContext';

const Goals = () => {
  const { goals, addGoal, updateGoalProgress, deleteGoal } = useContext(DataContext);
  const { darkMode } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    targetAmount: '',
    targetDate: '',
    description: '',
    currentAmount: 0
  });
  const [progressData, setProgressData] = useState({
    goalId: '',
    amount: ''
  });
  const [showProgressForm, setShowProgressForm] = useState(false);

  // Handle goal form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['targetAmount', 'currentAmount'].includes(name) ? parseFloat(value) || '' : value
    }));
  };

  // Handle progress form input changes
  const handleProgressChange = (e) => {
    const { name, value } = e.target;
    setProgressData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseFloat(value) || '' : value
    }));
  };

  // Handle goal form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.targetAmount || !formData.targetDate) {
      alert('Please fill in all required fields');
      return;
    }
    addGoal(formData);
    setFormData({
      name: '',
      targetAmount: '',
      targetDate: '',
      description: '',
      currentAmount: 0
    });
    setShowForm(false);
  };

  // Handle progress form submission
  const handleProgressSubmit = (e) => {
    e.preventDefault();
    if (!progressData.goalId || !progressData.amount) {
      alert('Please fill in all required fields');
      return;
    }
    updateGoalProgress(progressData.goalId, parseFloat(progressData.amount));
    setProgressData({
      goalId: '',
      amount: ''
    });
    setShowProgressForm(false);
  };

  // Sort goals by completion percentage
  const sortedGoals = [...goals].sort((a, b) => {
    const aPercentage = (a.currentAmount / a.targetAmount) * 100;
    const bPercentage = (b.currentAmount / b.targetAmount) * 100;
    return bPercentage - aPercentage; // Sort by highest completion first
  });

  // Helper function to calculate days remaining
  const calculateDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className={`goals-page ${darkMode ? 'dark' : 'light'}`}>
      <div className="page-header">
        <h2>Savings Goals</h2>
        <div className="header-buttons">
          <button 
            className="add-button" 
            onClick={() => {
              setShowForm(!showForm);
              setShowProgressForm(false);
            }}
          >
            {showForm ? 'Cancel' : 'Add Goal'}
          </button>
          <button 
            className="update-button" 
            onClick={() => {
              setShowProgressForm(!showProgressForm);
              setShowForm(false);
            }}
          >
            {showProgressForm ? 'Cancel' : 'Update Progress'}
          </button>
        </div>
      </div>
      
      {/* Add Goal Form */}
      {showForm && (
        <form className="goal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Goal Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Name your goal" 
                required 
              />
            </div>
            
            <div className="form-group">
              <label>Target Amount</label>
              <input 
                type="number" 
                name="targetAmount" 
                value={formData.targetAmount} 
                onChange={handleChange} 
                min="1" 
                step="0.01" 
                placeholder="Amount" 
                required 
              />
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Current Amount (optional)</label>
              <input 
                type="number" 
                name="currentAmount" 
                value={formData.currentAmount} 
                onChange={handleChange} 
                min="0" 
                step="0.01" 
                placeholder="Current amount (if any)" 
              />
            </div>
            
            <div className="form-group">
              <label>Target Date</label>
              <input 
                type="date" 
                name="targetDate" 
                value={formData.targetDate} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          
          <div className="form-group full-width">
            <label>Description (optional)</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              placeholder="What are you saving for?" 
              rows="3"
            ></textarea>
          </div>
          
          <button type="submit" className="submit-button">
            Create Goal
          </button>
        </form>
      )}
      
      {/* Update Progress Form */}
      {showProgressForm && (
        <form className="progress-form" onSubmit={handleProgressSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Select Goal</label>
              <select 
                name="goalId" 
                value={progressData.goalId} 
                onChange={handleProgressChange}
                required
              >
                <option value="">Choose a goal</option>
                {goals.map(goal => (
                  <option key={goal.id} value={goal.id}>
                    {goal.name} (₱{goal.currentAmount.toFixed(2)} / ₱{goal.targetAmount.toFixed(2)})
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label>Amount to Add</label>
              <input 
                type="number" 
                name="amount" 
                value={progressData.amount} 
                onChange={handleProgressChange} 
                min="0.01" 
                step="0.01" 
                placeholder="Amount to add" 
                required 
              />
            </div>
          </div>
          
          <button type="submit" className="submit-button">
            Update Progress
          </button>
        </form>
      )}
      
      {/* Goals List */}
      {sortedGoals.length === 0 ? (
        <p className="no-data">No savings goals yet. Create your first goal to get started!</p>
      ) : (
        <div className="goals-container">
          {sortedGoals.map(goal => {
            const progressPercent = (goal.currentAmount / goal.targetAmount) * 100;
            const daysRemaining = calculateDaysRemaining(goal.targetDate);
            const isCompleted = goal.currentAmount >= goal.targetAmount;
            
            return (
              <div 
                key={goal.id} 
                className={`goal-card ${isCompleted ? 'completed' : ''}`}
              >
                <h3>{goal.name}</h3>
                <p className="goal-description">{goal.description}</p>
                
                <div className="goal-progress">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${Math.min(progressPercent, 100)}%` }}
                  ></div>
                </div>
                
                <div className="goal-stats">
                  <div>
                    <p className="stat-label">Progress</p>
                    <p className="stat-value">₱{goal.currentAmount.toFixed(2)} of ₱{goal.targetAmount.toFixed(2)}</p>
                  </div>
                  
                  <div>
                    <p className="stat-label">Completion</p>
                    <p className="stat-value">{progressPercent.toFixed(1)}%</p>
                  </div>
                  
                  <div>
                    <p className="stat-label">Time Remaining</p>
                    <p className="stat-value">
                      {isCompleted ? (
                        'Completed!'
                      ) : daysRemaining < 0 ? (
                        'Overdue!'
                      ) : (
                        `${daysRemaining} days`
                      )}
                    </p>
                  </div>
                </div>
                
                <div className="goal-footer">
                  <p className="target-date">Target: {goal.targetDate}</p>
                  <button 
                    className="delete-button" 
                    onClick={() => deleteGoal(goal.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Goals;
