import request from 'supertest';
import { app } from '../server'; 

describe('Test /api/plants endpoint', () => {
  test('It should respond with 200 status', async () => {
    const response = await request(app).get('/api/plants');
    expect(response.statusCode).toBe(200);
    // TODO add more assertions here based on the expected response body
  });
});
