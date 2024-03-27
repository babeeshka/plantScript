<template>
  <div>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" @keyup.enter="searchPlants" placeholder="Lookup a plant" />
      <div class="button-container">
        <button class="button-primary" @click="searchPlants">Search</button>
      </div>
    </div>
    <div v-if="searchMode === 'broad'">
      <table>
        <thead>
          <tr>
            <th>Common Name</th>
            <th>Scientific Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="plant in searchResults" :key="plant.id">
            <td>{{ plant.common_name }}</td>
            <td>{{ plant.scientific_name.join(', ') }}</td>
            <td>
              <button @click="reviewPlantDetails(plant.id)">Review Plant Details</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Detailed search result section is not shown for simplicity -->
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      searchQuery: '',
      searchResults: [],
      searchMode: 'broad',
    };
  },
  methods: {
    async searchPlants() {
      console.log("searchPlants called with query:", this.searchQuery);
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${apiUrl}/api/plants/search?q=${this.searchQuery}`);
        this.searchResults = response.data.data;
        this.searchMode = 'broad';
      } catch (error) {
        console.error(error);
      }
    },
    reviewPlantDetails(plantId) {
      this.router.push({ name: 'ManagePlant', params: { plantId } });
    },
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}
</style>
