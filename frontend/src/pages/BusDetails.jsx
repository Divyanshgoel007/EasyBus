import Button from '../components/Button'

function BusDetails({ selectedRoute, onNavigate }) {
  const routeNumber = selectedRoute?.number || selectedRoute?.route_id || 'Delhi Local'
  const routeName = selectedRoute?.name || selectedRoute?.route_long_name || `Route ${routeNumber}`

  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Bus & Route Details</p>
        <h1>{routeName}</h1>
        <p>Live tracking details for Delhi Open Transit Data routes.</p>
      </div>
      <section className="details-panel">
        <div className="detail-bus-mark">DTC</div>
        <div>
          <p className="eyebrow">Selected Route</p>
          <h2>Route {routeNumber}</h2>
          <p>{routeName}</p>
        </div>
        <div className="detail-row"><span>Agency</span><strong>{selectedRoute?.agency_id || 'DIMTS / DTC'}</strong></div>
        <div className="detail-row"><span>Status</span><strong className="status-text">Live GPS Stream Active</strong></div>
        <Button onClick={() => onNavigate('tracking', selectedRoute)}>Track Buses On Map</Button>
        <Button variant="secondary" onClick={() => onNavigate('routes')}>Browse All Routes</Button>
      </section>
    </main>
  )
}

export default BusDetails
