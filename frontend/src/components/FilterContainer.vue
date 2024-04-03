<template>
  <div class="filter-container">
    <button @click="toggleFilters" class="filter-toggle">
      <i class="fas fa-filter"></i>
      {{ showFilters ? "Hide Filters" : "Filters" }}
    </button>
    <div v-if="showFilters" class="filter-options-container">
      <!-- Filter options -->
      <div class="filter-options">
        <div v-for="(value, key) in filters" :key="key" class="filter-option">
          <input type="checkbox" :id="key" v-model="filters[key]" />
          <label :for="key">{{ key.replace(/_/g, " ") }}</label>
        </div>
      </div>
      <div class="filter-buttons">
        <button @click="applyFilters" class="apply-btn">Apply</button>
        <button @click="resetFilters" class="reset-btn">Reset</button>
        <button @click="toggleFilters" class="cancel-btn">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      filters: {
        droughtTolerant: false,
        saltTolerant: false,
        thorny: false,
        invasive: false,
        tropical: false,
        indoor: false,
        flowers: false,
        fruits: false,
        cones: false,
        leaf: false,
        poisonous_to_humans: false,
        poisonous_to_animals: false,
      } as Record<string, boolean>,
      showFilters: false,
    };
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    applyFilters() {
      this.$emit("apply-filters", this.filters);
      this.showFilters = false;
    },
    resetFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key] = false;
      });
      this.applyFilters();
    },
  },
};
</script>

<style scoped>
.filter-container {
  position: relative;
}

.filter-toggle {
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: #51b911;
  color: white;
  cursor: pointer;
  margin-left: 15px;
}

.filter-toggle i {
  margin-right: 0.5rem;
}

.filter-options-container {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  z-index: 10;
  background-color: var(--card-bg-color);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  min-width: 200px;
}

.filter-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 10px;
  margin-bottom: 1rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 5px;
}

.filter-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.apply-btn {
  background-color: var(--primary-color);
}

.reset-btn {
  background-color: #f44336;
}

.cancel-btn {
  background-color: #ccc;
  color: #333;
}
</style>