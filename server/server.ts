import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database/database'; // import database instance
import plantRoutes from './routes/plantRoutes';
import axios from 'axios';
import { create as createPlant } from './models/plant';
import plantSchema from './schemas/plantSchema';

dotenv.config();

interface Plant {
  id: string;
  common_name: string;
  // TODO add any other properties that are used from the API's response
}

export const app = express();
app.use(cors());
app.use(express.json()); // for parsing application/json

app.use('/api/plants', plantRoutes); // api routes and other middleware

app.get('/api/plants/:name', async (req, res) => {
  try {
    const plantName = encodeURIComponent(req.params.name);
    const listResponse = await axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`);
    const plants: Plant[] = listResponse.data;

    const plant = plants.find((plant: Plant) => plant.common_name.toLowerCase() === plantName.toLowerCase());

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const detailsResponse = await axios.get(`https://perenual.com/api/species/details/${plant.id}?key=${process.env.PERENUAL_API_KEY}`);
    const details = detailsResponse.data;

    // validate the plant details
    const { error, value } = plantSchema.validate(details);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // store `value` in the database as it's validated
    const savedPlant = await createPlant(value); // ensure `createPlant` is correctly awaited inside the async function
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching plant data' });
  }
});

const startServer = async () => {
  try {
    // wait for the database connection to be established
    await db;
    console.log('Connected to MongoDB.');

    // Start the Express server
    const port = process.env.PORT || 3000;
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error connecting to MongoDB:', err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
    process.exit(1); // exit the process if the database connection fails
  }
};

// start the server if this file is run directly
if (require.main === module) {
  startServer();
}