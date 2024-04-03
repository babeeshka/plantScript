<template>
  <div class="plant-card" @click="handleClick">

    <!-- Plant Image -->
    <div class="plant-image-container">
      <img v-if="plant.default_image" :src="plant.default_image.thumbnail || plant.default_image.original_url"
        :alt="plant.common_name" class="plant-image" />
      <div v-else class="placeholder-container">
        <PlaceholderImage />
      </div>
    </div>

    <!-- Plant Details -->
    <div class="plant-info">
      <p><strong>Common Name:</strong> {{ plant.common_name }}</p>
      <p><strong>Scientific Name:</strong> {{ plant.scientific_name.join(', ') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlaceholderImage from '@/components/PlaceholderImage.vue';

export default defineComponent({
  components: {
    PlaceholderImage,
  },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('showPlantDetails', this.plant);
    }
  }
});
</script>

<style scoped>
.plant-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2); /* Optional: adds some shadow for depth */
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  width: 100%;
}

.plant-card img {
  display: block; /* Block display allows for margin: auto to work */
  max-width: 100%; /* Makes image responsive */
  height: auto; /* Maintain aspect ratio */
  margin: auto; /* Centers image */
}

.plant-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.placeholder-container {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
}

.plant-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
}

.plant-info {
  padding: 1rem;
}

.plant-info h3 {
  margin-top: 0;
}
</style>