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
  // Helper function to get nested value from an object using a path string
  private getNestedValue(obj: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
  }
  
  // validation
  private validateApiResponse<T>(data: any, schema: Joi.ObjectSchema<T>): T {
    const { value, error } = schema.validate(data);
    if (error) {
      // Constructing an enhanced error message that includes the problematic value
      const errorMessage = error.details.map((d) => {
        // Accessing the problematic value using the path in the error detail
        const errorValuePath = d.path.join('.');
        const errorValue = this.getNestedValue(data, errorValuePath);
  
        return `${d.message}, received: "${errorValuePath}": ${JSON.stringify(errorValue)}`;
      }).join(', ');
  
      throw new Error(`Validation error: ${errorMessage}`);
    }
    return value;
  }

  // api plant methods
  // Fetch species list with pagination
  public async fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${API_BASE_URL}/species-list`, {
      params: { key: API_KEY, page },
    });
    return data;
  }

  // Search plants by name with filters
  public async searchPlantByName(query: string, filters: any = {}): Promise<ApiResponse<PlantSummary>> {
    const params = { key: API_KEY, q: query, ...filters }; // Include filters in the request parameters
    const { data } = await axios.get<ApiResponse<PlantSummary>>(`${API_BASE_URL}/species-list`, { params });
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
  // Add a new plant to the database
  public async createPlantInDb(plantData: PlantDetails): Promise<PlantDetails> {
    return plantModel.createPlant(plantData);
  }

  // Fetch all plants from the database with pagination
  public async findAllPlantsWithPagination(limit: number, offset: number): Promise<{ plants: PlantDetails[], count: number }> {
    // Assuming that your plantModel has a method to count all plants
    const count = await plantModel.countAllPlants();

    // Assuming that your plantModel has a method to find plants with pagination
    const plants = await plantModel.findPlantsWithPagination(limit, offset);

    return { plants, count };
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
