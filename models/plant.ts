import monk from 'monk';
require('dotenv').config(); // Ensure this is called to load MongoDB URI from .env

// Connect to the database
if (!process.env.MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}
const db = monk(process.env.MONGODB_URI);
const plantsCollection = db.get('plants');

interface Plant {
  _id?: string;
  name: string;
  species: string;
  // Add more properties as needed
}

// Find all plants
const findAll = async (): Promise<Plant[]> => {
  return await plantsCollection.find({});
};

// Insert a new plant
const create = async (plant: Plant): Promise<Plant> => {
  return await plantsCollection.insert(plant);
};

// Update a plant
const updatePlant = async (id: string, plantUpdates: Partial<Plant>) => {
  return await plantsCollection.update({ _id: id }, { $set: plantUpdates });
};

// Delete a plant
const deletePlant = async (id: string) => {
  return await plantsCollection.remove({ _id: id });
};

export {
  findAll,
  create,
  updatePlant,
  deletePlant,
};
