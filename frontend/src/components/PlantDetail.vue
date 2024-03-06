<!-- /frontend/src/components/PlantDetail.vue -->
<template>
  <div v-if="plant">
    <h1>{{ plant.scientific_name }}</h1>
    <h2>{{ plant.common_name }}</h2>
    <p>{{ plant.description }}</p>
    <!-- Additional plant details here -->
  </div>
  <div v-else>
    <p>Loading plant details...</p>
  </div>
</template>

<script lang="ts">
import { axiosInstance } from '@/axiosInstance';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default {
  data() {
    return {
      plant: null as PlantDetails | null,
    };
  },
  async created() {
    const plantId = this.$route.params.id;
    try {
      const response = await axiosInstance.get(`/api/plants/${plantId}`);
      this.plant = response.data;
    } catch (error) {
      console.error(`Error fetching plant details: ${error}`);
      // Handle error appropriately
    }
  },
  name: 'PlantDetail',
};
</script>
