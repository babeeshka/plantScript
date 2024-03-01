jest.mock('axios');
import axios from 'axios';
import { plantService } from '../services/plantService';
import { mockPlantDetails } from './mockData'; // Assuming mockData exports this

describe('plantService', () => {
    it('fetches plant details correctly', async () => {
        (axios.get as jest.Mock).mockResolvedValue({ data: mockPlantDetails });
        const plantDetails = await plantService.fetchPlantDetails(1);
        expect(plantDetails).toEqual(mockPlantDetails);
    });
});
