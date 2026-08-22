import RouteCard from '../components/RouteCard'

const routes = [
  { number: '131', name: 'Dhanmondi to Motijheel', frequency: 'Every 12 minutes', status: 'Active' },
  { number: '109', name: 'Mirpur to Gulistan', frequency: 'Every 15 minutes', status: 'Active' },
  { number: '109A', name: 'Uttara to Farmgate', frequency: 'Every 20 minutes', status: 'Active' },
  { number: '175', name: 'Mohammadpur to Sadarghat', frequency: 'Every 18 minutes', status: 'Active' },
  { number: '22', name: 'Badda to Azimpur', frequency: 'Every 25 minutes', status: 'Active' },
  { number: '7', name: 'Jatrabari to Gabtoli', frequency: 'Every 16 minutes', status: 'Active' },
]

function Routes({ onNavigate }) {
  return (
    <main className="page-shell">
      <div className="page-heading">
        <p className="eyebrow">The EasyBus network</p>
        <h1>Browse all routes</h1>
        <p>Choose a route to see its stops and available buses in a future update.</p>
      </div>
      <div className="route-grid route-grid-wide">
        {routes.map((route) => <RouteCard key={route.number} route={route} onSelect={() => onNavigate('bus-details')} />)}
      </div>
    </main>
  )
}

export default Routes
