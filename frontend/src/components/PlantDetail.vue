<template>
  <div class="overlay" @click="close"></div>
  <div class="modal">
    <div v-if="plant">
      <h1>{{ plant.scientific_name }}</h1>
      <h2>{{ plant.common_name }}</h2>
      <p>{{ plant.description }}</p>
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
  data() {
    return {
      plant: null as PlantDetails | null,
    };
  },
  async created() {
    const plantId = this.$route.params.id;
    try {
      const response = await axiosInstance.get(`/api/plants/${plantId}`);
      this.plant = response.data;
    } catch (error) {
      console.error(`Error fetching plant details: ${error}`);
      this.error = 'Failed to fetch plant details.';
    }
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
  props: {
    plant: {
      type: Object,
      required: true
    }
  },
  name: 'PlantDetail',
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  /* Make sure this is above everything else */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  /* Just below the modal */
}
</style>