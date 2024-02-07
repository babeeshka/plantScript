// Change from 'import app from "./server";' to:
import { app } from './server'; // Assuming the test file is in the same directory level as server.ts

describe("GET /api/plants/:name", () => {
  it("should fetch plant details", async () => {
    // Assuming you have a real plant name for testing
    const plantName = 'realPlantName'; // Use an actual name that exists in your data source
    const response = await request(app).get(`/api/plants/${plantName}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
    // Add more expectations as needed
  });
});
