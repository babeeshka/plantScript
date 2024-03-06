<!-- /frontend/src/App.vue -->
<template>
  <div id="app">
    <router-view></router-view> 
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
};
</script>

<style>
html, body {
  font-family: 'Arial', sans-serif;
  color: #333;
  line-height: 1.6;
}

button, input, select {
  font-family: inherit;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
</style>

