import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project, onEdit, onDelete, onArchive, onDuplicate, onPreview }) => {
  const { title, description, systemPrompt, filePath, progress, lastEdited } = project;
  
  return (
    <div className="project-card">
      <div className="project-header">
        <h3 className="project-title">{title}</h3>
        <div className="project-menu" onClick={(e) => {
          e.stopPropagation();
          const menu = document.getElementById(`project-menu-${project.id}`);
          menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }}>
          ⋮
          <div id={`project-menu-${project.id}`} className="project-dropdown-menu">
            <ul>
              <li onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}>🖉 Edit Project</li>
              <li onClick={(e) => {
                e.stopPropagation();
                onPreview();
                document.getElementById(`project-menu-${project.id}`).style.display = 'none';
              }}>👁️ Preview</li>
              <li onClick={(e) => {
                e.stopPropagation();
                onDuplicate();
                document.getElementById(`project-menu-${project.id}`).style.display = 'none';
              }}>📁 Duplicate</li>
              <li onClick={(e) => {
                e.stopPropagation();
                onArchive();
                document.getElementById(`project-menu-${project.id}`).style.display = 'none';
              }}>📌 Archive</li>
              <li onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Are you sure you want to delete "${project.title}"?`)) {
                  onDelete();
                }
                document.getElementById(`project-menu-${project.id}`).style.display = 'none';
              }} className="delete-option">🚮 Delete</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="project-description">{description}</p>
      
      {systemPrompt && (
        <div className="project-system-prompt">
          <strong>System Prompt:</strong> 
          <span>{systemPrompt.length > 100 ? `${systemPrompt.substring(0, 100)}...` : systemPrompt}</span>
        </div>
      )}
      
      {filePath && (
        <div className="project-file-path">
          <strong>File Path:</strong> <span>{filePath}</span>
        </div>
      )}
      <div className="project-progress">
        <div className="progress-label">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="project-footer">
        <span className="last-edited">Last edited: {lastEdited}</span>
        <div className="project-buttons">
          <button className="preview-project-btn" onClick={onPreview}>Preview</button>
          <button className="edit-project-btn" onClick={onEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
