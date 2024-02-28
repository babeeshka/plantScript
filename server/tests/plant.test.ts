import plantService from '../services/plantService';
import { mockPlantDetails } from './mockData'; // Ensure these are correctly imported or defined
import { PlantDetails } from '../models/plantInterfaces';

describe('PlantService', () => {
  beforeAll(() => {
    const mockPlantService = plantService;
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Ensure mocks are cleared after each test
  });

  describe('createPlantInDb', () => {
    it('should successfully create a plant and return the created plant details', async () => {
      jest.spyOn(plantService, 'createPlantInDb').mockResolvedValue(mockPlantDetails as PlantDetails);
      const result = await plantService.createPlantInDb(mockPlantDetails);
      expect(result).toEqual(mockPlantDetails);
      expect(plantService.createPlantInDb).toHaveBeenCalledWith(mockPlantDetails);
    });

    it('should throw an error if the plant cannot be created', async () => {
      const errorMessage = 'Unable to create plant';
      jest.spyOn(plantService, 'createPlantInDb').mockRejectedValue(new Error(errorMessage));
      await expect(plantService.createPlantInDb(mockPlantDetails)).rejects.toThrow(errorMessage);
    });
  });

  describe('getPlantDetailsById', () => {
    it('should return plant details for a given id', async () => {
      jest.spyOn(plantService, 'getPlantDetailsById').mockResolvedValue(mockPlantDetails as PlantDetails);
      const result = await plantService.getPlantDetailsById('1');
      expect(result).toEqual(mockPlantDetails);
      expect(plantService.getPlantDetailsById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if no plant is found for the given id', async () => {
      const errorMessage = 'Plant not found';
      jest.spyOn(plantService, 'getPlantDetailsById').mockRejectedValue(new Error(errorMessage));
      await expect(plantService.getPlantDetailsById('999')).rejects.toThrow(errorMessage);
    });
  });

  describe('updatePlantDetails', () => {
    it('should update and return the updated plant details', async () => {
      jest.spyOn(plantService, 'updatePlantDetails').mockResolvedValue(mockPlantDetails as PlantDetails);
      const result = await plantService.updatePlantDetails('1', mockPlantDetails);
      expect(result).toEqual(mockPlantDetails);
      expect(plantService.updatePlantDetails).toHaveBeenCalledWith('1', mockPlantDetails);
    });

    it('should throw an error if the update fails', async () => {
      const errorMessage = 'Unable to update plant';
      jest.spyOn(plantService, 'updatePlantDetails').mockRejectedValue(new Error(errorMessage));
      await expect(plantService.updatePlantDetails('1', mockPlantDetails)).rejects.toThrow(errorMessage);
    });
  });

  describe('removePlantFromDb', () => {
    it('should successfully remove a plant and return true', async () => {
      jest.spyOn(plantService, 'removePlantFromDb').mockResolvedValue();
      const result = await plantService.removePlantFromDb('1');
      expect(result).toBe(true);
      expect(plantService.removePlantFromDb).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the plant cannot be removed', async () => {
      const errorMessage = 'Unable to remove plant';
      jest.spyOn(plantService, 'removePlantFromDb').mockRejectedValue(new Error(errorMessage));
      await expect(plantService.removePlantFromDb('999')).rejects.toThrow(errorMessage);
    });
  });

  // Add more tests as necessary for other methods in your PlantService
});
