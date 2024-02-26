const request = require('supertest');
const app = require('../server'); 
const { MongoClient } = require('mongodb');
import { Db } from 'mongodb';
import { mockPlantDetails } from './mockData'; 

describe('DB Routes', () => {
  let connection: typeof MongoClient;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect((global as any).__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await (connection.db((global as any).__MONGO_DB_NAME__) as Db);
    await db.collection('plants').insertOne(mockPlantDetails); 
  });

  afterAll(async () => {
    await connection.close();
  });

  describe('GET /plants', () => {
    it('should retrieve all plants', async () => {
      const response = await request(app).get('/plants');
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(1);
      expect(response.body[0]).toMatchObject(mockPlantDetails);
    });
  });

  // Additional tests for POST, DELETE, etc.

  describe('POST /plants', () => {
    it('should create a new plant', async () => {
      const newPlant = {
        common_name: 'New Plant',
        scientific_name: ['New Species'],
        // Include other properties to create
      };
      const response = await request(app).post('/plants').send(newPlant);
      expect(response.status).toBe(201);
      expect(response.body).toMatchObject(newPlant);
    });
  });

  describe('DELETE /plants/:id', () => {
    it('should delete a plant', async () => {
      const plantId = mockPlantDetails.id;
      const response = await request(app).delete(`/plants/${plantId}`);
      expect(response.status).toBe(204);
    });
  });
  
});
