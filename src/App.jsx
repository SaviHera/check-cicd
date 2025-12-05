import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [apiStatus, setApiStatus] = useState({ loading: true, data: null, error: null })
  const [users, setUsers] = useState({ loading: false, data: null, error: null })

  // Check API health on load
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setApiStatus({ loading: false, data, error: null }))
      .catch(err => setApiStatus({ loading: false, data: null, error: err.message }))
  }, [])

  // Fetch users from API
  const fetchUsers = async () => {
    setUsers({ loading: true, data: null, error: null })
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers({ loading: false, data: data.data, error: null })
    } catch (err) {
      setUsers({ loading: false, data: null, error: err.message })
    }
  }

  return (
    <div className="app">
      <div className="container">
        <div className="hero">
          <div className="logo-stack">
            <span className="logo react">⚛️</span>
            <span className="plus">+</span>
            <span className="logo firebase">🔥</span>
            <span className="plus">+</span>
            <span className="logo github">⚙️</span>
          </div>
          <h1>Full-Stack CI/CD Pipeline!</h1>
          <p className="subtitle">React + Firebase Functions + GitHub Actions</p>
        </div>

        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            Clicks: {count}
          </button>
          <p className="hint">Click to test interactivity</p>
        </div>

        <div className="status-grid">
          <div className="status-card">
            <div className="status-icon">✅</div>
            <h3>Frontend</h3>
            <p>Vite + React</p>
          </div>
          <div className="status-card">
            <div className="status-icon">🚀</div>
            <h3>Hosting</h3>
            <p>Firebase Hosting</p>
          </div>
          <div className="status-card">
            <div className="status-icon">⚡</div>
            <h3>Backend</h3>
            <p>Firebase $$$$$ $$$$ Functions</p>
          </div>
          <div className="status-card">
            <div className="status-icon">🔄</div>
            <h3>CI/CD</h3>
            <p>GitHub Actions</p>
          </div>
        </div>

        {/* API Status Section */}
        <div className="api-section">
          <h2>🔌 Backend API Status</h2>
          <div className="api-status-card">
            {apiStatus.loading && <p>⏳ Checking API...</p>}
            {apiStatus.error && <p className="error">❌ API Error: {apiStatus.error}</p>}
            {apiStatus.data && (
              <div className="api-response">
                <p className="success">✅ {apiStatus.data.message}</p>
                <p className="timestamp">Last checked: {apiStatus.data.timestamp}</p>
              </div>
            )}
          </div>
        </div>

        {/* Fetch Users Section */}
        <div className="api-section">
          <h2>👥 Test API Endpoint</h2>
          <button className="api-button" onClick={fetchUsers} disabled={users.loading}>
            {users.loading ? '⏳ Loading...' : '📡 Fetch Users from API'}
          </button>
          
          {users.error && <p className="error">❌ Error: {users.error}</p>}
          
          {users.data && (
            <div className="users-list">
              {users.data.map(user => (
                <div key={user.id} className="user-card">
                  <span className="user-avatar">👤</span>
                  <div className="user-info">
                    <strong>{user.name}</strong>
                    <span>{user.email}</span>
                    <span className="user-role">{user.role}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <footer>
          <p>Push to <code>main</code> branch to deploy frontend + backend</p>
          <p className="api-endpoints">
            API Endpoints: <code>/api/health</code> | <code>/api/users</code> | <code>/api/info</code>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
