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
  margin: 0 auto; /* Centers the container */
  width: 90%;
  box-sizing: border-box; /* Ensures padding doesn't affect width */
  display: grid;
  grid-template-columns: repeat(auto, minmax(200px, max-content)); /* This creates a responsive grid */
  grid-gap: 1rem; /* Adjust the gap to your liking */
  justify-items: center; /* This centers the items on the grid line */
  justify-content: center; /* Horizontally centers content for flex container */
}

</style>
