const monk = require('monk');
require('dotenv').config(); // load MongoDB URI from .env

// Connect to MongoDB database
const db = monk(process.env.MONGODB_URI);

db.then(() => {
  console.log('Connected correctly to MongoDB server using Monk');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// also can verify the connection and list collections as a test
db.listCollections().toArray().then((collections) => {
  console.log('Available collections:', collections.map(col => col.name));
}).catch((err) => {
  console.error('Error listing collections:', err.message);
});


// create the collection if it doesn't exist
const plants = db.get('plants');
console.log('Plants collection is ready for use.');

// close the database connection when done (optional here since we're not keeping the script running)
db.close().then(() => {
  console.log('Closed the MongoDB connection.');
}).catch((err) => {
  console.error('Error closing MongoDB connection:', err.message);
});
