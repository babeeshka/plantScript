import { ApiResponse, PlantSummary, PlantDetails } from '../models/plantInterfaces';

// API utility functions
import axios from 'axios';

const API_KEY = process.env.PERENUAL_API_KEY; // ensure this is set in .env
const BASE_URL = 'https://perenual.com/api';

async function fetchSpeciesList(page: number = 1): Promise<ApiResponse<PlantSummary>> {
  const response = await axios.get(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, page },
  });
  return response.data;
}

async function searchPlantByName(query: string): Promise<ApiResponse<PlantSummary>> {
  const response = await axios.get(`${BASE_URL}/species-list`, {
    params: { key: API_KEY, q: query },
  });
  return response.data;
}

async function fetchPlantDetails(plantId: number): Promise<PlantDetails> {
  const response = await axios.get(`${BASE_URL}/species/details/${plantId}`, {
    params: { key: API_KEY },
  });
  return response.data;
}
