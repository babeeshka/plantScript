import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import monk from 'monk';

dotenv.config({ path: '../.env' });

const globalSetup = async () => {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  const db = monk(mongoUri);

  // Assign the mongo server instance to the global namespace
  (global as unknown as Global).__MONGOD__ = mongoServer;

  try {
    await db.get('plants').remove({}); // clear the collection

    // insert default plant data
    await db.get('plants').insert({
      id: 1,
      common_name: "European Silver Fir",
      scientific_name: ["Abies alba"],
      other_name: ["Common Silver Fir"],
      family: null,
      origin: [
        "Austria",
        "Germany",
        "Switzerland"
      ],
      type: "tree",
      dimension: "Height:  60 feet",
      dimensions: {
        type: "Height",
        min_value: 60,
        max_value: 60,
        unit: "feet",
      },
      cycle: "Perennial",
      attracts: [],
      propagation: ["Cutting", "Grafting Propagation", "Layering Propagation"],
      hardiness: { min: "7", max: "7" },
      watering: "Frequent",
      depth_water_requirement: [],
      volume_water_requirement: [],
      watering_period: null,
      watering_general_benchmark: { value: "7-10", unit: "days" },
      plant_anatomy: [],
      sunlight: ["full sun"],
      pruning_month: ["February", "March", "April"],
      seeds: 0,
      maintenance: null,
      soil: [],
      growth_rate: "High",
      drought_tolerant: false,
      salt_tolerant: false,
      thorny: false,
      invasive: false,
      tropical: false,
      indoor: false,
      care_level: "Medium",
      pest_susceptibility: [],
      flowers: false,
      flowering_season: null,
      flower_color: "",
      cones: true,
      fruits: false,
      edible_fruit: false,
      description: "European Silver Fir (Abies alba) is an amazing coniferous species...",
      default_image: {
        license: 45,
        license_name: "Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
        license_url: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
        original_url: "https://example.com/image.jpg",
        // Include other URLs as needed...
      },
      // Include any other fields relevant to your tests...
    });

    console.log('Global setup completed: Test data inserted.');
  } finally {
    await db.close();
  }

  // Store the URI for use in your tests
  process.env.MONGODB_URI = mongoUri;

  if ((global as unknown as Global).__MONGO_URI__) {
    console.log("MongoDB URI from in-memory server:", (global as unknown as Global).__MONGO_URI__);
  }
};

export default globalSetup;
