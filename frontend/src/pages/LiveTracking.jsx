import Button from '../components/Button'
import BusCard from '../components/BusCard'
import Map from '../components/Map'
import { useState } from 'react'

const nearbyBuses = [
  { id: 'EB-204', route: '131', status: 'Approaching Delhi' },
  { id: 'EB-205', route: '131', status: 'Near Rohini' },
  { id: 'EB-118', route: '109', status: 'At Kashmere Gate' },
  { id: 'EB-301', route: '109A', status: 'Near Murthal' },
]

function LiveTracking({ selectedRoute, onNavigate }) {
  const [selectedBus, setSelectedBus] = useState(null)
  const [crowd, setCrowd] = useState(null)
  const visibleBuses = selectedRoute
    ? nearbyBuses.filter((bus) => bus.route === selectedRoute.number)
    : nearbyBuses

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Live Tracking</p>
        <h1>Find a bus near you</h1>
        <p>{selectedRoute ? `Tracking Route ${selectedRoute.number}` : 'Explore a simple demonstration of buses and stops along a sample route.'}</p>
        {selectedRoute && <p className="selected-route-name">{selectedRoute.name}</p>}
      </div>
      <section className="tracking-layout">
        <div className="tracking-sidebar">
          <div className="tracking-intro">
            <div className="placeholder-icon">GPS</div>
            <h2>{selectedRoute ? `Route ${selectedRoute.number} buses` : 'Nearby buses'}</h2>
            <p>These sample buses are shown on the map.</p>
          </div>
          <div className="bus-list">
            {visibleBuses.map((bus) => <BusCard key={bus.id} bus={bus} />)}
          </div>
          {selectedBus && (
            <div className="bus-details-card">
              <div className="details-card-heading">
                <h2>Bus Details</h2>
                <button className="close-button" type="button" onClick={() => setSelectedBus(null)}>Close</button>
              </div>
              <div className="bus-detail-row"><span>Bus ID</span><strong>{selectedBus.id}</strong></div>
              <div className="bus-detail-row"><span>Route</span><strong>{selectedBus.route}</strong></div>
              <div className="bus-detail-row"><span>Current Stop</span><strong>{selectedBus.currentStop}</strong></div>
              <div className="bus-detail-row"><span>Next Stop</span><strong>{selectedBus.nextStop}</strong></div>
              <div className="bus-detail-row"><span>ETA</span><strong>{selectedBus.eta}</strong></div>
              <div className="bus-detail-row"><span>Crowd</span><strong>{crowd}</strong></div>
              <div className="bus-detail-row"><span>Status</span><strong className="status-text">{selectedBus.status}</strong></div>
              <div className="crowd-reporting">
                <strong>How crowded is this bus?</strong>
                <div className="crowd-options">
                  {['Light', 'Moderate', 'Crowded'].map((level) => (
                    <button
                      className={`crowd-button crowd-${level.toLowerCase()} ${crowd === level ? 'selected' : ''}`}
                      key={level}
                      type="button"
                      onClick={() => setCrowd(level)}
                    >
                      <span className="crowd-indicator" aria-hidden="true"></span>
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
          <Button variant="secondary" onClick={() => onNavigate('routes')}>Browse routes</Button>
        </div>
        <Map
          selectedRoute={selectedRoute?.number}
          onBusSelect={(bus) => {
            setSelectedBus(bus)
            setCrowd(bus.crowd)
          }}
        />
      </section>
    </main>
  )
}

export default LiveTracking
