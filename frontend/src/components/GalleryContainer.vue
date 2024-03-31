<template>
  <div class="gallery-container">
    <PlantCard
    v-for="plant in plants"
    :key="plant.id"
    :plant="plant"
    @showPlantDetails="$emit('showPlantDetails', plant.id)"
    />
  </div>
</template>

<script lang="ts">
import PlantCard from './PlantCard.vue';
import { PlantSummary } from '@rootTypes/plantInterfaces';

export default {
  components: { PlantCard },
  props: {
    plants: {
      type: Array as () => PlantSummary[],
      required: true,
    },
  },
  methods: {
    handleCardClick(plant: PlantSummary) {
      console.log('Clicked plant:', plant); 
      this.$emit('showPlantDetails', plant.id);
    },
  },
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
