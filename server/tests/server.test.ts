// server/tests/server.test.ts
import supertest from 'supertest';
import { app } from '../server';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { PlantDetails } from '../models/plantInterfaces'; // optionally import interfaces for structured data

dotenv.config({ path: '../.env.test' });

let client: MongoClient;

beforeAll(async () => {
  console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
  client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db();

  console.log("Connected to MongoDB, preparing test data.");
  // ensure the collection is empty before inserting test data
  await db.collection('plants').deleteMany({});
  
  // insert comprehensive test data matching your PlantDetails interface
  await db.collection('plants').insertOne({
    id: 1,
    common_name: "European Silver Fir",
    scientific_name: ["Abies alba"],
    other_names: ["Common Silver Fir"],
    cycle: "Perennial",
    watering: "Frequent",
    sunlight: ["full sun"],
    default_image: {
      url: "https://example.com/image.jpg",
      license: "CC0",
      license_name: "Public Domain",
      // add additional properties as per the interface definitions
    },
    // include other detailed properties from PlantDetails interface
  });

  console.log("Test data inserted.");
});

afterAll(async () => {
  // clean up and remove test data and close the database connection
  const db = client.db();
  await db.collection('plants').deleteMany({});
  console.log("Test data cleaned up.");
  await client.close();
  console.log("MongoDB connection closed.");
});

describe('GET /api/plants', () => {
  it('should return a list of plants including pagination information', async () => {
    // request to grab the first page of plants
    const response = await supertest(app).get('/api/plants?page=1');

    // check for the expected response structure and content
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    
    // assert the response body
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBeTruthy();
    expect(response.body.data.length).toBeGreaterThan(0); // Ensure data is not empty

    // an example of more detailed property checks
    if (response.body.data.length > 0) {
      const firstItem = response.body.data[0];
      expect(firstItem).toHaveProperty('id');
      expect(firstItem).toHaveProperty('common_name');
      expect(firstItem).toHaveProperty('scientific_name');
      // TODO add more detailed checks as per the PlantDetails interface
    }

    // adjusting to match the actual API response property names
    //    "to": 30,
    //    "per_page": 30,
    //    "current_page": 1,
    //    "from": 1,
    //    "last_page": 337,
    //    "total": 10102
    expect(response.body).toHaveProperty('to');
    expect(response.body).toHaveProperty('per_page');
    expect(response.body).toHaveProperty('current_page');
    expect(response.body).toHaveProperty('from');
    expect(response.body).toHaveProperty('last_page');
    expect(response.body).toHaveProperty('total');
    

    // optionally log the response for debugging purposes
    //console.log("Received response from /api/plants:", JSON.stringify(response.body, null, 2));
  });
});


