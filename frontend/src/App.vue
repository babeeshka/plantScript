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
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import '@mdi/font/css/materialdesignicons.css';
@font-face {
  font-family: 'Material Design Icons';
  src: url('/fonts/materialdesignicons-webfont.eot');
  src: url('/fonts/materialdesignicons-webfont.eot?#iefix') format('embedded-opentype'),
       url('/fonts/materialdesignicons-webfont.woff2') format('woff2'),
       url('/fonts/materialdesignicons-webfont.woff') format('woff'),
       url('/fonts/materialdesignicons-webfont.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.main-content {
  margin-top: calc(var(--navbar-height) + 1rem);
  width: 100%;
}
</style>
