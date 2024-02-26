import {
  fetchSpeciesList,
  searchPlantByName,
  fetchPlantDetails,
  createPlantInDb,
  findAllPlantsFromDb,
  getPlantDetailsById,
  updatePlantDetails,
  removePlantFromDb,
} from '../services/plantService';
import * as plantModel from '../models/plant';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('plantService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchSpeciesList', () => {
    it('fetches species list from API', async () => {
      const mockResponse = { data: { results: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const result = await fetchSpeciesList();
      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/species-list'), expect.any(Object));
    });
  });

  describe('searchPlantByName', () => {
    it('searches for a plant by name', async () => {
      const mockResponse = { data: { results: [] } };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const query = 'Rose';
      const result = await searchPlantByName(query);
      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('/species-list'), {
        params: expect.objectContaining({ q: query }),
      });
    });
  });

  describe('fetchPlantDetails', () => {
    it('fetches plant details', async () => {
      const mockResponse = { data: {} };
      mockedAxios.get.mockResolvedValue(mockResponse);

      const plantId = '1';
      const result = await fetchPlantDetails(plantId);
      expect(result).toEqual(mockResponse.data);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`/species/details/${plantId}`), expect.any(Object));
    });
  });

  describe('Database interaction functions', () => {
    beforeEach(() => {
      jest.spyOn(plantModel, 'createPlant').mockResolvedValue({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
      jest.spyOn(plantModel, 'findPlants').mockResolvedValue([{ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] }, { id: '2', common_name: 'Lily', scientific_name: ['Lilium'] }]);
      jest.spyOn(plantModel, 'findPlantById').mockResolvedValue({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
      jest.spyOn(plantModel, 'updatePlant').mockResolvedValue({ id: '1', common_name: 'Rose', scientific_name: ['Rosa'] });
      jest.spyOn(plantModel, 'deletePlant').mockResolvedValue({ message: 'Success' });
    });

    it('creates a plant in the database', async () => {
      const plantData = { id: '1', common_name: 'Rose' , scientific_name: ['Rosa']};
      const result = await createPlantInDb(plantData);
      expect(plantModel.createPlant).toHaveBeenCalledWith(plantData);
    });

    it('finds all plants from the database', async () => {
      const result = await findAllPlantsFromDb();
      expect(plantModel.findPlants).toHaveBeenCalled();
    });

    it('gets plant details by ID from the database', async () => {
      const plantId = '1';
      const result = await getPlantDetailsById(plantId);
      expect(plantModel.findPlantById).toHaveBeenCalledWith(plantId);
    });

    it('updates plant details in the database', async () => {
      const plantId = '1';
      const updateData = { common_name: 'Updated Rose' };
      const result = await updatePlantDetails(plantId, updateData);
      expect(plantModel.updatePlant).toHaveBeenCalledWith(plantId, updateData);
    });

    it('removes a plant from the database', async () => {
      const plantId = '1';
      await removePlantFromDb(plantId);
      expect(plantModel.deletePlant).toHaveBeenCalledWith(plantId);
    });
  });
});
