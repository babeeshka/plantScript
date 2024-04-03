<template>
  <div class="plant-search-page">
    <div class="search-container"
      :class="{ 'search-filter-container': searchExecuted && searchResults.length > 0, 'center': !searchExecuted }">
      <SearchBar @search="searchPlants" />
      <FilterContainer @apply-filters="applyFilters" />
    </div>
    <div v-if="searchExecuted" class="results-container">
      <GalleryContainer :plants="searchResults" @showPlantDetails="showPlantDetails" />

      <!-- Pagination Controls -->
      <PaginationControls v-if="searchResults.length > 0 && lastPage > 1" :currentPage="currentPage"
        :lastPage="lastPage" @change="changePage" />

      <!-- No Results Found Message -->
      <p v-if="searchExecuted && searchResults.length === 0">No results found.</p>
    </div>
    <PlantModal v-if="isDialogOpen" :plantDetails="selectedPlant" :isDialogOpen.sync="isDialogOpen"
      @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { PlantSummary, PlantDetails } from '@rootTypes/plantInterfaces';
import axios from 'axios';
import { useRouter } from 'vue-router';
import SearchBar from '@/components/SearchBar.vue';
import GalleryContainer from '@/components/GalleryContainer.vue';
import FilterContainer from '@/components/FilterContainer.vue';
import PlantModal from '@/components/PlantModal.vue';

export default defineComponent({
  components: {
    GalleryContainer,
    FilterContainer,
    SearchBar,
    PlantModal,
  },

  setup() {
    const router = useRouter();
    const searchQuery = ref('');
    const selectedPlant = ref<PlantDetails | null>(
      null);
    const searchResults = ref<PlantSummary[]>([]);
    const currentPage = ref(1);
    const lastPage = ref(1);
    const searchExecuted = ref(false);
    const isDialogOpen = ref(false);
    const filters = ref({});

    const searchPlants = async (query: string) => {
      searchExecuted.value = true;
      searchQuery.value = query;
      await fetchPlants();
    };

    const fetchPlants = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/search`, {
          params: { q: searchQuery.value, page: currentPage.value, ...filters.value },
        });
        searchResults.value = response.data.data;
        currentPage.value = response.data.current_page;
        lastPage.value = response.data.last_page;
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    const showPlantDetails = async (plantId: number) => {
      console.log('Received plantId in showPlantDetails:', plantId);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/${plantId}/details`);
        console.log('Plant details response:', response.data);
        selectedPlant.value = response.data;
        isDialogOpen.value = true;
      } catch (error) {
        console.error('Error fetching plant details:', error);
      }
    };

    const applyFilters = async (filters: any) => {
      filters.value = filters;
      await fetchPlants();
    };

    const changePage = (page: number) => {
      currentPage.value = page;
      fetchPlants();
    };

    const closeModal = () => {
      isDialogOpen.value = false;
    };

    return {
      searchQuery,
      searchResults,
      currentPage,
      lastPage,
      searchExecuted,
      selectedPlant,
      isDialogOpen,
      filters,
      searchPlants,
      showPlantDetails,
      applyFilters,
      changePage,
      closeModal,
    };
  },
});
</script>

<style scoped>
.plant-search-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  margin-top: var(--navbar-height);
}

.search-page-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
  min-height: calc(100vh - var(--navbar-height));
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  padding-top: calc(var(--navbar-height) + 50px);
  width: 75%;
}

.search-container.fixed-top {
  position: fixed;
  top: var(--navbar-height);
  left: 0;
  right: 0;
  z-index: 100;
  background-color: var(--bg-color);
  padding: 1rem 0;
}

.results-container {
  flex-grow: 1;
  padding: 1rem 0;
}
</style>