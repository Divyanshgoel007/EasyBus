import Button from '../components/Button'
import BusCard from '../components/BusCard'
import Map from '../components/Map'
import { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

function LiveTracking({ selectedRoute, onNavigate }) {
  const [selectedBus, setSelectedBus] = useState(null)
  const [crowd, setCrowd] = useState(null)
  const [allBuses, setAllBuses] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect(() => {
    // 1. Fetch initial buses
    const fetchBuses = () => {
      fetch('http://localhost:5000/api/rides/active')
        .then(res => res.json())
        .then(data => {
          const formatted = data.map(b => ({
            id: b._id,
            vehicleId: b._id,
            routeId: b.routeId || '',
            route: `Route ${b.routeId || 'Local'}`,
            licensePlate: b.driverId?.name || 'Driver',
            latitude: b.currentLocation?.lat || 28.6139,
            longitude: b.currentLocation?.lng || 77.2090,
            speed: 0,
            nextStop: b.nextStop || '',
            eta: b.eta || 0,
            crowdLevel: null
          }))
          setAllBuses(formatted)
        })
        .catch(console.error)
    }

    fetchBuses()

    const socketConnection = io('http://localhost:5000')
    setSocket(socketConnection)

    socketConnection.on('bus:location_update', (update) => {
      setAllBuses(prevBuses => prevBuses.map(bus => {
        if (bus.id === update.busId) {
          return {
            ...bus,
            latitude: update.lat,
            longitude: update.lng,
            speed: update.speed,
            nextStop: update.nextStop,
            eta: update.eta
          }
        }
        return bus
      }))
      
      setSelectedBus(prevSelected => {
        if (prevSelected && prevSelected.id === update.busId) {
          return {
            ...prevSelected,
            latitude: update.lat,
            longitude: update.lng,
            speed: update.speed,
            nextStop: update.nextStop,
            eta: update.eta
          }
        }
        return prevSelected
      })
    })

    return () => {
      if (socketConnection) socketConnection.disconnect()
    }
  }, [])

  const routeIdParam = selectedRoute?._id || selectedRoute?.route_id || ''
  const buses = routeIdParam
    ? allBuses.filter((bus) => String(bus.routeId) === String(routeIdParam))
    : allBuses

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Live Real-Time Tracking</p>
        <h1>Find a bus near you</h1>
        <p>
          {routeIdParam
            ? `Tracking Route ${routeIdParam} in the demo bus map.`
            : 'Displaying active DTC and Cluster buses across Delhi in a local demo feed.'}
        </p>
        {selectedRoute && <p className="selected-route-name">{selectedRoute.name || selectedRoute.route_long_name}</p>}
      </div>
      <section className="tracking-layout">
        <div className="tracking-sidebar">
          <div className="tracking-intro">
            <div className="placeholder-icon">GPS</div>
            <h2>{routeIdParam ? `Route ${routeIdParam} buses` : 'Live active buses'}</h2>
            <p>Showing {buses.length} demo buses in the local route map.</p>
          </div>

          <div className="bus-list">
            {buses.length === 0 ? (
              <p style={{ padding: '1rem', color: '#888' }}>No active buses currently found for this filter.</p>
            ) : (
              buses.slice(0, 30).map((bus) => (
                <BusCard
                  key={bus.id}
                  bus={bus}
                  onSelect={(b) => {
                    setSelectedBus(b)
                    setCrowd(null)
                  }}
                />
              ))
            )}
          </div>

          {selectedBus && (
            <div className="bus-details-card">
              <div className="details-card-heading">
                <h2>Bus Details</h2>
                <button className="close-button" type="button" onClick={() => setSelectedBus(null)}>Close</button>
              </div>
              <div className="bus-detail-row"><span>Vehicle Plate</span><strong>{selectedBus.licensePlate || selectedBus.vehicleId}</strong></div>
              <div className="bus-detail-row"><span>Route</span><strong>Route {selectedBus.routeId || 'Local'}</strong></div>
              <div className="bus-detail-row"><span>Speed</span><strong>{selectedBus.speed ? `${Math.round(selectedBus.speed)} km/h` : '0 km/h (Stopped)'}</strong></div>
              <div className="bus-detail-row"><span>Next Stop</span><strong>{selectedBus.nextStop || 'Unknown'}</strong></div>
              <div className="bus-detail-row"><span>ETA</span><strong>{selectedBus.eta ? `${selectedBus.eta} mins` : '--'}</strong></div>
              <div className="bus-detail-row"><span>Latitude</span><strong>{selectedBus.latitude?.toFixed(4)}</strong></div>
              <div className="bus-detail-row"><span>Longitude</span><strong>{selectedBus.longitude?.toFixed(4)}</strong></div>
              {selectedBus.crowdLevel && <div className="bus-detail-row"><span>Reported Crowd</span><strong>{selectedBus.crowdLevel}</strong></div>}

              <div className="crowd-reporting">
                <strong>How crowded is this bus?</strong>
                <div className="crowd-options">
                  {['Light', 'Moderate', 'Crowded'].map((level) => (
                    <button
                      className={`crowd-button crowd-${level.toLowerCase()} ${(crowd || selectedBus.crowdLevel) === level ? 'selected' : ''}`}
                      key={level}
                      type="button"
                      onClick={() => {
                        setCrowd(level)
                        // Make API call to update crowd level
                        const token = localStorage.getItem('token')
                        if (token) {
                          fetch(`http://localhost:5000/api/buses/${selectedBus.id}/crowd`, {
                            method: 'PATCH',
                            headers: {
                              'Content-Type': 'application/json',
                              'Authorization': `Bearer ${token}`
                            },
                            body: JSON.stringify({ crowdLevel: level })
                          }).catch(console.error)
                        }
                      }}
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
          buses={buses}
          onBusSelect={(bus) => {
            setSelectedBus(bus)
            setCrowd(null)
          }}
        />
      </section>
    </main>
  )
}

export default LiveTracking
