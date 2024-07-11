<template>
  <div class="plant-search-page">
    <div class="search-container">
      <div class="search-bar-wrapper">
        <SearchBar @search="searchPlants" />
        <FilterContainer @apply-filters="applyFilters" />
      </div>
    </div>
    <div v-if="searchExecuted" class="results-container">
      <GalleryContainer :plants="searchResults" @showPlantDetails="showPlantDetails" />

      <!-- Pagination Controls -->
      <div class="pagination-controls">
        <PaginationControls :currentPage="currentPage" :totalPages="lastPage" @change="changePage" />
      </div>

      <!-- No Results Found Message and Manual Entry Button -->
      <div v-if="!plantFound" class="no-results">
        <p>No results found.</p>
        <p>Not seeing the plant you're after?</p>
        <button @click="goToManualEntry" class="manual-entry-btn">Click here to manually enter</button>
      </div>
      <PlantModal v-if="isDialogOpen" :plantDetails="selectedPlant" :isDialogOpen.sync="isDialogOpen"
        @close="closeModal" />
    </div>
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
import PaginationControls from '@/components/PaginationControls.vue';
import { onMounted } from 'vue';

export default defineComponent({
  components: {
    GalleryContainer,
    FilterContainer,
    SearchBar,
    PlantModal,
    PaginationControls,
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
    const plantFound = ref(true);

    const searchPlants = async (query: string, page = 1) => {
      searchExecuted.value = true;
      searchQuery.value = query;
      await fetchPlants(page);
    };

    const fetchPlants = async (page: number) => {
      console.log('Fetching plants for page:', page);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const params = { q: searchQuery.value, page, ...filters.value };
        //console.log('Preparing to call API with params:', params);

        const response = await axios.get(`${apiUrl}/api/plants/search`, {
          params: params,
        });

        /*
        console.log('API called with params:', response.config.params);
        console.log('API response:', response);
        */

        if (currentPage.value !== page) {
          console.log('Page mismatch: expected', page, 'but currentPage is', currentPage.value);
        }

        searchResults.value = response.data.data;
        currentPage.value = response.data.current_page;
        lastPage.value = response.data.last_page;

        // Set plantFound based on search results
        plantFound.value = searchResults.value.length > 0;

        console.log('Updated currentPage to:', currentPage.value);
      } catch (error) {
        console.error('Error fetching search results:', error);
        plantFound.value = false;
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
      await fetchPlants(currentPage.value);
    };

    const changePage = (page: number) => {
      console.log('Requested change to page:', page);
      currentPage.value = page;
      console.log('currentPage set to:', currentPage.value);
      fetchPlants(page).then(() => {
        router.push({ path: '/search', query: { page: page.toString() } });
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      });
    };

    const closeModal = () => {
      isDialogOpen.value = false;
    };

    const goToManualEntry = () => {
      router.push({ name: 'ManagePlant', query: { manualEntry: 'true' } });
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
      goToManualEntry,
      plantFound
    };
  },
});
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

.plant-search-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding-top: var(--navbar-height);
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
  flex-direction: column;
  align-items: center;
  padding-top: calc(var(--navbar-height) + 20px);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

.search-bar-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
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

.no-results {
  text-align: center;
  margin-top: 2rem;
}

.manual-entry-btn {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.manual-entry-btn:hover {
  background-color: #45a049;
}
</style>