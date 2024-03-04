<template>
  <div>
    <h1>Welcome to PlantScript!</h1>
    <div v-if="randomPlant">
      <h2>{{ randomPlant.common_name }}</h2>
      <img :src="randomPlant.default_image.thumbnail" alt="Plant image">
      <p>Scientific Name: {{ randomPlant.scientific_name.join(', ') }}</p>
      <p>Family: {{ randomPlant.family }}</p>
      <p>Genus: {{ randomPlant.genus }}</p>
      <p>Type: {{ randomPlant.type }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import { PlantDetails } from '@/plantInterfaces';
import axios from 'axios';

export default defineComponent({
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
  components: {
    RandomPlantDetails,
  },
});
</script>