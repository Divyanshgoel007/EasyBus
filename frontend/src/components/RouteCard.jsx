function RouteCard({ route, onSelect }) {
  return (
    <article className="route-card">
      <div className="card-topline">
        <span className="route-number">{route.number}</span>
        <span className="status-dot">{route.status}</span>
      </div>
      <h3>{route.from ? `${route.from} -> ${route.to}` : route.name}</h3>
      <p>{route.frequency}</p>
      {route.stops && (
        <div className="route-stops">
          <strong>Stops</strong>
          {route.stops.map((stop, index) => (
            <div key={stop}>{index + 1}. {stop}</div>
          ))}
        </div>
      )}
      <button className="text-button" type="button" onClick={() => onSelect(route)}>
        View route <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  )
}

export default RouteCard
