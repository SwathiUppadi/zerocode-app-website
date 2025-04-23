import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Notification from './components/Notification';
import ThemeSwitcher from './components/ThemeSwitcher';
import ChatInterface from './components/ChatInterface';
import Templates from './components/Templates';
import ProjectPreview from './components/ProjectPreview';
import SettingsModal from './components/SettingsModal';
import './styles/DarkTheme.css';

function App() {
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'info' // 'success', 'error', or 'info'
  });
  
  // State for modal control
  const [isProjectEditorOpen, setIsProjectEditorOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  
  // Sample projects for sidebar
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'E-commerce Website',
      description: 'Online store with product catalog and checkout.',
      systemPrompt: 'Create a responsive e-commerce platform with product listings, cart functionality, and checkout process.',
      filePath: '/public/projects/ecommerce/',
      progress: 75,
      lastEdited: '2 days ago',
      chats: [
        { id: 101, title: 'Product Page Design' },
        { id: 102, title: 'Checkout Flow' }
      ]
    },
    {
      id: 2,
      title: 'Blog Platform',
      description: 'Content management system for bloggers.',
      systemPrompt: 'Design a blog platform with posts, categories, and user authentication.',
      filePath: '/public/projects/blog/',
      progress: 40,
      lastEdited: '1 week ago',
      chats: [
        { id: 201, title: 'Content Management' }
      ]
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
    }
  ]);
  
  // State for active project and chat
  const [activeProject, setActiveProject] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  
  // State for active view
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard', 'templates', 'chat', 'preview'
  
  // State for preview mode
  const [previewProject, setPreviewProject] = useState(null);
  
  // State for dark mode
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  
  // Effect to apply dark theme class to body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  
  // Toggle theme function
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  // Handle creating a new project
  const handleNewProject = () => {
    setIsProjectEditorOpen(true);
    setActiveView('dashboard');
  };

  // Function to show notifications
  const showNotification = (message, type = 'info') => {
    setNotification({ show: true, message, type });
  };

  // Function to hide notification
  const hideNotification = () => {
    setNotification({ ...notification, show: false });
  };

  // Handle preview project
  const handlePreviewProject = (project) => {
    setPreviewProject(project);
    setActiveView('preview');
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-theme' : ''}`}>
      <Header 
        onNewProject={handleNewProject}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenSettings={() => setIsSettingsModalOpen(true)}
      />
      <div className="main-content">
        <Sidebar 
          projects={projects}
          activeProject={activeProject}
          activeChat={activeChat}
          onProjectSelect={(project) => {
            setActiveProject(project);
            setActiveView('dashboard');
          }}
          onChatSelect={(project, chat) => {
            setActiveProject(project);
            setActiveChat(chat);
            setActiveView('chat');
          }}
        />
        {activeChat && activeView === 'chat' ? (
          <ChatInterface 
            project={activeProject}
            chat={activeChat}
            onSendMessage={(message) => {
              console.log('Sending message:', message);
              // Here we would normally send the message to a backend
              // For now, let's just add it to the active chat
              const updatedProjects = projects.map(project => {
                if (project.id === activeProject.id) {
                  const updatedChats = project.chats.map(chat => {
                    if (chat.id === activeChat.id) {
                      return {
                        ...chat,
                        messages: [...(chat.messages || []), {
                          id: Date.now(),
                          sender: 'user',
                          content: message,
                          timestamp: new Date().toISOString()
                        }]
                      };
                    }
                    return chat;
                  });
                  return { ...project, chats: updatedChats };
                }
                return project;
              });
              setProjects(updatedProjects);
              
              // Simulate assistant response after 1 second
              setTimeout(() => {
                const updatedProjects = projects.map(project => {
                  if (project.id === activeProject.id) {
                    const updatedChats = project.chats.map(chat => {
                      if (chat.id === activeChat.id) {
                        return {
                          ...chat,
                          messages: [...(chat.messages || []), {
                            id: Date.now(),
                            sender: 'assistant',
                            content: `I received your message: "${message}". How can I help with your project?`,
                            timestamp: new Date().toISOString()
                          }]
                        };
                      }
                      return chat;
                    });
                    return { ...project, chats: updatedChats };
                  }
                  return project;
                });
                setProjects(updatedProjects);
              }, 1000);
            }}
          />
        ) : activeView === 'templates' ? (
          <Templates 
            onNotification={showNotification}
            onCreateProject={(newProject) => {
              const projectWithId = {
                ...newProject,
                id: Date.now(),
                lastEdited: 'Just now'
              };
              setProjects([...projects, projectWithId]);
              setActiveView('dashboard');
            }}
          />
        ) : activeView === 'preview' && previewProject ? (
          <ProjectPreview 
            project={previewProject}
            onClose={() => {
              setActiveView('dashboard');
              setPreviewProject(null);
            }}
            onEdit={() => {
              setActiveView('dashboard');
              setActiveProject(previewProject);
              setIsProjectEditorOpen(true);
            }}
          />
        ) : (
          <Dashboard 
            onNotification={showNotification}
            isNewProjectModalOpen={isProjectEditorOpen}
            onNewProjectModalClose={() => setIsProjectEditorOpen(false)}
            projects={projects}
            setProjects={setProjects}
            onPreviewProject={handlePreviewProject}
          />
        )}
      </div>
      <Notification 
        show={notification.show}
        message={notification.message}
        type={notification.type}
        onClose={hideNotification}
      />
      
      <SettingsModal 
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
        isDarkMode={isDarkMode}
      />
    </div>
  );
}

export default App;