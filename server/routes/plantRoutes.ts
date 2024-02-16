import express from 'express';
import {
  fetchSpeciesList,
  searchPlantByName,
  fetchPlantDetails,
  createPlantInDb,
  getPlantDetailsById,
  updatePlantDetails,
  removePlantFromDb,
} from '../services/plantService';

const router = express.Router();

// route for fetching species list with pagination
router.get('/', async (req, res) => {
  try {
    //console.log(`Received request on / with query:`, req.query);
    const page = parseInt(req.query.page as string) || 1;
    //console.log(`Fetching species list for page ${page}`);
    const data = await fetchSpeciesList(page);
    //console.log(`Data fetched successfully for page ${page}:`, data);
    res.json(data);
  } catch (error) {
    console.error(`Error fetching species list for page:`, error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// route for searching plants by name
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    const data = await searchPlantByName(query);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// route for fetching plant details by ID
router.get('/:id/details', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const data = await fetchPlantDetails(id);
    res.json(data);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// route for adding a new plant
router.post('/', async (req, res) => {
  try {
    const newPlant = await createPlantInDb(req.body); // make sure the body data is already validated
    res.status(201).json(newPlant);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
});

// route to update plant details by ID
router.put('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Adjust if necessary
    const updatedPlant = await updatePlantDetails(id, req.body); // Ensure body validation before updating
    res.json(updatedPlant);
  } catch (error) {
    console.error(`Error updating plant for ID ${req.params.id}:`, error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

// route to delete a plant by ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id; // Adjust if necessary
    await removePlantFromDb(id);
    res.status(204).send(); // No content to send back
  } catch (error) {
    console.error(`Error deleting plant for ID ${req.params.id}:`, error);
    res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
  }
});

export default router;