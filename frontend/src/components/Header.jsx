import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="header">
      <span>
        Hi, <strong>{user.username}</strong>
      </span>
      <button onClick={logout} className="logout-btn">
        Log out
      </button>
    </header>
  )
}
