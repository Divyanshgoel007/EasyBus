function RouteCard({ route, onSelect }) {
  const routeNumber = route.route_short_name || route.route_id || route.number || 'Route'
  const routeName = route.route_long_name || route.name || `Route ${routeNumber}`
  const agency = route.agency_id || 'DIMTS / DTC'

  return (
    <article className="route-card">
      <div className="card-topline">
        <span className="route-number">Route {routeNumber}</span>
        <span className="status-dot">Active</span>
      </div>
      <h3>{routeName}</h3>
      <p>Agency: {agency}</p>
      <button className="text-button" type="button" onClick={() => onSelect && onSelect(route)}>
        Track live buses on this route <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  )
}

export default RouteCard
