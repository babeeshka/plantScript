// /server/routes/apiRoutes.ts
import express from 'express';
import plantService from '../services/plantService';

const router = express.Router();

// route for fetching species list with pagination
router.get('/', async (req, res) => {
    try {
        //console.log(`Received request on / with query:`, req.query);
        const page = parseInt(req.query.page as string) || 1;
        //console.log(`Fetching species list for page ${page}`);
        const data = await plantService.fetchSpeciesList(page);
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
        const data = await plantService.searchPlantByName(query);
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
      if (isNaN(id)) return res.status(400).send('Invalid ID format.');
  
      const data = await plantService.fetchPlantDetails(id);
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : 'An unknown error occurred' });
    }
  });

export default router;