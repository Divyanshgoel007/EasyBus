import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LiveTracking from './pages/LiveTracking'
import Routes from './pages/Routes'
import BusDetails from './pages/BusDetails'
import Login from './pages/Login'
import Register from './pages/Register'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  function handleLoginSuccess(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setCurrentPage('home');
  }


  function navigate(page, route = null) {
    setCurrentPage(page)
    setSelectedRoute(route)
  }

  function renderPage() {
    if (currentPage === 'tracking') return <LiveTracking selectedRoute={selectedRoute} onNavigate={navigate} />
    if (currentPage === 'routes') return <Routes onNavigate={navigate} />
    if (currentPage === 'bus-details') return <BusDetails onNavigate={navigate} />
    if (currentPage === 'login') return <Login onNavigate={navigate} onLoginSuccess={handleLoginSuccess} />
    if (currentPage === 'register') return <Register onNavigate={navigate} />
    return <Home onNavigate={navigate} user={user} />
  }

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={navigate} user={user} onLogout={handleLogout} />
      {renderPage()}
      <footer className="footer">EasyBus <span>Simple travel starts here.</span></footer>
    </div>
  )
}

export default App
