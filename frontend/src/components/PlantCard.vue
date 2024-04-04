<template>
  <div class="plant-card" @click="handleClick">

    <!-- Plant Image -->
    <div class="plant-image-container">
      <img v-if="plant.default_image" :src="plant.default_image.thumbnail || plant.default_image.original_url"
        :alt="plant.common_name" />
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  /* Optional: adds some shadow for depth */
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  width: 90%;
  padding-top: 16px;
  /* Adds space above the image */
}

.plant-image-container {
  height: 200px; /* Set a fixed height for the image container */
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  overflow: hidden;
}


.plant-card img {
  display: flex;
  border-radius: 8px;
  width: 90%;
  height: 90%;
  margin: auto;
  object-fit: cover;
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

.plant-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* Limit the text to one line */
  -webkit-box-orient: vertical;
  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 8px;
}

</style>