import db from '../database/database';
import { PlantDetails } from '@rootTypes/plantInterfaces';
import Joi from 'joi';
import plantSchema from '../schemas/plantSchema';

export const plantsCollection = db.get('plants');

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
  return plant ? validatePlant(plant) : null;
};

export const createPlant = async (plantData: Partial<PlantDetails>): Promise<PlantDetails> => {
  let validatedData;
  if (plantData.id === undefined) {
    // This is a manually entered plant
    const lowestId = await plantsCollection.findOne({}, { sort: { id: 1 } });
    const newId = lowestId ? Math.min(lowestId.id - 1, -1) : -1;
    validatedData = validatePlant({ ...plantData, id: newId });
  } else {
    // This is an API-sourced plant
    validatedData = validatePlant(plantData);
  }

  const plantToInsert = {
    ...validatedData,
    dateAdded: new Date(),
    isManualEntry: plantData.id === undefined
  };

  return plantsCollection.insert(plantToInsert);
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

export const countAllPlants = async (): Promise<number> => {
  return plantsCollection.count();
};

export const findPlantsWithPagination = async (query: any, limit: number, offset: number): Promise<PlantDetails[]> => {
  const options = { 
    limit: limit, 
    skip: offset 
  };
  return plantsCollection.find(query, options);
};
