import express from 'express';
import { plantService } from '../services/plantService';
import { PlantFilterKeys } from '@rootTypes/plantInterfaces';

const router = express.Router();

// Route for fetching plants with pagination using page numbers
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const searchTerm = req.query.searchTerm?.toString() || '';

        const filters: Record<string, boolean> = Object.keys(req.query)
            .filter(key => !['page', 'limit', 'searchTerm'].includes(key))
            .reduce<Record<string, boolean>>((acc, key) => {
                const value = req.query[key];
                if (value === 'true') {
                    acc[key] = true;
                }
                return acc;
            }, {});

        console.log('Parsed search and filters:', { searchTerm, filters });

        const offset = (page - 1) * limit;

        const { plants, count } = await plantService.findAllPlantsWithPagination({
            limit,
            offset: (page - 1) * limit,
            searchTerm,
            filters
        });

        res.json({ data: plants, metadata: { totalPlants: count, totalPages: Math.ceil(count / limit), currentPage: page } });
    } catch (error) {
        console.error('Error fetching plants with pagination:', error);
        res.status(500).json({ error: "An error occurred while fetching plants with pagination" });
    }
});

// Route for fetching a specific plant by the external API's ID from the db
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
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
        const newPlant = await plantService.createPlantInDb(req.body);
        res.status(201).json(newPlant);
    } catch (error) {
        console.error('Error adding a new plant:', error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

// Route to update plant details by the external API's ID in the db
// TODO add last edited property to plant details
router.put('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const updatedPlant = await plantService.updatePlantDetails(id, req.body);
        if (updatedPlant) {
            res.json(updatedPlant);
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error(`Error updating plant for API ID ${id}:`, error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An error occurred while updating the plant in the database" });
    }
});

// Route to delete a plant by the external API's ID from the db
router.delete('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    try {
        const deleteResult = await plantService.removePlantFromDb(id);
        if (deleteResult) {
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        console.error(`Error deleting plant for API ID ${id}:`, error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

export default router;
