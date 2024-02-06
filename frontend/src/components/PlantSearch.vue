<template>
    <div>
      <input v-model="plantName" placeholder="Enter a plant name" @keyup.enter="fetchPlantData"/>
      <button @click="fetchPlantData">Search</button>
      <div v-if="plantDetails">
        <h2>{{ plantDetails.common_name }}</h2>
        <!-- Display other plant details as needed -->
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        plantName: '',
        plantDetails: null,
      };
    },
    methods: {
      async fetchPlantData() {
        try {
          const response = await axios.get(`/api/plants/${encodeURIComponent(this.plantName)}`);
          this.plantDetails = response.data;
        } catch (error) {
          console.error('Error fetching plant data:', error);
          this.plantDetails = null;
          // Handle the error (e.g., show an error message)
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add styles for your component */
  </style>
  