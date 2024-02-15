// tests/globalSetup.ts
import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config({ path: './.env.test' });

const globalSetup = async () => {
  const client = new MongoClient(process.env.MONGODB_URI!);
  try {
    await client.connect();
    const db = client.db();
    await db.collection('plants').deleteMany({}); // Clear the collection

    // Insert default plant data
    await db.collection('plants').insertOne({
        id: 1,
        common_name: "European Silver Fir",
        scientific_name: ["Abies alba"],
        other_name: ["Common Silver Fir"],
        family: null,
        origin: [
          "Austria",
          "Germany",
          "Switzerland",
          // Add more as needed...
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
    await client.close();
  }
};

export default globalSetup;
