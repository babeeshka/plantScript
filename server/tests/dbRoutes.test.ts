import request from 'supertest';
import { app } from '../server'; // Adjust this import based on your actual server setup
import { PlantDetails } from '../models/plantInterfaces';
import { mockPlantDetails } from './mockData'; // Ensure this import matches your project structure

// Assuming database.ts exports functions that are used in the routes
jest.mock('../database/database', () => ({
  getPlants: jest.fn().mockResolvedValue([mockPlantDetails]),
  getPlantById: jest.fn().mockResolvedValue(mockPlantDetails),
  addPlant: jest.fn().mockResolvedValue(mockPlantDetails),
  updatePlant: jest.fn().mockResolvedValue({ ...mockPlantDetails, common_name: "Updated Name" }),
  deletePlant: jest.fn().mockResolvedValue(true) // Assuming it returns a boolean or void
}));

describe('Database Routes', () => {
  describe('GET /db/plants', () => {
    it('should return a list of plants', async () => {
      const response = await request(app).get('/db/plants');
      expect(response.status).toBe(200);
      expect(response.body).toEqual([mockPlantDetails]);
    });
  });

  describe('GET /db/plants/:id', () => {
    it('should return a plant by id', async () => {
      const response = await request(app).get(`/db/plants/${mockPlantDetails.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlantDetails);
    });
  });

  describe('POST /db/plants', () => {
    it('should add a new plant', async () => {
      const newPlantDetails: Omit<PlantDetails, 'id'> = { 
        common_name: "New Plant", 
        scientific_name: ["New Species"],
        // include other required properties based on your PlantDetails interface
      };
      const response = await request(app).post('/db/plants').send(newPlantDetails);
      expect(response.status).toBe(201);
      // Assuming the response includes the newly added plant, adjust as necessary
      expect(response.body).toMatchObject({ id: expect.any(String), ...newPlantDetails });
    });
  });

  describe('PUT /db/plants/:id', () => {
    it('should update a plant', async () => {
      const updates = { common_name: "Updated Name" };
      const response = await request(app).put(`/db/plants/${mockPlantDetails.id}`).send(updates);
      expect(response.status).toBe(200);
      expect(response.body.common_name).toEqual("Updated Name");
    });
  });

  describe('DELETE /db/plants/:id', () => {
    it('should delete a plant', async () => {
      const response = await request(app).delete(`/db/plants/${mockPlantDetails.id}`);
      expect(response.status).toBe(204);
    });
  });
});

// Make sure to adjust the endpoint URLs based on your actual API endpoints
