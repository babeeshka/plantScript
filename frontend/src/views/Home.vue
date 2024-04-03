<template>
  <div class="home-container">
    <h3>Here's a random plant...</h3>

    <!-- Only use GalleryContainer to display the random plant -->
    <GalleryContainer
      v-if="randomPlant"
      :plants="[randomPlant]"
      @showPlantDetails="showPlantDetails" />

    <!-- Fetch Random Plant Button -->
    <div class="button-container">
      <button @click="fetchRandomPlant">
        Fetch another random plant
      </button>
    </div>

    <!-- Plant Details Modal -->
    <PlantModal
      v-if="isDialogOpen"
      :plantDetails="selectedPlant"
      :isDialogOpen.sync="isDialogOpen"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import GalleryContainer from '@/components/GalleryContainer.vue';
import PlantModal from '@/components/PlantModal.vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default {
  components: {
    GalleryContainer,
    PlantModal,
  },
  data() {
    return {
      randomPlant: null as PlantDetails | null,
      isDialogOpen: false,
      selectedPlant: null as PlantDetails | null,
    };
  },
  methods: {
    async fetchRandomPlant() {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/random`);
        this.randomPlant = response.data;
      } catch (error) {
        console.error('Failed to fetch a random plant:', error);
      }
    },
    showPlantDetails(plantId: number) {
      console.log("Plant details should show now for plant ID:", plantId);
      this.selectedPlant = this.randomPlant;
      this.isDialogOpen = true;
    },
    closeModal() {
      this.isDialogOpen = false;
    },
  },
  created() {
    this.fetchRandomPlant();
  },
};
</script>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1em;
}

/* Gallery container responsive grid */
.gallery-container {
  margin: 0 auto; 
  margin-top: 2.5rem; 
  width: 100%;
  display: grid;
  grid-template-columns: auto; 
}

.button-container {
  text-align: center;
  margin-top: 2em;
}
</style>
