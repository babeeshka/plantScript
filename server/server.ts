// import dotenv first
import dotenv from 'dotenv';
console.log(`Current working directory: ${process.cwd()}`);
dotenv.config({ path: '../.env' }); 
console.log(`Database URI: ${process.env.MONGODB_URI}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

// import other dependencies
import monk from 'monk';
import express from 'express';
import cors from 'cors';
import db from './database/database'; 
import plantRoutes from './routes/plantRoutes';
import axios from 'axios';
import { createPlant } from './models/plant'; 
import plantSchema from './schemas/plantSchema';
import { PlantDetails } from './models/plantInterfaces'; 

db.on('open', () => console.log('Database connection opened.'));
db.on('error', (err: any) => console.error('Database connection error:', err));

export const app = express();
export const port = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Attempting to listen on port ${port}...`);
    console.log(`Server listening on port ${port}`);
    console.log(`You can now try accessing the server via http://localhost:${port}/api/plants`);
  });
}
app.use(cors());
app.use(express.json()); // for parsing application/json

app.get('/test', (req, res) => res.send('Server is running!'));

app.use('/api/plants', plantRoutes); // API routes and other middleware

app.get('/api/plants/:name', async (req, res) => {
  console.log('/api/plants endpoint hit');
  try {
    const plantName = encodeURIComponent(req.params.name);
    const listResponse = await axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`);
    // the respose should return an array of plants
    const plants: PlantDetails[] = listResponse.data.data; // adjust according to actual response structure

    const plant = plants.find(p => p.common_name.toLowerCase() === plantName.toLowerCase());

    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    const detailsResponse = await axios.get(`https://perenual.com/api/species/details/${plant.id}?key=${process.env.PERENUAL_API_KEY}`);
    const details: PlantDetails = detailsResponse.data; // the response should directly match PlantDetails

    // validate the plant details
    const { error, value } = plantSchema.validate(details);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // store `value` in the database as it's validated
    const savedPlant = await createPlant(value); // ensure `createPlant` is correctly awaited inside the async function
    res.status(201).json(savedPlant);
  } catch (error) {
    console.error('Error fetching plants:', error);
    res.status(500).json({ error: 'An error occurred while fetching plant data' });
  }
});

const startServer = async () => {
  console.log('Starting server...');
  try {
    console.log('Waiting for database connection...');
    await db;
    console.log('Database connected, proceeding to start server.');

    const port = process.env.PORT || 3000;
    if (process.env.NODE_ENV !== 'test') {
      app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
        console.log(`You can now try accessing the server via http://localhost:${port}/api/plants`);
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error('Error connecting to MongoDB:', err.message);
    } else {
      console.error('An unexpected error occurred:', err);
    }
    console.error('Error during server startup:', err);
    process.exit(1); // exit the process if the database connection fails
  }
};

if (require.main === module) {
  startServer();
}
