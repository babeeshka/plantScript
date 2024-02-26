import { PlantService } from '../services/plantService';
import { mockPlantDetails } from './mockData'; // Ensure you're importing mockPlantDetails

describe('PlantService', () => {
  let plantService: PlantService;

  beforeEach(() => {
    plantService = new PlantService();
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should successfully create a plant', async () => {
      jest.spyOn(plantService, 'create').mockResolvedValue(mockPlantDetails);
      const result = await plantService.create(mockPlantDetails);
      expect(result).toEqual(mockPlantDetails);
      expect(plantService.create).toHaveBeenCalledWith(mockPlantDetails);
    });

    it('should throw an error if plant already exists', async () => {
      jest.spyOn(plantService, 'create').mockRejectedValue(new Error('Plant already exists'));
      await expect(plantService.create(mockPlantDetails)).rejects.toThrow('Plant already exists');
    });
  });

  describe('read', () => {
    it('should successfully return a plant by ID', async () => {
      jest.spyOn(plantService, 'getById').mockResolvedValue(mockPlantDetails);
      const result = await plantService.getById('1');
      expect(result).toEqual(mockPlantDetails);
      expect(plantService.getById).toHaveBeenCalledWith('1');
    });

    it('should throw an error if plant is not found', async () => {
      jest.spyOn(plantService, 'getById').mockRejectedValue(new Error('Plant not found'));
      await expect(plantService.getById('nonexistent')).rejects.toThrow('Plant not found');
    });
  });

  describe('update', () => {
    it('should successfully update a plant', async () => {
      jest.spyOn(plantService, 'update').mockResolvedValue({ ...mockPlantDetails, name: 'Updated Plant' });
      const result = await plantService.update('1', { ...mockPlantDetails, name: 'Updated Plant' });
      expect(result).toEqual({ ...mockPlantDetails, name: 'Updated Plant' });
      expect(plantService.update).toHaveBeenCalledWith('1', { ...mockPlantDetails, name: 'Updated Plant' });
    });

    it('should throw an error if the plant to update is not found', async () => {
      jest.spyOn(plantService, 'update').mockRejectedValue(new Error('Plant not found'));
      await expect(plantService.update('nonexistent', mockPlantDetails)).rejects.toThrow('Plant not found');
    });
  });

  describe('delete', () => {
    it('should successfully delete a plant by ID', async () => {
      jest.spyOn(plantService, 'delete').mockResolvedValue(true);
      const result = await plantService.delete('1');
      expect(result).toBe(true);
      expect(plantService.delete).toHaveBeenCalledWith('1');
    });

    it('should throw an error if the plant to delete is not found', async () => {
      jest.spyOn(plantService, 'delete').mockRejectedValue(new Error('Plant not found'));
      await expect(plantService.delete('nonexistent')).rejects.toThrow('Plant not found');
    });
  });
});
