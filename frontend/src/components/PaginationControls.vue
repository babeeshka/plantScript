<template>
    <div class="pagination-controls">
      <button @click="$emit('change', currentPage - 1)" :disabled="currentPage <= 1">Previous</button>
      <button @click="$emit('change', currentPage + 1)" :disabled="currentPage >= lastPage">Next</button>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      currentPage: Number,
      lastPage: Number,
    },
  };
  </script>
  
  <style scoped>
  .pagination-controls {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
  </style>
  