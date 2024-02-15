// server/tests/server.test.ts
import supertest from 'supertest';
import { app } from '../server';
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.test' });

let client: MongoClient;

beforeAll(async () => {
  console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
  client = new MongoClient(process.env.MONGODB_URI!);
  await client.connect();
  const db = client.db();

  console.log("Connected to MongoDB, preparing test data.");
  // Ensure the collection is empty before inserting test data
  await db.collection('plants').deleteMany({});
  
  // Insert test data
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
      // additional image properties as needed
    },
    // Add more properties as needed for the test
  });

  console.log("Test data inserted.");
});

afterAll(async () => {
  // Clean up: Remove test data and close the database connection
  const db = client.db();
  await db.collection('plants').deleteMany({});
  console.log("Test data cleaned up.");
  await client.close();
  console.log("MongoDB connection closed.");
});

describe('GET /api/plants', () => {
  it('should return a list of plants', async () => {
    const response = await supertest(app).get('/api/plants');
    console.log("Received response from /api/plants:", response.body);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    
    // Check that response contains the expected plant with detailed assertions
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          common_name: "European Silver Fir",
          scientific_name: expect.arrayContaining(["Abies alba"]),
          other_names: expect.arrayContaining(["Common Silver Fir"]),
          cycle: "Perennial",
          watering: "Frequent",
          sunlight: expect.arrayContaining(["full sun"]),
          default_image: expect.objectContaining({
            url: expect.stringContaining("https://example.com/image.jpg"),
            // additional image property checks as needed
          }),
          // Further detailed property checks as needed
        }),
      ])
    );

    // If your API supports pagination, you can check for those properties here
    // This is optional and can be adjusted based on your actual API response structure
    if (response.body.pagination) {
      expect(response.body.pagination).toEqual(
        expect.objectContaining({
          currentPage: expect.any(Number),
          totalPages: expect.any(Number),
          // other pagination properties as needed
        }),
      );
    }

    // Additional assertions can be added here as needed
  });
});
