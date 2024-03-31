<template>
  <div class="plant-card" @click="handleClick">
    <img v-if="plant.default_image" :src="plant.default_image.thumbnail" alt="Plant image" class="plant-image" />
    <div class="plant-info">
      <h3>{{ plant.common_name }}</h3>
      <p><strong>Scientific Name:</strong> {{ plant.scientific_name.join(', ') }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  width: 100%;
}

.plant-card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.plant-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.plant-info {
  padding: 1rem;
}

.plant-info h3 {
  margin-top: 0;
}
</style>