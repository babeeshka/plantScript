// dbPlantRoutes.test.ts
import request from 'supertest';
import { app } from '../server';
import { PlantDetails } from '../models/plantInterfaces';
import db from '../database/database';
import { jest } from '@jest/globals';

// Mock the database module
jest.mock('../database/database', () => {
    const plantsCollectionMock = {
        find: jest.fn().mockResolvedValue([]),
        findOne: jest.fn().mockResolvedValue(null),
        insert: jest.fn().mockResolvedValue({}),
        update: jest.fn().mockResolvedValue({}),
        remove: jest.fn().mockResolvedValue({}),
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
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
    });

    it('should return a list of plants from the database', async () => {
        const mockPlants: PlantDetails[] = [
            { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] },
            { id: '1', common_name: "anotherCommonName", scientific_name: ["anotherScientificName"] },
        ];

        mockPlantService.findAllPlantsFromDb.mockResolvedValue(mockPlants);

        const response = await request(app).get('/db/plants');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlants);
    });

    it('should return a plant by id from the database', async () => {
        const mockPlant: PlantDetails = { id: '0', common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.getPlantDetailsById.mockResolvedValue(mockPlant);

        const response = await request(app).get('/db/plants/0');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockPlant);
    });

    it('should create a new plant in the database', async () => {
        const newPlant: PlantDetails = { id: '2', common_name: "newCommonName", scientific_name: ["newScientificName"] };

        mockPlantService.createPlantInDb.mockResolvedValue(newPlant);

        const response = await request(app).post('/db/plants').send(newPlant);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newPlant);
    });

    it('should update a plant in the database', async () => {
        const updatedPlant: PlantDetails = { id: '0', common_name: "updatedCommonName", scientific_name: ["updatedScientificName"] };

        mockPlantService.updatePlantDetails.mockResolvedValue(updatedPlant);

        const response = await request(app).put('/db/plants/0').send(updatedPlant);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedPlant);
    });

    it('should remove a plant from the database', async () => {
        const removedPlantId = '0';
        const removedPlant: PlantDetails = { id: removedPlantId, common_name: "someCommonName", scientific_name: ["someScientificName"] };

        mockPlantService.removePlantFromDb.mockResolvedValue(removedPlant);

        const response = await request(app).delete(`/db/plants/${removedPlantId}`);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(removedPlant);
    });

    it('should return 404 when a plant is not found', async () => {
        mockPlantService.getPlantDetailsById.mockResolvedValue(null);

        const response = await request(app).get('/db/plants/999');
        expect(response.status).toBe(404);
    });

    // TODO: Add more error cases for other CRUD operations...
    // such as trying to update a plant that doesn't exist, or remove a plant that isn't in the database.
});
