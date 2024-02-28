// Import dependencies
import plantService from '../services/plantService';
import axios from 'axios';
import { mockPlantDetails } from './mockData';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('apiRoutes tests', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  describe('fetchPlantDetails', () => {
    it('successfully fetches plant details from the API', async () => {
      // Setup
      const plantId = mockPlantDetails.id;
      mockedAxios.get.mockResolvedValue({ data: mockPlantDetails });

      // Execution
      const result = await plantService.fetchPlantDetails(plantId.toString());

      // Assertion
      expect(result).toEqual(mockPlantDetails);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining(`plants/${plantId}`));
    });
  });

  describe('fetchPlantsList', () => {
    it('successfully fetches list of plants', async () => {
      // Setup
      const mockPlantsList = [mockPlantDetails];
      mockedAxios.get.mockResolvedValue({ data: mockPlantsList });

      // Execution
      const result = await plantService.fetchSpeciesList();

      // Assertion
      expect(result).toEqual(mockPlantsList);
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('plants/list'));
    });
  });

  describe('createPlant', () => {
    it('successfully creates a new plant', async () => {
      // Setup
      mockedAxios.post.mockResolvedValue({ data: mockPlantDetails });

      // Execution
      const result = await plantService.createPlantInDb(mockPlantDetails);

      // Assertion
      expect(result).toEqual(mockPlantDetails);
      expect(mockedAxios.post).toHaveBeenCalledWith(expect.stringContaining('plants'), mockPlantDetails);
    });
  });

  describe('updatePlant', () => {
    it('successfully updates a plant', async () => {
      // Setup
      const updatedPlantDetails = { ...mockPlantDetails, common_name: "Updated Mock Plant" };
      mockedAxios.put.mockResolvedValue({ data: updatedPlantDetails });

      // Execution
      const result = await plantService.updatePlantDetails(updatedPlantDetails.id.toString(), updatedPlantDetails);

      // Assertion
      expect(result).toEqual(updatedPlantDetails);
      expect(mockedAxios.put).toHaveBeenCalledWith(expect.stringContaining(`plants/${updatedPlantDetails.id}`), updatedPlantDetails);
    });
  });

  describe('deletePlant', () => {
    it('successfully deletes a plant', async () => {
      // Setup
      const plantId = mockPlantDetails.id;
      mockedAxios.delete.mockResolvedValue({ data: { message: 'Plant deleted successfully' } });

      // Execution
      const result = await plantService.removePlantFromDb(plantId.toString());

      // Assertion
      expect(result).toEqual({ message: 'Plant deleted successfully' });
      expect(mockedAxios.delete).toHaveBeenCalledWith(expect.stringContaining(`plants/${plantId}`));
    });
  });

  // Reset Axios mock before each test
  beforeEach(() => {
    mockedAxios.get.mockReset();
    mockedAxios.post.mockReset();
    mockedAxios.put.mockReset();
    mockedAxios.delete.mockReset();
  });
});
