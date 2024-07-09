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
  margin: 0 auto;
  width: 90%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: repeat(auto, minmax(200px, max-content));
  grid-gap: 1rem;
  justify-items: center;
  justify-content: center;
}
</style>
