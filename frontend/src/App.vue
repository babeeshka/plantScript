<template>
  <nav class="navbar">
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/gallery">Plant Gallery</router-link></li>
      <li><router-link to="/search">Plant Search</router-link></li>
    </ul>
  </nav>
  <router-view />
</template>

<script lang="ts">
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
</style>