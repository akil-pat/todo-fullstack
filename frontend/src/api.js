const API_URL = 'http://localhost:8000'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error(body.detail || 'Request failed')
  }
  return res.status === 204 ? null : res.json()
}

export const authApi = {
  signup: (username, password) =>
    request('/auth/signup', { method: 'POST', body: JSON.stringify({ username, password }) }),
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  me: () => request('/auth/me'),
}

export const tasksApi = {
  list: () => request('/tasks'),
  create: (title) => request('/tasks', { method: 'POST', body: JSON.stringify({ title }) }),
  update: (id, update) =>
    request(`/tasks/${id}`, { method: 'PUT', body: JSON.stringify(update) }),
  remove: (id) => request(`/tasks/${id}`, { method: 'DELETE' }),
}
