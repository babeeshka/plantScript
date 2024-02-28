import axios from 'axios';
import Joi, { ValidationErrorItem } from 'joi';
import { ApiResponse, PlantSummary, PlantDetails } from '../models/plantInterfaces';
import { createPlant, findPlants, findPlantById, updatePlant, deletePlant } from '../models/plant';
import { findPlantByApiId } from '../database/database';
import plantSchema from '../schemas/plantSchema'; // Make sure this import path is correct

const API_KEY = process.env.PERENUAL_API_KEY; // Ensure this is set in .env
const BASE_URL = 'https://perenual.com/api';

class PlantService {
  private validateApiResponse<T>(data: any, schema: Joi.ObjectSchema): T {
    const { value, error } = schema.validate(data);
    if (error) {
      throw new Error(`Validation error: ${error.details.map(d => d.message).join(', ')}`);
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

  public async fetchPlantDetails(plantId: number): Promise<PlantDetails> {
    const response = await axios.get(`${process.env.BASE_URL}/species/details/${plantId}?key=${process.env.API_KEY}`);
    const validatedResponse = this.validateApiResponse<PlantDetails>(
      response.data, plantSchema);
    return validatedResponse;
  }

  public async getPlantByApiId(id: number): Promise<PlantDetails | null> {
    return findPlantByApiId(id);
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

const plantService = new PlantService();
export default plantService;