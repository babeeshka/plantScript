// /server/services/plantService.ts
import axios from 'axios';
import Joi from 'joi';
import { ApiResponse, PlantSummary, PlantDetails } from '../models/plantInterfaces';
import { createPlant, findPlants, findPlantById, updatePlant, deletePlant } from '../models/plant';
import plantSchema from '../schemas/plantSchema'; // Import Joi validation schema
import { ValidationErrorItem } from '@hapi/joi';

const API_KEY = process.env.PERENUAL_API_KEY; // Ensure this is set in .env
const BASE_URL = 'https://perenual.com/api';

// helper function for validating API response against Joi schema
const validateApiResponse = <T>(data: any, schema: Joi.ObjectSchema<T>): T => {
  const { value, error } = schema.validate(data);
  if (error) {
    throw new Error(`Validation failed: ${error.details.map((x: ValidationErrorItem) => x.message).join(', ')}`);
  }
  return value;
};
// functions to interact with the external API
export async function fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
  const { data } = await axios.get<ApiResponse<PlantSummary>>(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, page },
  });
  // Optionally validate data here if you have a Joi schema for ApiResponse<PlantSummary>
  return data;
}

export async function searchPlantByName(query: string): Promise<ApiResponse<PlantSummary>> {
  const { data } = await axios.get<ApiResponse<PlantSummary>>(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, q: query },
  });
  // Optionally validate data here
  return data;
}

export async function fetchPlantDetails(plantId: string): Promise<PlantDetails> {
  const { data } = await axios.get(`${BASE_URL}/species/details/${plantId}`, {
    params: { key: API_KEY },
  });
  // Validate the response with Joi schema
  return validateApiResponse<PlantDetails>(data, plantSchema);
}

// database interaction functions
export async function createPlantInDb(plantData: PlantDetails): Promise<PlantDetails> {
  // Ensure plantData matches PlantDetails interface; validation occurs inside createPlant
  return createPlant(plantData);
}

export async function findAllPlantsFromDb(): Promise<PlantDetails[]> {
  return findPlants();
}

export async function getPlantDetailsById(plantId: string): Promise<PlantDetails | null> {
  return findPlantById(plantId);
}

export async function updatePlantDetails(plantId: string, updateData: Partial<PlantDetails>): Promise<PlantDetails> {
  return updatePlant(plantId, updateData);
}

export async function removePlantFromDb(plantId: string): Promise<void> {
  await deletePlant(plantId);
  // Function is expected to return Promise<void>, so no return statement is needed
}
