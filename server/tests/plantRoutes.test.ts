// server/tests/plantRoutes.test.ts
import request from 'supertest';
import { app } from '../server';
import * as plantService from '../services/plantService';
import { PlantDetails } from '../models/plantInterfaces';

jest.mock('../services/plantService');
jest.mock('../database/database'); // Mock the database module

// mock the plantService module
jest.mock('../services/plantService', () => ({
  fetchSpeciesList: jest.fn(),
  fetchPlantByName: jest.fn(),
  fetchPlantById: jest.fn(),
  findAllPlantsFromDb: jest.fn(),
  getPlantDetailsById: jest.fn(),
  createPlantInDb: jest.fn(),
  updatePlantDetails: jest.fn(),
  removePlantFromDb: jest.fn(),
}));

const mockPlantService = plantService as jest.Mocked<typeof plantService>;


// mock the database connection
describe('Plant Routes', () => {
  // Mock data setup and cleanup are assumed to be handled in the service mock

  // GET /db/plants
  describe('GET /db/plants', () => {
    it('should return a list of plants from the database', async () => {
      const mockPlants: PlantDetails[] = [
        {
          id: 0,
          common_name: "someCommonName",
          scientific_name: ["someScientificName"],
        },
        {
          id: 1,
          common_name: "anotherCommonName",
          scientific_name: ["anotherScientificName"],
        },
      ];

      // the actual service method is expected to return Promise<PlantDetails[]> on success,
      mockPlantService.findAllPlantsFromDb.mockResolvedValue(mockPlants);

      const response = await request(app).get('/db/plants');

      // debugging
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers, null, 2)}`);
      console.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlants);
    });
  });

  // GET /db/plants/:id
  describe('GET /db/plants/:id', () => {
    it('should return plant details from the database', async () => {
      const plantId = 1;
      const mockPlantDetails: PlantDetails = {
        id: 1,
        common_name: "Sample Plant",
        scientific_name: ["Sample Plantus Scientificus"],
      };

      // the actual service method is expected to return Promise<PlantDetails> on success,
      //mockPlantService.getPlantDetailsById.mockResolvedValue(mockPlantDetails);
      mockPlantService.getPlantDetailsById.mockResolvedValueOnce(mockPlantDetails);

      const response = await request(app).get(`/db/plants/${plantId}`);

      // debugging
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers, null, 2)}`);
      console.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlantDetails);
      //expect(mockPlantService.getPlantDetailsById).toHaveBeenCalledWith(plantId);
      expect(mockPlantService.getPlantDetailsById).toHaveBeenCalledWith(plantId.toString());
    });
  });

  // POST /db/plants
  describe('POST /db/plants', () => {
    it('should create a new plant in the database', async () => {
      const newPlantData = { // Removed id from the new plant data
        common_name: "someCommonName",
        scientific_name: ["someScientificName"],
      };

      const newPlantResponse: PlantDetails = {
        id: 1, // the id assigned by the database
        ...newPlantData,
      };

      mockPlantService.createPlantInDb.mockResolvedValue(newPlantResponse);


      const response = await request(app)
        .post('/db/plants')
        .send(newPlantData);

      // debugging
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers, null, 2)}`);
      console.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);

      expect(response.status).toBe(201);
      expect(response.body).toEqual(newPlantResponse);
    });
  });

  // PUT /db/plants/:id
  describe('PUT /db/plants/:id', () => {
    it('should update a plant', async () => {
      const plantId = "somePlantId";
      const updatedPlant: PlantDetails = {
        id: 1,
        common_name: "Updated Plant",
        scientific_name: ["Updated Plantus Scientificus"]
      };
      const requestBody = {
        // the data you want to update the plant with
        common_name: "Updated Plant",
        scientific_name: ["Updated Plantus Scientificus"]
      };

      // use mockResolvedValueOnce to mock the first call to `findPlantById`
      mockPlantService.updatePlantDetails.mockResolvedValue(updatedPlant);

      const response = await request(app)
        .put(`/db/plants/${plantId}`)
        .send(requestBody);

      // debugging
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers, null, 2)}`);
      console.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(updatedPlant);
      expect(mockPlantService.updatePlantDetails).toHaveBeenCalledWith(plantId, requestBody);
    });
  });

  // DELETE /db/plants/:id
  describe('DELETE /db/plants/:id', () => {
    it('should delete a plant', async () => {
      const plantId = "1"; 

      // The actual service method is expected to return Promise<void> on success,
      // hence the mock should resolve to undefined which is the value of a void promise resolution
      mockPlantService.removePlantFromDb.mockResolvedValue(undefined);

      const response = await request(app).delete(`/db/plants/${plantId}`);

      // debugging
      console.log(`Response Status: ${response.status}`);
      console.log(`Response Headers: ${JSON.stringify(response.headers, null, 2)}`);
      console.log(`Response Body: ${JSON.stringify(response.body, null, 2)}`);

      expect(response.status).toBe(204); // 204 No Content
      expect(mockPlantService.removePlantFromDb).toHaveBeenCalledWith(plantId);
    });
  });
});