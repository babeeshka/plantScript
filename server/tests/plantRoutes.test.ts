// server/tests/plantRoutes.test.ts
import request from 'supertest';
import { app } from '../server'; 
import db from '../database/database';
import supertest from 'supertest';


describe('Test /api/plants endpoint', () => {
  test('It should respond with 200 status and return plants data', async () => {
    const response = await request(app).get('/api/plants');
    console.log("Testing /api/plants, response status:", response.statusCode);
    //console.log("Response body:", response.body);

    expect(response.statusCode).toBe(200);
    // ensure the response body is an object and has a 'data' property that's an array
    expect(response.body).toBeInstanceOf(Object);
    expect(response.body).toHaveProperty('data');
    expect(Array.isArray(response.body.data)).toBe(true);

    // optionally, check the first item in the array if the array is not supposed to be empty
    if (response.body.data.length > 0) {
      const samplePlant = response.body.data[0];
      expect(samplePlant).toHaveProperty('common_name');
      // Additional property checks as necessary
    }
  });
});

describe('Plant CRUD operations', () => {
  afterAll(async () => {
    // if using a persistent test database, clean up data here, close database connection or clear mock data
    // await db.close();
  });

  it('should create a new plant', async () => {
    const newPlant = {
      common_name: 'Test Plant',
      scientific_name: ['Testus plantus'],
      cycle: 'Perennial',
      watering: 'Moderate',
      sunlight: ['Full Sun'],
      // Including optional fields for a more comprehensive test
      other_names: ['TP', 'Plant Test'],
      family: 'Testaceae',
      origin: ['Testland'],
      type: 'Herb',
      dimension: 'Medium',
      dimensions: {
          type: 'Height',
          min_value: 10,
          max_value: 15,
          unit: 'cm',
      },
      attracts: ['Bees'],
      propagation: ['Seed', 'Cutting'],
      hardiness: {
          min: '5',
          max: '10',
      },
      depth_water_requirement: ['Shallow'],
      volume_water_requirement: ['Medium'],
      watering_period: 'Biweekly',
      watering_general_benchmark: {
          value: '15',
          unit: 'liters per month',
      },
      plant_anatomy: ['Leaves', 'Roots'],
      pruning_month: ['March', 'September'],
      pruning_count: [2],
      seeds: 100,
      maintenance: 'Low',
      soil: ['Loamy'],
      growth_rate: 'Medium',
      drought_tolerant: true,
      salt_tolerant: false,
      thorny: false,
      invasive: false,
      tropical: true,
      indoor: false,
      care_level: 'Easy',
      pest_susceptibility: ['Aphids'],
      flowers: true,
      flowering_season: 'Spring',
      flower_color: 'Blue',
      cones: false,
      fruits: true,
      edible_fruit: true,
      edible_fruit_taste_profile: 'Sweet',
      fruit_nutritional_value: 'High in Vitamin C',
      fruit_color: ['Red'],
      harvest_season: 'Late Summer',
      leaf: true,
      leaf_color: ['Green'],
      edible_leaf: true,
      cuisine: false,
      medicinal: true,
      poisonous_to_humans: 0,
      poisonous_to_pets: 0,
      description: 'A test plant used for demonstration purposes.',
      default_image: {
          license: 1,
          license_name: 'Creative Commons',
          license_url: 'http://creativecommons.org/licenses/by-sa/4.0/',
          original_url: 'http://example.com/original.jpg',
          regular_url: 'http://example.com/regular.jpg',
          medium_url: 'http://example.com/medium.jpg',
          small_url: 'http://example.com/small.jpg',
          thumbnail: 'http://example.com/thumbnail.jpg',
      },
      other_images: [
          'http://example.com/other1.jpg',
          'http://example.com/other2.jpg',
      ],
  };
    const response = await supertest(app)
      .post('/api/plants')
      .send(newPlant);
  

      // validate required fields
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('_id');
      expect(response.body.common_name).toBe(newPlant.common_name);
      expect(response.body.scientific_name).toEqual(expect.arrayContaining(newPlant.scientific_name));
      expect(response.body.cycle).toBe(newPlant.cycle);
      expect(response.body.watering).toBe(newPlant.watering);
      expect(response.body.sunlight).toEqual(expect.arrayContaining(newPlant.sunlight));
      
      // validate optional fields
      expect(response.body.other_names).toEqual(expect.arrayContaining(newPlant.other_names));
      expect(response.body.family).toBe(newPlant.family);
      expect(response.body.origin).toEqual(expect.arrayContaining(newPlant.origin));
      expect(response.body.type).toBe(newPlant.type);
      // for objects, ensure deep equality
      expect(response.body.dimensions).toEqual(expect.objectContaining(newPlant.dimensions));
      expect(response.body.hardiness).toEqual(expect.objectContaining(newPlant.hardiness));
      // arrays of strings or objects
      expect(response.body.attracts).toEqual(expect.arrayContaining(newPlant.attracts));
      expect(response.body.propagation).toEqual(expect.arrayContaining(newPlant.propagation));
      // booleans
      expect(response.body.drought_tolerant).toBe(newPlant.drought_tolerant);
      expect(response.body.salt_tolerant).toBe(newPlant.salt_tolerant);
      // for nested objects or complex data structures, use `expect.objectContaining`
      if (newPlant.default_image) {
          expect(response.body.default_image).toEqual(expect.objectContaining(newPlant.default_image));
      }
      // continue this pattern for all relevant fields as needed to validate
      
    // TODO optionallu verify the plant was actually added to the database
    //  could involve querying the test database to ensure the plant exists with the expected properties
  });

  // add tests for other CRUD operations similarly
});