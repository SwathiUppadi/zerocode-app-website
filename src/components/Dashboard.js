import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import ProjectCard from './ProjectCard';
import Modal from './Modal';
import ProjectEditor from './ProjectEditor';

const Dashboard = ({ onNotification, isNewProjectModalOpen, onNewProjectModalClose, projects = [], setProjects, onPreviewProject }) => {
  // If no projects are passed, we'll add some default ones
  useEffect(() => {
    if (projects.length === 0) {
      setProjects([
        {
          id: 1,
          title: 'E-commerce Website',
          description: 'Online store with product catalog and checkout.',
          systemPrompt: 'Create a responsive e-commerce platform with product listings, cart functionality, and checkout process.',
          filePath: '/public/projects/ecommerce/',
          progress: 75,
          lastEdited: '2 days ago',
          chats: []
        },
        {
          id: 2,
          title: 'Blog Platform',
          description: 'Content management system for bloggers.',
          systemPrompt: 'Design a blog platform with posts, categories, and user authentication.',
          filePath: '/public/projects/blog/',
          progress: 40,
          lastEdited: '1 week ago',
          chats: []
        },
        {
          id: 3,
          title: 'Portfolio Site',
          description: 'Professional showcase website.',
          systemPrompt: 'Build a modern portfolio site to showcase projects, skills, and contact information.',
          filePath: '/public/projects/portfolio/',
          progress: 90,
          lastEdited: 'Yesterday',
          chats: []
        },
        {
          id: 4,
          title: 'Mobile App Landing Page',
          description: 'Promotional website for mobile application.',
          systemPrompt: 'Create a landing page for a mobile app with download links and feature showcases.',
          filePath: '/public/projects/landing-page/',
          progress: 20,
          lastEdited: '3 days ago',
          chats: []
        }
      ]);
    }
  }, [projects.length, setProjects]);

  // State for editor modal
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);
  
  // Combine local and parent modal states
  const isModalOpen = isLocalModalOpen || isNewProjectModalOpen;
  const [currentProject, setCurrentProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterValue, setFilterValue] = useState('all');
  const [sortValue, setSortValue] = useState('recent');

  // Handle opening the editor for a new project
  const handleCreateProject = () => {
    setCurrentProject(null); // No project means create new
    setIsLocalModalOpen(true);
  };

  // Handle opening the editor for an existing project
  const handleEditProject = (project) => {
    setCurrentProject(project);
    setIsLocalModalOpen(true);
  };

  // Handle saving a project (create or update)
  const handleSaveProject = (projectData) => {
    if (currentProject) {
      // Update existing project
      setProjects(projects.map(p => 
        p.id === projectData.id ? projectData : p
      ));
      onNotification(`Project "${projectData.title}" updated successfully`, 'success');
    } else {
      // Add new project
      setProjects([...projects, projectData]);
      onNotification(`Project "${projectData.title}" created successfully`, 'success');
    }
    setIsLocalModalOpen(false);
    if (isNewProjectModalOpen) {
      onNewProjectModalClose();
    }
  };
  
  // Handle deleting a project
  const handleDeleteProject = (projectId, projectTitle) => {
    setProjects(projects.filter(p => p.id !== projectId));
    onNotification(`Project "${projectTitle}" deleted`, 'info');
  };
  
  // Handle archiving a project
  const handleArchiveProject = (projectId, projectTitle) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, isArchived: true } : p
    ));
    onNotification(`Project "${projectTitle}" archived`, 'info');
  };
  
  // Handle duplicating a project
  const handleDuplicateProject = (project) => {
    const newProject = {
      ...project,
      id: Date.now(),
      title: `${project.title} (Copy)`,
      lastEdited: 'Just now'
    };
    setProjects([...projects, newProject]);
    onNotification(`Project duplicated as "${newProject.title}"`, 'success');
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter and sort projects
  const filteredProjects = projects.filter(project => {
    // Apply search filter
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply category filter
    if (filterValue === 'all') return matchesSearch;
    if (filterValue === 'completed') return matchesSearch && project.progress === 100;
    if (filterValue === 'active') return matchesSearch && project.progress < 100 && project.progress > 0;
    if (filterValue === 'archived') return matchesSearch && project.isArchived;
    
    return matchesSearch;
  }).sort((a, b) => {
    // Apply sorting
    if (sortValue === 'name') return a.title.localeCompare(b.title);
    if (sortValue === 'progress') return b.progress - a.progress;
    // Default: sort by recent
    return a.id < b.id ? 1 : -1; // Newer projects have higher IDs
  });

  return (
    <main className="dashboard">
      <div className="dashboard-header">
        <h2>My Projects</h2>
        <div className="dashboard-actions">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="search-btn">🔍</button>
          </div>
          <div className="filter-sort">
            <select 
              className="filter-dropdown"
              value={filterValue}
              onChange={(e) => setFilterValue(e.target.value)}
            >
              <option value="all">All Projects</option>
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            <select 
              className="sort-dropdown"
              value={sortValue}
              onChange={(e) => setSortValue(e.target.value)}
            >
              <option value="recent">Recently Edited</option>
              <option value="name">Name (A-Z)</option>
              <option value="progress">Progress</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onEdit={() => handleEditProject(project)}
            onDelete={() => handleDeleteProject(project.id, project.title)}
            onArchive={() => handleArchiveProject(project.id, project.title)}
            onDuplicate={() => handleDuplicateProject(project)}
            onPreview={() => onPreviewProject && onPreviewProject(project)}
          />
        ))}
      </div>
      
      <div className="create-new-project">
        <div className="new-project-card" onClick={handleCreateProject}>
          <div className="plus-icon">+</div>
          <p>Create New Project</p>
        </div>
      </div>
      
      {/* Modal for project editor */}
      <Modal isOpen={isModalOpen} onClose={() => {
        setIsLocalModalOpen(false);
        if (isNewProjectModalOpen) {
          onNewProjectModalClose();
        }
      }}>
        <ProjectEditor 
          project={currentProject}
          onSave={handleSaveProject}
          onCancel={() => {
            setIsLocalModalOpen(false);
            if (isNewProjectModalOpen) {
              onNewProjectModalClose();
            }
          }}
        />
      </Modal>
    </main>
  );
};

export default Dashboard;