// /server/tests/server.test.ts
import request from 'supertest';
import { app } from '../server';
import { Server } from 'http';

let server: Server;

beforeAll((done) => {
  server = app.listen(3000, () => {
    console.log('Test server started on port 3000');
    done();
  });
});

describe('Express Server', () => {
    it('responds to /test with Server is running!', async () => {
        const response = await request(app).get('/test');
        expect(response.statusCode).toBe(200);
        expect(response.text).toContain('Server is running!');
    });

    // TODO add more tests for server routes
});

describe('Express Server', () => {
  it('handles non-existent route with 404', async () => {
      const response = await request(app).get('/non-existent-route');
      expect(response.statusCode).toBe(404);
      // Optionally, verify the structure of the response body
  });

  // TODO example test for simulating server error (5xx responses)
  // This requires mocking a route to throw an error and verifying the response
});

afterAll((done) => {
  server.close(() => {
    console.log('Test server closed');
    done();
  });
});
