# EasyBus

EasyBus is a beginner-friendly Indian bus tracking frontend built with React and Vite. It currently uses static dummy data to demonstrate routes, Delhi/NCR bus locations, bus details, and crowd reporting.

## Current Features

- Responsive EasyBus navigation
- Home page with popular routes
- Routes page with route details and stops
- Route-specific Live Tracking
- OpenStreetMap map using React-Leaflet
- Static Delhi/NCR bus and stop markers
- Clickable bus markers with bus details
- Dummy ETA, crowd level, and status information
- Frontend-only crowd reporting with Light, Moderate, and Crowded options

All bus, route, stop, ETA, and crowd values are dummy frontend data. They are not connected to a backend or real GPS service.

## Technologies

- React
- JavaScript
- Vite
- Leaflet
- React-Leaflet
- OpenStreetMap
- CSS

## Project Structure

```text
src/
├── components/
│   ├── BusCard.jsx
│   ├── Button.jsx
│   ├── Map.jsx
│   ├── Navbar.jsx
│   └── RouteCard.jsx
├── pages/
│   ├── BusDetails.jsx
│   ├── Home.jsx
│   ├── LiveTracking.jsx
│   └── Routes.jsx
├── App.css
├── App.jsx
├── index.css
└── main.jsx
```

## How Navigation Works

The application uses a simple `currentPage` state in `App.jsx` instead of a routing library. The selected route is passed through the existing navigation function when a user clicks `View route`.

On the Live Tracking page, the selected route is used to filter the dummy bus array. Opening Live Tracking directly shows all available buses.

## How the Map Works

`Map.jsx` uses React-Leaflet components:

- `MapContainer` creates the map centered on Delhi/NCR.
- `TileLayer` loads map tiles from OpenStreetMap.
- `Marker` displays buses and bus stops.
- `Popup` shows information when a marker is clicked.
- `Polyline` draws the sample route line.

## Getting Started

From the `frontend` directory, install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create a production build
npm run lint     # Check the code with ESLint
npm run preview  # Preview the production build
```

## Future Features

The current project does not include backend integration, authentication, real-time GPS tracking, Socket.IO, WebSockets, or database storage. These can be added in later development steps.
