# Frontend Setup Guide

## Prerequisites
- Node.js v14 or higher
- npm or yarn
- Backend server running on http://localhost:5000

## Installation Steps

### 1. Navigate to Client Directory
\`\`\`bash
cd client
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Start Development Server
\`\`\`bash
npm run dev
\`\`\`

The application will open at \`http://localhost:5173\`

## Build for Production

\`\`\`bash
npm run build
\`\`\`

This creates an optimized build in the \`dist\` folder.

## Preview Production Build

\`\`\`bash
npm run preview
\`\`\`

## Configuration

### API URL
The app connects to the backend at \`http://localhost:5000/api\`

To change the API URL, edit the \`API_URL\` variable in \`src/App.tsx\`:
\`\`\`tsx
const API_URL = "http://your-backend-url/api"
\`\`\`

## Project Structure

\`\`\`
client/
├── src/
│   ├── App.tsx                 # Main app component
│   ├── App.css                 # Global styles
│   ├── main.tsx               # Entry point
│   └── components/
│       ├── TaskForm.tsx       # Create task form
│       ├── TaskForm.css
│       ├── TaskList.tsx       # Task list container
│       ├── TaskList.css
│       ├── TaskCard.tsx       # Individual task card
│       ├── TaskCard.css
│       ├── FilterBar.tsx      # Filtering/sorting
│       └── FilterBar.css
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
\`\`\`

## Features

### Components

**App.tsx**
- Main application component
- State management for tasks
- API integration
- Dark mode toggle

**TaskForm.tsx**
- Create new tasks
- Form validation
- Success/error messages
- Character counter for title

**TaskList.tsx**
- Container for task cards
- Responsive grid layout
- Empty state handling

**TaskCard.tsx**
- Individual task display
- Status transitions
- Delete functionality
- Priority indicators
- Due date display

**FilterBar.tsx**
- Filter by status
- Filter by priority
- Sort options
- Reset filters

### Styling

The app uses CSS variables for theming:
\`\`\`css
--primary-color: #3b82f6
--secondary-color: #10b981
--danger-color: #ef4444
--background: #ffffff
--text-primary: #1f2937
--border: #e5e7eb
\`\`\`

Dark mode automatically swaps these values.

## Troubleshooting

### Connection Refused Error
- Ensure backend is running: \`npm run dev\` in root directory
- Check if port 5000 is in use
- Verify MongoDB is running

### CORS Error
- Backend should have CORS enabled
- Check allowed origins in server.js

### API Calls Failing
- Check browser DevTools console
- Verify API endpoint URLs
- Ensure backend is responding

### Styling Issues
- Clear cache: \`npm cache clean --force\`
- Delete node_modules and reinstall
- Check CSS variable definitions

## Tips

- Use React DevTools extension for debugging
- Check network tab for API responses
- Test in dark mode for accessibility
- Use lighthouse for performance testing

## Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run preview\` - Preview production build

## Next Steps

1. Start the backend server
2. Run \`npm run dev\`
3. Open http://localhost:5173
4. Create tasks and test functionality
