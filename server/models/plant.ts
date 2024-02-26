// server/models/plant.ts
import db from '../database/database';
import { PlantDetails } from './plantInterfaces';

const plantsCollection = db.get('plants');

// ensure indexes
const ensureIndexes = async () => {
  try {
    await plantsCollection.createIndex({ dateAdded: 1 });
    console.log('Indexes ensured successfully');
  } catch (error) {
    console.error('Error ensuring indexes:', error);
  }
};

ensureIndexes();

// CRUD operations
const createPlant = async (plantData: Omit<PlantDetails, 'dateAdded'>): Promise<PlantDetails> => {
  const fullPlantData = { ...plantData, dateAdded: new Date() }; // add dateAdded
  return plantsCollection.insert(fullPlantData);
};

const findPlants = async (): Promise<PlantDetails[]> => {
  return plantsCollection.find({});
};

const findPlantById = async (id: string): Promise<PlantDetails> => {
  return plantsCollection.findOne({ _id: id });
};

const updatePlant = async (id: string, plantData: Partial<PlantDetails>): Promise<PlantDetails> => {
  await plantsCollection.update({ _id: id }, { $set: plantData });
  return findPlantById(id); // return updated plant
};

const deletePlant = async (id: string): Promise<{ message: string }> => {
  await plantsCollection.remove({ _id: id });
  return { message: `Plant with id ${id} deleted successfully.` };
};

export {
  createPlant,
  findPlants,
  findPlantById,
  updatePlant,
  deletePlant,
};
