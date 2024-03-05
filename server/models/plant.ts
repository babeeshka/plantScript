import db from '../database/database';
import { PlantDetails } from '@rootTypes/plantInterfaces';
import Joi from 'joi';
import plantSchema from '../schemas/plantSchema';

const plantsCollection = db.get('plants');

// Helper function for validation
const validatePlant = (plantData: any) => {
  const { value, error } = plantSchema.validate(plantData);
  if (error) {
    throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
  }
  return value;
};

export const findPlantByApiId = async (id: number): Promise<PlantDetails | null> => {
  const plant = await plantsCollection.findOne({ id });
  // Optionally, you can validate the found plant against the schema
  return plant ? validatePlant(plant) : null;
};

export const createPlant = async (plantData: PlantDetails): Promise<PlantDetails> => {
  const validatedData = {
    ...validatePlant(plantData),
    dateAdded: new Date(),  
  };
  return plantsCollection.insert(validatedData);
};


export const updatePlantByApiId = async (id: number, updateData: Partial<PlantDetails>): Promise<PlantDetails | null> => {
  const updateWithMetadata = {
    ...updateData,
    lastEditedAt: new Date(), 
  };
  return plantsCollection.findOneAndUpdate({ id }, { $set: updateWithMetadata }, { returnNewDocument: true });
};

export const deletePlantByApiId = async (id: number): Promise<PlantDetails | null> => {
  return plantsCollection.findOneAndDelete({ id });
};

export const findAllPlants = async (): Promise<PlantDetails[]> => {
  return plantsCollection.find({});
};
