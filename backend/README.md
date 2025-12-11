# Backend API Server

Express.js + MongoDB backend for Task Management Application.

## Project Structure

The backend follows a modular, professional architecture:

```
backend/
├── config/
│   └── database.js          # MongoDB connection configuration
├── controllers/
│   └── taskController.js     # Business logic handlers
├── middleware/
│   ├── checkMongoConnection.js  # Database connection check
│   ├── errorHandler.js      # Global error handling
│   └── validators.js        # Request validation
├── models/
│   └── Task.js              # Mongoose schema and model
├── routes/
│   └── taskRoutes.js        # Route definitions
├── utils/
│   └── constants.js         # Application constants
├── __tests__/
│   └── api/                 # Unit tests
├── server.js                # Main entry point
└── package.json
```

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
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development with auto-reload:
   npm run dev
   ```

## API Endpoints

- `GET /health` - Health check endpoint
- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks (with filters, search, pagination)
- `GET /api/tasks/:id` - Get a single task
- `PATCH /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

### Query Parameters (GET /api/tasks)

- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search tasks by title (case-insensitive)
- `sort` - Sort by (date, status)
- `page` - Page number for pagination
- `limit` - Items per page (default: 6, max: 100)

## Architecture

### Models (`models/`)
- Define Mongoose schemas and models
- Handle data validation at the schema level
- Include pre/post hooks for data transformation

### Controllers (`controllers/`)
- Contain business logic
- Handle request/response
- Call models to interact with database
- Use `next()` to pass errors to error handler

### Routes (`routes/`)
- Define API endpoints
- Apply middleware (validation, authentication, etc.)
- Map routes to controller functions

### Middleware (`middleware/`)
- **checkMongoConnection**: Ensures database is connected before processing requests
- **validators**: Validates request data before reaching controllers
- **errorHandler**: Centralized error handling

### Config (`config/`)
- Database connection logic
- Environment configuration
- Connection state management

### Utils (`utils/`)
- Constants and enums
- Helper functions
- Shared utilities

## Environment Variables

- `MONGODB_URI` - MongoDB connection string (default: mongodb://localhost:27017/taskmanagement)
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development, production)

## Testing

Run tests:
```bash
npm test              # Run all tests
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

## Features

- ✅ Modular architecture (MVC pattern)
- ✅ Centralized error handling
- ✅ Request validation middleware
- ✅ Database connection monitoring
- ✅ Health check endpoint
- ✅ Graceful shutdown handling
- ✅ Environment-based configuration
- ✅ Comprehensive unit tests

