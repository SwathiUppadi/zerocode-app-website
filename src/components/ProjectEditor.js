import React, { useState } from 'react';
import '../styles/ProjectEditor.css';

const ProjectEditor = ({ project, onSave, onCancel, isTemplate = false }) => {
  // If project is provided, it's edit mode, otherwise it's create mode
  const isEditMode = !!project;
  
  // Initialize state with project data or empty values
  const [formData, setFormData] = useState({
    title: project ? project.title : '',
    description: project ? project.description : '',
    systemPrompt: project ? project.systemPrompt : '',
    filePath: project ? project.filePath : '',
    progress: project ? project.progress : 0,
    category: project ? project.category : 'web',
    isPublic: project ? project.isPublic : false
  });
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: project ? project.id : Date.now(), // Generate new ID for new projects
      ...formData,
      lastEdited: 'Just now'
    });
  };
  
  return (
    <div className="project-editor">
      <div className="editor-header">
        <h2>
          {isEditMode 
            ? 'Edit Project' 
            : isTemplate 
              ? 'Create Project from Template' 
              : 'Create New Project'
          }
        </h2>
        <button className="close-btn" onClick={onCancel}>×</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Project Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            required
            placeholder="Enter project title"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description" 
            value={formData.description} 
            onChange={handleChange}
            placeholder="Describe your project"
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="systemPrompt">System Prompt</label>
          <textarea 
            id="systemPrompt" 
            name="systemPrompt" 
            value={formData.systemPrompt} 
            onChange={handleChange}
            placeholder="Enter system prompt for the AI"
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="filePath">File Path</label>
          <input 
            type="text" 
            id="filePath" 
            name="filePath" 
            value={formData.filePath} 
            onChange={handleChange}
            placeholder="Enter file system path"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            name="category" 
            value={formData.category} 
            onChange={handleChange}
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="ecommerce">E-commerce</option>
            <option value="portfolio">Portfolio</option>
            <option value="blog">Blog</option>
            <option value="other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="progress">Progress ({formData.progress}%)</label>
          <input 
            type="range" 
            id="progress" 
            name="progress" 
            min="0" 
            max="100" 
            value={formData.progress} 
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="isPublic" 
            name="isPublic" 
            checked={formData.isPublic} 
            onChange={handleChange}
          />
          <label htmlFor="isPublic">Make project public</label>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={onCancel}>Cancel</button>
          <button type="submit" className="save-btn">
            {isEditMode 
              ? 'Save Changes' 
              : isTemplate 
                ? 'Create from Template'
                : 'Create Project'
            }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectEditor;
