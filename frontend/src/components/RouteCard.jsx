function RouteCard({ route, onSelect }) {
  return (
    <article className="route-card">
      <div className="card-topline">
        <span className="route-number">{route.number}</span>
        <span className="status-dot">{route.status}</span>
      </div>
      <h3>{route.name}</h3>
      <p>{route.frequency}</p>
      <button className="text-button" type="button" onClick={() => onSelect(route)}>
        View route <span aria-hidden="true">-&gt;</span>
      </button>
    </article>
  )
}

export default RouteCard
