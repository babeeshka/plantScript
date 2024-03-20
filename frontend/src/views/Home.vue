<template>
  <div class="container">
    <PlantCard class="plant-card" v-if="randomPlant" :plant="randomPlant" />
    <PlantModal v-if="isDialogOpen" :plant="selectedPlant" @close="isDialogOpen = false" />
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

<style scoped></style>
