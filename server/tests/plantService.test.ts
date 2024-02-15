import { fetchSpeciesList, searchPlantByName, fetchPlantDetails } from '../services/plantService';
import axios from 'axios';
import { ApiResponse, PlantDetails, PlantSummary } from '../models/plantInterfaces';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const API_KEY = process.env.PERENUAL_API_KEY; // Ensure this is set in your environment
const BASE_URL = 'https://perenual.com/api';

describe('Plant Service Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks to ensure a clean state for each test
  });

  describe('fetchSpeciesList', () => {
    it('should fetch species list correctly', async () => {
        const mockResponse: ApiResponse<PlantSummary> = {
          data: [{
            id: 1,
            common_name: "European Silver Fir",
            scientific_name: ["Abies alba"],
            cycle: "Perennial",
            watering: "Frequent",
            sunlight: ["full sun"],
          }],
          to: 30,
          per_page: 30,
          current_page: 1, 
          from: 1, 
          last_page: 337,
          total: 10102
        };
      mockedAxios.get.mockResolvedValue({ data: mockResponse });

      const response = await fetchSpeciesList(1);

      expect(response.data).toEqual(expect.arrayContaining([expect.objectContaining({
        id: 1,
        common_name: "European Silver Fir",
        scientific_name: ["Abies alba"],
      })]));
      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species-list`, {
        params: { key: API_KEY, page: 1 },
      });
    });
  });

  describe('searchPlantByName', () => {
    it('should search plant by name correctly', async () => {
      // Setup a new mock response specific to this test
      const mockSearchResponse = {
        data: [{
          id: 2,
          common_name: "Mocha Rose Big Leaf Maple",
          scientific_name: ["Acer macrophyllum 'Mocha Rose'"],          
        }],
      };

      mockedAxios.get.mockResolvedValue({ data: mockSearchResponse });

      const response = await searchPlantByName('rose');

      expect(response.data).toEqual(expect.arrayContaining([expect.objectContaining({
        id: 2,
        common_name: "Mocha Rose Big Leaf Maple",
      })]));
      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species-list`, {
        params: { key: API_KEY, q: 'rose' },
      });
    });
  });

  describe('fetchPlantDetails', () => {
    it('should fetch plant details correctly', async () => {
      const mockDetailsResponse: PlantDetails = {
        id: 1,
        common_name: "European Silver Fir",
        scientific_name: ["Abies alba"],
        cycle: "Perennial",
        watering: "Frequent",
        sunlight: ["full sun"],
      };

      mockedAxios.get.mockResolvedValue({ data: mockDetailsResponse });

      const response = await fetchPlantDetails(1);

      expect(response).toEqual(expect.objectContaining({
        id: 1,
        common_name: "European Silver Fir",
        scientific_name: ["Abies alba"],
      }));
      expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species/details/1`, {
        params: { key: API_KEY },
      });
    });
  });
});
