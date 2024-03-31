<template>
    <div class="filter-container">
        <button @click="toggleFilters" class="filter-toggle">{{ showFilters ? 'Hide Filters' : 'Show Filters'
            }}</button>
        <div v-if="showFilters" class="filter-options-container">
            <!-- Filter options -->
            <div class="filter-options">
                <div v-for="(value, key) in filters" :key="key" class="filter-option">
                    <input type="checkbox" :id="key" v-model="filters[key]">
                    <label :for="key">{{ key }}</label>
                </div>
            </div>
            <div class="filter-buttons">
                <button @click="applyFilters" class="button-primary">Apply Filters</button>
                <button @click="resetFilters" class="button-primary">Reset</button>
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
            this.$emit('apply-filters', this.filters);
        },
        resetFilters() {
            Object.keys(this.filters).forEach(key => {
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
  margin-left: 10px;
}

.filter-toggle {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: var(--link-color);
  color: white;
  cursor: pointer;
}

.filter-options-container {
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  z-index: 10;
  background-color: var(--card-bg-color);
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
}

.filter-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 1rem;
}

.filter-option {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0.5rem;
  border-radius: 4px;
  background-color: var(--bg-color);
}

.filter-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}
</style>