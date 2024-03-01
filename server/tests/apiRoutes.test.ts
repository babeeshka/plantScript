jest.mock('../services/plantService');
import { plantService } from '../services/plantService';
import request from 'supertest';
import express from 'express';
import apiRoutes from '../routes/apiRoutes';
import { mockPlantDetails } from './mockData';

const app = express();
app.use(express.json());
app.use('/api/plants', apiRoutes);

describe('API Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('responds with plant details', async () => {
        (plantService.fetchPlantDetails as jest.Mock).mockResolvedValue(mockPlantDetails);
        const response = await request(app).get('/api/plants/1/details');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockPlantDetails);
        expect(plantService.fetchPlantDetails).toHaveBeenCalledWith(1);
    });

    it('responds with 404 for non-existent plant details', async () => {
        (plantService.fetchPlantDetails as jest.Mock).mockResolvedValue(null);
        const response = await request(app).get('/api/plants/999/details');
        expect(response.statusCode).toBe(404);
    });

    it('fetches species list with pagination', async () => {
        const mockSpeciesList = { data: [], total: 100, per_page: 10, current_page: 1 };
        (plantService.fetchSpeciesList as jest.Mock).mockResolvedValue(mockSpeciesList);
        const response = await request(app).get('/api/plants/?page=1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockSpeciesList);
        expect(plantService.fetchSpeciesList).toHaveBeenCalledWith(1);
    });

    it('responds with search results', async () => {
        const mockSearchResults = [mockPlantDetails];
        (plantService.searchPlantByName as jest.Mock).mockResolvedValue(mockSearchResults);
        const response = await request(app).get('/api/plants/search?q=mock');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(mockSearchResults);
        expect(plantService.searchPlantByName).toHaveBeenCalledWith('mock');
    });

    it('responds with 400 for invalid id', async () => {
        const response = await request(app).get('/api/plants/invalid-id/details');
        expect(response.statusCode).toBe(400);
    });

    it('responds with 500 for service layer error', async () => {
        (plantService.fetchPlantDetails as jest.Mock).mockRejectedValue(new Error('Service Layer Error'));
        const response = await request(app).get('/api/plants/1/details');
        expect(response.statusCode).toBe(500);
    });

    // Testing missing API key scenario
    it('responds with error when API key is missing', async () => {
        (plantService.fetchSpeciesList as jest.Mock).mockImplementation(() => {
            throw new Error("API key is missing");
        });
        const response = await request(app).get('/api/plants/');
        expect(response.statusCode).not.toBe(200);
        expect(response.body.error).toContain("API key is missing");
    });

    // TODO review and add tests for query parameters (present, correctly formatted, or malformed)
    // TODO test the response when pagination params are valid, invalid, or at boundary conditions (e.g., page 1, last page, beyond the last page)
    // TODO ensure handling of unexpected server errors, such as 500, 503, etc.
});
