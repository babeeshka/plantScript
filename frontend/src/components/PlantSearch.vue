<script lang="ts">
import { axiosInstance } from '../axiosInstance';

export default {
  name: 'PlantSearch',
  data() {
    return {
      searchQuery: '',
      searchResults: [],
    };
  },
  methods: {
    searchPlants() {
      axios.get(`/api/plants/search?query=${this.searchQuery}`)
        .then(response => {
          this.searchResults = response.data;
        })
        .catch(error => {
          console.error('Error searching for plants:', error);
        });
    }
  },
};
</script>
