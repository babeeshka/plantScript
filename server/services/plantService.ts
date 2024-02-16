import { ApiResponse, PlantSummary, PlantDetails } from '../models/plantInterfaces';
import { createPlant, findPlants, findPlantById, updatePlant, deletePlant } from '../models/plant';
import axios from 'axios';

const API_KEY = process.env.PERENUAL_API_KEY; // Ensure this is set in .env
const BASE_URL = 'https://perenual.com/api';

// Functions to interact with the external API
export async function fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
  const response = await axios.get(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, page },
  });
  return response.data;
}

export async function findAllPlants(): Promise<ApiResponse<PlantSummary>> {
  const response = await axios.get(`${BASE_URL}/species-list`, {
    params: { key: API_KEY },
  });
  return response.data;
}

export async function searchPlantByName(query: string): Promise<ApiResponse<PlantSummary>> {
  const response = await axios.get(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, q: query },
  });
  return response.data;
}

export async function fetchPlantDetails(plantId: number): Promise<PlantDetails> {
  const response = await axios.get(`${BASE_URL}/species/details/${plantId}`, {
    params: { key: API_KEY },
  });
  return response.data;
}

// Database interaction functions
export async function createPlantInDb(plantData: PlantDetails): Promise<PlantDetails> {
  return createPlant(plantData); // Assuming create function returns the created plant
}

export async function getPlantDetailsById(plantId: string): Promise<PlantDetails | null> {
  return findPlantById(plantId); // Assuming getPlantById function returns the plant or null if not found
}

export async function updatePlantDetails(plantId: string, updateData: Partial<PlantDetails>): Promise<PlantDetails> {
  return updatePlant(plantId, updateData); // Assuming updatePlant function updates and returns the updated plant
}

export async function removePlantFromDb(plantId: string): Promise<void> {
  await deletePlant(plantId); 
  // await the deletion 
  // no return statement needed since the function is expected to return Promise<void>
}
