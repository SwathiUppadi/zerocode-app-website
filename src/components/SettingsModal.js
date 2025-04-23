import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/SettingsModal.css';

const SettingsModal = ({ isOpen, onClose, isDarkMode = false }) => {
  const [activeTab, setActiveTab] = useState('mcp');
  const [selectedOutputTypes, setSelectedOutputTypes] = useState({
    code: true,
    reports: true,
    presentations: false
  });
  
  const [frontendTech, setFrontendTech] = useState('react');
  const [backendTech, setBackendTech] = useState('python');
  const [docFormat, setDocFormat] = useState('markdown');
  
  // MCP Server Manager state
  const [servers, setServers] = useState([
    { id: 'alpha', name: 'MCP Server Alpha', version: '1.2.0', status: 'running' },
    { id: 'beta', name: 'MCP Server Beta', version: '1.1.5', status: 'stopped' },
    { id: 'dev', name: 'MCP Server Dev', version: '1.3.0-dev', status: 'downloading', progress: 45 }
  ]);
  const [downloadingServer, setDownloadingServer] = useState(false);
  
  // Model & Agent Settings state
  const [modelType, setModelType] = useState('gpt4');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2000);
  const [agentEnabled, setAgentEnabled] = useState(true);
  const [enterpriseFeatures, setEnterpriseFeatures] = useState(false);
  
  // Add Model form state
  const [addModelView, setAddModelView] = useState(true);
  const [newModel, setNewModel] = useState({
    name: '',
    provider: '',
    version: '',
    apiKey: ''
  });
  const [selectedCapabilities, setSelectedCapabilities] = useState(['Text generation']);
  const [newCapability, setNewCapability] = useState('');
  
  const handleOutputTypeToggle = (type) => {
    setSelectedOutputTypes({
      ...selectedOutputTypes,
      [type]: !selectedOutputTypes[type]
    });
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewModel({
      ...newModel,
      [name]: value
    });
  };
  
  const handleAddCapability = () => {
    if (newCapability && !selectedCapabilities.includes(newCapability)) {
      setSelectedCapabilities([...selectedCapabilities, newCapability]);
      setNewCapability('');
    }
  };
  
  const handleRemoveCapability = (capability) => {
    setSelectedCapabilities(selectedCapabilities.filter(c => c !== capability));
  };
  
  const handleAddModel = () => {
    // Here we would typically add the model to a database or state
    // For this demo we'll just go back to the main view
    setAddModelView(false);
    // Reset form
    setNewModel({
      name: '',
      provider: '',
      version: '',
      apiKey: ''
    });
    setSelectedCapabilities(['Text generation']);
  };
  
  const handleCancelAddModel = () => {
    setAddModelView(false);
    // Reset form
    setNewModel({
      name: '',
      provider: '',
      version: '',
      apiKey: ''
    });
    setSelectedCapabilities(['Text generation']);
  };
  
  // MCP Server handlers
  const handleDownloadNewServer = () => {
    setDownloadingServer(true);
    // Simulate server download and installation
    setTimeout(() => {
      setDownloadingServer(false);
      // Add a new server to the list
      const newServer = {
        id: 'new-server-' + Date.now(),
        name: 'MCP Server Gamma',
        version: '2.0.0',
        status: 'stopped'
      };
      setServers([...servers, newServer]);
    }, 3000);
  };
  
  const handleServerAction = (serverId, action) => {
    // Update the server status based on the action
    const updatedServers = servers.map(server => {
      if (server.id === serverId) {
        if (action === 'start') {
          return { ...server, status: 'running' };
        } else if (action === 'stop') {
          return { ...server, status: 'stopped' };
        }
      }
      return server;
    });
    setServers(updatedServers);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={`settings-modal ${isDarkMode ? 'dark-theme' : ''}`}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="settings-tabs">
          <div 
            className={`settings-tab ${activeTab === 'mcp' ? 'active' : ''}`}
            onClick={() => setActiveTab('mcp')}
          >
            MCP Server Manager
          </div>
          <div 
            className={`settings-tab ${activeTab === 'model' ? 'active' : ''}`}
            onClick={() => setActiveTab('model')}
          >
            Model & Agent Settings
          </div>
          <div 
            className={`settings-tab ${activeTab === 'artifacts' ? 'active' : ''}`}
            onClick={() => setActiveTab('artifacts')}
          >
            Artifacts Setup
          </div>
        </div>
        
        <div className="settings-content">
          {activeTab === 'artifacts' && (
            <div className="settings-section">
              <h3>Output Types</h3>
              <div className="settings-desc">
                Select what kind of artifacts you want the AI to generate:
              </div>
              
              <div className="settings-option-grid">
                <div 
                  className={`settings-option-card ${selectedOutputTypes.code ? 'selected' : ''}`}
                  onClick={() => handleOutputTypeToggle('code')}
                >
                  <input 
                    type="checkbox" 
                    className="settings-option-checkbox" 
                    checked={selectedOutputTypes.code}
                    readOnly
                  />
                  <div className="settings-option-content">
                    <h4>Code</h4>
                    <p>Generate code in your preferred languages</p>
                  </div>
                </div>
                
                <div 
                  className={`settings-option-card ${selectedOutputTypes.reports ? 'selected' : ''}`}
                  onClick={() => handleOutputTypeToggle('reports')}
                >
                  <input 
                    type="checkbox" 
                    className="settings-option-checkbox" 
                    checked={selectedOutputTypes.reports}
                    readOnly
                  />
                  <div className="settings-option-content">
                    <h4>Reports</h4>
                    <p>Create detailed documents and reports</p>
                  </div>
                </div>
                
                <div 
                  className={`settings-option-card ${selectedOutputTypes.presentations ? 'selected' : ''}`}
                  onClick={() => handleOutputTypeToggle('presentations')}
                >
                  <input 
                    type="checkbox" 
                    className="settings-option-checkbox" 
                    checked={selectedOutputTypes.presentations}
                    readOnly
                  />
                  <div className="settings-option-content">
                    <h4>Presentations</h4>
                    <p>Build slide decks and presentations</p>
                  </div>
                </div>
              </div>
              
              {enterpriseFeatures && (
                <div className="settings-options">
                  <h4>Enterprise Configuration</h4>
                  <div className="settings-desc">
                    Configure enterprise-specific settings for your organization.
                  </div>
                  
                  <div className="settings-field">
                    <label>Organization ID</label>
                    <input 
                      type="text" 
                      placeholder="Enter your organization ID"
                      className="settings-input"
                    />
                  </div>
                  
                  <div className="settings-field">
                    <label>API Key Type</label>
                    <select className="settings-select">
                      <option value="shared">Shared Team Key</option>
                      <option value="individual">Individual Keys</option>
                      <option value="managed">Enterprise Managed Keys</option>
                    </select>
                  </div>
                  
                  <div className="settings-field">
                    <label>Data Retention Policy</label>
                    <select className="settings-select">
                      <option value="7">7 days</option>
                      <option value="30">30 days</option>
                      <option value="90">90 days</option>
                      <option value="365">1 year</option>
                    </select>
                  </div>
                  
                  <div className="settings-option-card" style={{ marginTop: '16px' }}>
                    <input 
                      type="checkbox" 
                      className="settings-option-checkbox"
                      checked={true}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Enforce SOC2 Compliance</h4>
                      <p>Apply strict SOC2 compliance controls to all operations</p>
                    </div>
                  </div>
                </div>
              )}
              
              <h3>Preferred Languages</h3>
              <div className="settings-desc">
                Choose your preferred technologies and formats:
              </div>
              
              <div className="settings-options">
                <h4>Frontend</h4>
                <div className="settings-option-grid">
                  <div 
                    className={`settings-option-card ${frontendTech === 'react' ? 'selected' : ''}`}
                    onClick={() => setFrontendTech('react')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={frontendTech === 'react'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>React</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${frontendTech === 'vue' ? 'selected' : ''}`}
                    onClick={() => setFrontendTech('vue')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={frontendTech === 'vue'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Vue.js</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${frontendTech === 'angular' ? 'selected' : ''}`}
                    onClick={() => setFrontendTech('angular')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={frontendTech === 'angular'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Angular</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${frontendTech === 'svelte' ? 'selected' : ''}`}
                    onClick={() => setFrontendTech('svelte')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={frontendTech === 'svelte'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Svelte</h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-options">
                <h4>Backend</h4>
                <div className="settings-option-grid">
                  <div 
                    className={`settings-option-card ${backendTech === 'python' ? 'selected' : ''}`}
                    onClick={() => setBackendTech('python')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={backendTech === 'python'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Python (FastAPI)</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${backendTech === 'nodejs' ? 'selected' : ''}`}
                    onClick={() => setBackendTech('nodejs')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={backendTech === 'nodejs'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Node.js (Express)</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${backendTech === 'ruby' ? 'selected' : ''}`}
                    onClick={() => setBackendTech('ruby')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={backendTech === 'ruby'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Ruby (Rails)</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${backendTech === 'go' ? 'selected' : ''}`}
                    onClick={() => setBackendTech('go')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={backendTech === 'go'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Go</h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-options">
                <h4>Document Formats</h4>
                <div className="settings-option-grid">
                  <div 
                    className={`settings-option-card ${docFormat === 'markdown' ? 'selected' : ''}`}
                    onClick={() => setDocFormat('markdown')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={docFormat === 'markdown'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>Markdown</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${docFormat === 'html' ? 'selected' : ''}`}
                    onClick={() => setDocFormat('html')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={docFormat === 'html'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>HTML</h4>
                    </div>
                  </div>
                  
                  <div 
                    className={`settings-option-card ${docFormat === 'pdf' ? 'selected' : ''}`}
                    onClick={() => setDocFormat('pdf')}
                  >
                    <input 
                      type="radio" 
                      className="settings-option-checkbox" 
                      checked={docFormat === 'pdf'}
                      readOnly
                    />
                    <div className="settings-option-content">
                      <h4>PDF</h4>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-cta-container">
                <div className="settings-cta-box">
                  <div className="settings-cta-header">
                    <h3>Upgrade to Pro Models</h3>
                    <span className="settings-cta-badge">Recommended</span>
                  </div>
                  <p className="settings-cta-text">
                    Get access to the latest AI models with enhanced capabilities, higher token limits, and faster processing times.
                  </p>
                  <ul className="settings-cta-features">
                    <li>Access to GPT-4 Turbo and Claude 3 Opus</li>
                    <li>Up to 32,000 token context window</li>
                    <li>Advanced tool usage capabilities</li>
                    <li>Priority processing for all requests</li>
                  </ul>
                  <button className="settings-cta-button">Upgrade Now</button>
                </div>
              </div>
              

            </div>
          )}
          
          {activeTab === 'model' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>Model & Agent Settings</h2>
                <button className="add-model-btn" onClick={() => setAddModelView(true)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Model
                </button>
              </div>

              {addModelView ? (
                <div className="add-model-form">
                  <h3>Add New Model</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Model Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="e.g., GPT-4o" 
                        value={newModel.name} 
                        onChange={handleInputChange} 
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="provider">Provider <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="provider" 
                        name="provider" 
                        placeholder="e.g., OpenAI" 
                        value={newModel.provider} 
                        onChange={handleInputChange} 
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="version">Version <span className="required">*</span></label>
                      <input 
                        type="text" 
                        id="version" 
                        name="version" 
                        placeholder="e.g., Latest" 
                        value={newModel.version} 
                        onChange={handleInputChange} 
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="apiKey" className="api-key-label">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"></path>
                        </svg>
                        API Key
                      </label>
                      <input 
                        type="text" 
                        id="apiKey" 
                        name="apiKey" 
                        placeholder="sk-..." 
                        value={newModel.apiKey} 
                        onChange={handleInputChange} 
                        className="form-control"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group capabilities-group">
                    <label>Capabilities</label>
                    <div className="selected-capabilities">
                      {selectedCapabilities.map(capability => (
                        <div key={capability} className="capability-badge">
                          <span>{capability}</span>
                          <button 
                            type="button" 
                            className="remove-capability" 
                            onClick={() => handleRemoveCapability(capability)}
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="capability-input-group">
                      <select 
                        className="capability-dropdown" 
                        value={newCapability} 
                        onChange={(e) => setNewCapability(e.target.value)}
                      >
                        <option value="">Add capability</option>
                        <option value="Text generation">Text generation</option>
                        <option value="Code completion">Code completion</option>
                        <option value="Reasoning">Reasoning</option>
                        <option value="Analysis">Analysis</option>
                        <option value="Summarization">Summarization</option>
                        <option value="Multi-lingual">Multi-lingual</option>
                      </select>
                      <button 
                        type="button" 
                        className="add-capability-btn" 
                        onClick={handleAddCapability}
                        disabled={!newCapability}
                      >
                        Add
                      </button>
                    </div>
                  </div>
                  
                  <div className="form-actions">
                    <button type="button" className="cancel-btn" onClick={handleCancelAddModel}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                      Cancel
                    </button>
                    <button 
                      type="button" 
                      className="submit-btn" 
                      onClick={handleAddModel}
                      disabled={!newModel.name || !newModel.provider || !newModel.version}
                    >
                      Add Model
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="model-card default-model">
                    <div className="model-card-content">
                      <div className="model-header">
                        <h3>GPT-4</h3>
                        <div className="model-info">
                          <span className="model-provider">OpenAI</span>
                          <span className="model-version">vLatest</span>
                        </div>
                      </div>
                      <div className="model-capabilities">
                        <span className="capability-tag">Text generation</span>
                        <span className="capability-tag">Code completion</span>
                        <span className="capability-tag">Reasoning</span>
                      </div>
                    </div>
                    <div className="default-indicator">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Default
                    </div>
                  </div>

                  <div className="model-card">
                    <div className="model-card-content">
                      <div className="model-header">
                        <h3>Claude</h3>
                        <div className="model-info">
                          <span className="model-provider">Anthropic</span>
                          <span className="model-version">v3 Opus</span>
                        </div>
                      </div>
                      <div className="model-capabilities">
                        <span className="capability-tag">Text generation</span>
                        <span className="capability-tag">Analysis</span>
                        <span className="capability-tag">Summarization</span>
                      </div>
                    </div>
                    <div className="default-btn-container">
                      <button className="set-default-btn">Set as Default</button>
                    </div>
                  </div>

                  <div className="model-card">
                    <div className="model-card-content">
                      <div className="model-header">
                        <h3>Mixtral</h3>
                        <div className="model-info">
                          <span className="model-provider">Mistral AI</span>
                          <span className="model-version">v8x7B</span>
                        </div>
                      </div>
                      <div className="model-capabilities">
                        <span className="capability-tag">Text generation</span>
                        <span className="capability-tag">Code completion</span>
                        <span className="capability-tag">Multi-lingual</span>
                      </div>
                    </div>
                    <div className="default-btn-container">
                      <button className="set-default-btn">Set as Default</button>
                    </div>
                  </div>
                  
                  <div className="agent-tools-section">
                    <h3>Agent Tools</h3>
                    <p className="settings-desc">Select which tools should be enabled for your AI agents:</p>
                    
                    <div className="tools-grid">
                      <div className="tool-option">
                        <label className="tool-label">
                          <input 
                            type="checkbox" 
                            checked={true} 
                            onChange={() => {}}
                          />
                          <span>Web Search</span>
                        </label>
                      </div>
                      
                      <div className="tool-option">
                        <label className="tool-label">
                          <input 
                            type="checkbox" 
                            checked={true} 
                            onChange={() => {}}
                          />
                          <span>Code Generation</span>
                        </label>
                      </div>
                      
                      <div className="tool-option">
                        <label className="tool-label">
                          <input 
                            type="checkbox" 
                            checked={true} 
                            onChange={() => {}}
                          />
                          <span>Data Analysis</span>
                        </label>
                      </div>
                      
                      <div className="tool-option">
                        <label className="tool-label">
                          <input 
                            type="checkbox" 
                            checked={false} 
                            onChange={() => {}}
                          />
                          <span>File Management</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
          
          {activeTab === 'mcp' && (
            <div className="settings-section">
              <div className="settings-section-header">
                <h2>MCP Server Manager</h2>
                <button className="add-model-btn" onClick={() => {}}>                  
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Download New Server
                </button>
              </div>
              
              {/* MCP Server Alpha - Running */}
              <div className="server-card">
                <div className="server-info">
                  <h3>MCP Server Alpha</h3>
                  <div className="server-version">Version 1.2.0</div>
                </div>
                <div className="server-status">
                  <div className="status-indicator running">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Running
                  </div>
                  <button className="server-action-btn stop-btn">Stop</button>
                </div>
              </div>
              
              {/* MCP Server Beta - Stopped */}
              <div className="server-card">
                <div className="server-info">
                  <h3>MCP Server Beta</h3>
                  <div className="server-version">Version 1.1.5</div>
                </div>
                <div className="server-status">
                  <div className="status-indicator stopped">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    Stopped
                  </div>
                  <button className="server-action-btn start-btn">Start</button>
                </div>
              </div>
              
              {/* MCP Server Dev - Downloading */}
              <div className="server-card">
                <div className="server-info">
                  <h3>MCP Server Dev</h3>
                  <div className="server-version">Version 1.3.0-dev</div>
                </div>
                <div className="server-status downloading">
                  <div className="status-indicator downloading">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      <path d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"></path>
                    </svg>
                    Downloading... 45%
                  </div>
                  <div className="progress-bar">
                    <div className="progress-bar-fill" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="server-info-text">
                MCP servers enable multi-model capabilities and enhanced agent functionalities. You can run multiple servers in parallel for different projects or requirements.
              </div>
            </div>
          )}
          

        </div>
        
        <div className="settings-footer">
          These preferences will be used as defaults when generating content, but can be overridden on a per-project basis.
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;
