<template>
  <div>
    <v-btn @click="showNewPlantForm">Add New Plant</v-btn>
    <div class="plant-list">
      <PlantCard v-for="plant in plants" :key="plant.id" :plant="plant" @edit="navigateToEditPlant(plant)" />
    </div>
    <!-- PlantForm and DeleteConfirmation can be triggered from the PlantCard's actions -->
  </div>
</template>

<script>
import axios from 'axios';
import PlantTable from '@/components/PlantTable.vue';
import PlantForm from '@/components/PlantForm.vue';
import DeleteConfirmation from '@/components/DeleteConfirmation.vue';

export default {
  components: {
    PlantForm,
    DeleteConfirmation
  },
  data() {
    return {
      plants: [],
      currentPlant: null,
      showDeleteConfirm: false
    };
  },
  mounted() {
    this.fetchPlants();
  },
  methods: {
    async fetchPlants() {
      try {
        const response = await axios.get('/db/plants');
        this.plants = response.data.data; 
      } catch (error) {
        console.error('Error fetching plants:', error);
      }
    }
  },
  showNewPlantForm() {
    this.currentPlant = {};
  },
  showEditForm(plant) {
    this.currentPlant = { ...plant };
  },
  async savePlant() {
    const url = this.currentPlant.id ? `/db/plants/${this.currentPlant.id}` : '/db/plants';
    const method = this.currentPlant.id ? 'put' : 'post';

    try {
      await axios[method](url, this.currentPlant);
      this.fetchPlants();
    } catch (error) {
      console.error('Error saving plant:', error);
    }
  },
  confirmDelete(plant) {
    this.plantToDelete = plant;
    this.showDeleteConfirm = true;
  },
  async deletePlant() {
    try {
      await axios.delete(`/db/plants/${this.plantToDelete.id}`);
      this.fetchPlants();
      this.showDeleteConfirm = false;
    } catch (error) {
      console.error('Error deleting plant:', error);
    }
  }
};
</script>