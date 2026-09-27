function BusCard({ bus, onSelect }) {
  return (
    <article className="bus-card" onClick={() => onSelect && onSelect(bus)} style={{ cursor: 'pointer' }}>
      <div className="bus-icon">BUS</div>
      <div>
        <p className="eyebrow">Vehicle: {bus.licensePlate || bus.vehicleId || bus.id}</p>
        <h3>Route {bus.routeId || bus.route || 'Local'}</h3>
        <p>{bus.speed > 0 ? `Moving (${Math.round(bus.speed)} km/h)` : 'Stopped'}</p>
      </div>
    </article>
  )
}

export default BusCard
