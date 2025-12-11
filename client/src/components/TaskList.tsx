import TaskCard from "./TaskCard"
import "./TaskList.css"

interface Task {
  _id: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  dueDate: string | null
  createdAt: string
}

interface TaskListProps {
  tasks: Task[]
  onUpdateStatus: (id: string, status: string) => void
  onDeleteTask: (id: string) => void
  loading: boolean
}

export default function TaskList({ tasks, onUpdateStatus, onDeleteTask, loading }: TaskListProps) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onUpdateStatus={onUpdateStatus}
          onDeleteTask={onDeleteTask}
          disabled={loading}
        />
      ))}
    </div>
  )
}
