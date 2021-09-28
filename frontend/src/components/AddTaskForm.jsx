import { useState } from 'react'

export default function AddTaskForm({ onAdd }) {
  const [title, setTitle] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    await onAdd(title)
    setTitle('')
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <input
        type="text"
        placeholder="What needs doing?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}
