export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <li className={task.completed ? 'completed' : ''}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task)}
        />
        {task.title}
      </label>
      <button onClick={() => onDelete(task.id)} className="delete-btn">
        ✕
      </button>
    </li>
  )
}
