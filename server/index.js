const express = require('express');
const axios = require('axios');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors());
require('dotenv').config();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/plants/:name', async (req, res) => {
  try {
    // Encode the plant name for URL usage
    const plantName = encodeURIComponent(req.params.name);

    // Fetch the list of plants from the API
    const listResponse = await axios.get(`https://perenual.com/api/species-list?key=${process.env.PERENUAL_API_KEY}`);
    const plants = listResponse.data;

    // Find the plant with the requested name
    const plant = plants.find(plant => plant.common_name.toLowerCase() === plantName.toLowerCase());

    // If the plant was not found, return an error
    if (!plant) {
      return res.status(404).json({ error: 'Plant not found' });
    }

    // Fetch the plant details from the API
    const detailsResponse = await axios.get(`https://perenual.com/api/species/details/${plant.id}?key=${process.env.PERENUAL_API_KEY}`);
    const details = detailsResponse.data;

    // Return the plant details
    res.json(details);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching plant data' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
