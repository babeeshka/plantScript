import supertest from 'supertest';
import { app } from '../server';
import { PlantSummary, PlantDetails, ApiResponse } from '../models/plantInterfaces';
import plantService from '../services/plantService';

// TypeScript types for jest mocks
jest.mock('../services/plantService', () => ({
  fetchSpeciesList: jest.fn(),
  fetchPlantByName: jest.fn(),
  fetchPlantById: jest.fn(),
}));

// Ensure the mocked functions have their correct types for TypeScript
const mockedFetchSpeciesList = plantService.fetchSpeciesList as jest.MockedFunction<typeof plantService.fetchSpeciesList>;
const mockedFetchPlantById = plantService.fetchPlantDetails as jest.MockedFunction<typeof plantService.fetchPlantDetails>;

describe('Plant API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('GET /api/plants - should return a list of plants', async () => {
    const mockPlants: ApiResponse<PlantSummary> = {
      data: [
        {
          id: '1',
          common_name: 'European Silver Fir',
          scientific_name: ['Abies alba'],
          cycle: 'Perennial',
          watering: 'Frequent',
          sunlight: ['full sun'],
          default_image: {
            license: 0,
            license_name: 'CC0',
            license_url: 'https://creativecommons.org/publicdomain/zero/1.0/',
            original_url: 'https://perenual.com/images/abies-alba.jpg',
            regular_url: 'https://perenual.com/images/abies-alba.jpg',
            medium_url: 'https://perenual.com/images/abies-alba.jpg',
            small_url: 'https://perenual.com/images/abies-alba.jpg',
            thumbnail: 'https://perenual.com/images/abies-alba.jpg',
          },
        },
        // Add other mock plants as needed
      ],
      to: 2,
      per_page: 10,
      current_page: 1,
      from: 1,
      last_page: 1,
      total: 2,
    };
    mockedFetchSpeciesList.mockResolvedValue(mockPlants);

    const response = await supertest(app).get('/api/plants?page=1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlants.data);
  });

  it('GET /api/plants/:id - should return plant details', async () => {
    const mockPlantDetails: ApiResponse<PlantDetails> = {
      data: [
        {
          id: '2',
          common_name: 'Mock Plant',
          scientific_name: ['Mockus plantus'],
          // Add other mock plant details as needed
        },
      ],
      to: 1,
      per_page: 1,
      current_page: 1,
      from: 1,
      last_page: 1,
      total: 1,
    };
    mockedFetchPlantById.mockResolvedValue(mockPlantDetails.data[0]);

    const response = await supertest(app).get('/api/plants/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlantDetails.data[0]); // Assuming the endpoint is expected to return a single plant detail
  });

  // Add more tests as needed for other endpoints
});
