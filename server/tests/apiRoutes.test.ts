import axios from 'axios';
import {
    fetchSpeciesList,
    searchPlantByName,
    fetchPlantDetails
} from '../services/plantService';
import {
    ApiResponse,
    PlantSummary,
    PlantDetails
} from '../models/plantInterfaces';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Sample data for the species-list endpoint, typed with ApiResponse<PlantSummary>
const speciesListMock: ApiResponse<PlantSummary> = {
    data: [
        {
            id: '1',
            common_name: 'European Silver Fir',
            scientific_name: [
                'Abies alba'
            ],
            other_name: [
                'Common Silver Fir'
            ],
            cycle: 'Perennial',
            watering: 'Frequent',
            sunlight: [
                'full sun'
            ],
            default_image: {
                license: 45,
                license_name: 'Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)',
                license_url: 'https://creativecommons.org/licenses/by-sa/3.0/deed.en',
                original_url: 'https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg',
                regular_url: 'https://perenual.com/storage/species_image/1_abies_alba/regular/1536px-Abies_alba_SkalitC3A9.jpg',
                medium_url: 'https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg',
                small_url: 'https://perenual.com/storage/species_image/1_abies_alba/small/1536px-Abies_alba_SkalitC3A9.jpg',
                thumbnail: 'https://perenual.com/storage/species_image/1_abies_alba/thumbnail/1536px-Abies_alba_SkalitC3A9.jpg'
            }
        },
        {
            id: '2',
            common_name: 'Pyramidalis Silver Fir',
            scientific_name: [
                'Abies alba', 'Pyramidalis'
            ],
            other_name: [],
            cycle: 'Perennial',
            watering: 'Average',
            sunlight: [
                'full sun'
            ],
            default_image: {
                license: 5,
                license_name: 'Attribution-ShareAlike License',
                license_url: 'https://creativecommons.org/licenses/by-sa/2.0/',
                original_url: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/og/49255769768_df55596553_b.jpg',
                regular_url: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/regular/49255769768_df55596553_b.jpg',
                medium_url: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/medium/49255769768_df55596553_b.jpg',
                small_url: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/small/49255769768_df55596553_b.jpg',
                thumbnail: 'https://perenual.com/storage/species_image/2_abies_alba_pyramidalis/thumbnail/49255769768_df55596553_b.jpg'
            }
        }
    ],
    to: 30,
    per_page: 30,
    current_page: 1,
    from: 1,
    last_page: 337,
    total: 0,
};

// Sample data for the species/details/[ID] endpoint, typed with PlantDetails
// Sample data for the species/details/[ID] endpoint, typed with PlantDetails
const speciesDetailsMock: PlantDetails = {
    id: '1',
    common_name: 'European Silver Fir',
    scientific_name: [
        'Abies alba'
    ],
    other_name: [
        'Common Silver Fir'
    ],
    cycle: 'Perennial',
    watering: 'Frequent',
    sunlight: [
        'full sun'
    ],
    default_image: {
        license: 45,
        license_name: 'Attribution-ShareAlike 3.0 Unported (CC BY-SA 3.0)',
        license_url: 'https://creativecommons.org/licenses/by-sa/3.0/deed.en',
        original_url: 'https://perenual.com/storage/species_image/1_abies_alba/og/1536px-Abies_alba_SkalitC3A9.jpg',
        regular_url: 'https://perenual.com/storage/species_image/1_abies_alba/regular/1536px-Abies_alba_SkalitC3A9.jpg',
        medium_url: 'https://perenual.com/storage/species_image/1_abies_alba/medium/1536px-Abies_alba_SkalitC3A9.jpg',
        small_url: 'https://perenual.com/storage/species_image/1_abies_alba/small/1536px-Abies_alba_SkalitC3A9.jpg',
        thumbnail: 'https://perenual.com/storage/species_image/1_abies_alba/thumbnail/1536px-Abies_alba_SkalitC3A9.jpg'
    },
    family: 'Pinaceae',
    origin: [
        'Europe'
    ],
    type: 'Tree',
    dimension: 'Large',
    dimensions: {
        type: 'Height',
        min_value: 20,
        max_value: 50,
        unit: 'm'
    },
    attracts: [
        'Birds'
    ],
    propagation: [
        'Seed'
    ],
    hardiness: {
        min: '-20°C',
        max: '-15°C'
    },
    watering_period: 'Weekly',
    watering_general_benchmark: {
        value: '2',
        unit: 'litres'
    },
    growth_rate: 'Medium',
    drought_tolerant: false,
    salt_tolerant: false,
    thorny: false,
    invasive: false,
    tropical: false,
    indoor: false,
    care_level: 'Moderate',
    pest_susceptibility: [
        'Aphids',
        'Caterpillars'
    ],
    flowers: true,
    flowering_season: 'Spring',
    flower_color: 'Yellow',
    cones: false,
    fruits: false,
    edible_fruit: false,
    edible_fruit_taste_profile: 'N/A',
    leaf: true,
    leaf_color: ['Green'],
    medicinal: false,
    poisonous_to_humans: 0,
    poisonous_to_pets: 0,
    description: 'The European Silver Fir is a large evergreen coniferous tree growing to 20–50 m tall and with a trunk diameter of up to 1.5 m. It occurs at altitudes of 300–1,700 m, on mountains with a rainfall of over 1,000 mm. It is a large evergreen coniferous tree growing to 20–50 m tall and with a trunk diameter of up to 1.5 m. It occurs at altitudes of 300–1,700 m, on mountains with a rainfall of over 1,000 mm. It is a large evergreen coniferous tree growing to 20–50 m tall and with a trunk diameter of up to 1.5 m. It occurs at altitudes of 300–1,700 m, on mountains with a rainfall of over 1,000 mm.',
    // Add any additional properties that are part of the PlantDetails interface here
};


// Test for successful fetchSpeciesList
describe('fetchSpeciesList', () => {
    it('successfully fetches species list', async () => {
        mockedAxios.get.mockResolvedValue({ data: speciesListMock });

        const result = await fetchSpeciesList();

        expect(result.data).toEqual(speciesListMock.data);
        expect(mockedAxios.get).toHaveBeenCalledWith('species-list');
    });

    // Add more tests here for error handling and edge cases
});

// Test for successful fetchSpeciesDetails
describe('fetchPlantDetails', () => {
    it('successfully fetches species details', async () => {
        const id = '1'; 
        mockedAxios.get.mockResolvedValue({ data: speciesDetailsMock });

        const result = await fetchPlantDetails(id);

        expect(result).toEqual(speciesDetailsMock);
        expect(mockedAxios.get).toHaveBeenCalledWith(`species/details/${id}`);
    });

    // Add more tests here for error handling and edge cases
});

// Reset mock before each test
beforeEach(() => {
    mockedAxios.get.mockReset();
});
