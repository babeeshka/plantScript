<template>
    <div class="plant-info-page">
        <v-container v-if="!plant">
            <v-row>
                <v-col cols="12" class="text-center">
                    <p>Loading plant details...</p>
                </v-col>
            </v-row>
        </v-container>
        <v-container v-else>
            <v-row>
                <v-col cols="12" lg="6">
                    <div class="plant-image-container">
                        <img v-if="plant.default_image"
                            :src="plant.default_image.medium_url || plant.default_image.original_url" alt="Plant image"
                            class="plant-image" @click="openFullImage" />
                        <div v-else class="placeholder-container">
                            <PlaceholderImage />
                        </div>
                    </div>
                </v-col>
                <v-col cols="12" lg="6">
                    <div class="plant-info">
                        <h1 class="plant-name">{{ plant?.common_name || 'Common name not available' }}</h1>
                        <p class="plant-scientific-name">{{ plant?.scientific_name?.join(', ') || 'Not found' }}</p>
                        <div class="plant-features">
                            <div v-for="(value, key) in plantFeatures" :key="key" class="feature-item">
                                <span class="feature-label">{{ key }}:</span>
                                <span class="feature-value">{{ value }}</span>
                            </div>
                        </div>
                        <div class="plant-description" v-html="formatDescription(plant.description)"></div>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <div class="plant-details">
                        <h2 class="section-title">Plant Details</h2>
                        <div class="detail-sections">
                            <div v-for="(section, index) in plantSections" :key="index" class="detail-section">
                                <h3>{{ section.title }}</h3>
                                <table>
                                    <tr v-for="(value, key) in section.data" :key="key">
                                        <td class="detail-label">{{ key }}:</td>
                                        <td class="detail-value">{{ Array.isArray(value) ? value.join(', ') : value }}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <div class="hardiness-section">
                        <h2 class="section-title">Hardiness</h2>
                        <div class="hardiness-info">
                            <p><strong>Min Zone:</strong> {{ plant.hardiness?.min || 'N/A' }}</p>
                            <p><strong>Max Zone:</strong> {{ plant.hardiness?.max || 'N/A' }}</p>
                        </div>
                    </div>
                </v-col>
            </v-row>
            <v-row v-if="plant.hardiness_location && plant.hardiness_location.full_iframe">
                <v-col cols="12">
                    <div class="hardiness-map">
                        <h3>Hardiness Map</h3>
                        <div v-html="plant.hardiness_location.full_iframe" class="hardiness-iframe"></div>
                    </div>
                </v-col>
            </v-row>

            <v-row v-if="careGuide.length > 0">
                <v-col cols="12">
                    <div class="care-guide">
                        <h2 class="section-title">Care Guide</h2>
                        <v-expansion-panels>
                            <v-expansion-panel v-for="(guideSection, index) in careGuide[0].section" :key="index">
                                <v-expansion-panel-header class="care-guide-header">
                                    <h3>{{ titleCase(guideSection.type) }}</h3>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content class="care-guide-content">
                                    <p class="care-guide-description">{{ guideSection.description }}</p>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PlantDetails, PlantGuide } from '@rootTypes/plantInterfaces';
import axios from 'axios';
import PlaceholderImage from '@/components/PlaceholderImage.vue';

