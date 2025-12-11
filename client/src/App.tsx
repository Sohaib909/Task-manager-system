"use client"

import { useState, useEffect } from "react"
import TaskList from "./components/TaskList"
import TaskForm from "./components/TaskForm"
import FilterBar from "./components/FilterBar"
import "./App.css"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string | null
  createdAt: string
  updatedAt: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(false)
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [filterPriority, setFilterPriority] = useState<string>("")
  const [sortBy, setSortBy] = useState<string>("date")
  const [darkMode, setDarkMode] = useState(false)

  const API_URL = "http://localhost:5000/api"

  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (filterStatus) params.append("status", filterStatus)
      if (filterPriority) params.append("priority", filterPriority)
      if (sortBy) params.append("sort", sortBy)

      const response = await fetch(`${API_URL}/tasks?${params}`)
      const data = await response.json()
      setTasks(data)
    } catch (error) {
      console.error("Error fetching tasks:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch tasks on mount and when filters change
  useEffect(() => {
    fetchTasks()
  }, [filterStatus, filterPriority, sortBy])

  // Add task
  const handleAddTask = async (taskData: { title: string; description: string; priority: string; dueDate: string }) => {
    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })

      if (response.ok) {
        const newTask = await response.json()
        setTasks([newTask, ...tasks])
      } else {
        const error = await response.json()
        alert(`Error: ${error.error}`)
      }
    } catch (error) {
      console.error("Error adding task:", error)
    }
  }

  // Update task status
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const updatedTask = await response.json()
        setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)))
      }
    } catch (error) {
      console.error("Error updating task:", error)
    }
  }

  // Delete task
  const handleDeleteTask = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this task?")) {
      return
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setTasks(tasks.filter((task) => task._id !== id))
      }
    } catch (error) {
      console.error("Error deleting task:", error)
    }
  }

  return (
    <div className={`app ${darkMode ? "dark-mode" : ""}`}>
      <header className="app-header">
        <div className="header-content">
          <h1>Task Manager</h1>
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </header>

      <main className="app-main">
        <section className="form-section">
          <TaskForm onAddTask={handleAddTask} loading={loading} />
        </section>

        <section className="filter-section">
          <FilterBar
            filterStatus={filterStatus}
            filterPriority={filterPriority}
            sortBy={sortBy}
            onStatusChange={setFilterStatus}
            onPriorityChange={setFilterPriority}
            onSortChange={setSortBy}
          />
        </section>

        <section className="tasks-section">
          {loading ? (
            <div className="loading-spinner">
              <div className="spinner"></div>
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <p>No tasks found. Create one to get started!</p>
            </div>
          ) : (
            <TaskList
              tasks={tasks}
              onUpdateStatus={handleUpdateStatus}
              onDeleteTask={handleDeleteTask}
              loading={loading}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
