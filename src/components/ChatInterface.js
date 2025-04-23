import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatInterface.css';

const ChatInterface = ({ project, chat, onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);
  const [showModelInfo, setShowModelInfo] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  // Auto resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  }, [message]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleAttachmentClick = () => {
    setShowAttachmentMenu(!showAttachmentMenu);
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length) {
      // Handle file upload logic here
      console.log("Files selected:", files);
      setShowAttachmentMenu(false);
    }
  };

  const togglePinMessage = (messageId) => {
    // Logic to pin/unpin message
    console.log("Toggle pin for message:", messageId);
  };

  return (
    <div className="chat-interface">
      {chat ? (
        <>
          <div className="chat-header">
            <div className="chat-info">
              <h2>{chat.title || 'New Chat'}</h2>
              <span className="project-badge">{project?.title}</span>
            </div>
            <div className="chat-actions">
              <button 
                className={`model-info-toggle ${showModelInfo ? 'active' : ''}`}
                onClick={() => setShowModelInfo(!showModelInfo)}
                title="Toggle model info"
              >
                ℹ️
              </button>
            </div>
          </div>

          <div className="chat-messages">
            {chat.messages?.map((msg, index) => (
              <div key={index} className={`message ${msg.sender === 'user' ? 'user-message' : 'assistant-message'}`}>
                <div className="message-header">
                  <span className="message-sender">{msg.sender === 'user' ? 'You' : 'Assistant'}</span>
                  <div className="message-actions">
                    <button 
                      className={`pin-button ${msg.isPinned ? 'pinned' : ''}`}
                      onClick={() => togglePinMessage(msg.id)}
                      title={msg.isPinned ? 'Unpin message' : 'Pin message'}
                    >
                      📌
                    </button>
                  </div>
                </div>
                <div className="message-content">
                  {msg.content}
                </div>
                {msg.artifacts && (
                  <div className="message-artifacts">
                    {msg.artifacts.map((artifact, i) => (
                      <div key={i} className="artifact">
                        <div className="artifact-header">
                          <span className="artifact-title">{artifact.title}</span>
                          <div className="artifact-actions">
                            <button className="artifact-action" title="Copy">📋</button>
                            <button className="artifact-action" title="Download">⬇️</button>
                          </div>
                        </div>
                        <div className="artifact-content">
                          {artifact.type === 'code' && (
                            <pre className="code-block">
                              <code>{artifact.content}</code>
                            </pre>
                          )}
                          {artifact.type === 'text' && (
                            <div className="text-block">{artifact.content}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {showModelInfo && msg.sender === 'assistant' && (
                  <div className="model-info">
                    <span className="model-name">Model: {msg.model || 'GPT-4'}</span>
                    <span className="model-time">Generated in {msg.generationTime || '2.3'} seconds</span>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chat-input-form" onSubmit={handleSubmit}>
            <div className="chat-input-container">
              <div className="attachment-section">
                <button 
                  type="button" 
                  className="attachment-button"
                  onClick={handleAttachmentClick}
                  title="Add attachment"
                >
                  📎
                </button>
                {showAttachmentMenu && (
                  <div className="attachment-menu">
                    <button type="button" onClick={handleFileUpload}>
                      <span>Upload File</span>
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      multiple 
                      style={{ display: 'none' }} 
                    />
                  </div>
                )}
              </div>
              <textarea
                ref={textareaRef}
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                rows="1"
              />
              <button 
                type="submit" 
                className={`send-button ${message.trim() ? 'active' : ''}`}
                disabled={!message.trim()}
              >
                ↑
              </button>
            </div>
            <div className="input-help-text">
              Press Enter to send, Shift+Enter for new line
            </div>
          </form>
        </>
      ) : (
        <div className="empty-chat">
          <div className="empty-chat-content">
            <div className="empty-chat-icon">💬</div>
            <h2>Welcome to {project?.title || 'ZeroCode'}</h2>
            <p>Start a new chat to get help with your project.</p>
            <button className="new-chat-button">Start New Chat</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;