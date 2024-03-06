<template>
  <div>
    <PlantsList :plants="plants" @selectPlant="showPlantDetails" />
    <v-dialog v-model="isDialogOpen" persistent max-width="600px">
      <PlantDetail :plant="selectedPlant" />
    </v-dialog>
  </div>
</template>

<script>
import axios from 'axios';
import PlantsList from '@/components/PlantsList.vue';
import PlantDetail from '@/components/PlantDetail.vue';

export default {
  components: {
    PlantsList,
    PlantDetail,
  },
  data() {
    return {
      plants: [],
      isDialogOpen: false,
      selectedPlant: null,
    };
  },
  mounted() {
    this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      try {
        const response = await axios.get("/api/plants");
        this.plants = response.data;
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    showPlantDetails(plant) {
      this.selectedPlant = plant;
      this.isDialogOpen = true;
    }
  },
};
</script>
