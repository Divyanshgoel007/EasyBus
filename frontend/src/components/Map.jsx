import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icon issues in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
})

// Delhi Center default coordinates
const DELHI_CENTER = [28.6139, 77.2090]

function Map({ buses = [], onBusSelect }) {
  // If buses are present, use the first bus position or default center
  const initialCenter = buses.length > 0 && buses[0].latitude && buses[0].longitude
    ? [buses[0].latitude, buses[0].longitude]
    : DELHI_CENTER

  return (
    <div className="map-wrapper">
      <MapContainer center={initialCenter} zoom={12} scrollWheelZoom={true} className="map-container">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {buses.map((bus) => {
          if (!bus.latitude || !bus.longitude) return null
          return (
            <Marker
              key={bus.id || bus.vehicleId}
              position={[bus.latitude, bus.longitude]}
              eventHandlers={{ click: () => onBusSelect && onBusSelect(bus) }}
            >
              <Popup>
                <div style={{ padding: '4px' }}>
                  <strong style={{ fontSize: '15px', color: '#1769aa' }}>
                    Bus {bus.licensePlate || bus.vehicleId}
                  </strong>
                  <br />
                  <strong>Route:</strong> {bus.routeId ? `Route ${bus.routeId}` : 'Delhi Local'}
                  <br />
                  <strong>Speed:</strong> {bus.speed ? `${Math.round(bus.speed)} km/h` : 'Stopped / 0 km/h'}
                  <br />
                  <strong>Coordinates:</strong> {bus.latitude.toFixed(4)}, {bus.longitude.toFixed(4)}
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

export default Map
