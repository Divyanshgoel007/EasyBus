import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LiveTracking from './pages/LiveTracking'
import Routes from './pages/Routes'
import BusDetails from './pages/BusDetails'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [selectedRoute, setSelectedRoute] = useState(null)

  function navigate(page, route = null) {
    setCurrentPage(page)
    setSelectedRoute(route)
  }

  function renderPage() {
    if (currentPage === 'tracking') return <LiveTracking selectedRoute={selectedRoute} onNavigate={navigate} />
    if (currentPage === 'routes') return <Routes onNavigate={navigate} />
    if (currentPage === 'bus-details') return <BusDetails onNavigate={navigate} />
    return <Home onNavigate={navigate} />
  }

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={navigate} />
      {renderPage()}
      <footer className="footer">EasyBus <span>Simple travel starts here.</span></footer>
    </div>
  )
}

export default App
