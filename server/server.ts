import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';
import { create as createPlant } from './models/plant';
import plantSchema from './schemas/plantSchema'; // Adjust the import path as necessary

dotenv.config();

export const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('plantScript!');
});

app.get('/api/plants/:name', async (req, res) => {
  try {
    const plantName = encodeURIComponent(req.params.name);
    const listResponse = await axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`);
    const plants = listResponse.data;

    const plant = plants.find(plant => plant.common_name.toLowerCase() === plantName.toLowerCase());

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const detailsResponse = await axios.get(`https://perenual.com/api/species/details/${plant.id}?key=${process.env.PERENUAL_API_KEY}`);
    const details = detailsResponse.data;

    // Validate the plant details
    const { error, value } = plantSchema.validate(details);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Proceed to store `value` in the database as it's validated
    const savedPlant = await createPlant(value); // Ensure `createPlant` is correctly awaited inside the async function
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching plant data' });
  }
});



// Optionally, you can still have the listening logic conditionally run for non-test environments
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server listening on port ${port}`));
}
