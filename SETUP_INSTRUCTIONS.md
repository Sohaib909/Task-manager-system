# Task Management Application - Complete Setup Guide

## Overview

This is a full-stack Task Management application with:
- **Backend**: Express.js + MongoDB (standalone server)
- **Frontend**: Next.js + React (integrated in this project)

## Project Structure

\`\`\`
task-management-app/
├── app/
│   ├── page.tsx           # Main Task Management interface
│   └── page.css           # Styling
├── server.js              # Express backend (run separately)
├── package.json           # All dependencies
├── .env.local             # Frontend environment variables
├── .env                   # Backend environment variables
└── README.md
\`\`\`

## Prerequisites

- **Node.js** v14 or higher
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

## Installation & Setup

### Step 1: Install All Dependencies

\`\`\`bash
npm install
\`\`\`

This installs all frontend (Next.js) and backend (Express) dependencies.

### Step 2: Configure Environment Variables

#### Backend Configuration (.env)
Create a \`.env\` file in the root directory:

\`\`\`
MONGODB_URI=mongodb://localhost:27017/taskmanagement
PORT=5000
\`\`\`

**For MongoDB Atlas (cloud):**
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
PORT=5000
\`\`\`

#### Frontend Configuration (.env.local)
Already configured to use \`http://localhost:5000/api\`

To use a different backend URL:
\`\`\`
NEXT_PUBLIC_API_URL=http://your-backend-url/api
\`\`\`

### Step 3: Start MongoDB (if using local)

\`\`\`bash
# On macOS with Homebrew
brew services start mongodb-community

# On Windows (if installed as a service)
net start MongoDB

# Or run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest
\`\`\`

### Step 4: Start the Backend Server

In a **new terminal window**:

\`\`\`bash
node server.js
\`\`\`

You should see:
\`\`\`
Server running on http://localhost:5000
MongoDB connected
\`\`\`

### Step 5: Start the Frontend (in original terminal)

\`\`\`bash
npm run dev
\`\`\`

The app will open at \`http://localhost:3000\`

## Features

### Core Requirements ✅
- RESTful API (POST, GET, PATCH, DELETE)
- Task CRUD operations
- Status transitions (pending → in-progress → completed)
- Priority levels (low, medium, high)
- Input validation (title required, max 100 chars)
- Error handling with proper HTTP codes
- Loading states during API calls
- Responsive design
- Delete confirmation

### Stretch Goals ✅
- Filtering by status and priority
- Sorting by date and status
- Dark mode toggle
- Overdue task indicators
- Priority color coding
- Due date tracking

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | \`/api/tasks\` | Create new task |
| GET | \`/api/tasks\` | Get all tasks (with filters) |
| GET | \`/api/tasks/:id\` | Get single task |
| PATCH | \`/api/tasks/:id\` | Update task |
| DELETE | \`/api/tasks/:id\` | Delete task |

## Testing the Application

### 1. Create a Task
- Fill in the form with title, description, priority, and optional due date
- Click "Create Task"
- Task appears at top of list

### 2. Filter Tasks
- Use status filter to show pending/in-progress/completed
- Use priority filter to show by importance
- Use sort dropdown to organize

### 3. Update Task Status
- Click "Start" to move pending → in-progress
- Click "Complete" to move in-progress → completed
- Click "Reopen" to move completed → pending

### 4. Delete Task
- Click "Delete" button
- Confirm in dialog
- Task removed from list

### 5. Toggle Dark Mode
- Click moon/sun icon in header
- UI switches between light and dark themes

## Troubleshooting

### Backend Connection Issues

**Error: "Failed to fetch tasks. Make sure backend is running"**

Solution:
1. Check if \`node server.js\` is running in another terminal
2. Verify port 5000 is not in use: \`lsof -i :5000\`
3. Check MongoDB connection string in \`.env\`
4. Ensure MongoDB is running

### MongoDB Connection Error

**Error: "MongoDB connection error"**

Solution:
1. Verify MongoDB is running
2. Check connection string format
3. If using MongoDB Atlas, whitelist your IP
4. Ensure username/password are correct

### Port Already in Use

**Error: "Address already in use"**

Solution:
\`\`\`bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 node server.js
\`\`\`

### CORS Error

**Error: "No 'Access-Control-Allow-Origin' header"**

Solution:
- Backend should have CORS enabled (already configured in server.js)
- Verify frontend API URL matches backend origin

## Development Tips

- Use browser DevTools to inspect network requests
- Check console for error messages
- Use MongoDB Compass to view database collections
- Test API endpoints with Postman or curl

## Deployment

### Frontend Deployment (Vercel, Netlify)

1. Build: \`npm run build\`
2. Deploy the frontend to Vercel/Netlify
3. Set \`NEXT_PUBLIC_API_URL\` environment variable to your backend URL

### Backend Deployment (Render, Railway, Heroku)

1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables (\`MONGODB_URI\`, \`PORT\`)
4. Deploy

## File Structure Explanation

- **app/page.tsx**: Main React component with all task management logic
- **app/page.css**: Styling for the task manager UI
- **server.js**: Express backend server handling API requests
- **package.json**: All npm dependencies for both frontend and backend
- **.env**: Backend configuration (MongoDB URI, port)
- **.env.local**: Frontend configuration (API URL)

## Next Steps

1. Run \`npm install\` to install dependencies
2. Configure \`.env\` with MongoDB URI
3. Start MongoDB
4. Run \`node server.js\` in one terminal
5. Run \`npm run dev\` in another terminal
6. Open http://localhost:3000 and start creating tasks!

## Support Resources

- MongoDB Documentation: https://docs.mongodb.com
- Express.js Documentation: https://expressjs.com
- Next.js Documentation: https://nextjs.org/docs
- API Testing: Postman (https://www.postman.com)
