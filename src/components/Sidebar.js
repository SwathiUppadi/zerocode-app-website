import React, { useState } from 'react';
import logoImage from '../assets/images/logo.svg';
import '../styles/Sidebar.css';

const Sidebar = ({ projects = [], activeProject = null, onProjectSelect = () => {}, onChatSelect = () => {}, activeChat = null }) => {
  const [expandedProjects, setExpandedProjects] = useState({});
  const [showNewProjectInput, setShowNewProjectInput] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  // Toggle project expansion in the sidebar
  const toggleProjectExpansion = (projectId) => {
    setExpandedProjects({
      ...expandedProjects,
      [projectId]: !expandedProjects[projectId]
    });
  };

  // Handle creating a new project
  const handleCreateProject = () => {
    setShowNewProjectInput(true);
  };

  // Submit new project
  const submitNewProject = (e) => {
    e.preventDefault();
    if (newProjectName.trim()) {
      // Project creation logic would go here
      console.log("New project created:", newProjectName);
      setNewProjectName('');
      setShowNewProjectInput(false);
    }
  };

  // Cancel new project creation
  const cancelNewProject = () => {
    setNewProjectName('');
    setShowNewProjectInput(false);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo-container">
          <img src={logoImage} alt="ZeroCode Logo" className="app-logo" />
          <h2>ZeroCode</h2>
        </div>
      </div>

      <section className="sidebar-section project-section">
        <div className="section-header">
          <h3>Projects</h3>
          <button className="add-button" onClick={handleCreateProject}>+</button>
        </div>

        {showNewProjectInput && (
          <form className="new-project-form" onSubmit={submitNewProject}>
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="Project name"
              autoFocus
            />
            <div className="form-actions">
              <button type="submit">Create</button>
              <button type="button" onClick={cancelNewProject}>Cancel</button>
            </div>
          </form>
        )}

        <ul className="project-list">
          {projects && projects.map(project => (
            <li 
              key={project.id} 
              className={`project-item ${activeProject?.id === project.id ? 'active' : ''}`}
            >
              <div 
                className="project-header" 
                onClick={() => onProjectSelect(project)}
              >
                <span className="project-icon">📁</span>
                <span className="project-name">{project.title}</span>
                <button 
                  className={`expand-button ${expandedProjects[project.id] ? 'expanded' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleProjectExpansion(project.id);
                  }}
                >
                  ▼
                </button>
              </div>
              
              {expandedProjects[project.id] && project.chats && (
                <ul className="chat-list">
                  {project.chats.map(chat => (
                    <li 
                      key={chat.id} 
                      className={`chat-item ${activeChat?.id === chat.id ? 'active' : ''}`}
                      onClick={() => onChatSelect(project, chat)}
                    >
                      <span className="chat-icon">💬</span>
                      <span className="chat-name">{chat.title}</span>
                    </li>
                  ))}
                  <li className="chat-item new-chat" onClick={() => onChatSelect(project, null)}>
                    <span className="chat-icon">+</span>
                    <span className="chat-name">New Chat</span>
                  </li>
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar-section settings-section">
        <div 
          className={`section-header ${showSettings ? 'active' : ''}`}
          onClick={() => setShowSettings(!showSettings)}
        >
          <h3>Settings</h3>
          <span className={`expand-button ${showSettings ? 'expanded' : ''}`}>▼</span>
        </div>
        
        {showSettings && (
          <ul className="settings-list">
            <li className="settings-item">
              <span className="settings-icon">🔄</span>
              <span className="settings-name">MCP Server Manager</span>
            </li>
            <li className="settings-item">
              <span className="settings-icon">📂</span>
              <span className="settings-name">File Systems</span>
            </li>
            <li className="settings-item">
              <span className="settings-icon">🤖</span>
              <span className="settings-name">Model & Agent Settings</span>
            </li>
            <li className="settings-item">
              <span className="settings-icon">📦</span>
              <span className="settings-name">Artifacts Setup</span>
            </li>
          </ul>
        )}
      </section>
      
      <div className="sidebar-footer">
        <div className="help-section">
          <span className="help-icon">❓</span>
          <span className="help-text">Help & Support</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;