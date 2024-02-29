// /models/plant.ts
import db from '../database/database';
import { PlantDetails } from './plantInterfaces';

const plantsCollection = db.get('plants');

export const findPlantByApiId = async (id: number): Promise<PlantDetails | null> => {
  return plantsCollection.findOne({ id });
};

export const createPlant = async (plantData: PlantDetails): Promise<PlantDetails> => {
  return plantsCollection.insert(plantData);
};

export const updatePlantByApiId = async (id: number, updateData: Partial<PlantDetails>): Promise<PlantDetails | null> => {
  return plantsCollection.findOneAndUpdate({ id }, { $set: updateData }, { returnNewDocument: true });
};

export const deletePlantByApiId = async (id: number): Promise<PlantDetails | null> => {
  return plantsCollection.findOneAndDelete({ id });
};

export const findAllPlants = async (): Promise<PlantDetails[]> => {
  return plantsCollection.find({});
};
