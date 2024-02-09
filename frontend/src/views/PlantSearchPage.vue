<template>
    <div>
      <input v-model="searchQuery" @keyup.enter="searchPlants" placeholder="Search plants...">
      <button @click="searchPlants">Search</button>
      <!-- TODO display search results here -->
    </div>
  </template>
  
  <script lang="ts">
  import axios from 'axios';
  
  export default {
    data() {
      return {
        searchQuery: '',
        searchResults: [],
      };
    },
    methods: {
      async searchPlants() {
        try {
          const response = await axios.get(`/api/plants/${this.searchQuery}`);
          this.searchResults = response.data;
        } catch (error) {
          console.error(error);
        }
      },
    },
    name: 'PlantSearchPage',
  };
  </script>
  