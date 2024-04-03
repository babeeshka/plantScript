<template>
  <div class="manage-plant">
    <h1>Manage Plant</h1>
    <div v-if="plant">
      <div class="form-container">
        <PlantForm :plant.sync="plant" @save="updatePlant" @cancel="goBack" />
      </div>
      <div class="form-button-container">
        <v-btn @click="deletePlant" color="error" class="mt-4">Delete Plant</v-btn>
      </div>
    </div>
    <div v-else>
      <p>Loading plant details...</p>
    </div>
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
    const plant = ref<PlantDetails | null>(null);

    onMounted(async () => {
      const plantId = route.params.id as string;
      await fetchPlantDetails(plantId);
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
        // Handle error (e.g., show an error message)
      }
    };

    const updatePlant = async (updatedPlant: PlantDetails) => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.put(`${apiUrl}/api/plants/${updatedPlant.id}`, updatedPlant);
        // Show success message or navigate back to the plant list
        goBack();
      } catch (error) {
        console.error('Error updating plant:', error);
        // Handle error (e.g., show an error message)
      }
    };

    const deletePlant = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.delete(`${apiUrl}/api/plants/${plant.value!.id}`);
        // Navigate back to the plant list or show a success message
        goBack();
      } catch (error) {
        console.error('Error deleting plant:', error);
        // Handle error (e.g., show an error message)
      }
    };

    const goBack = () => {
      router.go(-1);
    };

    return {
      plant,
      updatePlant,
      deletePlant,
      goBack,
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