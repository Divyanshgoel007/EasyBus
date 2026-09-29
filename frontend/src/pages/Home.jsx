import Button from '../components/Button'
import RouteCard from '../components/RouteCard'
import { useState, useEffect } from 'react'

const stats = {
  totalActiveBuses: 18,
  totalActiveRoutes: 6
}

function Home({ onNavigate, user }) {
  const [routes, setRoutes] = useState([])
  const [isRiding, setIsRiding] = useState(false)
  const [rideId, setRideId] = useState(null)
  const [locationWatcher, setLocationWatcher] = useState(null)
  const [driverRoute, setDriverRoute] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/routes')
      .then(res => res.json())
      .then(data => {
        setRoutes(data)
        if (data.length > 0 && !driverRoute) {
          setDriverRoute(data[0].routeNumber)
        }
      })
      .catch(console.error)
  }, [])

  const popularRoutes = routes.slice(0, 6)

  const handleStartRide = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/ride/start', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            driverId: user._id,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            routeId: driverRoute
          })
        });
        const data = await response.json();
        setRideId(data.ride._id);
        setIsRiding(true);

        const watcher = navigator.geolocation.watchPosition((pos) => {
          const token = localStorage.getItem('token');
          fetch('http://localhost:5000/api/ride/update-location', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              rideId: data.ride._id,
              lat: pos.coords.latitude,
              lng: pos.coords.longitude
            })
          });
        });
        setLocationWatcher(watcher);
      } catch (err) {
        console.error(err);
      }
    });
  }

  const handleStopRide = async () => {
    if (locationWatcher) {
      navigator.geolocation.clearWatch(locationWatcher);
    }
    setIsRiding(false);
    if (rideId) {
      const token = localStorage.getItem('token');
      await fetch('http://localhost:5000/api/ride/stop', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rideId })
      });
    }
  }

  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">
            Live Data: {stats.totalActiveBuses.toLocaleString()} Buses active across {stats.totalActiveRoutes.toLocaleString()} routes
          </p>
          <h1>Track Delhi Buses in <span>Real Time</span></h1>
          <p className="hero-description">
            EasyBus gives you a local, fast demo of Delhi bus routes and live-style tracking without requiring a backend server.
          </p>
          <Button onClick={() => onNavigate('tracking')}>Track Live Buses <span aria-hidden="true">-&gt;</span></Button>
        </div>
        <div className="hero-visual" aria-label="Illustration of a bus route">
          <div className="route-line"><span className="route-stop start"></span><span className="route-stop end"></span></div>
          <div className="bus-illustration"><span>EB</span></div>
          <div className="visual-label">
            {stats.totalActiveBuses} buses active right now
          </div>
        </div>
      </section>

      {user && user.role === 'driver' && (
        <section className="content-section" style={{ background: '#f5f5f5', padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
          <h2>Driver Dashboard</h2>
          <p>Start your ride to broadcast your location to passengers.</p>
          <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {!isRiding ? (
              <>
                <select 
                  value={driverRoute} 
                  onChange={(e) => setDriverRoute(e.target.value)}
                  style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid #ccc' }}
                >
                  {routes.map(r => (
                    <option key={r._id} value={r.routeNumber}>
                      Route {r.routeNumber} - {r.routeName}
                    </option>
                  ))}
                </select>
                <Button onClick={handleStartRide}>Start the Ride</Button>
              </>
            ) : (
              <Button onClick={handleStopRide} variant="secondary">Stop the Ride</Button>
            )}
          </div>
        </section>
      )}

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the network</p>
            <h2>Active Delhi Routes</h2>
          </div>
          <button className="text-button" type="button" onClick={() => onNavigate('routes')}>
            See all routes <span aria-hidden="true">-&gt;</span>
          </button>
        </div>

        <div className="route-grid">
          {popularRoutes.map((route) => (
            <RouteCard
              key={route._id}
              route={{
                route_id: route.routeId,
                route_short_name: route.routeNumber,
                route_long_name: `${route.routeName} (${route.totalStops} stops)`,
                agency_id: 'TrackMate'
              }}
              onSelect={() => onNavigate('tracking', { number: route.routeNumber, ...route })}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
