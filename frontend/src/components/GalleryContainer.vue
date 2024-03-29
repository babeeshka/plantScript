<template>
  <div class="gallery-container">
    <PlantCard
      v-for="plant in plants"
      :key="plant.id"
      :plant="plant"
      @click.native="$emit('plant-clicked', plant)"
      class="plant-card"
    />
  </div>
</template>


<script lang="ts">
import PlantCard from './PlantCard.vue';

export default {
  components: { PlantCard },
  props: ['plants'],
  methods: {
    handleCardClick(plant) {
      this.$emit('showPlantDetails', plant);
    },
  }
};
</script>


<style scoped>
/* Gallery container responsive grid */
.gallery-container {
  display: grid;
  gap: 1em;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
}
</style>
