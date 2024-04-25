// /server/routes/apiRoutes.ts
import express from 'express';
import { plantService } from '../services/plantService';

const router = express.Router();

// route for fetching species list with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const data = await plantService.fetchSpeciesList(page);
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

// Route for searching plants by name with filters
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q as string;
        const page = parseInt(req.query.page as string) || 1; // Default to page 1 if not specified
        const filters = {
            edible: req.query.edible,
            poisonous: req.query.poisonous,
            cycle: req.query.cycle,
            watering: req.query.watering,
            sunlight: req.query.sunlight,
            indoor: req.query.indoor,
            hardiness: req.query.hardiness,
        };

        const data = await plantService.searchPlantByName(query, filters, page);
        res.json(data);
    } catch (error) {
        console.error(`Error searching plants:`, error);
        res.status(500).json({ error: error instanceof Error ? error.message : "An unknown error occurred" });
    }
});

// route for fetching plant details by ID
router.get('/:id/details', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send('Invalid ID format.');

        const data = await plantService.fetchPlantDetails(id);
        if (data) {
            res.json(data);
        } else {
            res.status(404).json({ error: 'Plant not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

// route for fetching a random plant
router.get('/random', async (req, res) => {
    try {
        const data = await plantService.fetchRandomPlant();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

// Route for fetching plant diseases by species ID
router.get('/:id/diseases', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send('Invalid ID format.');

        const data = await plantService.fetchPlantDiseases(id);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

// Route for fetching plant guides by species ID and type
router.get('/:id/guides', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) return res.status(400).send('Invalid ID format.');

        const type = req.query.type as string | undefined;
        const data = await plantService.fetchPlantGuides(id, type);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
});

export default router;