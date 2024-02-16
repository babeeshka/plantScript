// server/models/plant.ts
import db from '../database/database';
import { PlantDetails } from './plantInterfaces'; // adjust the import path as necessary

const plantsCollection = db.get('plants');

// CRUD operations
const createPlant = async (plantData: PlantDetails): Promise<PlantDetails> => {
  return plantsCollection.insert(plantData);
};

const findPlants = async (): Promise<PlantDetails[]> => {
  return plantsCollection.find({});
};

const findPlantById = async (id: string): Promise<PlantDetails> => {
  return plantsCollection.findOne({ _id: id });
};

const updatePlant = async (id: string, plantData: Partial<PlantDetails>): Promise<PlantDetails> => {
  await plantsCollection.update({ _id: id }, { $set: plantData });
  return findPlantById(id); // return the updated document
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
