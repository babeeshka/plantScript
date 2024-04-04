<template>
  <div v-if="isDialogOpen && plantDetails" class="overlay" @click.self="closeModal">
    <div class="plant-modal" @click.stop>
      <!-- Close Button -->
      <button class="close-btn" @click="closeModal">&times;</button>

      <!-- Image -->
      <div class="modal-plant-image-container">
        <img v-if="plantDetails.default_image"
          :src="plantDetails.default_image.medium_url || plantDetails.default_image.original_url" alt="Plant image"
          class="modal-plant-image" @click="openFullImage" />
        <div v-else class="placeholder-container">
          <PlaceholderImage />
        </div>
      </div>

      <!-- Manage Plant Button -->
      <button class="manage-plant-btn" @click="redirectToManagePlant">Manage Plant</button>

      <div class="plant-details">
        <h2>{{ plantDetails?.common_name || 'Common name not available' }}</h2>
        <div class="plant-info">
          <div class="info-section">
            <h3>Basic Info</h3>
            <p><strong>Scientific Name:</strong> {{ plantDetails?.scientific_name?.join(', ') || 'Not found' }}</p>
            <p><strong>Other Names:</strong> {{ plantDetails?.other_name?.join(', ') || 'N/A' }}</p>
            <p><strong>Family:</strong> {{ plantDetails?.family || 'N/A' }}</p>
            <p><strong>Origin:</strong> {{ plantDetails?.origin?.join(', ') || 'N/A' }}</p>
            <p><strong>Type:</strong> {{ plantDetails?.type || 'N/A' }}</p>
            <p><strong>Dimensions:</strong> {{ plantDetails?.dimension || 'N/A' }}</p>
            <p><strong>Cycle:</strong> {{ plantDetails?.cycle || 'N/A' }}</p>
          </div>

          <div class="info-section">
            <h3>Care Info</h3>
            <p><strong>Watering:</strong> {{ plantDetails?.watering || 'N/A' }}</p>
            <p><strong>Sunlight:</strong> {{ plantDetails?.sunlight?.join(', ') || 'N/A' }}</p>
            <p v-if="plantDetails?.hardiness"><strong>Hardiness:</strong> {{ plantDetails.hardiness.min }} to {{
    plantDetails.hardiness.max }}</p>
            <p><strong>Pruning Months:</strong> {{ plantDetails?.pruning_month?.join(', ') || 'N/A' }}</p>
            <p><strong>Maintenance:</strong> {{ plantDetails?.maintenance || 'N/A' }}</p>
            <p><strong>Growth Rate:</strong> {{ plantDetails?.growth_rate || 'N/A' }}</p>
            <p><strong>Care Level:</strong> {{ plantDetails?.care_level || 'N/A' }}</p>
          </div>

          <div class="info-section features">
            <h3>Features</h3>
            <div class="feature-grid">
              <div class="feature-item">
                <span class="feature-label">Drought Tolerant:</span>
                <span class="feature-icon" v-if="plantDetails?.drought_tolerant">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Salt Tolerant:</span>
                <span class="feature-icon" v-if="plantDetails?.salt_tolerant">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Thorny:</span>
                <span class="feature-icon" v-if="plantDetails?.thorny">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Invasive:</span>
                <span class="feature-icon" v-if="plantDetails?.invasive">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Tropical:</span>
                <span class="feature-icon" v-if="plantDetails?.tropical">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Indoor:</span>
                <span class="feature-icon" v-if="plantDetails?.indoor">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Flowers:</span>
                <span class="feature-icon" v-if="plantDetails?.flowers">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
              <div class="feature-item">
                <span class="feature-label">Fruits:</span>
                <span class="feature-icon" v-if="plantDetails?.fruits">
                  <i class="fas fa-check"></i>
                </span>
                <span class="feature-icon" v-else>
                  <i class="fas fa-times"></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="plant-description">
          <h3>Description</h3>
          <p>{{ showFullDescription ? (plantDetails?.description || 'No description available') :
    (plantDetails?.description || 'No description available').slice(0, 200) + '...' }}</p>
          <button class="see-more-button" @click="toggleFullDescription">
            {{ showFullDescription ? 'Read less' : 'Read more' }}
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';
import { useRouter } from 'vue-router';
import PlaceholderImage from '@/components/PlaceholderImage.vue';

export default defineComponent({
  components: {
    PlaceholderImage,
  },
  setup(props) {
    const router = useRouter();

    const redirectToManagePlant = () => {
      router.push({ name: 'ManagePlant', params: { id: props.plantDetails?.id } });
    };

    return {
      redirectToManagePlant,
    };
  },
  props: {
    plantDetails: {
      type: Object as PropType<PlantDetails | null>,
      default: () => null,
    },
    isDialogOpen: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFullDescription: false,
    };
  },
  emits: ['close', 'manage'],
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
      this.$emit('close', false);
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
  padding: 40px;
  position: relative;
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

.modal-plant-image-container {
  width: 100%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: opacity 0.3s ease-in-out;
}

.modal-plant-image {
  border-radius: 8px;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.modal-plant-image:hover {
  opacity: 0.9;
}

.manage-plant-btn {
  margin-bottom: 25px;
  margin-top: 35px;
  max-width: 20%;
  margin: auto;
}

.plant-info {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
}

.info-section {
  flex: 1 1 300px;
  background-color: #f8f8f8;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.info-section p {
  margin: 0.5rem 0;
}

.plant-description {
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plant-description h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}

.see-more-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
}

.features {
  display: flex;
  flex-direction: column;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.feature-label {
  font-weight: bold;
}

.feature-icon {
  color: #4caf50;
}

.feature-icon .fa-times {
  color: #f44336;
}
</style>