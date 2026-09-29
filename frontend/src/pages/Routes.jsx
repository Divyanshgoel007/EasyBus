import { useState, useEffect } from 'react'
import RouteCard from '../components/RouteCard'

function Routes({ onNavigate }) {
  const [routes, setRoutes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('http://localhost:5000/api/routes')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch routes')
        return res.json()
      })
      .then(data => {
        setRoutes(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])
  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">The EasyBus Delhi Network</p>
        <h1>Browse Delhi Routes</h1>
        <p>Choose a route to preview the local bus tracking experience.</p>
      </div>

      <div className="route-grid route-grid-wide">
        {loading && <p>Loading routes...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && routes.length === 0 && <p>No routes found.</p>}
        {routes.map((route) => (
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
    </main>
  )
}

export default Routes
