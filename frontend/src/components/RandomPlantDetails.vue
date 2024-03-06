<!-- frontend/src/components/RandomPlantDetails.vue -->
<template>
  <div>
    <h2>{{ plant.common_name }}</h2>
    <img v-if="plant.default_image" :src="plant.default_image.thumbnail" alt="Plant image">
    <p>Scientific Name: {{ plant.scientific_name.join(', ') }}</p>
    <p v-if="plant.family">Family: {{ plant.family }}</p>
    <p v-if="plant.origin">Genus: {{ plant.origin }}</p>
    <p>Type: {{ plant.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PlantDetails } from '@rootTypes/plantInterfaces'; 

export default defineComponent({
  props: {
    plant: {
      type: Object as PropType<PlantDetails>,
      required: true,
    },
  },
});
</script>
