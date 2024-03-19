<template>
  <div>
    <ul>
      <li v-for="plant in plants" :key="plant.id" @click="selectPlant(plant)">
        <img :src="plant.default_image?.original_url" alt="Plant thumbnail" class="plant-thumbnail" />
        <div class="plant-details">
          <h3>{{ plant.common_name }}</h3>
          <p>{{ plant.scientific_name }}</p>
          <!-- add other details as needed -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { PlantSummary } from '@rootTypes/plantInterfaces';

export default {
  props: {
    plants: {
      type: Array as PropType<PlantSummary[]>,
      required: true,
    },
  },
  methods: {
    selectPlant(plant: PlantSummary) {
      this.$emit('plantSelected', plant);
    },
  },
};
</script>


<style>
.plant-thumbnail {
  width: 100px;
  height: auto;
  border-radius: 5px;
  margin-right: 10px;
}

.plant-details {
  display: flex;
  flex-direction: column;
}

li {
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #f0f0f0;
}

h3, p {
  margin: 0;
}
</style>

