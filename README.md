# Full-Stack Task Management Application

A complete full-stack application for managing tasks with a React frontend and Express/MongoDB backend.

## Features Implemented

### Core Requirements
✅ RESTful API with CRUD operations
✅ Task management with status tracking (pending → in-progress → completed)
✅ Priority levels (low, medium, high)
✅ Due date tracking
✅ Responsive mobile-friendly UI
✅ Input validation (max 100 characters for title)
✅ Error handling (404s, validation messages)
✅ Loading states during API calls
✅ Delete confirmation dialog

### Stretch Goals
✅ Filtering by status and priority
✅ Sorting by creation date and status
✅ Dark mode toggle
✅ Overdue task indicators
✅ Status transitions with visual feedback

## Project Structure

\`\`\`
task-management-app/
├── server.js              # Express backend
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── BACKEND_SETUP.md       # Backend setup guide
├── FRONTEND_SETUP.md      # Frontend setup guide
└── client/
    ├── src/
    │   ├── App.tsx        # Main app component
    │   ├── App.css        # Global styles
    │   ├── main.tsx       # React entry point
    │   └── components/
    │       ├── TaskForm.tsx       # Create task form
    │       ├── TaskForm.css
    │       ├── TaskList.tsx       # Task list container
    │       ├── TaskList.css
    │       ├── TaskCard.tsx       # Individual task card
    │       ├── TaskCard.css
    │       ├── FilterBar.tsx      # Filtering controls
    │       └── FilterBar.css
    ├── index.html
    ├── package.json
    └── vite.config.ts
\`\`\`

## Quick Start

### Prerequisites
- Node.js v14 or higher
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configure environment:**
   Create `.env` file:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   PORT=5000
   \`\`\`

3. **Start server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   Server runs on http://localhost:5000

### Frontend Setup

1. **Install dependencies:**
   \`\`\`bash
   cd client
   npm install
   \`\`\`

2. **Start development server:**
   \`\`\`bash
   npm run dev
   \`\`\`
   App runs on http://localhost:5173

3. **Build for production:**
   \`\`\`bash
   npm run build
   \`\`\`

## API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tasks` | Create a new task |
| GET | `/api/tasks` | Get all tasks (with filtering/sorting) |
| GET | `/api/tasks/:id` | Get a single task |
| PATCH | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Query Parameters

- `status`: Filter by status (pending, in-progress, completed)
- `priority`: Filter by priority (low, medium, high)
- `sort`: Sort by field (date, status)

### Example Requests

**Create Task:**
\`\`\`bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the assignment",
    "priority": "high",
    "dueDate": "2024-12-31"
  }'
\`\`\`

**Get Tasks with Filters:**
\`\`\`bash
curl "http://localhost:5000/api/tasks?status=pending&priority=high&sort=date"
\`\`\`

**Update Task:**
\`\`\`bash
curl -X PATCH http://localhost:5000/api/tasks/TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
\`\`\`

**Delete Task:**
\`\`\`bash
curl -X DELETE http://localhost:5000/api/tasks/TASK_ID
\`\`\`

## Task Model

\`\`\`json
{
  "_id": "ObjectId",
  "title": "string (required, max 100 chars)",
  "description": "string",
  "status": "pending | in-progress | completed",
  "priority": "low | medium | high",
  "dueDate": "Date | null",
  "createdAt": "Date",
  "updatedAt": "Date"
}
\`\`\`

## Frontend Features

### Task List View
- Display all tasks in a responsive grid
- Visual status indicators
- Priority badges with color coding
- Overdue task warnings
- Hover effects

### Create Task Form
- Input validation
- Real-time character counter
- Success/error messages
- Priority and due date selection
- Clear form after submission

### Filtering & Sorting
- Filter by status (all/pending/in-progress/completed)
- Filter by priority (all/low/medium/high)
- Sort by creation date or status
- Reset filters button

### Task Actions
- Status transitions: pending → in-progress → completed → pending
- Delete with confirmation
- Disabled states during API calls
- Visual feedback

### Styling
- Responsive design (mobile-first)
- Dark mode toggle
- Color-coded status indicators
- Smooth transitions and animations
- Accessibility features

## Technologies Used

### Backend
- **Framework**: Express.js
- **Database**: MongoDB
- **Validation**: Built-in validation
- **CORS**: Enabled for frontend communication

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: CSS3 with CSS variables

## Validation & Error Handling

### Backend Validation
- Title required and max 100 characters
- Valid status values
- Proper HTTP status codes
- Clear error messages

### Frontend Validation
- Form validation before submission
- Character count display
- Loading states
- Error/success messages
- Confirmation dialogs for destructive actions

## Deployment

### Backend Deployment (Vercel, Render, etc.)
1. Set environment variables
2. Deploy using git or CLI
3. Update CORS origins if needed

### Frontend Deployment (Vercel, Netlify, etc.)
1. Build the project: `npm run build`
2. Deploy the `dist` folder
3. Update API URL in production

## Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- Use MongoDB Compass to view database
- Test API endpoints with Postman or curl
- Enable dark mode for testing

## Future Enhancements

- User authentication
- Real-time updates with WebSockets
- Task categories/tags
- Recurring tasks
- Notifications
- Export/import functionality
- Collaboration features

## Support

For issues or questions, refer to the individual setup guides:
- [Backend Setup Guide](BACKEND_SETUP.md)
- [Frontend Setup Guide](FRONTEND_SETUP.md)

## License

MIT License
