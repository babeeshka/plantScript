import plantService from '../services/plantService';
import * as plantModel from '../models/plant';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock('../models/plant', () => ({
  createPlant: jest.fn(),
  findPlants: jest.fn(),
  findPlantById: jest.fn(),
  updatePlant: jest.fn(),
  deletePlant: jest.fn(),
}));

describe('plantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSpeciesList', () => {
    it('fetches species list from API', async () => {
      const mockResponse = { data: { results: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await plantService.fetchSpeciesList();
      expect(result).toEqual(mockResponse.data); // Use .data directly if it contains the results key
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/species-list'), expect.any(Object));
    });
  });

  describe('searchPlantByName', () => {
    it('searches for a plant by name', async () => {
      const mockResponse = { data: { results: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const query = 'Rose';
      const result = await plantService.searchPlantByName(query);
      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/search'), {
        params: { q: query },
      });
    });
  });

  describe('fetchPlantDetails', () => {
    it('fetches plant details', async () => {
      const mockResponse = { data: {} };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const plantId = "1";
      const result = await plantService.fetchPlantDetails(plantId);
      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`/species/details/${plantId}`), expect.any(Object));
    });
  });

  describe('Database interaction functions', () => {
    beforeEach(() => {
      jest.spyOn(plantModel, 'createPlant').mockResolvedValue({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
      jest.spyOn(plantModel, 'findPlants').mockResolvedValue([{ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] }, { id: '2', common_name: 'Lily', scientific_name: ['Lilium'] }]);
      jest.spyOn(plantModel, 'findPlantById').mockResolvedValue({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
      jest.spyOn(plantModel, 'updatePlant').mockResolvedValue({ id: '1', common_name: 'Updated Rose', scientific_name: ['Rosa']});
      jest.spyOn(plantModel, 'deletePlant').mockResolvedValue({ message: 'Success' });
    });

    it('creates a plant in the database', async () => {
      const plantData = { id: '1', common_name: 'Rose', scientific_name: ['Rosa'] };
      const result = await plantService.createPlantInDb(plantData);
      expect(plantModel.createPlant).toHaveBeenCalledWith(plantData);
      expect(result).toEqual({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
    });

    it('finds all plants from the database', async () => {
      const result = await plantService.findAllPlantsFromDb();
      expect(plantModel.findPlants).toHaveBeenCalled();
      expect(result).toEqual([{ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] }, { id: '2', common_name: 'Lily', scientific_name: ['Lilium'] }]);
    });

    it('gets plant details by ID from the database', async () => {
      const plantId = '1';
      const result = await plantService.getPlantDetailsById(plantId);
      expect(plantModel.findPlantById).toHaveBeenCalledWith(plantId);
      expect(result).toEqual({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
    });

    it('updates plant details in the database', async () => {
      const plantId = '1';
      const updateData = { common_name: 'Updated Rose', scientific_name: ['Rosa'] };
      const result = await plantService.updatePlantDetails(plantId, updateData);
      expect(plantModel.updatePlant).toHaveBeenCalledWith(plantId, updateData);
      expect(result).toEqual({ id: '1', common_name: 'Updated Rose', scientific_name: ['Rosa'] });
    });

    it('deletes a plant from the database', async () => {
      const plantId = '1';
      const result = await plantService.removePlantFromDb(plantId);
      expect(plantModel.deletePlant).toHaveBeenCalledWith(plantId);
      expect(result).toEqual({ message: 'Success' });
    });
  });
});