// server/tests/server.test.ts
import { MongoClient, Db } from 'mongodb';
import supertest from 'supertest';
import { app } from '../server';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.test' }); 

let db: Db;
let client: MongoClient;

beforeAll(async () => {
  // connect to the test database
  client = await MongoClient.connect(process.env.MONGODB_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = client.db();

  // insert test data based on api response
  await db.collection('plants').insertOne({
    id: 1,
    common_name: "European Silver Fir",
    scientific_name: ["Abies alba"],
    other_names: ["Common Silver Fir"],
    cycle: "Perennial",
    watering: "Frequent",
    sunlight: ["full sun"],
    // ... other properties ...
  });
});

afterAll(async () => {
  // clean-up: remove test data
  await db.collection('plants').deleteMany({});
  await client.close();
});

describe('GET /api/plants', () => {
  it('should return a list of plants', async () => {
    const response = await supertest(app).get('/api/plants');
    
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));

    // check the response is an array
    expect(Array.isArray(response.body)).toBe(true);

    // expect at least one plant
    expect(response.body.length).toBeGreaterThan(0);

    // to check for specific plant data
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          common_name: "European Silver Fir",
          // ... other expected properties
        }),
      ])
    );

    // Check for pagination properties if applicable
    if (response.body.pagination) {
      expect(response.body.pagination).toEqual(
        expect.objectContaining({
          currentPage: expect.any(Number),
          totalPages: expect.any(Number),
          // ... other pagination properties
        }),
      );
    }

    // TODO: Add more assertions as needed
  });
});
