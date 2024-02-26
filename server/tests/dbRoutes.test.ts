// dbPlantRoutes.test.ts
import request from 'supertest';
import { app } from '../server';
import { PlantDetails } from '../models/plantInterfaces';
import db from '../database/database';
import { jest } from '@jest/globals';

// Mock the database module
jest.mock('../database/database', () => {
    const plantsCollectionMock = {
        find: jest.fn().mockResolvedValue(),
        findOne: jest.fn().mockResolvedValue(null),
        insert: jest.fn().mockResolvedValue({} as PlantDetails),
        update: jest.fn(),
        remove: jest.fn(),
    };
    return {
        get: jest.fn(() => plantsCollectionMock),
        close: jest.fn(),
    };
});


// Mock plantService
jest.mock('../services/plantService', () => ({
    findAllPlantsFromDb: jest.fn(),
    getPlantDetailsById: jest.fn(),
    createPlantInDb: jest.fn(),
    updatePlantDetails: jest.fn(),
    removePlantFromDb: jest.fn(),
}));

const mockPlantService = require('../services/plantService');

describe('DB Plant Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return a list of plants from the database', async () => {
        const mockPlants: PlantDetails[] = [
            { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] },
            { id: '1', common_name: "anotherCommonName", scientific_name: ["anotherScientificName"] },
        ];

        mockPlantService.findAllPlantsFromDb.mockResolvedValue(mockPlants as PlantDetails[]);

        const response = await request(app).get('/db/plants');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlants);
    });

    // Add more tests for other CRUD operations here...
    it('should return a plant by id from the database', async () => {
        const mockPlant: PlantDetails = { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.getPlantDetailsById.mockResolvedValue(mockPlant as PlantDetails | null);

        const response = await request(app).get('/db/plants/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlant);
    });

    it('should create a new plant in the database', async () => {
        const newPlant: PlantDetails = { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.createPlantInDb.mockResolvedValue(newPlant);

        const response = await request(app).post('/db/plants').send(newPlant);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newPlant);
    });

    it('should update a plant in the database', async () => {
        const updatedPlant: PlantDetails = { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.updatePlantDetails.mockResolvedValue(updatedPlant);

        const response = await request(app).put('/db/plants/0').send(updatedPlant);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedPlant);
    });

    it('should remove a plant from the database', async () => {
        const removedPlant: PlantDetails = { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.removePlantFromDb.mockResolvedValue(removedPlant);

        const response = await request(app).delete('/db/plants/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(removedPlant);
    });

    // You might want to test for failure cases as well, such as when a plant is not found.
    it('should return 404 when a plant is not found', async () => {
        mockPlantService.getPlantDetailsById.mockResolvedValue(null);

        const response = await request(app).get('/db/plants/0');
        expect(response.status).toBe(404);
    });

    // add more error cases for other CRUD operations...
});