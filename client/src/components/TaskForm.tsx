"use client"

import type React from "react"
import { useState } from "react"
import "./TaskForm.css"

interface TaskFormProps {
  onAddTask: (task: { title: string; description: string; priority: string; dueDate: string }) => void
  loading: boolean
}

export default function TaskForm({ onAddTask, loading }: TaskFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [priority, setPriority] = useState("medium")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validation
    if (!title.trim()) {
      setError("Title is required")
      return
    }
    if (title.length > 100) {
      setError("Title must not exceed 100 characters")
      return
    }

    onAddTask({ title, description, priority, dueDate })
    setTitle("")
    setDescription("")
    setPriority("medium")
    setDueDate("")
    setSuccess("Task created successfully!")
    setTimeout(() => setSuccess(""), 3000)
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Create New Task</h2>

      {error && <div className="form-error">{error}</div>}
      {success && <div className="form-success">{success}</div>}

      <div className="form-group">
        <label htmlFor="title">Task Title *</label>
        <input
          id="title"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          disabled={loading}
          className="form-input"
        />
        <small>{title.length}/100</small>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
          className="form-input form-textarea"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            disabled={loading}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="date"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            disabled={loading}
            className="form-input"
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? "Creating..." : "Create Task"}
      </button>
    </form>
  )
}
