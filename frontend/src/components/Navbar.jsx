function Navbar({ currentPage, onNavigate, user, onLogout }) {
  const links = [
    { label: 'Home', page: 'home' },
    { label: 'Live Tracking', page: 'tracking' },
    { label: 'Routes', page: 'routes' },
  ]

  return (
    <header className="navbar">
      <button className="brand" type="button" onClick={() => onNavigate('home')}>
        <span className="brand-mark">EB</span>
        <span>EasyBus</span>
      </button>

      <nav className="nav-links" aria-label="Main navigation">
        {links.map((link) => (
          <button
            className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
            key={link.page}
            type="button"
            onClick={() => onNavigate(link.page)}
          >
            {link.label}
          </button>
        ))}
      </nav>

      <div className="nav-auth-section">
        {user ? (
          <div className="user-profile-badge">
            <span className="user-name">Hi, {user.name}</span>
            <span className={`role-chip role-${user.role}`}>{user.role}</span>
            <button
              type="button"
              className="button button-secondary logout-btn"
              onClick={onLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="auth-nav-buttons">
            <button
              type="button"
              className={`nav-link ${currentPage === 'login' ? 'active' : ''}`}
              onClick={() => onNavigate('login')}
            >
              Log In
            </button>
            <button
              type="button"
              className="button button-primary signup-nav-btn"
              onClick={() => onNavigate('register')}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
