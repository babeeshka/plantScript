<template>
  <div class="top-container">

    <!-- Search bar -->
    <div class="search-bar">
      <input type="text" v-model="searchTerm" placeholder="Search plants..." @input="filterPlants" />
      <button @click="toggleFilters">Filters</button>
    </div>

    <!-- Filters -->
    <div class="filter-container" v-if="showFilters" ref="filterContainer">
      <div class="filter-options">

        <label><input type="checkbox" v-model="filters.droughtTolerant"> Drought Tolerant</label>
        <label><input type="checkbox" v-model="filters.saltTolerant"> Salt Tolerant</label>
        <label><input type="checkbox" v-model="filters.thorny"> Thorny</label>
        <label><input type="checkbox" v-model="filters.invasive"> Invasive</label>
        <label><input type="checkbox" v-model="filters.tropical"> Tropical</label>
        <label><input type="checkbox" v-model="filters.indoor"> Indoor</label>
        <label><input type="checkbox" v-model="filters.flowers"> Flowers</label>
        <label><input type="checkbox" v-model="filters.fruits"> Fruits</label>
        <label><input type="checkbox" v-model="filters.cones"> Cones</label>
        <label><input type="checkbox" v-model="filters.leaf"> Leaf</label>
        <label><input type="checkbox" v-model="filters.poisonous_to_humans"> Poisonous to Humans</label>
        <label><input type="checkbox" v-model="filters.poisonous_to_animals"> Poisonous to Animals</label>
      </div>
      <div class="filter-buttons">
        <button @click="resetFilters">Reset Filters</button>
        <button @click="toggleFilters">Close Filters</button>
      </div>
    </div>

  </div>

  <!-- Plant Gallery -->
  <div class="gallery-container">
    <PlantCard v-for="plant in filteredPlants" :key="plant.id" :plant="plant" @clicked="showPlantDetails"
      class="plant-card" />
  </div>
  <PlantModal v-if="isDialogOpen" :plantDetails="selectedPlant" :isDialogOpen.sync="isDialogOpen" @close="closeModal" />
  <button v-if="hasMore" @click="loadMorePlants">Load More</button>
</template>


<script>
import axios from 'axios';
import PlantCard from '@/components/PlantCard.vue';
import PlantModal from '@/components/PlantModal.vue';

export default {
  components: {
    PlantCard,
    PlantModal
  },
  data() {
    return {
      plants: [],
      searchTerm: '',
      isDialogOpen: false,
      selectedPlant: null,
      limit: 20,
      offset: 0,
      hasMore: true,
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
    };
  },
  mounted() {
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
        const newPlants = response.data.data.filter(newPlant => !this.plants.some(existingPlant => existingPlant.id === newPlant.id));
        this.plants.push(...newPlants);
        this.offset += this.limit;
        this.hasMore = response.data.data.length === this.limit;
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    },
    showPlantDetails(plant) {
      console.log("Showing plant details for:", plant);
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    closeModal() {
      this.isDialogOpen = false;
    },
    loadMorePlants() {
      if (this.hasMore) {
        this.fetchPlants();
      }
    },
    filterPlants() {
      this.fetchPlants();
    },
    toggleFilters() {
      this.showFilters = !this.showFilters;
      this.$nextTick(() => {
        const displayStyle = window.getComputedStyle(this.$refs.filterContainer).display;
        console.log("Current display style:", displayStyle);
      });
    },
    resetFilters() {
      this.filters = {
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
      };
    },
  }
};
</script>

<style scoped>
/* styles for the plant gallery */
.top-container {
  position: sticky;
  top: var(--navbar-height); 
  z-index: 20; 
  background-color: var(--bg-color);
  padding-top: 1rem; 
}

.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
  margin: auto;
  width: 95%;
}

.search-bar {
  position: relative;
  width: 95%;
  margin: auto;
  margin-bottom: 10px;
}

/* Hide the filter container by default */
.filter-container {
  background-color: white;
  padding: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  width: 90%;
  margin: auto;
  margin-bottom: 10px;
}

/* Reserved space for the filter container even when it's not visible */
.search-bar + .filter-container-placeholder {
  height: 0;
  overflow: hidden;
  transition: height 0.3s ease;
}

.show-filters + .filter-container-placeholder {
  height: --filter-container-height;
}

/* When showFilters is true, set display to block to show the container */
.show-filters .filter-container {
  display: block;
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 5px;
  margin-bottom: 15px;
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

@media (min-width: 768px) {
  .gallery-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (min-width: 1024px) {
  .gallery-container {
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
