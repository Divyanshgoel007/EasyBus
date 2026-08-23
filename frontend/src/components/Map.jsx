import { MapContainer, Marker, Polyline, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

const routeStops = [
  { name: 'Dhanmondi 27', position: [28.6139, 77.209] },
  { name: 'Farmgate', position: [28.6328, 77.2197] },
  { name: 'Shahbag', position: [28.6251, 77.2065] },
  { name: 'Motijheel', position: [28.5892, 77.214] },
]

const buses = [
  { id: 'EB-204', route: '131', position: [28.621, 77.214], currentStop: 'Kashmere Gate', nextStop: 'Shalimar Bagh', eta: '8 min', crowd: 'Moderate', status: 'Active' },
  { id: 'EB-205', route: '131', position: [28.628, 77.222], currentStop: 'Shalimar Bagh', nextStop: 'Pitampura', eta: '12 min', crowd: 'Light', status: 'Active' },
  { id: 'EB-118', route: '109', position: [28.603, 77.218], currentStop: 'Kashmere Gate', nextStop: 'Sonipat', eta: '10 min', crowd: 'Crowded', status: 'Active' },
  { id: 'EB-301', route: '109A', position: [28.635, 77.21], currentStop: 'Delhi', nextStop: 'Narela', eta: '9 min', crowd: 'Moderate', status: 'Active' },
]

function Map({ selectedRoute, onBusSelect }) {
  const routePositions = routeStops.map((stop) => stop.position)
  const visibleBuses = selectedRoute
    ? buses.filter((bus) => bus.route === selectedRoute)
    : buses

  return (
    <div className="map-wrapper">
      <MapContainer center={[28.6139, 77.209]} zoom={12} scrollWheelZoom={false} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={routePositions} pathOptions={{ color: '#1769aa', weight: 5 }} />
        {routeStops.map((stop) => (
          <Marker key={stop.name} position={stop.position}>
            <Popup>{stop.name} stop</Popup>
          </Marker>
        ))}
        {visibleBuses.map((bus) => (
          <Marker
            key={bus.id}
            position={bus.position}
            eventHandlers={{ click: () => onBusSelect(bus) }}
          >
            <Popup>
              <strong>{bus.id}</strong>
              <br />
              Route {bus.route}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

export default Map
