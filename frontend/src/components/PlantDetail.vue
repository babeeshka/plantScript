<template>
  <div class="overlay" @click="close"></div>
  <div class="modal">
    <div v-if="error">
      <p class="error-message">{{ error }}</p>
    </div>
    <div v-else-if="plant">
      <h1>{{ plant.scientific_name }}</h1>
      <h2 v-if="plant.common_name">{{ plant.common_name }}</h2>
      <p v-if="plant.description">{{ plant.description }}</p>
      <!-- Additional fields can be displayed here -->
    </div>
    <div v-else>
      <p>Loading plant details...</p>
    </div>
    <button @click="close">Close</button>
  </div>
</template>

<script lang="ts">
import { axiosInstance } from '@/axiosInstance';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default {
  props: {
    plant: {
      type: Object,
      required: true
    },
    plantId: {
      type: Number,
      required: false
    }
  },
  data() {
    return {
      details: null as PlantDetails | null, // Renamed from 'localPlant' to 'details'
      error: null as string | null, // Allow error to be string or null
    };
  },
  watch: {
    plantId: {
      immediate: true,
      handler(newVal: number) { // Added type annotation
        if (newVal) {
          this.fetchPlantDetails(newVal);
        } else {
          this.details = this.plant;
        }
      }
    }
  },
  methods: {
    async fetchPlantDetails(plantId: number) { // Added type annotation
      try {
        const response = await axiosInstance.get(`/api/plants/${plantId}`);
        this.details = response.data;
      } catch (error) {
        console.error(`Error fetching plant details: ${error}`);
        this.error = 'Failed to fetch plant details.';
      }
    },
    close() {
      this.$emit('close');
    },
  },
  computed: {
    plantDetails() { // Renamed to avoid naming conflict with prop 'plant'
      return this.details;
    }
  },
  name: 'PlantDetail',
};
</script>


<style scoped></style>
