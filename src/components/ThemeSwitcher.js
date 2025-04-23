import React from 'react';
import '../styles/ThemeSwitcher.css';

const ThemeSwitcher = ({ isDarkMode, toggleTheme }) => {
  return (
    <div className="theme-switcher">
      <label className="switch">
        <input 
          type="checkbox" 
          checked={isDarkMode}
          onChange={toggleTheme}
        />
        <span className="slider round">
          <span className="icon">
            {isDarkMode ? '🌙' : '☀️'}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeSwitcher;
