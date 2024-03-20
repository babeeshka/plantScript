<template>
  <div class="plant-card" @click="handleClick">
    <img v-if="plant.default_image" :src="plant.default_image.thumbnail" alt="Plant image" class="plant-image" />
    <h2>{{ plant.common_name }}</h2>
    <p>Scientific Name: {{ plant.scientific_name.join(', ') }}</p>
    <p v-if="plant.family">Family: {{ plant.family }}</p>
    <p>Type: {{ plant.type }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    plant : {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick() {
      console.log("Plant clicked:", this.plant);
      this.$emit('clicked', this.plant);
    }
  }
});
</script>
