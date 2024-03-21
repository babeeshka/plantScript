<template>
  <div v-if="isDialogOpen" class="overlay" @click.self="closeModal">
    <div class="plant-modal" @click.stop>
      <!-- Image -->
      <img v-if="plantDetails.default_image" :src="plantDetails.default_image?.small_url" alt="Plant image"
        class="modal-plant-image" @click="openFullImage" />

      <!-- Names -->
      <div class="plant-names">
        <h1>{{ plantDetails.common_name }}</h1>
        <h2>{{ plantDetails.scientific_name.join(', ') }}</h2>
      </div>

      <!-- Description -->
      <div class="plant-description">
        <p>{{ showFullDescription ? plantDetails.description ?? '' : (plantDetails.description ?? '').slice(0, 100) + '...' }}</p>
        <button class="see-more-button" @click="toggleFullDescription">
          {{ showFullDescription ? 'Read less' : 'Read more' }}
        </button>
      </div>

      <!-- Details Grid -->
      <div class="details-grid">
        <div class="detail-item"><strong>Cycle:</strong> {{ plantDetails.cycle || 'N/A' }}</div>
        <div class="detail-item"><strong>Watering:</strong> {{ plantDetails.watering || 'N/A' }}</div>
        <div class="detail-item"><strong>Type:</strong> {{ plantDetails.type || 'N/A' }}</div>
        <div class="detail-item"><strong>Family:</strong> {{ plantDetails.family || 'N/A' }}</div>
        <div v-if="plantDetails.origin" class="detail-item"><strong>Origin:</strong> {{ plantDetails.origin.join(', ')
          }}</div>
        <!-- You can add more detail items here -->
      </div>

      <!-- Close Button -->
      <button class="close-btn" @click="$emit('close')">&times;</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default defineComponent({
  data() {
    return {
      showFullDescription: false,
    };
  },
  props: {
    plantDetails: {
      type: Object as () => PlantDetails,
      default: () => ({}),
    },
    isDialogOpen: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    toggleFullDescription() {
      this.showFullDescription = !this.showFullDescription;
    },
    openFullImage() {
      window.open(this.plantDetails.default_image?.original_url);
    },
  },
});
</script>

<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-modal {
  background: white;
  border-radius: 10px;
  width: 700px;
  max-height: 75vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 40px;
}

.modal-plant-image {
  max-width: 50%;
  display: block;
  border-radius: 5px;
  margin: 0 auto 20px auto;
}

.modal-plant-image:hover {
  opacity: 0.9;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.plant-description p {
  text-align: center;
  margin-bottom: 1em;
}

</style>
