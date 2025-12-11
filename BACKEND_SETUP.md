# Backend Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation Steps

### 1. Install Dependencies
\`\`\`bash
npm install
\`\`\`

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
\`\`\`
MONGODB_URI=mongodb://localhost:27017/taskmanagement
PORT=5000
\`\`\`

For MongoDB Atlas:
\`\`\`
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanagement
PORT=5000
\`\`\`

### 3. Start the Server

**Development Mode (with auto-reload):**
\`\`\`bash
npm run dev
\`\`\`

**Production Mode:**
\`\`\`bash
npm start
\`\`\`

The server will run on http://localhost:5000

## API Endpoints

### Create Task
\`\`\`
POST /api/tasks
Content-Type: application/json

{
  "title": "Complete project",
  "description": "Finish the full-stack assignment",
  "priority": "high",
  "dueDate": "2024-12-31"
}
\`\`\`

### Get All Tasks
\`\`\`
GET /api/tasks
GET /api/tasks?status=pending
GET /api/tasks?priority=high
GET /api/tasks?sort=date
\`\`\`

### Get Single Task
\`\`\`
GET /api/tasks/:id
\`\`\`

### Update Task
\`\`\`
PATCH /api/tasks/:id
Content-Type: application/json

{
  "status": "in-progress",
  "title": "Updated title"
}
\`\`\`

### Delete Task
\`\`\`
DELETE /api/tasks/:id
\`\`\`

## Database Setup
MongoDB will create the database and collections automatically when you first POST a task.

For local MongoDB:
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Run the server

For MongoDB Atlas:
1. Create a free account at mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string and update .env
\`\`\`
