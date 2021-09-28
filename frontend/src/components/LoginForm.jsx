import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function LoginForm({ onSwitchToSignup }) {
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await login(username, password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Log in</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        autoComplete="username"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Log in</button>
      <p className="switch-link">
        No account?{' '}
        <button type="button" onClick={onSwitchToSignup}>
          Sign up
        </button>
      </p>
    </form>
  )
}
