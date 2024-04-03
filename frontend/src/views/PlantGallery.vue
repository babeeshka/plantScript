<template>
  <div class="search-filter-container">
    <SearchBar :dynamic="true" @search="dynamicFilterPlants" />
    <FilterContainer @apply-filters="applyFilters" />
  </div>
  <div class="plant-gallery">
    <div class="results-container">
      <GalleryContainer :plants="filteredPlants" @showPlantDetails="showPlantDetails" />

      <!-- Pagination and No Results Handling -->
      <button v-if="hasMore" @click="loadMorePlants" class="button-primary">Load More</button>
      <p v-if="searchExecuted && filteredPlants.length === 0">No results found.</p>
    </div>
    <PlantModal v-if="isDialogOpen" :key="selectedPlant.id" :plantDetails="selectedPlant"
      :isDialogOpen.sync="isDialogOpen" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { PlantSummary, PlantDetails } from '@rootTypes/plantInterfaces';
import SearchBar from '@/components/SearchBar.vue';
import GalleryContainer from '@/components/GalleryContainer.vue';
import FilterContainer from '@/components/FilterContainer.vue';
import PlantModal from '@/components/PlantModal.vue';

export default {
  components: {
    SearchBar,
    GalleryContainer,
    FilterContainer,
    PlantModal,
  },
  data() {
    return {
      searchTerm: '',
      plants: [],
      isDialogOpen: false,
      selectedPlant: {} as PlantDetails,
      filters: {
        droughtTolerant: false,
        saltTolerant: false,
        thorny: false,
        invasive: false,
        tropical: false,
        indoor: false,
        flowers: false,
        fruits: false,
        cones: false,
        leaf: false,
        poisonous_to_humans: false,
        poisonous_to_animals: false,
      } as Record<string, boolean>,
      showFilters: false,
      selectedFilters: {},
      searchExecuted: false,
      // Pagination state
      hasMore: true,
      limit: 10,
      offset: 0,
    };
  }, mounted() {
    this.fetchPlants();
  },
  computed: {
    filteredPlants() {
      return this.plants.filter(plant => {
        // Apply filter conditions based on the selected filters
        return Object.keys(this.filters).every(key => {
          return !this.filters[key] || plant[key];
        });
      });
    },
  },
  methods: {
    async fetchPlants() {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${apiUrl}/db/plants`, {
          params: { limit: this.limit, offset: this.offset }
        });
        this.plants = response.data.data;
        this.hasMore = this.plants.length === this.limit;
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    },
    filterPlants(query: string) {
      this.offset = 0;
      this.fetchPlants();
    },
    dynamicFilterPlants() {
      this.searchExecuted = true;
    },
    handlePlantClicked(plant: PlantDetails) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    async showPlantDetails(plantId: number) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/${plantId}/details`);
        this.selectedPlant = response.data;
        console.log('Selected Plant:', this.selectedPlant);
        this.isDialogOpen = true;
      } catch (error) {
        console.error('Error fetching plant details:', error);
      }
    },
    closeModal() {
      this.isDialogOpen = false;
    },
    applyFilters(filters: Record<string, boolean>) {
      this.filters = filters;
    },
    loadMorePlants() {
      this.offset += this.limit;
      this.fetchPlants();
    },
  },
};
</script>

<style scoped>
.plant-gallery {
  display: flex;
  justify-content: center;
}

.results-container {
  flex-grow: 1;
  padding: 1rem 0;
}

</style>
