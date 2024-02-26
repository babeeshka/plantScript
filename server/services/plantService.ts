// /server/services/plantService.ts
import axios from 'axios';
import Joi from 'joi';
import { ApiResponse, PlantSummary, PlantDetails } from '../models/plantInterfaces';
import { createPlant, findPlants, findPlantById, updatePlant, deletePlant } from '../models/plant';
import plantSchema from '../schemas/plantSchema'; // Import Joi validation schema
import { ValidationErrorItem } from '@hapi/joi';

const API_KEY = process.env.PERENUAL_API_KEY; // Ensure this is set in .env
const BASE_URL = 'https://perenual.com/api';

class PlantService {
  private validateApiResponse<T>(data: any, schema: Joi.ObjectSchema<T>): T {
    const { value, error } = schema.validate(data);
    if (error) {
      throw new Error(`Validation failed: ${error.details.map((x: ValidationErrorItem) => x.message).join(', ')}`);
    }
    return value;
  }

  public async fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${BASE_URL}/species-list`, {
      params: { key: API_KEY, page },
    });
    return data;
  }

  public async searchPlantByName(query: string): Promise<ApiResponse<PlantSummary>> {
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${BASE_URL}/species-list`, {
      params: { key: API_KEY, q: query },
    });
    return data;
  }

  public async fetchPlantDetails(plantId: string): Promise<PlantDetails> {
    const { data } = await axios.get(`${BASE_URL}/species/details/${plantId}`, {
      params: { key: API_KEY },
    });
    return this.validateApiResponse<PlantDetails>(data, plantSchema);
  }

  public async createPlantInDb(plantData: PlantDetails): Promise<PlantDetails> {
    return createPlant(plantData);
  }

  public async findAllPlantsFromDb(): Promise<PlantDetails[]> {
    return findPlants();
  }

  public async getPlantDetailsById(plantId: string): Promise<PlantDetails | null> {
    return findPlantById(plantId);
  }

  public async updatePlantDetails(plantId: string, updateData: Partial<PlantDetails>): Promise<PlantDetails> {
    return updatePlant(plantId, updateData);
  }

  public async removePlantFromDb(plantId: string): Promise<void> {
    await deletePlant(plantId);
  }
}

export { PlantService };
  export function fetchSpeciesList() {
    throw new Error('Function not implemented.');
  }

  export function searchPlantByName(query: string) {
    throw new Error('Function not implemented.');
  }

  export function fetchPlantDetails(plantId: string) {
    throw new Error('Function not implemented.');
  }

  export function createPlantInDb(plantData: { common_name: string; scientific_name: string[]; }) {
    throw new Error('Function not implemented.');
  }

  export function findAllPlantsFromDb() {
    throw new Error('Function not implemented.');
  }

  export function getPlantDetailsById(plantId: string) {
    throw new Error('Function not implemented.');
  }

  export function updatePlantDetails(plantId: string, updateData: { common_name: string; scientific_name: string[]; }) {
    throw new Error('Function not implemented.');
  }

  export function removePlantFromDb(plantId: string) {
    throw new Error('Function not implemented.');
  }

