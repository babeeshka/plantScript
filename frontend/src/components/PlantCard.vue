<template>
  <div class="plant-card" @click="handleClick">
    <img v-if="plant.default_image" :src="plant.default_image.thumbnail" alt="Plant image" class="plant-image" />
    <h2>{{ plant.common_name }}</h2>
    <p>Scientific Name: {{ plant.scientific_name.join(', ') }}</p>
    <p v-if="plant.family">Family: {{ plant.family }}</p>
    <p>Type: {{ plant.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    plant : {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      console.log("Plant clicked:", this.plant);
      this.$emit('clicked', this.plant);
    }
  }
});
</script>

<style scoped>
/* Plant card styles */
.plant-card {
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s, transform 0.3s;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  width: 250px; /* Fixed width */
  height: 350px; /* Fixed height, adjust as necessary */
}

.plant-thumbnail {
  width: 100%;
  height: 200px; /* Adjust the height as necessary */
  object-fit: cover; /* This will cover the area without stretching the image */
}

.plant-card img {
  width: 100%;
  height: 60%; /* Adjust based on how much of the card should be the image */
  object-fit: cover; /* Ensures the image covers the area without losing aspect ratio */
}

.plant-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
  flex: 1;
}

.plant-card h2, .plant-card p {
  margin: 0.5em;
}

</style>
