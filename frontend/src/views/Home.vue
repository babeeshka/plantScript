<template>
  <div>
    <h1>Welcome to PlantScript</h1>
    <!-- Pass the randomPlant data to RandomPlantDetails component -->
    <RandomPlantDetails v-if="randomPlant" :plant="randomPlant" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import RandomPlantDetails from '@/components/RandomPlantDetails.vue'; // Ensure this path is correct
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default {
  components: {
    RandomPlantDetails,
  },
  data() {
    return {
      randomPlant: null as PlantDetails | null,
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/plants/random');
      this.randomPlant = response.data;
    } catch (error) {
console.error(error);
    }
  },
  name: 'Home',
};
</script>
