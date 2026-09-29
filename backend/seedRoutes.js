const mongoose = require('mongoose');
require('dotenv').config();
const Route = require('./models/Route');

const sampleRoutes = [
  {
    routeId: 'R-10',
    routeNumber: '10',
    routeName: 'Rohini to Kashmere Gate',
    startingPoint: 'Rohini Sector 15',
    endingPoint: 'Kashmere Gate',
    totalStops: 3,
    stops: [
      { name: 'Rohini Sector 15', lat: 28.7366, lng: 77.1328 },
      { name: 'Pitampura', lat: 28.7031, lng: 77.1323 },
      { name: 'Kashmere Gate', lat: 28.6665, lng: 77.2285 }
    ]
  },
  {
    routeId: 'R-23',
    routeNumber: '23',
    routeName: 'Dwarka to Karol Bagh',
    startingPoint: 'Dwarka Sector 10',
    endingPoint: 'Karol Bagh',
    totalStops: 3,
    stops: [
      { name: 'Dwarka Sector 10', lat: 28.5808, lng: 77.0601 },
      { name: 'Janakpuri', lat: 28.6219, lng: 77.0878 },
      { name: 'Karol Bagh', lat: 28.6514, lng: 77.1908 }
    ]
  },
  {
    routeId: 'R-419',
    routeNumber: '419',
    routeName: 'Kashmere Gate to Lado Sarai',
    startingPoint: 'Kashmere Gate ISBT',
    endingPoint: 'Lado Sarai',
    totalStops: 4,
    stops: [
      { name: 'Kashmere Gate ISBT', lat: 28.6665, lng: 77.2285 },
      { name: 'ITO', lat: 28.6288, lng: 77.2408 },
      { name: 'AIIMS', lat: 28.5672, lng: 77.2100 },
      { name: 'Lado Sarai', lat: 28.5250, lng: 77.1931 }
    ]
  },
  {
    routeId: 'R-CHITKARA',
    routeNumber: 'C-01',
    routeName: 'Chitkara University to Kalka Railway Station',
    startingPoint: 'Chitkara University',
    endingPoint: 'Kalka Railway Station',
    totalStops: 5,
    stops: [
      { name: 'Chitkara University', lat: 30.5168, lng: 76.5795 },
      { name: 'Zirakpur', lat: 30.6425, lng: 76.8173 },
      { name: 'Panchkula', lat: 30.6942, lng: 76.8606 },
      { name: 'Pinjore', lat: 30.7964, lng: 76.9176 },
      { name: 'Kalka Railway Station', lat: 30.8392, lng: 76.9315 }
    ]
  }
];

async function seedData() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/bustrack');
    console.log('Connected to MongoDB');
    
    // Clear existing routes
    await Route.deleteMany({});
    console.log('Cleared existing routes');
    
    // Insert new routes
    await Route.insertMany(sampleRoutes);
    console.log('Successfully seeded routes');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seedData();
