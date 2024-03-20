<template>
  <div>
    <SearchComponent @search="searchPlants" />
    <div v-if="searchMode === 'broad'">
      <!-- Display broad search results here -->
      <div v-for="plant in searchResults" :key="plant.id" @click="toggleDetailedSearch(plant.id)">
        <h3>{{ plant.common_name }}</h3>
        <p>{{ plant.scientific_name }}</p>
        <!-- Additional brief details -->
      </div>
    </div>
    <div v-else>
      <!-- Detailed search result using PlantDetail component -->
      <PlantDetail v-if="selectedPlant" :plant="selectedPlant" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import PlantDetail from '@/components/PlantDetail.vue'; 
import SearchComponent from '@/components/SearchComponent.vue';

export default {
  components: {
    PlantDetail,
    SearchComponent,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      selectedPlant: null,
      searchMode: 'broad', // 'broad' or 'detailed'
    };
  },
  methods: {
    async searchPlants(query) {
      this.searchQuery = query;
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/search/${encodeURIComponent(this.searchQuery)}`;
        const response = await axios.get(apiUrl);
        this.searchResults = response.data;
        this.searchMode = 'broad';
      } catch (error) {
        console.error(error);
      }
    },
    async toggleDetailedSearch(plantId) {
      try {
        const apiUrl = `${import.meta.env.VITE_API_BASE_URL}/api/plants/${plantId}`;
        const response = await axios.get(apiUrl);
        this.selectedPlant = response.data;
        this.searchMode = 'detailed';
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
