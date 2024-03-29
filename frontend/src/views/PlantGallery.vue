<template>
  <div class="top-container">
    <!-- Search bar -->
    <SearchBar :dynamic="true" @search="dynamicFilterPlants" />
    <!-- Filter Container -->
    <FilterContainer @apply-filters="applyFilters" />
  </div>

  <!-- Plant Gallery with dynamic filtering -->
  <GalleryContainer :plants="filteredPlants" @showPlantDetails="showPlantDetails" />

  <!-- Plant Details Modal -->
  <PlantModal
      v-if="isDialogOpen"
      :plantDetails="selectedPlant"
      :isDialogOpen.sync="isDialogOpen"
      @close="closeModal"
  />

  <!-- Pagination and No Results Handling -->
  <button v-if="hasMore" @click="loadMorePlants">Load More</button>
  <p v-if="searchExecuted && filteredPlants.length === 0">No results found.</p>
</template>

<script lang="ts">
import axios from 'axios';
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
      selectedPlant: null,
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
        poisonous_to_animals: false
      },
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
      return this.plants.filter((plant) => {
        if (this.searchTerm && !plant.common_name.toLowerCase().includes(this.searchTerm.toLowerCase()) && !plant.scientific_name.some(name => name.toLowerCase().includes(this.searchTerm.toLowerCase()))) {
          return false;
        }
        // Check each filter
        if (this.filters.droughtTolerant && !plant.drought_tolerant) return false;
        if (this.filters.saltTolerant && !plant.salt_tolerant) return false;
        if (this.filters.thorny && !plant.thorny) return false;
        if (this.filters.invasive && !plant.invasive) return false;
        if (this.filters.tropical && !plant.tropical) return false;
        if (this.filters.indoor && !plant.indoor) return false;
        if (this.filters.flowers && !plant.flowers) return false;
        if (this.filters.fruits && !plant.fruits) return false;
        if (this.filters.cones && !plant.cones) return false;
        if (this.filters.leaf && !plant.leaf) return false;
        if (this.filters.poisonous_to_humans && plant.poisonous_to_humans === 0) return false;
        if (this.filters.poisonous_to_animals && plant.poisonous_to_animals === 0) return false;

        // If none of the conditions matched, keep the plant
        return true;
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
    filterPlants(query) {
      this.offset = 0;
      this.fetchPlants();
    },
    dynamicFilterPlants() {
      this.searchExecuted = true;
    },
    handlePlantClicked(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    showPlantDetails(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    closeModal() {
      this.isDialogOpen = false;
    },
    applyFilters(filters) {
      // Implement logic to either fetch new data with filters or apply filters locally
      this.fetchPlants(filters); // Example: Pass filters to fetchPlants method if it supports filtering
    },
    loadMorePlants() {
      this.offset += this.limit;
      this.fetchPlants();
    },
  },
};
</script>

<style scoped>
/* Scoped styles for PlantGallery */
</style>
