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
          // TODO add other fields as needed
        ],
        plants: [] // this will be populated from the API
      }
    },
    mounted() {
      this.fetchPlants();
    },
    methods: {
      async fetchPlants() {
        try {
          let response = await axios.get("/api/plants"); // TODO replace with the API endpoint
          this.plants = response.data;
        } catch (error) {
          console.error("An error occurred:", error);
        }
      },
      showPlantDetails(plant) {
        // for now, just log the plant details. We can expand this to show a modal or navigate to a plant details page
        console.log(plant);
      }
    }
  };
  </script>
  