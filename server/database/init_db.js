const monk = require('monk');
require('dotenv').config(); // Ensure this is called to load your MongoDB URI from .env

// Connect to your MongoDB database
const db = monk(process.env.MONGODB_URI);

db.then(() => {
  console.log('Connected correctly to MongoDB server using Monk');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Optionally, you can verify the connection and list collections as a test
db.listCollections().toArray().then((collections) => {
  console.log('Available collections:', collections.map(col => col.name));
}).catch((err) => {
  console.error('Error listing collections:', err.message);
});

// Since MongoDB is schema-less, you don't need to create tables/collections upfront.
// However, if you want to ensure a collection exists, you can access it. MongoDB will create it on the fly when the first document is inserted.

// Example: Accessing the plants collection to ensure it's ready for use
const plants = db.get('plants');
console.log('Plants collection is ready for use.');

// Close the database connection when you're done (optional here since we're not keeping the script running)
db.close().then(() => {
  console.log('Closed the MongoDB connection.');
}).catch((err) => {
  console.error('Error closing MongoDB connection:', err.message);
});
