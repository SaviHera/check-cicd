import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
          <h1>CI/CD Pipeline Active!</h1>
          <p className="subtitle">React + Firebase Hosting + GitHub Actions</p>
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
            <h3>Build okok NOT OKOK</h3>
            <p>Vite + React</p>
          </div>
          <div className="status-card">
            <div className="status-icon">🚀</div>
            <h3>Deploy</h3>
            <p>Firebase Hosting</p>
          </div>
          <div className="status-card">
            <div className="status-icon">🔄</div>
            <h3>CI/CD</h3>
            <p>GitHub Actions</p>
          </div>
        </div>

        <footer>
          <p>Push to <code>main</code> branch to trigger deployment</p>
        </footer>
      </div>
    </div>
  )
}

export default App

