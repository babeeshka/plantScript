// plant.test.ts
import {
    PlantSummary,
    PlantDetails,
  } from '../models/plantInterfaces';
  import {
    createPlant,
    findPlants,
    findPlantById,
    updatePlant,
    deletePlant,
  } from '../models/plant';
  
// Mock the database methods
const db = {
    get: jest.fn(),
  };

  const mockPlantDetails: PlantDetails = {
    id: 1,
    common_name: 'Sunflower',
    scientific_name: ['Helianthus annuus'],
    cycle: 'Annual',
    watering: 'Frequent',
    sunlight: ['full sun'],
    family: 'Asteraceae',
    origin: ['North America'],
    type: 'Flower',
    dimension: '5-12 ft',
    dimensions: {
      type: 'Height',
      min_value: 5,
      max_value: 12,
      unit: 'ft',
    },
    attracts: ['bees', 'butterflies'],
    propagation: ['seeds'],
    hardiness: {
      min: '6',
      max: '10',
    },
    watering_period: 'weekly',
    watering_general_benchmark: {
      value: '1',
      unit: 'in',
    },
    growth_rate: 'fast',
    drought_tolerant: true,
    salt_tolerant: false,
    thorny: false,
    invasive: false,
    tropical: false,
    indoor: false,
    care_level: 'easy',
    pest_susceptibility: ['aphids', 'slugs'],
    flowers: true,
    flowering_season: 'summer',
    flower_color: 'yellow',
    cones: false,
    fruits: true,
    edible_fruit_taste_profile: 'nutty',
    leaf: true,
    leaf_color: ['green'],
    medicinal: false,
    poisonous_to_humans: 0,
    poisonous_to_pets: 0,
    description: 'Sunflower is a tall, erect, herbaceous annual plant belonging to the family Asteraceae, grown for its seeds. The plant has a thick, hairy, erect stem which gives rise to a large flower head. The plant has large, broad lower leaves which are oval and arranged alternately on the stem and smaller, narrower upper leaves which are attached individually to the stem. The large flower head is composed of a central disk of small, tubular flowers and surrounding bright yellow ray flowers. The seeds are grayish black, compressed, with a smooth surface and a faint, but distinctive, longitudinal ridge. The seeds are pressed to extract their oil or dehulled and roasted or consumed as a popular snack.'
  };
  
  // Mocking CRUD operations
  const plantsCollectionMock = {
    insert: jest.fn().mockResolvedValue(mockPlantDetails),
    find: jest.fn().mockResolvedValue([mockPlantDetails]),
    findOne: jest.fn().mockResolvedValue(mockPlantDetails),
    update: jest.fn().mockResolvedValue({ matchedCount: 1, modifiedCount: 1, upsertedId: 1 }),
    remove: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  };
  
  // Replace '../database/database' with the correct path to your database module
  jest.mock('../database/database', () => ({
    get: jest.fn().mockReturnValue(plantsCollectionMock),
  }));
  
  describe('Plant CRUD operations', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a new plant', async () => {
      const newPlantData: Omit<PlantDetails, 'id'> = {
        common_name: 'New Plant',
        scientific_name: ['New Plantus'],
        // ... other properties without 'id'
      };
      const createdPlant = await createPlant(newPlantData as PlantDetails);
  
      expect(plantsCollectionMock.insert).toHaveBeenCalledWith(newPlantData);
      expect(createdPlant).toEqual(mockPlantDetails);
    });
  
    it('should find all plants', async () => {
      const allPlants = await findPlants();
  
      expect(plantsCollectionMock.find).toHaveBeenCalledWith({});
      expect(allPlants).toEqual([mockPlantDetails]);
    });

    it('should find a plant by id', async () => {
      const plantId = '1';
      const foundPlant = await findPlantById(plantId);
  
      expect(plantsCollectionMock.findOne).toHaveBeenCalledWith({ _id: plantId });
      expect(foundPlant).toEqual(mockPlantDetails);
    });

    it('should update a plant', async () => {
      const plantId = '1';
      const updatedPlantData: Partial<PlantDetails> = {
        common_name: 'Updated Plant',
        // ... other properties to update
      };
      const updatedPlant = await updatePlant(plantId, updatedPlantData);
  
      expect(plantsCollectionMock.update).toHaveBeenCalledWith({ _id: plantId }, { $set: updatedPlantData });
      expect(updatedPlant).toEqual(mockPlantDetails);
    });

    it('should delete a plant', async () => {
      const plantId = '1';
      const deleteMessage = await deletePlant(plantId);
  
      expect(plantsCollectionMock.remove).toHaveBeenCalledWith({ _id: plantId });
      expect(deleteMessage).toEqual({ message: `Plant with id ${plantId} deleted successfully.` });
    });
  });
  
export { createPlant, findPlants, findPlantById, updatePlant, deletePlant };
