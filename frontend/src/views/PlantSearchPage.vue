<!-- /frontend/src/views/PlantSearchPage.vue -->
<template>
  <div>
    <input v-model="searchQuery" @keyup.enter="searchPlants" placeholder="Search plants...">
    <button @click="searchPlants">Search</button>
    <PlantsList :plants="searchResults" @selectPlant="showPlantDetails" />
    <v-dialog v-model="isDialogOpen" persistent max-width="600px">
      <PlantDetail :plant="selectedPlant" />
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import PlantsList from '@/components/PlantsList.vue'; 
import PlantDetail from '@/components/PlantDetail.vue'; 

export default {
  components: {
    PlantsList,
    PlantDetail,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      isDialogOpen: false,
      selectedPlant: null,
    };
  },
  methods: {
    async searchPlants() {
      try {
        const response = await axios.get(`/api/search/${encodeURIComponent(this.searchQuery)}`);
        this.searchResults = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    showPlantDetails(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
  },
  name: 'PlantSearchPage',
};
</script>
