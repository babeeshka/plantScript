<template>
  <div class="home-container">
    <h3>Here's a random plant...</h3>
    <!-- Plant Card -->
    <PlantCard
      v-if="randomPlant"
      :plant="randomPlant"
      :key="randomPlant.id"
      @clicked="showPlantDetails(randomPlant)"
      class="plant-card"
    />

    <!-- Fetch Random Plant Button -->
    <div class="button-container">
      <button class="button-primary" @click="fetchRandomPlant">
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
import PlantCard from '@/components/PlantCard.vue';
import PlantModal from '@/components/PlantModal.vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default {
  components: {
    PlantCard,
    PlantModal,
  },
  data() {
    return {
      randomPlant: undefined as PlantDetails | undefined,
      isDialogOpen: false,
      selectedPlant: undefined as PlantDetails | undefined,
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
    showPlantDetails(plant: PlantDetails) {
      console.log("Plant details should show now", plant);
      this.selectedPlant = plant;
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
  height: calc(100vh - var(--navbar-height));
  max-width: 1200px;
  margin: 0 auto;
  padding: 1em;
}

.button-container {
  text-align: center;
  margin-top: 2em; 
}

</style>


