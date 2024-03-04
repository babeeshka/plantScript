<template>
    <div>
      <ul>
        <!-- Iterate and list plants -->
        <li v-for="plant in plants" :key="plant.id">{{ plant.name }}</li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    // Add script to fetch and list plants
  };
  </script>
  