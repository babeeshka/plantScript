<template>
  <div class="top-container">
    <!-- Explicit Search bar -->
    <SearchBar :dynamic="false" @search="searchPlants" />
    <!-- Filter Container -->
    <FilterContainer @apply-filters="applyFilters" />
  </div>

  <!-- Plant Gallery with search results -->
  <GalleryContainer :plants="searchResults" @showDetails="showPlantDetails" />

  <!-- Plant Details Modal -->
  <PlantModal
      v-if="isDialogOpen"
      :plantDetails="selectedPlant"
      :isDialogOpen.sync="isDialogOpen"
      @close="closeModal"
  />

  <!-- Pagination Controls -->
  <PaginationControls v-if="searchResults.length > 0 && lastPage > 1" :currentPage="currentPage" :lastPage="lastPage"
    @change="changePage" />

  <!-- No Results Found Message -->
  <p v-if="searchExecuted && searchResults.length === 0">No results found.</p>
</template>

<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import GalleryContainer from '@/components/GalleryContainer.vue';
import FilterContainer from '@/components/FilterContainer.vue';
import PlantModal from '@/components/PlantModal.vue';

export default {
  components: {
    GalleryContainer,
    FilterContainer,
    SearchBar,
    PlantModal,
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      currentPage: 1,
      lastPage: 1,
      searchExecuted: false,
      selectedPlant: null,
      isDialogOpen: false,
    };
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  methods: {
    async searchPlants(query) {
      this.searchExecuted = true;
      this.searchQuery = query;
      await this.fetchPlants();
    },
    async fetchPlants() {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/search`, {
          params: { q: this.searchQuery, page: this.currentPage }
        });
        this.searchResults = response.data.data;
        this.currentPage = response.data.current_page;
        this.lastPage = response.data.last_page;
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    },
    handlePlantClicked(plant) {
      // Check if full details are needed
      if (needsDetails(plant)) {
        this.fetchFullPlantDetails(plant.id);
      } else {
        this.selectedPlant = plant;
        this.isDialogOpen = true;
      }
    },
    showPlantDetails(plantId) {
      // Check if the plant details are already available in searchResults
      const plantSummary = this.searchResults.find(plant => plant.id === plantId);
      if (plantSummary) {
        // Fetch the full plant details using the plant ID
        axios.get(`/api/plants/${plantId}/details`).then(response => {
          this.selectedPlant = response.data; // Assuming the API returns the full PlantDetails
          this.isDialogOpen = true;
        }).catch(error => {
          console.error("Error fetching plant details:", error);
          // Handle error (e.g., show an error message)
        });
      }
    },
    applyFilters(filters) {
      // Use filters to modify the search query
      this.searchPlants(this.searchQuery, filters); // Adjust searchPlants method to accept filters
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchPlants(); // Fetch plants for the new page
    },
    showPlantDetails(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    closeModal() {
      this.isDialogOpen = false;
    },
    redirectToManagePlant(plantId) {
      this.closeModal();
      this.router.push({ name: 'ManagePlant', params: { plantId } });
    },
  },
};
</script>

<style scoped></style>
