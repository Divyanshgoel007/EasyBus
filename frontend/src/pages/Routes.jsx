import RouteCard from '../components/RouteCard'

const routes = [
  {
    number: '131',
    from: 'Delhi',
    to: 'Rohini',
    frequency: '10 min',
    status: 'Active',
    stops: ['Kashmere Gate', 'Shalimar Bagh', 'Pitampura', 'Rohini'],
  },
  {
    number: '109',
    from: 'Kashmere Gate',
    to: 'Panipat',
    frequency: '15 min',
    status: 'Active',
    stops: ['Kashmere Gate', 'Sonipat', 'Murthal', 'Panipat'],
  },
  {
    number: '109A',
    from: 'Delhi',
    to: 'Murthal',
    frequency: '20 min',
    status: 'Active',
    stops: ['Delhi', 'Narela', 'Sonipat', 'Murthal'],
  },
  {
    number: '175',
    from: 'Delhi',
    to: 'Sonipat',
    frequency: '15 min',
    status: 'Active',
    stops: ['ISBT Kashmere Gate', 'Narela', 'Kundli', 'Sonipat'],
  },
  {
    number: '22',
    from: 'Anand Vihar',
    to: 'Noida',
    frequency: '12 min',
    status: 'Active',
    stops: ['Anand Vihar', 'Mayur Vihar', 'Noida Sector 15', 'Noida'],
  },
  {
    number: '7',
    from: 'ISBT Kashmere Gate',
    to: 'Gurugram',
    frequency: '20 min',
    status: 'Active',
    stops: ['ISBT Kashmere Gate', 'Connaught Place', 'Delhi Cantt', 'Gurugram'],
  },
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
        {routes.map((route) => <RouteCard key={route.number} route={route} onSelect={() => onNavigate('tracking', route)} />)}
      </div>
    </main>
  )
}

export default Routes
