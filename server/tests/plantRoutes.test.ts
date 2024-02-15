// server/tests/plantRoutes.test.ts
import request from 'supertest';
import { app } from '../server'; 

describe('Test /api/plants endpoint', () => {
  test('It should respond with 200 status and return plants data', async () => {
    const response = await request(app).get('/api/plants');
    console.log("Testing /api/plants, response status:", response.statusCode);
    console.log("Response body:", response.body);

    expect(response.statusCode).toBe(200);
    // Ensure the response body is an object and has a 'data' property that's an array
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);

    // Optionally, check the first item in the array if the array is not supposed to be empty
    if (response.body.data.length > 0) {
      const samplePlant = response.body.data[0];
      expect(samplePlant).toHaveProperty('common_name');
      // Additional property checks as necessary
}
    if (response.body.length > 0) {
      const samplePlant = response.body[0];
      console.log("Sample plant data:", samplePlant);
      expect(samplePlant).toHaveProperty('common_name');
      // Additional property checks as necessary
    }
  });
});
