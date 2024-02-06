<template>
    <div>
      <h1>{{ plant.commonName }}</h1>
      <p>Scientific Name: {{ plant.scientificName }}</p>
      <!-- Add more plant details here -->
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      plant: Object
    },
    name: 'PlantDetail',
  };
  </script>
  