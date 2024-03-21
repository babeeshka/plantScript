<template>
  <NavBar />
  <div class="app-container">
    <router-view />
  </div>
</template>

<script lang="ts">
import NavBar from '@/components/NavBar.vue';
export default {
  name: 'App',
  components: {
    NavBar,
  },
};
</script>

<style>
.app-container {
  margin-top: var(--navbar-height);
}
</style>