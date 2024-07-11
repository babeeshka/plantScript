<template>
  <div class="search-filter-container">
    <SearchBar :dynamic="true" @search="dynamicFilterPlants" />
    <FilterContainer @apply-filters="applyFilters" />
  </div>
  <div class="plant-gallery">
    <div class="results-container">
      <GalleryContainer :plants="filteredPlants" @showPlantDetails="showPlantDetails" />
    </div>
  </div>

  <!-- Pagination and No Results Handling -->
  <button v-if="hasMore" @click="loadMorePlants" class="load-more">Load More</button>
  <p v-if="searchExecuted && filteredPlants.length === 0">No results found.</p>

  <PlantModal v-if="isDialogOpen" :key="selectedPlant.id" :plantDetails="selectedPlant"
    :isDialogOpen.sync="isDialogOpen" @close="closeModal" />
</template>

<script lang="ts">
import axios from 'axios';
import { PlantSummary, PlantDetails, PlantFilterKeys } from '@rootTypes/plantInterfaces';
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
      plants: [] as PlantSummary[],
      isDialogOpen: false,
      selectedPlant: {} as PlantDetails,
      filters: {
        drought_tolerant: false,
        salt_tolerant: false,
        thorny: false,
        invasive: false,
        tropical: false,
        indoor: false,
        flowers: false,
        cones: false,
        fruits: false,
        edible_fruit: false,
        leaf: false,
        edible_leaf: false,
        cuisine: false,
        medicinal: false
      } as Record<PlantFilterKeys, boolean>,
      showFilters: false,
      selectedFilters: {} as Record<PlantFilterKeys, boolean>,
      searchExecuted: false,
      // Pagination state
      currentPage: 1,
      hasMore: true,
      limit: 12,
      offset: 0,
    };
  }, mounted() {
    this.fetchPlants();
  },
  computed: {
    filteredPlants() {
      return this.plants.filter(plant => {
        return Object.keys(this.filters).every(key => {
          const filterKey = key as keyof typeof this.filters;
          return !this.filters[filterKey] || plant[filterKey as keyof typeof plant];
        });
      });
    },
  },
  methods: {
    async fetchPlants() {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const params = {
          limit: this.limit,
          offset: this.offset,
          ...this.selectedFilters,
          searchTerm: this.searchTerm
        };
        const response = await axios.get(`${apiUrl}/db/plants`, { params });
        this.plants = response.data.data.map((plant: PlantSummary) => ({
          ...plant,
          id: plant.id
        }));
        this.hasMore = response.data.data.length === this.limit;
        this.searchExecuted = true;
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    },

    dynamicFilterPlants(searchTerm: string) {
      console.log('Search Term:', searchTerm);
      this.searchTerm = searchTerm;
      this.currentPage = 1;
      this.fetchPlants();
    },

    applyFilters(filters: Record<PlantFilterKeys, boolean>) {
      console.log('Filters applied:', filters);
      this.selectedFilters = filters;
      this.currentPage = 1;
      this.fetchPlants();
    },

    handlePlantClicked(plant: PlantDetails) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    async showPlantDetails(plantId: number | string) {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/db/plants/${plantId}`);
        this.selectedPlant = {
          ...response.data,
          id: response.data.id || response.data._id // Use _id as fallback if id is not present
        };
        console.log('Selected Plant:', this.selectedPlant);
        this.isDialogOpen = true;
      } catch (error) {
        console.error('Error fetching plant details:', error);
      }
    },
    closeModal() {
      this.isDialogOpen = false;
    },
    async loadMorePlants() {
      this.currentPage++;
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${apiUrl}/db/plants`, {
          params: { page: this.currentPage, limit: this.limit }
        });
        if (response.data.data.length > 0) {
          this.plants = [...this.plants, ...response.data.data];
          this.hasMore = response.data.data.length === this.limit;
        } else {
          this.hasMore = false;
        }
      } catch (error) {
        console.error("Error fetching more plants:", error);
        this.hasMore = false;
      }
    },
  },
};
</script>

<style scoped>
.search-filter-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  max-width: 800px;
  margin: 2rem auto;
}
</style>
