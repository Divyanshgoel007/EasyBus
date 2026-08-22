import Button from '../components/Button'
import BusCard from '../components/BusCard'

const nearbyBuses = [
  { id: 'EB-204', route: 'Route 131', status: 'Approaching Dhanmondi 27' },
  { id: 'EB-118', route: 'Route 109', status: 'At Mirpur 10 stop' },
]

function LiveTracking({ onNavigate }) {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Live Tracking</p>
        <h1>Find a bus near you</h1>
        <p>Live location updates and map tools will be added in the next step.</p>
      </div>
      <section className="placeholder-panel">
        <div className="placeholder-icon">GPS</div>
        <h2>Tracking will appear here</h2>
        <p>This space is ready for the live bus map and nearby vehicle information.</p>
        <Button variant="secondary" onClick={() => onNavigate('routes')}>Browse routes</Button>
      </section>
      <div className="bus-list">
        {nearbyBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)}
      </div>
    </main>
  )
}

export default LiveTracking
