import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/taskmanagement"

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => {
    console.log("✅ MongoDB connected successfully")
    console.log(`📊 Database: ${MONGODB_URI.split('/').pop()}`)
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message)
    console.error("\n💡 Troubleshooting steps:")
    console.error("   1. Make sure MongoDB is running locally")
    console.error("   2. Check if MongoDB service is started: net start MongoDB (Windows)")
    console.error("   3. Or use MongoDB Atlas (cloud) and update MONGODB_URI in .env")
    console.error("   4. Verify the connection string in your .env file")
    process.exit(1) // Exit if MongoDB connection fails
  })

// Handle connection events
mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected")
})

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB error:", err)
})

// Task Schema
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    maxlength: [100, "Title must not exceed 100 characters"],
    trim: true,
  },
  description: {
    type: String,
    default: "",
    trim: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "completed"],
      message: "Status must be one of: pending, in-progress, or completed",
    },
    default: "pending",
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium",
  },
  dueDate: {
    type: Date,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Task = mongoose.model("Task", taskSchema)

// Helper function to check MongoDB connection
const checkMongoConnection = (req, res, next) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      error: "Database not connected. Please check MongoDB connection.",
      details: "MongoDB connection state: " + 
        (mongoose.connection.readyState === 0 ? "disconnected" :
         mongoose.connection.readyState === 2 ? "connecting" :
         mongoose.connection.readyState === 3 ? "disconnecting" : "unknown")
    })
  }
  next()
}

// Routes
// Create a new task
app.post("/api/tasks", checkMongoConnection, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" })
    }
    if (title.length > 100) {
      return res.status(400).json({ error: "Title must not exceed 100 characters" })
    }

    // Validate status if provided
    if (status && !["pending", "in-progress", "completed"].includes(status)) {
      return res.status(400).json({ error: "Status must be one of: pending, in-progress, or completed" })
    }

    const task = new Task({
      title,
      description: description || "",
      status: status || "pending",
      priority: priority || "medium",
      dueDate: dueDate || null,
    })

    const savedTask = await task.save()
    res.status(201).json(savedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get all tasks with optional filtering and pagination
app.get("/api/tasks", checkMongoConnection, async (req, res) => {
  try {
    const { status, priority, sort, page, limit, search } = req.query
    const filter = {}

    if (status) {
      filter.status = status
    }
    if (priority) {
      filter.priority = priority
    }
    // Search by title (case-insensitive partial match)
    if (search && search.trim() !== "") {
      filter.title = { $regex: search.trim(), $options: "i" }
    }

    // Check if pagination is requested - if page or limit are in query params, use pagination
    const hasPagination = 'page' in req.query || 'limit' in req.query

    let query = Task.find(filter)

    // Sorting
    if (sort === "date") {
      query = query.sort({ createdAt: -1 })
    } else if (sort === "status") {
      query = query.sort({ status: 1 })
    } else {
      query = query.sort({ createdAt: -1 })
    }

    // If pagination is requested, apply it
    if (hasPagination) {
      const pageNum = Math.max(1, parseInt(String(page || '1'), 10))
      const limitNum = Math.max(1, parseInt(String(limit || '6'), 10))
      const skip = (pageNum - 1) * limitNum

      // Get total count for pagination (before applying skip/limit)
      const totalTasks = await Task.countDocuments(filter)
      const totalPages = Math.ceil(totalTasks / limitNum)

      // Apply pagination
      query = query.skip(skip).limit(limitNum)

      const tasks = await query

      console.log(`Pagination: Page ${pageNum}, Limit ${limitNum}, Total: ${totalTasks}, Pages: ${totalPages}, Tasks returned: ${tasks.length}`)

      // Return tasks with pagination metadata
      res.json({
        tasks,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalTasks,
          limit: limitNum,
          hasNextPage: pageNum < totalPages,
          hasPrevPage: pageNum > 1,
        },
      })
    } else {
      // Backward compatibility: return array if no pagination requested
      const tasks = await query
      res.json(tasks)
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get single task
app.get("/api/tasks/:id", checkMongoConnection, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.json(task)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Update task
app.patch("/api/tasks/:id", checkMongoConnection, async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body

    // Validation
    if (title !== undefined) {
      if (title.trim() === "") {
        return res.status(400).json({ error: "Title cannot be empty" })
      }
      if (title.length > 100) {
        return res.status(400).json({ error: "Title must not exceed 100 characters" })
      }
    }

    if (status !== undefined) {
      const validStatuses = ["pending", "in-progress", "completed"]
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: "Invalid status value" })
      }
    }

    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    // Update fields
    if (title !== undefined) task.title = title
    if (description !== undefined) task.description = description
    if (status !== undefined) task.status = status
    if (priority !== undefined) task.priority = priority
    if (dueDate !== undefined) task.dueDate = dueDate
    task.updatedAt = Date.now()

    const updatedTask = await task.save()
    res.json(updatedTask)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Delete task
app.delete("/api/tasks/:id", checkMongoConnection, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }

    await Task.findByIdAndDelete(req.params.id)
    res.json({ message: "Task deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: "Internal server error" })
})

const PORT = parseInt(process.env.PORT, 10) || 5000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

