<template>
  <div class="gallery-container">
    <PlantCard v-for="plant in plants" :key="plant.id" :plant="plant" @clicked="showPlantDetails" class="plant-card" />
  </div>
  <PlantModal v-if="isDialogOpen" :plantDetails="selectedPlant" @close="closeModal" />
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
    };
  },
  mounted() {
    this.fetchPlants();
  },
  computed: {
    filteredPlants() {
      return this.searchTerm.trim()
        ? this.plants.filter(plant => plant.common_name.toLowerCase().includes(this.searchTerm.toLowerCase()))
        : this.plants;
    },
  },
  methods: {
    async fetchPlants() {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      try {
        const response = await axios.get(`${apiUrl}/db/plants`, {
          params: { limit: this.limit, offset: this.offset }
        });
        this.plants.push(...response.data.data);
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
      // TODO implement the logic to filter plants based on the searchTerm and other filter criteria
    },
  }
};
</script>

<style scoped>
/* styles for the plant gallery */
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 1em;
  margin: auto;
  width: 95%;
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
