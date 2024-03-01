import request from 'supertest';
import express from 'express';
import dbRoutes from '../routes/dbRoutes';
import monk, { IMonkManager } from 'monk';
import { jest } from '@jest/globals';
import { PlantDetails } from '../models/plantInterfaces';
import { mockPlantDetails } from './mockData';

const app = express();
app.use(express.json());
app.use('/db/plants', dbRoutes);

jest.mock('monk', () => {
  const collectionMock = {
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findOneAndUpdate: jest.fn(),
    findOneAndDelete: jest.fn(),
  };
  return jest.fn(() => ({
    get: jest.fn().mockReturnValue(collectionMock),
    then: jest.fn().mockReturnThis(),
    catch: jest.fn().mockReturnThis(),
  }));
});

const db: IMonkManager = monk('mock-db-uri');
const collection = db.get('plants');

describe('DB Routes with Monk', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
    (collection.find as jest.Mock).mockReturnValueOnce([mockPlantDetails] as PlantDetails[]);
    (collection.findOne as jest.Mock).mockReturnValue(mockPlantDetails as PlantDetails | null);
    (collection.update as jest.Mock).mockReturnValueOnce({
      matchedCount: 1,
      modifiedCount: 1,
      upsertedId: null,
    });
    (collection.remove as jest.Mock).mockReturnValueOnce({ deletedCount: 1 });
  });

  it('fetches all plants successfully', async () => {
    const response = await request(app).get('/db/plants');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([mockPlantDetails]);
    expect(collection.find).toHaveBeenCalled();
  });

  // TODO review this test as it is returning a 200 OK and failing the test instead of returning a 404
  it('should handle the case where a plant does not exist for fetching', async () => {
    (collection.findOne as jest.Mock).mockImplementation((query: any) => { 
      if (query._id === '2') {
        return Promise.resolve(null); 
      }
      return Promise.resolve(mockPlantDetails); 
    });
    const response = await request(app).get('/db/plants/2');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it('should handle the case where a plant does not exist for updating', async () => {
    (collection.findOneAndUpdate as jest.Mock).mockReturnValueOnce(null);
    const response = await request(app).put('/db/plants/99999').send({ common_name: "New Name" });
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  it('should handle the case where a plant does not exist for deletion', async () => {
    (collection.findOneAndDelete as jest.Mock).mockReturnValueOnce(null);
    const response = await request(app).delete('/db/plants/99999');
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBeDefined();
  });

  // more tests as needed
});
