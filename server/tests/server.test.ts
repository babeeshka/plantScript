import supertest from 'supertest';
import { app } from '../server'; // make sure to import your server from the correct location

describe('GET /api/plants', () => {
  it('should return a list of plants', async () => {
    const response = await supertest(app).get('/api/plants');
    expect(response.statusCode).toBe(200);
    // TODO add more assertions based on your actual response structure
  });
});
