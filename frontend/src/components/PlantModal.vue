<template>
  <div v-if="isDialogOpen" class="overlay" @click="close">
    <div>
      <div v-if="plantDetails">
        <h1>{{ plantDetails.scientific_name }}</h1>
        <h2>{{ plantDetails.common_name }}</h2>
        <p>{{ plantDetails.description }}</p>
        <!-- Additional plant details can be added here -->
      </div>
      <div v-else>
        <p>Loading plant details...</p>
      </div>
      <button @click="close">Close</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default defineComponent({
  props: {
    plantDetails: {
      type: Object as () => PlantDetails,
      default: () => ({}),
    },
    isDialogOpen: Boolean
  },
  methods: {
    close() {
      this.$emit('close');
    },
  },
});
</script>

<style>
.overlay {
  position: relative;
  top: 0;
  left: 0;
  width: 75%;
  height: 85%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 80%;
  max-height: 90%;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.plant-image {
  max-width: 100%;
  border-radius: 5px;
  margin-bottom: 20px;
}

button {
  cursor: pointer;
  background: #646cff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  transition: background 0.3s;
  display: block;
  margin-left: auto;
}

button:hover {
  background: #535bf2;
}
</style>
