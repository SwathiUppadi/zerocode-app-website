# ZeroCode App

A zero-code web application platform that allows users to create, manage, and deploy web applications without writing code.

## Features

- **Dashboard Overview**: View all your projects in one place
- **Project Management**: Create, edit, delete, archive, and duplicate projects
- **Project Preview**: View projects in different device modes (desktop, tablet, mobile)
- **Project Templates**: Start with pre-designed templates for common web applications
- **Chat Interface**: Get assistance with your projects through chat
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between dark and light themes
- **Filtering & Sorting**: Easily find and organize your projects
- **Search Functionality**: Quickly search through your projects

## Project Structure

```
ZeroCode App/
├── public/                # Static assets and HTML
│   ├── index.html        # Main HTML file
│   ├── favicon.ico       # App favicon
│   ├── manifest.json     # Web app manifest
│   └── ...
├── src/                   # Source code
│   ├── components/        # React components
│   │   ├── Dashboard.js   # Main dashboard component
│   │   ├── Header.js      # App header with navigation
│   │   ├── Modal.js       # Reusable modal component
│   │   ├── Notification.js # Notification system
│   │   ├── ProjectCard.js  # Project card component
│   │   ├── ProjectEditor.js # Project editing component
│   │   ├── ProjectPreview.js # Project preview component
│   │   ├── Templates.js    # Project templates component
│   │   ├── ChatInterface.js # Chat assistance interface
│   │   ├── Sidebar.js     # Left sidebar navigation
│   │   └── ThemeSwitcher.js # Dark/light mode toggle
│   ├── styles/            # CSS styles
│   │   ├── App.css        # Main app styles
│   │   ├── Dashboard.css  # Dashboard specific styles
│   │   └── ...
│   ├── data/              # Data files
│   │   └── templates.js   # Project templates data
│   ├── assets/            # Asset files
│   │   └── images/        # Image files including logo
│   ├── App.js             # Main App component
│   └── index.js           # React entry point
└── package.json           # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ZeroCode\ App
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Usage

### Creating a Project

1. Click the "+ New Project" button in the header or the "Create New Project" card on the dashboard.
2. Fill in the project details: title, description, category, and progress.
3. Click "Create Project" to create your new project.

### Using Project Templates

1. Click on "Templates" in the navigation bar.
2. Browse available templates and click on one to preview it.
3. Click "Use Template" to create a new project based on the selected template.
4. Customize the template as needed and click "Create from Template".

### Previewing a Project

1. Click the "Preview" button on a project card or select "Preview" from the project menu (three dots).
2. In the preview mode, you can view how your project would look on different devices (desktop, tablet, mobile).
3. Use the zoom controls to adjust the preview size.
4. Click "Edit Project" to make changes or "Close Preview" to return to the dashboard.

### Project Chat Assistance

1. Click on a chat in the sidebar or create a new chat for a project.
2. Ask questions or request assistance with your project.
3. Receive real-time assistance through the chat interface.

## Deployment

To deploy the application to GitHub Pages:

```bash
npm run deploy
# or
yarn deploy
```

## Future Enhancements

- **Drag-and-Drop Builder**: Visual interface for designing web pages
- **Component Library**: Reusable UI components for project building
- **Collaboration Features**: Share and work on projects with team members
- **Analytics Dashboard**: Track usage and performance metrics
- **Export to Code**: Generate code from your no-code projects

## License

This project is licensed under the MIT License - see the LICENSE file for details.