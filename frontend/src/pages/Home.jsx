import Button from '../components/Button'
import RouteCard from '../components/RouteCard'
import { useState, useEffect } from 'react'

const demoRoutes = [
  { route_id: '10', route_short_name: '10', route_long_name: 'Rohini Sector 15 to Kashmere Gate', agency_id: 'DTC' },
  { route_id: '23', route_short_name: '23', route_long_name: 'Dwarka Sector 10 to Karol Bagh', agency_id: 'DTC' },
  { route_id: '27', route_short_name: '27', route_long_name: 'Narela to Delhi Secretariat', agency_id: 'DIMTS' },
  { route_id: '34', route_short_name: '34', route_long_name: 'Anand Vihar to Ghaziabad Border', agency_id: 'DTC' },
  { route_id: '74', route_short_name: '74', route_long_name: 'Mundka to Connaught Place', agency_id: 'DIMTS' },
  { route_id: '157', route_short_name: '157', route_long_name: 'Najafgarh to Uttam Nagar', agency_id: 'DTC' }
]

const stats = {
  totalActiveBuses: 18,
  totalActiveRoutes: 6
}

function Home({ onNavigate, user }) {
  const popularRoutes = demoRoutes.slice(0, 6)
  const [isRiding, setIsRiding] = useState(false)
  const [rideId, setRideId] = useState(null)
  const [locationWatcher, setLocationWatcher] = useState(null)
  const [driverRoute, setDriverRoute] = useState('10')

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
                  {demoRoutes.map(r => (
                    <option key={r.route_id} value={r.route_id}>
                      Route {r.route_short_name} - {r.route_long_name}
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
              key={route.route_id}
              route={route}
              onSelect={() => onNavigate('tracking', { number: route.route_short_name || route.route_id, ...route })}
            />
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
