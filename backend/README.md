# Backend API Server

Express.js + MongoDB REST API for Task Management Application.

## Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment:**
   Create a `.env` file:
   ```env
   MONGODB_URI=mongodb://localhost:27017/taskmanagement
   PORT=5000
   NODE_ENV=development
   ```

3. **Start the server:**
   ```bash
   npm start              # Production mode
   npm run dev            # Development mode with auto-reload
   ```

### Docker

```bash
# Build and run
docker build -t task-management-backend .
docker run -p 5000:5000 \
  -e MONGODB_URI=mongodb://host.docker.internal:27017/taskmanagement \
  task-management-backend
```

## API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks (with pagination, filters, search) |
| GET | `/tasks/:id` | Get a single task by ID |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update an existing task |
| DELETE | `/tasks/:id` | Delete a task |

### Query Parameters (GET /tasks)

- `page` (number, default: 1) - Page number
- `limit` (number, default: 10, max: 100) - Items per page
- `status` (string) - Filter by status: `pending`, `in-progress`, `completed`
- `priority` (string) - Filter by priority: `low`, `medium`, `high`
- `search` (string) - Search in title and description
- `sortBy` (string, default: `createdAt`) - Sort field
- `order` (string, default: `desc`) - Sort order: `asc` or `desc`

### Request/Response Examples

**Create Task (POST /tasks):**
```json
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-12-31T23:59:59.000Z"
}
```

**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive README and API docs",
  "status": "pending",
  "priority": "high",
  "dueDate": "2025-12-31T23:59:59.000Z",
  "createdAt": "2025-12-12T10:00:00.000Z",
  "updatedAt": "2025-12-12T10:00:00.000Z"
}
```

**Get Tasks (GET /tasks?status=pending&page=1&limit=10):**
```json
{
  "tasks": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "status": "pending",
      "priority": "high",
      ...
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 10,
    "pages": 5
  }
}
```

## Database Schema

```javascript
{
  title: String,        // Required, max 100 characters
  description: String,  // Optional, trimmed
  status: String,       // Enum: 'pending', 'in-progress', 'completed'
  priority: String,     // Enum: 'low', 'medium', 'high'
  dueDate: Date,        // Optional
  createdAt: Date,      // Auto-generated
  updatedAt: Date       // Auto-updated on PATCH
}
```

## Testing

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Generate coverage report
```

Tests are located in `__tests__/api/tasks.test.js` and cover:
- Task creation with validation
- Task retrieval with pagination
- Task updates and deletions
- Error handling
- Edge cases

## Environment Variables

| Variable | Description | Default |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/taskmanagement` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

## Dependencies

**Production:**
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `cors` - CORS middleware
- `dotenv` - Environment variables

**Development:**
- `jest` - Testing framework
- `supertest` - HTTP testing

## Troubleshooting

### MongoDB Connection Failed

```bash
# Check if MongoDB is running
mongosh --eval "db.version()"

# Start MongoDB
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
# Windows: net start MongoDB
```

### Port Already in Use

```bash
# Change PORT in .env file or kill the process
lsof -ti:5000 | xargs kill -9  # macOS/Linux
```

## Project Structure

```
backend/
├── server.js           # Main application file
├── package.json        # Dependencies and scripts
├── Dockerfile          # Docker configuration
├── jest.config.js      # Jest configuration
├── jest.setup.js       # Jest setup
├── .env                # Environment variables (create this)
└── __tests__/
    └── api/
        └── tasks.test.js  # API tests
```

