import Button from '../components/Button'
import RouteCard from '../components/RouteCard'

const popularRoutes = [
  { number: '131', name: 'Dhanmondi to Motijheel', frequency: 'Every 12 minutes', status: 'Active' },
  { number: '109', name: 'Mirpur to Gulistan', frequency: 'Every 15 minutes', status: 'Active' },
  { number: '109A', name: 'Uttara to Farmgate', frequency: 'Every 20 minutes', status: 'Active' },
  { number: '175', name: 'Mohammadpur to Sadarghat', frequency: 'Every 18 minutes', status: 'Active' },
]

function Home({ onNavigate }) {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Your daily commute, made simple</p>
          <h1>Track Your Bus in <span>Real Time</span></h1>
          <p className="hero-description">
            EasyBus helps you find your route, check nearby buses, and spend less time waiting at the stop.
          </p>
          <Button onClick={() => onNavigate('tracking')}>Track Bus <span aria-hidden="true">-&gt;</span></Button>
        </div>
        <div className="hero-visual" aria-label="Illustration of a bus route">
          <div className="route-line"><span className="route-stop start"></span><span className="route-stop end"></span></div>
          <div className="bus-illustration"><span>EB</span></div>
          <div className="visual-label">Your bus is on its way</div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Explore the network</p>
            <h2>Popular Routes</h2>
          </div>
          <button className="text-button" type="button" onClick={() => onNavigate('routes')}>See all routes <span aria-hidden="true">-&gt;</span></button>
        </div>
        <div className="route-grid">
          {popularRoutes.map((route) => <RouteCard key={route.number} route={route} onSelect={() => onNavigate('routes')} />)}
        </div>
      </section>
    </main>
  )
}

export default Home
