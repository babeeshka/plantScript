// server/tests/plantRoutes.test.ts
import request from 'supertest';
import { app } from '../server'; 

describe('Test /api/plants endpoint', () => {
  test('It should respond with 200 status and return plants data', async () => {
    const response = await request(app).get('/api/plants');
    console.log("Testing /api/plants, response status:", response.statusCode);
    console.log("Response body:", response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    if (response.body.length > 0) {
      const samplePlant = response.body[0];
      console.log("Sample plant data:", samplePlant);
      expect(samplePlant).toHaveProperty('common_name');
      // Additional property checks as necessary
    }
  });
});
