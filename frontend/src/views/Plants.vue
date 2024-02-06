<template>
    <div>
      <v-data-table
        :headers="headers"
        :items="plants"
        :items-per-page="10"
        class="elevation-1"
        @click:row="showPlantDetails"
      ></v-data-table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        headers: [
          { text: 'Common Name', value: 'common_name' },
          { text: 'Scientific Name', value: 'scientific_name' },
          // Add other fields as needed
        ],
        plants: [] // This will be populated from the API
      }
    },
    mounted() {
      this.fetchPlants();
    },
    methods: {
      async fetchPlants() {
        try {
          let response = await axios.get("/api/plants"); // Replace with your API endpoint
          this.plants = response.data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      },
      showPlantDetails(plant) {
        // For now, just log the plant details. You can expand this to show a modal or navigate to a plant details page.
        console.log(plant);
      }
    }
  };
  </script>
  