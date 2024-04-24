<template>
  <div class="manage-plant">
    <v-row justify="center" v-if="!plant">
      <v-col cols="12" class="text-center">
        <p>Loading plant details...</p>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col>
        <PlantForm :plant.sync="plant" @save="savePlant" @cancel="goBack" class="mb-4" />
        <v-btn v-if="plant" @click="deletePlant" color="error" outlined class="ml-auto d-block">Delete Plant</v-btn>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.show" :color="snackbar.color" :timeout="3000" bottom right>
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

        // Attempt to fetch from the local database first
        try {
          const dbResponse = await axios.get(`${apiUrl}/db/plants/${plantId}`);
          // If successful, use the plant details from the database
          console.log('Fetched plant details from the database:', dbResponse.data);
          plant.value = dbResponse.data;
        } catch (dbError: any) {
          // If there's an error (e.g., 404 not found), fetch from the external API
          if (dbError.response && dbError.response.status === 404) {
            const apiResponse = await axios.get(`${apiUrl}/api/plants/${plantId}/details`);
            console.log('Fetched plant details from the external API:', apiResponse.data);
            plant.value = apiResponse.data;
          } else {
            // Handle other errors (not 404)
            throw dbError;
          }
        }
      } catch (error) {
        console.error('Error fetching plant details:', error);
        showSnackbar('Error fetching plant details', 'error');
      }
    };

    const savePlant = async (updatedPlant: PlantDetails) => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        if (plant.value && plant.value._id) {
          // If the plant has an _id, it exists in the database. Update it.
          await axios.put(`${apiUrl}/db/plants/${plant.value.id}`, updatedPlant);
          showSnackbar('Plant updated successfully', 'success');
        } else {
          // If the plant doesn't have an _id, it's new. Create it.
          const response = await axios.post(`${apiUrl}/db/plants`, updatedPlant);
          plant.value = response.data; // Assuming the new plant data is returned
          showSnackbar('Plant created successfully', 'success');
          router.push(`/plants/${plant.value?.id}/manage`);
        }
      } catch (error) {
        console.error('Error saving plant:', error);
        showSnackbar('Error saving plant', 'error');
      }
    };

  const deletePlant = async () => {
    if (!plant.value) return;
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        await axios.delete(`${apiUrl}/db/plants/${plant.value.id}`);
        showSnackbar('Plant deleted successfully', 'success');
        router.push({ name: 'plant-gallery' });
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
  max-width: 960px;
  width: 90%; /* Makes the width responsive */
  margin: 2rem auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Improved Loading Indicator */
.loading-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px; /* Provide enough space for the loading */
}

/* Snackbar Style */
.snackbar {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 10;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  color: white;
  font-size: 1rem;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
</style>