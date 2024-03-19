<template>
  <div class="gallery-container">
    <div v-for="plant in plants" :key="plant.id" class="plant-card" @click="showPlantDetails(plant)">
      <img :src="plant.default_image.thumbnail" class="plant-thumbnail" :alt="plant.common_name" />
      <div class="plant-info">
        <h2>{{ plant.name }}</h2>
        <p>{{ plant.commonName }}</p>
        <p>{{ plant.scientificName }}</p>
      </div>
    </div>
  </div>
  <PlantDetail v-if="isDialogOpen" :plant="selectedPlant" @close="isDialogOpen = false" />
  <button v-if="hasMore" @click="loadMorePlants">Load More</button>
</template>

<script>
import axios from 'axios';
import PlantDetail from '@/components/PlantDetail.vue';

export default {
  components: {
    PlantDetail,
  },
  data() {
    return {
      plants: [],
      isDialogOpen: false,
      selectedPlant: null,
      limit: 20,
      offset: 0,
      hasMore: true,
    };
  },
  mounted() {
    this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      const apiUrl = import.meta.env.VITE_API_BASE_URL; 
      try {
        const response = await axios.get(`${apiUrl}/db/plants`, {
          params: { limit: this.limit, offset: this.offset }
        });
        this.plants.push(...response.data.data);
        this.offset += this.limit;
        this.hasMore = response.data.data.length === this.limit;
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    },
    showPlantDetails(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    },
    loadMorePlants() {
      if (this.hasMore) {
        this.fetchPlants();
      }
    },
  }
};
</script>


<style scoped>
/* Specific styles for the PlantGallery component */

.plant-card {
  /* Style for the clickable card */
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

.plant-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.plant-thumbnail {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.plant-info {
  padding: 1em;
}

/* Style for cards or containers */
.card {
  background-color: var(--card-bg-color);
  padding: 2em;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 1em;
}


/* Layout styles for the plant gallery */
.gallery-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Adjust minmax() as needed */
  grid-gap: 1em;
  margin: auto;
  width: 95%; /* Or max-width if you want to limit the width */
}

/* Continue the flex direction for gallery items */
.gallery-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* Style for individual plant thumbnails */
.gallery-thumbnail {
  width: 100%; /* Make the image fill the container */
  border-radius: 8px; /* Rounded corners for the images */
  margin-bottom: 0.5em;
}

/* Image style to make it responsive within the container */
.gallery-thumbnail img {
  width: 100%;
  height: auto;
  border-radius: 8px; /* Rounded corners for the images */
  display: block; /* Remove any extra space below the image */
}

/* Style for plant names or titles in the gallery */
.gallery-name {
  font-size: 1.1em;
  margin: 0;
  color: var(--text-color);
}

@media (min-width: 768px) {
  .gallery-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  }
}

@media (min-width: 1024px) {
  .gallery-container {
    grid-template-columns: repeat(5, 1fr); 
  }
}

</style>
