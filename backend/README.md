# Backend API Server

Express.js + MongoDB backend for Task Management Application.

## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file in the `backend/` folder:
   ```
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   PORT=5000
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

## API Endpoints

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks (with filters, search, pagination)
- `GET /api/tasks/:id` - Get a single task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Environment Variables

- `MONGODB_URI` - MongoDB connection string
- `PORT` - Server port (default: 5000)

