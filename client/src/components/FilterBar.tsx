"use client"
import "./FilterBar.css"

interface FilterBarProps {
  filterStatus: string
  filterPriority: string
  sortBy: string
  onStatusChange: (status: string) => void
  onPriorityChange: (priority: string) => void
  onSortChange: (sort: string) => void
}

export default function FilterBar({
  filterStatus,
  filterPriority,
  sortBy,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="status-filter">Status:</label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="priority-filter">Priority:</label>
        <select
          id="priority-filter"
          value={filterPriority}
          onChange={(e) => onPriorityChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-filter">Sort By:</label>
        <select
          id="sort-filter"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="date">Creation Date</option>
          <option value="status">Status</option>
        </select>
      </div>

      <button
        className="btn btn-outline-sm"
        onClick={() => {
          onStatusChange("")
          onPriorityChange("")
          onSortChange("date")
        }}
      >
        Reset Filters
      </button>
    </div>
  )
}
