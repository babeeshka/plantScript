import { PlantDetails } from '../models/plantInterfaces';
import { fetchSpeciesList, searchPlantByName, fetchPlantDetails } from '../services/plantService';
import axios from 'axios';

const API_KEY = process.env.PERENUAL_API_KEY; // ensure this is set in .env.test
const BASE_URL = 'https://perenual.com/api';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

mockedAxios.get.mockResolvedValueOnce({
    data: <PlantDetails>{
        id: 1,
        common_name: "European Silver Fir",
        scientific_name: ["Abies alba"],
        cycle: "Perennial",
        watering: "Frequent",
        sunlight: ["full sun"],
        default_image: {
            license: 45,
            license_name: "Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)",
            license_url: "https://creativecommons.org/licenses/by-sa/3.0/deed.en",
            original_url: "https://example.com/image.jpg",
            regular_url: "https://example.com/image_regular.jpg",
            medium_url: "https://example.com/image_medium.jpg",
            small_url: "https://example.com/image_small.jpg",
            thumbnail: "https://example.com/image_thumbnail.jpg",
        },
        // ... other details...
    },
});

describe('fetchSpeciesList', () => {
    it('should fetch species list correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                // Assuming the API returns an array of species in the `data` property
                data: [{
                    id: 1,
                    common_name: "European Silver Fir",
                    scientific_name: [
                        "Abies alba"
                    ],
                    other_name: [
                        "Common Silver Fir"
                    ],
                    cycle: "Perennial",
                    watering: "Frequent",
                    sunlight: [
                        "full sun"
                    ]
                }],
                // Any other top-level response properties...
            },
        });

        const response = await fetchSpeciesList(1);
        // Assuming response is the array directly
        expect(response.data).toEqual(expect.arrayContaining([expect.objectContaining({
            id: 1,
            common_name: "European Silver Fir",
        })]));
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species-list`, {
            params: { key: API_KEY, page: 1 },
        });
    });
});

describe('searchPlantByName', () => {
    it('should search plant by name correctly', async () => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                data: [{
                    id: 24,
                    common_name: "Mocha Rose Big Leaf Maple",
                    scientific_name: [
                        "Acer macrophyllum 'Mocha Rose'"
                    ],
                    other_name: [
                        "Oregon Maple"
                    ],
                    cycle: "Perennial",
                    watering: "Average",
                    sunlight: [
                        "full sun",
                        "part shade"
                    ],
                }]
            },
        });

        const response = await searchPlantByName('rose');
        expect(response.data).toEqual(expect.arrayContaining([expect.objectContaining({
            id: 24,
            common_name: "Mocha Rose Big Leaf Maple",
        })]));
        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species-list`, {
            params: { key: API_KEY, q: 'rose' },
        });
    });
});

describe('fetchPlantDetails', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValueOnce({
            data: {
                id: 1,
                common_name: "European Silver Fir",
                scientific_name: [
                    "Abies alba"
                ],
                other_name: [
                    "Common Silver Fir"
                ],
                family: null,
                origin: [
                    "Austria",
                    "Germany",
                    "Switzerland",
                    "France",
                    "Italy",
                    "Slovenia",
                    "Croatia",
                    "Bosnia and Herzegovina",
                    "Serbia",
                    "Montenegro",
                    "Albania",
                    "Bulgaria",
                    "Romania",
                    "Ukraine",
                    "Poland",
                    "Czech Republic",
                    "Slovakia",
                    "Hungary"
                ],
                type: "tree",
                dimension: "Height:  60 feet",
                dimensions: {
                    "type": "Height",
                    "min_value": 60,
                    "max_value": 60,
                    "unit": "feet"
                },
                cycle: "Perennial",
                attracts: [],
                propagation: [
                    "Cutting",
                    "Grafting Propagation",
                    "Layering Propagation",
                    "Seed Propagation",
                    "Air Layering Propagation",
                    "Tissue Culture"
                ],
                hardiness: {
                    "min": "7",
                    "max": "7"
                },
                watering: "Frequent",
                depth_water_requirement: [],
                volume_water_requirement: [],
                watering_period: null,
                watering_general_benchmark: {
                    "value": "7-10",
                    "unit": "days"
                },
                plant_anatomy: [],
                sunlight: [
                    "full sun"
                ],
                pruning_month: [
                    "February",
                    "March",
                    "April"
                ],
                pruning_coun: [],
                seeds: 0,
                maintenance: null,
                soil: [],
                growth_rate: "High",
                drought_tolerant: false,
                salt_tolerant: false,
                thorny: false,
                invasive: false,
                tropical: false,
                indoor: false,
                care_level: "Medium",
                pest_susceptibility: [],
                pest_susceptibility_api: "Coming Soon",
                flowers: false,
                flowering_season: null,
                flower_color: "",
                cones: true,
                fruits: false,
                edible_fruit: false,
                edible_fruit_taste_profile: "Coming Soon",
                fruit_nutritional_value: "Coming Soon",
                fruit_color: [],
                harvest_season: null,
                leaf: true,
                leaf_color: [
                    "green"
                ],
                edible_leaf: false,
                cuisine: false,
                medicinal: true,
                poisonous_to_humans: 0,
                poisonous_to_pets: 0,
                description: "European Silver Fir (Abies alba) is an amazing coniferous species native to mountainous regions of central Europe and the Balkans. It is an evergreen tree with a narrow, pyramidal shape and long, soft needles. Its bark is scaly grey-brown and its branches are highly ornamental due to its conical-shaped silver-tinged needles. It is pruned for use as an ornamental evergreen hedging and screening plant, and is also popular for use as a Christmas tree. Young trees grow quickly and have strong, flexible branches which makes them perfect for use as windbreaks. The European Silver Fir is an impressive species, making it ideal for gardens and public spaces.",
                // other details...
            },
        });
    });
    it('should fetch plant details correctly', async () => {
        const response = await fetchPlantDetails(1);

        // Assuming your API directly returns the plant object without a nested data property
        expect(response).toEqual(expect.objectContaining({
            id: 1,
            common_name: "European Silver Fir",
        }));

        expect(mockedAxios.get).toHaveBeenCalledWith(`${BASE_URL}/species/details/1`, {
            params: { key: API_KEY },
        });
    });
});
