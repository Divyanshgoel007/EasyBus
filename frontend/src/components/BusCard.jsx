function BusCard({ bus }) {
  return (
    <article className="bus-card">
      <div className="bus-icon">BUS</div>
      <div>
        <p className="eyebrow">Bus {bus.id}</p>
        <h3>{bus.route}</h3>
        <p>{bus.status}</p>
      </div>
    </article>
  )
}

export default BusCard
