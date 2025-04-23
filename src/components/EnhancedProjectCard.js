import React, { useState } from 'react';
import '../styles/EnhancedProjectCard.css';

const EnhancedProjectCard = ({ project, onEdit, onDelete, onArchive, onDuplicate, onPreview }) => {
  const { title, description, systemPrompt, filePath, progress, lastEdited, category } = project;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Function to get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'web': return '🌐';
      case 'mobile': return '📱';
      case 'ecommerce': return '🛒';
      case 'portfolio': return '🎨';
      case 'blog': return '📝';
      default: return '📁';
    }
  };
  
  // Progress color based on completion percentage
  const getProgressColor = (progress) => {
    if (progress < 30) return '#ff6b6b';
    if (progress < 70) return '#ffd166';
    return '#06d6a0';
  };
  
  // Toggle dropdown menu
  const toggleMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };
  
  // Close menu when clicking outside
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="enhanced-project-card" onClick={closeMenu}>
      <div className="card-category-tag">
        <span className="category-icon">{getCategoryIcon(category)}</span>
        <span className="category-name">{category || 'Other'}</span>
      </div>
      
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
        <div className="project-menu" onClick={toggleMenu}>
          ⋮
          <div className={`project-dropdown-menu ${isMenuOpen ? 'show' : ''}`}>
            <ul>
              <li onClick={(e) => {
                e.stopPropagation();
                onEdit();
                closeMenu();
              }}>
                <span className="menu-icon">🖉</span> Edit Project
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                onPreview();
                closeMenu();
              }}>
                <span className="menu-icon">👁️</span> Preview
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
                closeMenu();
              }}>
                <span className="menu-icon">📁</span> Duplicate
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                onArchive();
                closeMenu();
              }}>
                <span className="menu-icon">📌</span> Archive
              </li>
              <li onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
                  onDelete();
                }
                closeMenu();
              }} className="delete-option">
                <span className="menu-icon">🚮</span> Delete
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <p className="project-description">{description}</p>
      
      {systemPrompt && (
        <div className="project-system-prompt">
          <div className="prompt-header">
            <span className="prompt-icon">🤖</span>
            <strong>System Prompt</strong>
          </div>
          <div className="prompt-content">
            {systemPrompt.length > 100 ? `${systemPrompt.substring(0, 100)}...` : systemPrompt}
          </div>
        </div>
      )}
      
      {filePath && (
        <div className="project-file-path">
          <div className="path-header">
            <span className="path-icon">📂</span>
            <strong>File Path</strong>
          </div>
          <div className="path-content">{filePath}</div>
        </div>
      )}
      
      <div className="project-progress">
        <div className="progress-label">
          <span>Progress</span>
          <span className="progress-percentage">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ 
              width: `${progress}%`,
              backgroundColor: getProgressColor(progress)
            }}
          ></div>
        </div>
      </div>
      
      <div className="project-footer">
        <span className="last-edited">
          <span className="time-icon">🕒</span>
          {lastEdited}
        </span>
        <div className="project-buttons">
          <button className="preview-project-btn" onClick={(e) => {
            e.stopPropagation();
            onPreview();
          }}>
            <span className="btn-icon">👁️</span>
            Preview
          </button>
          <button className="edit-project-btn" onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}>
            <span className="btn-icon">✏️</span>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnhancedProjectCard;