import express from 'express';
import { fetchSpeciesList, searchPlantByName, fetchPlantDetails } from '../services/plantService';
import { fetchSpeciesList, searchPlantByName, fetchPlantDetails } from './apiUtils'; 

const router = express.Router();

const app = express();

// route for fetching species list with pagination
app.get('/api/plants', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const data = await fetchSpeciesList(page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route for searching plants by name
app.get('/api/plants/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    const data = await searchPlantByName(query);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// route for fetching plant details by ID
app.get('/api/plants/:id/details', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fetchPlantDetails(id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;