import express from 'express';
import { plantService } from '../services/plantService';

const router = express.Router();

// Route for fetching all plants from the db
router.get('/', async (req, res) => {
    try {
        console.log('GET request to /db/plants');
        const plants = await plantService.findAllPlantsFromDb();
        res.json(plants);
    } catch (error) {
        console.error('Error fetching plants from the database:', error);
        res.status(500).json({ error: "An error occurred while fetching plants from the database" });
    }
});

// Route for fetching a specific plant by the external API's ID from the db
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        console.log(`GET request to /db/plants/${id}`);
        const plant = await plantService.getPlantByApiId(id);
        if (plant) {
            res.json(plant);
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error(`Error fetching plant with API ID ${id}:`, error);
        res.status(500).json({ error: 'An error occurred while fetching the plant from the database' });
    }
});

// Route for adding a new plant to the db
router.post('/', async (req, res) => {
    try {
        const newPlant = await plantService.createPlantInDb(req.body); // Ensure req.body is validated against PlantDetails schema
        res.status(201).json(newPlant);
    } catch (error) {
        console.error('Error adding a new plant:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

// Route to update plant details by the external API's ID in the db
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const updatedPlant = await plantService.updatePlantDetails(id, req.body); // Adjust according to plantService method
        if (updatedPlant) {
            res.json(updatedPlant);
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error(`Error updating plant for API ID ${id}:`, error);
        res.status(500).json({ error: 'An error occurred while updating the plant in the database' });
    }
});

// Route to delete a plant by the external API's ID from the db
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        await plantService.removePlantFromDb(id);
        res.status(204).send();
    } catch (error) {
        console.error(`Error deleting plant for API ID ${id}:`, error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

export default router;