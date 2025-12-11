"use client"
import "./TaskCard.css"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string | null
  createdAt: string
}

interface TaskCardProps {
  task: Task
  onUpdateStatus: (id: string, status: string) => void
  onDeleteTask: (id: string) => void
  disabled: boolean
}

export default function TaskCard({ task, onUpdateStatus, onDeleteTask, disabled }: TaskCardProps) {
  const getNextStatus = (currentStatus: string) => {
    const statuses = ["pending", "in-progress", "completed"]
    const currentIndex = statuses.indexOf(currentStatus)
    return statuses[(currentIndex + 1) % statuses.length]
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed"

  return (
    <div className={`task-card task-${task.status} priority-${task.priority}`}>
      <div className="task-header">
        <h3>{task.title}</h3>
        <div className="task-badges">
          <span className={`badge priority-badge priority-${task.priority}`}>{task.priority.toUpperCase()}</span>
          <span className={`badge status-badge status-${task.status}`}>
            {task.status.replace("-", " ").toUpperCase()}
          </span>
        </div>
      </div>

      {task.description && <p className="task-description">{task.description}</p>}

      <div className="task-meta">
        <span className="meta-item">Created: {formatDate(task.createdAt)}</span>
        {task.dueDate && (
          <span className={`meta-item ${isOverdue ? "overdue" : ""}`}>
            Due: {formatDate(task.dueDate)} {isOverdue && "(Overdue)"}
          </span>
        )}
      </div>

      <div className="task-actions">
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => onUpdateStatus(task._id, getNextStatus(task.status))}
          disabled={disabled}
          title={`Change to ${getNextStatus(task.status)}`}
        >
          {task.status === "pending" && "Start"}
          {task.status === "in-progress" && "Complete"}
          {task.status === "completed" && "Reopen"}
        </button>

        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDeleteTask(task._id)}
          disabled={disabled}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  )
}
