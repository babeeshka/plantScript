// /server/routes/dbRoutes.ts
import express from 'express';
import plantService from '../services/plantService';
const router = express.Router();
import db from '../database/database'; // Import the database connection

// route for fetching all plants from the db
router.get('/', async (req, res) => {
    try {
      console.log('GET request to /db/plants');
      const plants = await plantService.findAllPlantsFromDb();
      res.json(plants);
    } catch (error) {
      console.error(`Error fetching plants from the database:`, error);
      res.status(500).json({ error: "An error occurred while fetching plants from the database" });
    }
  });
  
// route for fetching a specific plant by ID from the db
router.get('/:id', async (req, res) => {
  // Assuming the API's id is numeric, as per your structure
  const apiId = parseInt(req.params.id);
  if (isNaN(apiId)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const plant = await plantService.getPlantByApiId(apiId);
    if (plant) {
      res.json(plant);
    } else {
      res.status(404).json({ error: 'Plant not found' });
    }
  } catch (error) {
    console.error(`Error fetching plant with API ID ${apiId}:`, error);
    res.status(500).json({ error: 'An error occurred while fetching the plant from the database' });
  }
});

  // route for adding a new plant to the db
  router.post('/', async (req, res) => {
    try {
      const newPlant = await plantService.createPlantInDb(req.body); // make sure the body data is already validated
      res.status(201).json(newPlant);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: "An unknown error occurred" });
      }
    }
  });
  
  // route to update plant details by ID in the db
  router.put('/:id', async (req, res) => {
    try {
      const id = req.params.id; // Adjust if necessary
      const updatedPlant = await plantService.updatePlantDetails(id, req.body); // Ensure body validation before updating
      res.json(updatedPlant);
    } catch (error) {
      console.error(`Error updating plant for ID ${req.params.id}:`, error);
      res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  });
  
  // route to delete a plant by ID from the db
  router.delete('/:id', async (req, res) => {
    try {
      const id = req.params.id; // Adjust if necessary
      await plantService.removePlantFromDb(id);
      res.status(204).send(); // No content to send back
    } catch (error) {
      console.error(`Error deleting plant for ID ${req.params.id}:`, error);
      res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
  });
  
  export default router;