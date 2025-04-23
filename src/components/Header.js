import React, { useState } from 'react';
import logoImage from '../assets/images/logo.svg';
import '../styles/Header.css';
import ThemeSwitcher from './ThemeSwitcher';

const Header = ({ onNewProject, isDarkMode, toggleTheme, activeView, setActiveView, onOpenSettings }) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Toggle profile dropdown menu
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <header className="header">
      <div className="logo-container">
        <img src={logoImage} alt="ZeroCode Logo" className="header-logo" />
        <h1>ZeroCode</h1>
        <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav className={`main-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <ul>
          <li>
            <a 
              href="#" 
              className={activeView === 'dashboard' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveView('dashboard');
              }}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeView === 'templates' ? 'active' : ''}
              onClick={(e) => {
                e.preventDefault();
                setActiveView('templates');
              }}
            >
              Templates
            </a>
          </li>
          <li>
            <a 
              href="#"
              onClick={(e) => e.preventDefault()}
            >
              Help
            </a>
          </li>
        </ul>
      </nav>
      <div className="user-controls">
        <ThemeSwitcher isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <button className="settings-btn" onClick={onOpenSettings}>⚙️ Settings</button>
        <button className="new-project-btn" onClick={onNewProject}>+ New Project</button>
        <div className="user-profile" onClick={toggleProfileMenu}>
          <img src="/profile-placeholder.png" alt="User Profile" className="profile-pic" />
          <span className="user-name">John Doe</span>
          <span className="profile-dropdown-icon">▼</span>
          
          {/* Profile dropdown menu */}
          {isProfileMenuOpen && (
            <div className="profile-dropdown">
              <ul>
                <li><a href="#profile">My Profile</a></li>
                <li><a href="#" onClick={(e) => {
                  e.preventDefault();
                  onOpenSettings();
                  setIsProfileMenuOpen(false);
                }}>Settings</a></li>
                <li><a href="#billing">Billing</a></li>
                <li className="dropdown-divider"></li>
                <li><a href="#logout">Log Out</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
