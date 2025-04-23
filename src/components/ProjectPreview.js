import React, { useState } from 'react';
import '../styles/ProjectPreview.css';

const ProjectPreview = ({ project, onClose, onEdit }) => {
  const [activeTab, setActiveTab] = useState('desktop');
  const [previewScale, setPreviewScale] = useState(100);
  
  if (!project) return null;
  
  return (
    <div className="project-preview">
      <div className="preview-header">
        <div className="preview-title">
          <h2>{project.title}</h2>
          <span className="preview-badge">Preview Mode</span>
          {(project.systemPrompt || project.filePath) && (
            <div className="preview-details">
              {project.systemPrompt && (
                <div className="preview-system-prompt">
                  <strong>System Prompt:</strong> {project.systemPrompt}
                </div>
              )}
              {project.filePath && (
                <div className="preview-file-path">
                  <strong>File Path:</strong> {project.filePath}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="preview-controls">
          <div className="device-tabs">
            <button 
              className={`device-tab ${activeTab === 'desktop' ? 'active' : ''}`}
              onClick={() => setActiveTab('desktop')}
            >
              💻 Desktop
            </button>
            <button 
              className={`device-tab ${activeTab === 'tablet' ? 'active' : ''}`}
              onClick={() => setActiveTab('tablet')}
            >
              📱 Tablet
            </button>
            <button 
              className={`device-tab ${activeTab === 'mobile' ? 'active' : ''}`}
              onClick={() => setActiveTab('mobile')}
            >
              📱 Mobile
            </button>
          </div>
          <div className="zoom-control">
            <button 
              className="zoom-btn"
              onClick={() => setPreviewScale(Math.max(50, previewScale - 10))}
              disabled={previewScale <= 50}
            >
              -
            </button>
            <span className="zoom-level">{previewScale}%</span>
            <button 
              className="zoom-btn"
              onClick={() => setPreviewScale(Math.min(150, previewScale + 10))}
              disabled={previewScale >= 150}
            >
              +
            </button>
          </div>
          <div className="action-buttons">
            <button className="edit-btn" onClick={onEdit}>Edit Project</button>
            <button className="close-preview-btn" onClick={onClose}>Close Preview</button>
          </div>
        </div>
      </div>
      
      <div className="preview-content">
        <div 
          className={`preview-frame ${activeTab}`} 
          style={{ transform: `scale(${previewScale / 100})` }}
        >
          {/* Generic preview content based on project type/template */}
          <div className="preview-placeholder">
            {project.templateId === 'ecommerce' && (
              <div className="ecommerce-preview">
                <header className="preview-site-header">
                  <div className="preview-logo">STORE</div>
                  <nav className="preview-nav">
                    <ul>
                      <li>Home</li>
                      <li>Products</li>
                      <li>Categories</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                  <div className="preview-cart">🛒 Cart (0)</div>
                </header>
                <div className="preview-hero">
                  <h1>Welcome to {project.title}</h1>
                  <p>Shop the latest products with free shipping</p>
                  <button className="preview-cta">Shop Now</button>
                </div>
                <div className="preview-products">
                  <h2>Featured Products</h2>
                  <div className="product-grid">
                    <div className="product-card">
                      <div className="product-image"></div>
                      <h3>Product 1</h3>
                      <p>$99.99</p>
                      <button>Add to Cart</button>
                    </div>
                    <div className="product-card">
                      <div className="product-image"></div>
                      <h3>Product 2</h3>
                      <p>$149.99</p>
                      <button>Add to Cart</button>
                    </div>
                    <div className="product-card">
                      <div className="product-image"></div>
                      <h3>Product 3</h3>
                      <p>$79.99</p>
                      <button>Add to Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {project.templateId === 'portfolio' && (
              <div className="portfolio-preview">
                <header className="preview-site-header">
                  <div className="preview-logo">MY PORTFOLIO</div>
                  <nav className="preview-nav">
                    <ul>
                      <li>Home</li>
                      <li>Projects</li>
                      <li>About</li>
                      <li>Skills</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                </header>
                <div className="preview-hero">
                  <h1>Hello, I'm Jane Doe</h1>
                  <p>Web Developer & Designer</p>
                  <div className="preview-cta-group">
                    <button className="preview-cta">View My Work</button>
                    <button className="preview-cta secondary">Download Resume</button>
                  </div>
                </div>
                <div className="preview-projects">
                  <h2>Recent Projects</h2>
                  <div className="project-grid">
                    <div className="preview-project-card">
                      <div className="preview-project-image"></div>
                      <h3>Project 1</h3>
                      <p>Web Design</p>
                    </div>
                    <div className="preview-project-card">
                      <div className="preview-project-image"></div>
                      <h3>Project 2</h3>
                      <p>Mobile App</p>
                    </div>
                    <div className="preview-project-card">
                      <div className="preview-project-image"></div>
                      <h3>Project 3</h3>
                      <p>Branding</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {project.templateId === 'blog' && (
              <div className="blog-preview">
                <header className="preview-site-header">
                  <div className="preview-logo">BLOG TITLE</div>
                  <nav className="preview-nav">
                    <ul>
                      <li>Home</li>
                      <li>Articles</li>
                      <li>Categories</li>
                      <li>About</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                </header>
                <div className="preview-featured">
                  <div className="featured-image"></div>
                  <div className="featured-content">
                    <span className="preview-category">Technology</span>
                    <h1>Featured Article Title</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                    <div className="preview-meta">
                      <span>April 15, 2023</span>
                      <span>5 min read</span>
                    </div>
                    <button className="preview-cta">Read More</button>
                  </div>
                </div>
                <div className="preview-articles">
                  <h2>Recent Articles</h2>
                  <div className="article-grid">
                    <div className="preview-article-card">
                      <div className="preview-article-image"></div>
                      <span className="preview-category">Design</span>
                      <h3>Article Title 1</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <div className="preview-meta">
                        <span>April 10, 2023</span>
                        <span>3 min read</span>
                      </div>
                    </div>
                    <div className="preview-article-card">
                      <div className="preview-article-image"></div>
                      <span className="preview-category">Business</span>
                      <h3>Article Title 2</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                      <div className="preview-meta">
                        <span>April 8, 2023</span>
                        <span>4 min read</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {(!project.templateId || !['ecommerce', 'portfolio', 'blog'].includes(project.templateId)) && (
              <div className="generic-preview">
                <header className="preview-site-header">
                  <div className="preview-logo">{project.title.toUpperCase()}</div>
                  <nav className="preview-nav">
                    <ul>
                      <li>Home</li>
                      <li>About</li>
                      <li>Services</li>
                      <li>Contact</li>
                    </ul>
                  </nav>
                </header>
                <div className="preview-hero">
                  <h1>Welcome to {project.title}</h1>
                  <p>{project.description || 'Your project description will appear here.'}</p>
                  <button className="preview-cta">Learn More</button>
                </div>
                <div className="preview-sections">
                  <div className="preview-section">
                    <h2>Section 1</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                  </div>
                  <div className="preview-section">
                    <h2>Section 2</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                  </div>
                  <div className="preview-section">
                    <h2>Section 3</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;