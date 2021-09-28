import { useEffect, useState } from 'react'
import './App.css'
import AddTaskForm from './components/AddTaskForm'
import AuthFlow from './components/AuthFlow'
import Header from './components/Header'
import TaskList from './components/TaskList'
import { useAuth } from './context/AuthContext'
import { tasksApi } from './api'

function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  const loadTasks = async () => {
    try {
      setTasks(await tasksApi.list())
    } catch (err) {
      setError(err.message)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const handleAdd = async (title) => {
    try {
      await tasksApi.create(title)
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleToggle = async (task) => {
    try {
      await tasksApi.update(task.id, { completed: !task.completed })
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await tasksApi.remove(id)
      loadTasks()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <Header />
      <h1>Todo List</h1>
      <AddTaskForm onAdd={handleAdd} />
      {error && <p className="error">{error}</p>}
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  )
}

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="app">Loading...</div>
  }

  return user ? <Dashboard /> : <AuthFlow />
}

export default App
