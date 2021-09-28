const FEATURES = [
  {
    icon: '✅',
    color: 'var(--feature-1)',
    title: 'Stay organized',
    description: 'Capture tasks the moment they come to mind and check them off as you go.',
  },
  {
    icon: '🔒',
    color: 'var(--feature-2)',
    title: 'Your tasks, your account',
    description: 'Every task is tied to your login, so your list is private to you.',
  },
  {
    icon: '⚡',
    color: 'var(--feature-3)',
    title: 'Simple by design',
    description: 'No clutter, no setup — just a fast list that gets out of your way.',
  },
]

export default function LandingPage({ onLogin, onSignup }) {
  return (
    <div className="landing">
      <nav className="landing-nav">
        <span className="brand">
          <span className="brand-badge">T</span>
          Todo
        </span>
        <div className="landing-nav-actions">
          <button type="button" className="btn-ghost" onClick={onLogin}>
            Log in
          </button>
          <button type="button" className="btn-primary" onClick={onSignup}>
            Sign up
          </button>
        </div>
      </nav>

      <header className="landing-hero">
        <div className="hero-blob hero-blob-1" aria-hidden="true" />
        <div className="hero-blob hero-blob-2" aria-hidden="true" />
        <div className="hero-blob hero-blob-3" aria-hidden="true" />
        <div className="hero-content">
          <h1>A todo list that stays out of your way</h1>
          <p>
            Create an account, add your tasks, and check them off. Nothing more to it.
          </p>
          <div className="landing-hero-actions">
            <button type="button" className="btn-primary btn-large" onClick={onSignup}>
              Get started — it's free
            </button>
            <button type="button" className="btn-ghost btn-large" onClick={onLogin}>
              I already have an account
            </button>
          </div>
        </div>
      </header>

      <section className="landing-features">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="feature-card">
            <div className="feature-icon" style={{ background: feature.color }}>
              {feature.icon}
            </div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </section>

      <footer className="landing-footer">
        <p>Built as a simple full-stack test project — FastAPI + React.</p>
      </footer>
    </div>
  )
}
