import React, { useEffect } from 'react';
import '../styles/Notification.css';

const Notification = ({ message, type, show, onClose }) => {
  // Auto-close notification after 3 seconds
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div className={`notification ${type}`}>
      <div className="notification-content">
        {type === 'success' && <span className="notification-icon">✓</span>}
        {type === 'error' && <span className="notification-icon">✗</span>}
        {type === 'info' && <span className="notification-icon">ℹ</span>}
        <span className="notification-message">{message}</span>
      </div>
      <button className="notification-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Notification;
