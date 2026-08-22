import { useState } from 'react'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import LiveTracking from './pages/LiveTracking'
import Routes from './pages/Routes'
import BusDetails from './pages/BusDetails'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  function renderPage() {
    if (currentPage === 'tracking') return <LiveTracking onNavigate={setCurrentPage} />
    if (currentPage === 'routes') return <Routes onNavigate={setCurrentPage} />
    if (currentPage === 'bus-details') return <BusDetails onNavigate={setCurrentPage} />
    return <Home onNavigate={setCurrentPage} />
  }

  return (
    <div className="app-shell">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <footer className="footer">EasyBus <span>Simple travel starts here.</span></footer>
    </div>
  )
}

export default App
