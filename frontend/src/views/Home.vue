<template>
  <div>
    <h1>Welcome to PlantScript</h1>
    <RandomPlantDetails v-if="randomPlant" :plant="randomPlant" />
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import RandomPlantDetails from '@/components/RandomPlantDetails.vue'; // @ is an alias to /src
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
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      const response = await axios.get(`${apiUrl}/api/plants/random`);
      this.randomPlant = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  name: 'Home',
};
</script>

<style scoped>
  /* Your scoped CSS here, this will only apply to this component */
</style>
