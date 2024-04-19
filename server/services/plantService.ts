// /services/plantService.ts
import dotenv from 'dotenv';
import * as plantModel from '../models/plant';
import { ApiResponse, PlantSummary, PlantDetails, PaginationParams } from '@rootTypes/plantInterfaces';
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
  public async fetchSpeciesList(page: number): Promise<ApiResponse<PlantSummary>> {
    try {
      console.log(`Fetching species list for page: ${page}`);
      const params = { key: API_KEY, page };
      console.log(`API request parameters: `, params);
      const response = await axios.get<ApiResponse<PlantSummary>>(`${API_BASE_URL}/species-list`, {
        params: params,
      });
      console.log(`API response received: `, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching species list for page ${page}: `, error);
      throw error; // Rethrow or handle as needed
    }
  }

  // Search plants by name with filters and pagination
  public async searchPlantByName(query: string, filters: any = {}, page: number = 1): Promise<ApiResponse<PlantSummary>> {
    const params = { key: API_KEY, q: query, ...filters, page };
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
  public async findAllPlantsWithPagination(params: PaginationParams): Promise<{ plants: PlantDetails[], count: number }> {
    const { limit, offset, searchTerm, filters = {} } = params;
    const query: any = {};

    if (searchTerm) {
      // Assuming a text index exists for fields you want to search
      query.$text = { $search: searchTerm };
    }

    // Apply each filter only if it's true since MongoDB will filter by the boolean value true
    Object.entries(filters).forEach(([key, value]) => {
      if (typeof value === 'boolean') {
        if (value === false) {
          // Ensure only documents where the field is explicitly false are matched
          query[key] = { $eq: false };
        } else {
          // Field is true
          query[key] = true;
        }
      }
    });

    console.log('Query:', query);

    // Retrieve the filtered and paginated results
    const plants = await plantModel.findPlantsWithPagination(query, limit, offset);
    const count = await plantModel.plantsCollection.count(query);  // Count after filters are applied

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
