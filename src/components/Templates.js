import React, { useState } from 'react';
import '../styles/Templates.css';
import templates from '../data/templates';
import Modal from './Modal';
import ProjectEditor from './ProjectEditor';

const Templates = ({ onSelectTemplate, onNotification, onCreateProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState(false);
  
  // Filter templates based on category and search term
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = activeCategory === 'all' || template.category === activeCategory;
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handle selecting a template
  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setIsProjectEditorOpen(true);
  };

  // Handle creating a project from template
  const handleCreateFromTemplate = (projectData) => {
    // Add components from template
    const newProject = {
      ...projectData,
      templateId: selectedTemplate.id,
      components: selectedTemplate.components,
      chats: []
    };
    
    onCreateProject(newProject);
    onNotification(`Project created from "${selectedTemplate.title}" template`, 'success');
    setIsProjectEditorOpen(false);
    setSelectedTemplate(null);
  };
  
  return (
    <main className="templates-container">
      <div className="templates-header">
        <h2>Project Templates</h2>
        <div className="templates-actions">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search templates..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="category-filters">
            <button 
              className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All
            </button>
            <button 
              className={`category-btn ${activeCategory === 'web' ? 'active' : ''}`}
              onClick={() => setActiveCategory('web')}
            >
              Web
            </button>
            <button 
              className={`category-btn ${activeCategory === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveCategory('mobile')}
            >
              Mobile
            </button>
          </div>
        </div>
      </div>
      
      <div className="templates-grid">
        {filteredTemplates.map(template => (
          <div 
            key={template.id} 
            className="template-card"
            onClick={() => handleSelectTemplate(template)}
          >
            <div className="template-image">
              <div className="template-placeholder">
                {/* Placeholder for template preview image */}
                <span className="template-icon">{template.category === 'web' ? '🌐' : '📱'}</span>
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-title">{template.title}</h3>
              <p className="template-description">{template.description}</p>
              <div className="template-details">
                <span className="template-difficulty">
                  {template.difficulty === 'beginner' && '🟢 Beginner'}
                  {template.difficulty === 'intermediate' && '🟠 Intermediate'}
                  {template.difficulty === 'advanced' && '🔴 Advanced'}
                </span>
                <span className="template-components">{template.components.length} components</span>
              </div>
            </div>
            <button className="use-template-btn">Use Template</button>
          </div>
        ))}
      </div>
      
      {/* Modal for project creation from template */}
      <Modal 
        isOpen={isProjectEditorOpen} 
        onClose={() => {
          setIsProjectEditorOpen(false);
          setSelectedTemplate(null);
        }}
      >
        <ProjectEditor 
          project={selectedTemplate ? {
            title: selectedTemplate.title,
            description: selectedTemplate.description,
            category: selectedTemplate.category,
            progress: 0
          } : null}
          onSave={handleCreateFromTemplate}
          onCancel={() => {
            setIsProjectEditorOpen(false);
            setSelectedTemplate(null);
          }}
          isTemplate={true}
        />
      </Modal>
    </main>
  );
};

export default Templates;