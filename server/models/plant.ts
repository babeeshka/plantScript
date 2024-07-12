import db from '../database/database';
import { PlantDetails } from '@rootTypes/plantInterfaces';
import { ObjectId } from 'mongodb';
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

export const findPlantByAnyId = async (id: number | string): Promise<PlantDetails | null> => {
  console.log(`Searching for plant with id: ${id}`);
  let plant;

  if (typeof id === 'string') {
    if (ObjectId.isValid(id)) {
      console.log('Searching by MongoDB ObjectId');
      plant = await plantsCollection.findOne({ _id: new ObjectId(id) });
    }
    if (!plant) {
      console.log('Searching by customId');
      plant = await plantsCollection.findOne({ customId: id });
    }
  }

  if (!plant) {
    console.log('Searching by numeric id');
    plant = await plantsCollection.findOne({ id: Number(id) });
  }

  console.log('Found plant:', plant);
  return plant;
};

export const createPlant = async (plantData: Partial<PlantDetails>): Promise<PlantDetails> => {
  let validatedData;
  if (plantData.id === undefined) {
    // This is a manually entered plant
    const customId = `MANUAL_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`;
    validatedData = validatePlant({ ...plantData, customId, id: -1 }); // Use -1 or any other placeholder for id
  } else {
    // This is an API-sourced plant
    validatedData = validatePlant(plantData);
  }

  const plantToInsert = {
    ...validatedData,
    dateAdded: new Date(),
    isManualEntry: plantData.id === undefined
  };

  const insertedPlant = await plantsCollection.insert(plantToInsert);

  return {
    ...insertedPlant,
    _id: insertedPlant._id.toString() // Convert ObjectId to string
  };
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