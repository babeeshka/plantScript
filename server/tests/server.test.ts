import supertest from 'supertest';
import { app } from '../server';
import mockAxios from 'jest-mock-axios';
import { PlantSummary, PlantDetails } from '../models/plantInterfaces';
import { fetchPlantDetails } from '../services/plantService';

// mock the plantService module
jest.mock('../services/plantService', () => ({
  fetchSpeciesList: jest.fn(),
  fetchPlantByName: jest.fn(),
  fetchPlantById: jest.fn(),
}));

describe('Plant API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks between tests
  });

  it('GET /api/plants - should return a list of plants', async () => {
    const mockPlants: PlantSummary[] = [
      {
        id: 1,
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
    ];
    const fetchSpeciesList = require('../services/plantService').fetchSpeciesList;
    fetchSpeciesList.mockResolvedValue(mockPlants);

    const response = await supertest(app).get('/api/plants?page=1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlants);
  });

  it('GET /api/plants/:id - should return plant details', async () => {
    const mockPlant: PlantDetails = {
      id: 2,
      common_name: 'Common Fig',
      scientific_name: ['Ficus carica'],
      cycle: 'Perennial',
      watering: 'Moderate',
      sunlight: ['full sun', 'partial shade'],
      family: 'Moraceae',
      origin: ['Western Asia', 'Mediterranean'],
      type: 'Tree',
      dimension: '10-30 ft',
      dimensions: {
        type: 'Height',
        min_value: 10,
        max_value: 30,
        unit: 'ft',
      },
      attracts: ['Birds', 'Bees'],
      propagation: ['Cuttings', 'Layering', 'Seed'],
      hardiness: {
        min: '6',
        max: '9',
      },
      watering_period: 'Weekly',
      watering_general_benchmark: {
        value: '1',
        unit: 'in',
      },
      growth_rate: 'Moderate',
      drought_tolerant: true,
      salt_tolerant: false,
      thorny: false,
      invasive: false,
      tropical: false,
      indoor: true,
      care_level: 'Easy',
      pest_susceptibility: ['Fig Mosaic Virus', 'Root Knot Nematodes'],
      flowers: true,
      flowering_season: 'Summer',
      flower_color: 'Green',
      cones: false,
      fruits: true,
      edible_fruit_taste_profile: 'Sweet',
      leaf: true,
      leaf_color: ['Green', 'Yellow'],
      medicinal: true,
      poisonous_to_humans: 0,
      poisonous_to_pets: 0,
      description: 'The common fig is a deciduous tree that is native to the Mediterranean and Western Asia. It is a member of the Moraceae family, which also includes mulberries, breadfruit, and osage-orange. The tree can grow up to 10-30 feet tall and has a moderate growth rate. It is drought tolerant and can be grown indoors. The tree produces flowers and fruits, which are edible and have a sweet taste profile. The leaves are green and yellow, and the tree is used for medicinal purposes. The common fig is not poisonous to humans or pets.',

    };
    const fetchPlantDetails = require('../services/plantService').fetchPlantDetails;
    fetchPlantDetails.mockResolvedValue(mockPlant);

    const response = await supertest(app).get('/api/plants/2');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPlant);
  });

  // Add more tests as needed
});
