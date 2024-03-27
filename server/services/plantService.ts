// /services/plantService.ts
import dotenv from 'dotenv';
import * as plantModel from '../models/plant';
import { ApiResponse, PlantSummary, PlantDetails } from '@rootTypes/plantInterfaces';
import Joi, { ValidationErrorItem } from 'joi';
import axios from 'axios';
import plantSchema from '../schemas/plantSchema';

dotenv.config({ path: '../.env' });

const API_BASE_URL = 'https://perenual.com/api';
const API_KEY = process.env.PERENUAL_API_KEY;

class PlantService {
  // validation
  private validateApiResponse<T>(data: any, schema: Joi.ObjectSchema<T>): T {
    const { value, error } = schema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
    }
    return value;
  }

  // Fetch species list with pagination
  public async fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${API_BASE_URL}/species-list`, {
      params: { key: API_KEY, page },
    });
    return data;
  }

  // Search plants by name
  public async searchPlantByName(query: string): Promise<ApiResponse<PlantSummary>> {
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${API_BASE_URL}/species-list`, {
      params: { key: API_KEY, q: query },
    });
    console.log(`Search results for "${query}":`, data);
    return data;
  }

  // Fetch plant details by ID and validate response
  public async fetchPlantDetails(id: number): Promise<PlantDetails> {
    const response = await axios.get(`${API_BASE_URL}/species/details/${id}`, {
      params: { key: API_KEY },
    });
    return this.validateApiResponse<PlantDetails>(response.data, plantSchema);
  }

  // database plant methods
  public async createPlantInDb(plantData: PlantDetails): Promise<PlantDetails> {
    return plantModel.createPlant(plantData);
  }

  // Fetch all plants from database
  public async findAllPlantsFromDb(): Promise<PlantDetails[]> {
    return plantModel.findAllPlants();
  }

  // Fetch plant by API ID from database
  public async getPlantByApiId(id: number): Promise<PlantDetails | null> {
    return plantModel.findPlantByApiId(id);
  }

  // Update plant details in database
  public async updatePlantDetails(apiId: number, updateData: Partial<PlantDetails>): Promise<PlantDetails | null> {
    return plantModel.updatePlantByApiId(apiId, updateData);
  }

  // Remove plant from database
  public async removePlantFromDb(apiId: number): Promise<PlantDetails | null> {
    return plantModel.deletePlantByApiId(apiId);
  }

  // Fetch a random plant
  public async fetchRandomPlant(): Promise<PlantDetails> {
    const randomId: number = Math.floor(Math.random() * 10102) + 1;

    try {
      console.log(`Fetching plant details for ID: ${randomId}`);
      const response = await axios.get(`${API_BASE_URL}/species/details/${randomId}`, {
        params: { key: API_KEY },
      });

      return this.validateApiResponse<PlantDetails>(response.data, plantSchema);
    } catch (error: unknown) {
      console.error(`Error fetching plant details for ID ${randomId}:`, error);

      if (error instanceof Error) {
        console.log(error.message);
      }

      throw error;
    }
  }
}

  export const plantService = new PlantService();
