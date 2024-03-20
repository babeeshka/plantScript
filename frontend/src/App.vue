<template>
  <NavBar />
  <div class="app-container">
    <div class="container">
      <router-view />
    </div>
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
  margin-top: 50px;
}
</style>