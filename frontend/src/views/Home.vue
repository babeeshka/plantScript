<template>
    <div>
      <h1>Welcome to PlantScript</h1>
      <div v-if="randomPlant">
        <p>{{ randomPlant.scientific_name }}</p>
        <!-- TODO add more display details -->
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        randomPlant: null,
      };
    },
    async created() {
      try {
        const response = await axios.get('/api/plants/random'); // adjust API endpoint as needed
        this.randomPlant = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    name: 'Home',
  };
  </script>
  