export default defineComponent({
    components: {
        PlaceholderImage,
    },
    data() {
        return {
            plant: null as PlantDetails | null,
            careGuide: [] as PlantGuide[],
            showFullDescription: false,
        };
    },
    computed: {
        plantFeatures(): Record<string, any> {
            if (!this.plant) return {};

            return {
                Type: this.plant.type,
                Family: this.plant.family,
                Origin: this.plant.origin?.join(', '),
                Cycle: this.plant.cycle,
                'Growth Rate': this.plant.growth_rate,
                Maintenance: this.plant.maintenance,
            };
        },
        plantSections(): { title: string; data: Record<string, any> }[] {
            if (!this.plant) return [];

            const sections = [
                {
                    title: 'General',
                    data: {
                        Type: this.plant.type,
                        Family: this.plant.family,
                        Origin: this.plant.origin?.join(', ') || 'N/A',
                        Cycle: this.plant.cycle,
                        Attracts: this.plant.attracts?.join(', ') || 'N/A',
                    },
                },
                {
                    title: 'Dimensions',
                    data: {
                        Dimension: this.plant.dimension,
                        'Min Value': this.plant.dimensions && !Array.isArray(this.plant.dimensions) ? this.plant.dimensions.min_value : 'N/A',
                        'Max Value': this.plant.dimensions && !Array.isArray(this.plant.dimensions) ? this.plant.dimensions.max_value : 'N/A',
                        Unit: this.plant.dimensions && !Array.isArray(this.plant.dimensions) ? this.plant.dimensions.unit : 'N/A',
                    },
                },
                {
                    title: 'Watering',
                    data: {
                        Watering: this.plant.watering,
                        'Watering Period': this.plant.watering_period || 'N/A',
                        'Watering Benchmark': this.plant.watering_general_benchmark ? `${this.plant.watering_general_benchmark.value} ${this.plant.watering_general_benchmark.unit}` : 'N/A',
                    },
                },
                {
                    title: 'Sunlight',
                    data: {
                        Sunlight: this.plant.sunlight.join(', '),
                    },
                },
                {
                    title: 'Soil',
                    data: {
                        Soil: this.plant.soil.join(', ') || 'N/A',
                    },
                },
                {
                    title: 'Toxicity',
                    data: {
                        'Poisonous to Humans': this.plant.poisonous_to_humans ? 'Yes' : 'No',
                        'Poisonous to Pets': this.plant.poisonous_to_pets ? 'Yes' : 'No',
                    },
                },
            ];

            return sections.filter(section => Object.values(section.data).some(value => value !== 'N/A' && value !== ''));
        },
    },
    methods: {
        async fetchPlantDetails(plantId: string) {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/db/plants/${plantId}`);
                this.plant = response.data;
            } catch (error) {
                console.error('Error fetching plant details:', error);
            }
        },
        async fetchPlantGuide(plantId: number) {
            try {
                const apiUrl = import.meta.env.VITE_API_BASE_URL;
                const response = await axios.get(`${apiUrl}/api/plants/${plantId}/guides`);
                this.careGuide = response.data;
            } catch (error) {
                console.error('Error fetching plant guide:', error);
            }
        },
        formatDescription(description: string | null): string {
            return description ? description.replace(/\n/g, '<br>') : '';
        },
        toggleFullDescription() {
            this.showFullDescription = !this.showFullDescription;
        },
        openFullImage() {
            if (this.plant?.default_image?.original_url) {
                window.open(this.plant.default_image.original_url);
            }
        },
        titleCase(str: string): string {
            return str.toLowerCase().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        },
    },
    mounted() {
        const plantId = this.$route.params.id as string;
        this.fetchPlantDetails(plantId);
        this.fetchPlantGuide(parseInt(plantId, 10));
    },
});
</script>

<style scoped>
/* Plant Info Page styles */
.plant-info-page {
    padding: 2rem 0;
}

.plant-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
}

.plant-image {
    max-width: 100%;
    max-height: 400px;
    object-fit: contain;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
}

.plant-image:hover {
    opacity: 0.9;
}

.plant-info {
    padding: 1.5rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plant-name {
    font-size: 2rem;
    margin-bottom: 0.5rem;
}

.plant-scientific-name {
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 1.5rem;
}

.plant-features {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-bottom: 1.5rem;
}

.feature-item {
    display: flex;
    align-items: center;
}

.feature-label {
    font-weight: bold;
    margin-right: 0.5rem;
}

.plant-description {
    line-height: 1.6;
}

.plant-details,
.care-guide {
    margin-top: 2rem;
}

.section-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
}

.detail-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.detail-section {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.detail-section h3 {
    margin-top: 0;
    margin-bottom: 1rem;
}

table {
    width: 100%;
}

.detail-label {
    font-weight: bold;
    padding-right: 1rem;
}

/* Hardiness Map styles */
.hardiness-map {
    margin-top: 2rem;
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
}

.hardiness-map h3 {
    margin-top: 0;
    margin-bottom: 1rem;
    font-size: 1.5rem;
    color: #333;
}

.hardiness-iframe {
    width: 100%;
    height: 50%;
    border: none;
}

.hardiness-section {
    margin-top: 2rem;
}

.hardiness-info {
    background-color: #f9f9f9;
    padding: 1.5rem;
    border-radius: 8px;
}

.hardiness-info p {
    margin: 0.5rem 0;
}

/* Care Guide styles */
.care-guide {
    margin-top: 2rem;
}

.care-guide-header {
    background-color: #f1f1f1;
    padding: 1rem;
    border-radius: 8px 8px 0 0;
}

.care-guide-header h3 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
}

.care-guide-content {
    background-color: #fff;
    padding: 1.5rem;
    border-radius: 0 0 8px 8px;
}

.care-guide-description {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
    padding: 1rem;
}

.care-guide-content p {
    margin: 0;
    font-size: 1rem;
    line-height: 1.6;
    color: #666;
}

/* Expansion panel styles */
.v-expansion-panel {
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
    overflow: hidden;
}

.v-expansion-panel-header {
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
    background-color: #e2e2e2;
    padding: 1rem;
}

.v-expansion-panel-content {
    font-size: 1rem;
    background-color: #fff;
    padding: 1rem;
    line-height: 1.6;
    border-top: 1px solid #ccc;
    border-radius: 0 0 8px 8px;
}
</style>