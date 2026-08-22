import Button from '../components/Button'

function BusDetails({ onNavigate }) {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">Bus Details</p>
        <h1>Route details are coming soon</h1>
        <p>This page will show a bus route, stops, and service information.</p>
      </div>
      <section className="details-panel">
        <div className="detail-bus-mark">EB</div>
        <div>
          <p className="eyebrow">Selected route</p>
          <h2>Route 131</h2>
          <p>Dhanmondi to Motijheel</p>
        </div>
        <div className="detail-row"><span>Current status</span><strong className="status-text">Ready for tracking</strong></div>
        <div className="detail-row"><span>Next step</span><strong>Map and stop details</strong></div>
        <Button variant="secondary" onClick={() => onNavigate('routes')}>Back to routes</Button>
      </section>
    </main>
  )
}

export default BusDetails
