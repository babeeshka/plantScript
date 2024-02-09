import { app } from './server'; 

describe("GET /api/plants/:name", () => {
  it("should fetch plant details", async () => {
    // TODO set a real plant for this test
    const plantName = 'realPlantName'; // TODO set up an actual name that exists in the data source
    const response = await request(app).get(`/api/plants/${plantName}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name');
    // TODO add more expectations as needed
  });
});
