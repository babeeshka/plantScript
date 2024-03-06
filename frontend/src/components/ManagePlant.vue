<!-- /frontend/src/components/ManagePlant.vue -->
<script lang="ts">
import axios from 'axios';
import { axiosInstance } from '../axiosInstance';

export default {
  name: 'ManagePlant',
  props: {
    plantId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      plant: null,
    };
  },
  methods: {
    fetchPlantDetails() {
      axios.get(`/api/plants/${this.plantId}`)
        .then(response => {
          this.plant = response.data;
        })
        .catch(error => {
          console.error(`Error fetching plant details for ID ${this.plantId}:`, error);
        });
    },
    updatePlantDetails() {
      axios.put(`/api/plants/${this.plantId}`, this.plant)
        .then(response => {
          this.plant = response.data;
        })
        .catch(error => {
          console.error(`Error updating plant details for ID ${this.plantId}:`, error);
        });
    },
    deletePlant() {
      axios.delete(`/api/plants/${this.plantId}`)
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error(`Error deleting plant with ID ${this.plantId}:`, error);
        });
    }
  },
  mounted() {
    this.fetchPlantDetails();
  },
};
</script>
