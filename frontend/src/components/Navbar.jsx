function Navbar({ currentPage, onNavigate }) {
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
    </header>
  )
}

export default Navbar
