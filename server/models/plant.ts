// server/models/plant.ts

import monk from 'monk';
import plantSchema from '../schemas/plantSchema';
import { ObjectId } from 'mongodb';

// Assuming dotenv.config() is called at the application's entry point
const db = monk(process.env.MONGODB_URI || '');
const plantsCollection = db.get('plants');

interface Plant {
  _id?: string;
  name: string;
  species: string;
  // Additional properties
}

// Use this interface for creating new plants to omit the _id property
interface PlantInput {
  name: string;
  species: string;
  // Additional properties without _id
}

// Insert a new plant with validation
const create = async (plant: PlantInput): Promise<Plant> => {
  const { error, value } = plantSchema.validate(plant);
  
  if (error) {
    throw new Error(`Validation failed: ${error.details.map(x => x.message).join(', ')}`);
  }

  return await plantsCollection.insert(value);
};

// Other model operations with similar validation integration...

export {
  create,
  // Export other operations...
};
