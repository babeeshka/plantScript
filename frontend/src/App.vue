<template>
  <NavBar />
  <div class="main-content">
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

<style scoped>
.main-content {
  margin-top: calc(var(--navbar-height) + 1rem);
  width: 100%;
}
</style>
