<template>
  <div v-if="isDialogOpen && plantDetails" class="overlay" @click.self="closeModal">
    <div class="plant-modal" @click.stop>
      <!-- Close Button -->
      <button class="close-btn" @click="closeModal">&times;</button>
      <!-- Image -->
      <img v-if="plantDetails.default_image" :src="plantDetails.default_image.medium_url" alt="Plant image"
        class="modal-plant-image" @click="openFullImage" />

      <!-- Names -->
      <div class="plant-names">
        <h2>{{ plantDetails?.common_name ?? 'Common name not available' }}</h2>
        <p><strong>Scientific Name:</strong> {{ plantDetails?.scientific_name?.join(', ') ?? 'Scientific name not available' }}</p>
      </div>

      <!-- Details Grid -->
      <div class="details-grid">
        <div class="detail-item"><strong>Family:</strong> {{ plantDetails?.family || 'N/A' }}</div>
        <div class="detail-item"><strong>Type:</strong> {{ plantDetails?.type || 'N/A' }}</div>
        <div class="detail-item"><strong>Cycle:</strong> {{ plantDetails?.cycle || 'N/A' }}</div>
        <div class="detail-item"><strong>Watering:</strong> {{ plantDetails?.watering || 'N/A' }}</div>
        <div class="detail-item"><strong>Sunlight:</strong> {{ plantDetails?.sunlight?.join(', ') || 'N/A' }}</div>
        <div v-if="plantDetails?.hardiness" class="detail-item"><strong>Hardiness:</strong> {{
    plantDetails.hardiness.min }} to {{ plantDetails.hardiness.max }}</div>
        <div class="detail-item"><strong>Growth Rate:</strong> {{ plantDetails?.growth_rate || 'N/A' }}</div>
        <div class="detail-item"><strong>Maintenance:</strong> {{ plantDetails?.maintenance || 'N/A' }}</div>
        <div class="detail-item"><strong>Soil:</strong> {{ plantDetails?.soil?.join(', ') || 'N/A' }}</div>
        <div class="detail-item"><strong>Attracts:</strong> {{ plantDetails?.attracts?.join(', ') || 'N/A' }}</div>
      </div>

      <!-- Description -->
      <div class="plant-description">
        <h3>Description</h3>
        <p>{{ showFullDescription ? (plantDetails?.description ?? 'No description available') :
    (plantDetails?.description ?? 'No description available').slice(0, 200) + '...' }}</p>
        <button class="see-more-button" @click="toggleFullDescription">
          {{ showFullDescription ? 'Read less' : 'Read more' }}
        </button>
      </div>

      <slot name="actions"></slot>

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
      type: Object as () => PlantDetails | null,
      default: () => null,
    },
    isDialogOpen: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    plantDetails(newValue, oldValue) {
      console.log('plantDetails changed:', newValue);
    },
  },
  methods: {
    toggleFullDescription() {
      this.showFullDescription = !this.showFullDescription;
    },
    openFullImage() {
      if (this.plantDetails?.default_image?.original_url) {
        window.open(this.plantDetails.default_image.original_url);
      }
    },
    closeModal() {
      this.$emit('update:isDialogOpen', false);
    },
  },
});
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.plant-modal {
  background: white;
  border-radius: 10px;
  width: 800px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  padding: 40px 40px 20px;
  position: relative;
}

.modal-plant-image {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.modal-plant-image:hover {
  opacity: 0.9;
}

.plant-names {
  margin-bottom: 1rem;
}

.plant-names h2 {
  margin-top: 0;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.plant-description {
  margin-bottom: 1rem;
}

.plant-description h3 {
  margin-top: 0;
}

.see-more-button {
  margin-top: 0.5rem;
}


.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>