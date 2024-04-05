<template>
  <div class="manage-plant">
    <h1>Manage Plant</h1>
    <div v-if="plant">
      <div class="form-container">
        <PlantForm :plant.sync="plant" @save="savePlant" @cancel="goBack" />
      </div>
      <div class="form-button-container">
        <v-btn v-if="plantId" @click="deletePlant" color="error" class="mt-4">Delete Plant</v-btn>
      </div>
    </div>
    <div v-else>
      <p>Loading plant details...</p>
    </div>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000">
      {{ snackbar.message }}
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { PlantDetails } from '@rootTypes/plantInterfaces';
import PlantForm from '@/components/PlantForm.vue';

export default defineComponent({
  components: {
    PlantForm,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const plantId = ref<string | null>(route.params.id as string);
    const plant = ref<PlantDetails | null>(null);
    const snackbar = ref({
      show: false,
      message: '',
      color: '',
    });

    onMounted(async () => {
      if (plantId.value) {
        await fetchPlantDetails(plantId.value);
      }
    });

    const fetchPlantDetails = async (plantId: string) => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/${plantId}/details`);
        console.log('Fetched plant details:', response.data);
        plant.value = response.data;
        console.log(plant.value);
      } catch (error) {
        console.error('Error fetching plant details:', error);
        showSnackbar('Error fetching plant details', 'error');
      }
    };

    const createPlant = async (newPlant: PlantDetails) => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.post(`${apiUrl}/api/plants`, newPlant);
        plant.value = response.data;
        showSnackbar('Plant created successfully', 'success');
        router.push(`/plants/${plant.value.id}/manage`);
      } catch (error) {
        console.error('Error creating plant:', error);
        showSnackbar('Error creating plant', 'error');
      }
    };

    const savePlant = async (updatedPlant: PlantDetails) => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.put(`${apiUrl}/api/plants/${updatedPlant.id}`, updatedPlant);
        showSnackbar('Plant updated successfully', 'success');
        goBack();
      } catch (error) {
        console.error('Error updating plant:', error);
        showSnackbar('Error updating plant', 'error');
      }
    };

    const deletePlant = async () => {
      if (!plant.value) return;

      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.delete(`${apiUrl}/api/plants/${plant.value.id}`);
        showSnackbar('Plant deleted successfully', 'success');
        goBack();
      } catch (error) {
        console.error('Error deleting plant:', error);
        showSnackbar('Error deleting plant', 'error');
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    const showSnackbar = (message: string, color: string) => {
      snackbar.value.message = message;
      snackbar.value.color = color;
      snackbar.value.show = true;
    };

    return {
      plantId,
      plant,
      createPlant,
      savePlant,
      deletePlant,
      goBack,
      snackbar,
      showSnackbar,
    };
  },
});
</script>

<style scoped>
.manage-plant {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.form-container {
  height: auto;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 2rem;
}

.form-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  z-index: 999999;
}
</style>