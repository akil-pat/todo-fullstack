import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function SignupForm({ onSwitchToLogin }) {
  const { signup } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await signup(username, password)
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
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
        autoComplete="new-password"
      />
      {error && <p className="error">{error}</p>}
      <button type="submit">Sign up</button>
      <p className="switch-link">
        Already have an account?{' '}
        <button type="button" onClick={onSwitchToLogin}>
          Log in
        </button>
      </p>
    </form>
  )
}
