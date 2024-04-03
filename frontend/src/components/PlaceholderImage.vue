<template>
  <div class="placeholder-container">
    <img :src="placeholderImage" alt="Placeholder GIF" class="placeholder-gif" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import placeholderImage from '@/assets/placeholder.gif';

export default defineComponent({
  data() {
    return {
      placeholderImage,
    };
  },
});
</script>

<style scoped>
.placeholder-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.placeholder-gif {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>