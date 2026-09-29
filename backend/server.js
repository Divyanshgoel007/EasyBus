const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const http = require('http');
require('dotenv').config();

const User = require('./models/User');
const Ride = require('./models/Ride');

const Route = require('./models/Route');

async function calculateNextStop(routeId, lat, lng) {
  const route = await Route.findOne({ routeNumber: String(routeId) }) || await Route.findOne({ routeId: String(routeId) });
  if (!route || !route.stops || route.stops.length === 0) return { nextStop: 'End of route', eta: 0 };

  const stops = route.stops;
  let closestStop = stops[0];
  let minDistance = Infinity;
  for (const stop of stops) {
    const dist = Math.sqrt(Math.pow(stop.lat - lat, 2) + Math.pow(stop.lng - lng, 2));
    if (dist < minDistance) {
      minDistance = dist;
      closestStop = stop;
    }
  }
  const distKm = minDistance * 111;
  const eta = Math.ceil(distKm * 2); // 30km/h average -> distKm / 30 * 60 = dist * 2 minutes
  return { nextStop: closestStop.name, eta: eta };
}

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

io.on('connection', (socket) => {
  console.log('A user connected via socket');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Basic MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bustrack')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Routes

app.get('/api/routes', async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 1. Simple Login (No JWT for basic coding, just matching username/password)
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'Login successful', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2. Register (Helper route to create users easily)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    await user.save();
    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ message: 'User created successfully', token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Middleware to protect routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 3. Driver starts a ride
app.post('/api/ride/start', authenticateToken, async (req, res) => {
  try {
    const { driverId, lat, lng, routeId = '10' } = req.body;

    // Deactivate any existing active rides for this driver
    await Ride.updateMany({ driverId, isActive: true }, { isActive: false });

    const { nextStop, eta } = await calculateNextStop(routeId, lat, lng);

    const ride = new Ride({
      driverId,
      currentLocation: { lat, lng },
      routeId,
      nextStop,
      eta,
      isActive: true
    });
    await ride.save();
    res.json({ message: 'Ride started', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4. Driver updates location
app.post('/api/ride/update-location', authenticateToken, async (req, res) => {
  try {
    const { rideId, lat, lng } = req.body;
    const existingRide = await Ride.findById(rideId);
    if (!existingRide) return res.status(404).json({ message: 'Ride not found' });

    const { nextStop, eta } = await calculateNextStop(existingRide.routeId, lat, lng);

    const ride = await Ride.findByIdAndUpdate(
      rideId,
      { currentLocation: { lat, lng }, nextStop, eta },
      { new: true }
    ).populate('driverId', 'name');

    // Broadcast location update to all connected clients
    io.emit('bus:location_update', { busId: ride._id, lat, lng, speed: 0, nextStop, eta });
    res.json({ message: 'Location updated', ride });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5. Passengers fetch active rides (to see on map)
app.get('/api/rides/active', async (req, res) => {
  try {
    const rides = await Ride.find({ isActive: true }).populate('driverId', 'username');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6. Stop a ride
app.post('/api/ride/stop', authenticateToken, async (req, res) => {
  try {
    const { rideId } = req.body;
    await Ride.findByIdAndUpdate(rideId, { isActive: false });
    res.json({ message: 'Ride stopped' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
