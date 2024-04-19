<template>
  <div class="filter-container">
    <button class="filter-toggle" @click="toggleFilters">
      <i class="fas fa-filter"></i>
    </button>
    <div class="overlay" :class="{ 'active': showFilters }" @click.self="toggleFilters">
      <div class="modal">
        <!-- Filter options grouped by data -->
        <div class="filter-group" v-for="group in filterGroups" :key="group.name">
          <h4>{{ group.name }}</h4>
          <div class="filter-options">
            <div v-for="filter in group.filters" :key="filter.key" class="filter-option">
              <input type="checkbox" :id="filter.key" v-model="filters[filter.key]" />
              <label :for="filter.key">{{ filter.label }}</label>
            </div>
          </div>
        </div>
        <div class="filter-buttons">
          <button @click="applyFilters" class="apply-btn">Apply</button>
          <button @click="resetFilters" class="reset-btn">Reset</button>
          <button @click="toggleFilters" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PlantFilterKeys } from '@rootTypes/plantInterfaces';

export default {
  data() {
    return {
      filters: {
        drought_tolerant: false,
        salt_tolerant: false,
        thorny: false,
        invasive: false,
        tropical: false,
        indoor: false,
        flowers: false,
        cones: false,
        fruits: false,
        edible_fruit: false,
        leaf: false,
        edible_leaf: false,
        cuisine: false,
        medicinal: false
      } as Record<PlantFilterKeys, boolean>,
      showFilters: false,
      filterGroups: [
        {
          name: 'Tolerance',
          filters: [
            { key: 'drought_tolerant', label: 'Drought Tolerant' },
            { key: 'salt_tolerant', label: 'Salt Tolerant' },
            { key: 'thorny', label: 'Thorny' },
            { key: 'invasive', label: 'Invasive' },
            { key: 'tropical', label: 'Tropical' },
            { key: 'indoor', label: 'Indoor' }
          ]
        },
        {
          name: 'Features',
          filters: [
            { key: 'flowers', label: 'Flowers' },
            { key: 'cones', label: 'Cones' },
            { key: 'fruits', label: 'Fruits' },
            { key: 'edible_fruit', label: 'Edible Fruit' },
            { key: 'leaf', label: 'Leaf' },
            { key: 'edible_leaf', label: 'Edible Leaf' },
            { key: 'cuisine', label: 'Cuisine' },
            { key: 'medicinal', label: 'Medicinal' }
          ]
        }
      ]
    };
  },
  props: {
    isVisible: Boolean,
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters;
    },
    applyFilters() {
      const activeFilters = Object.entries(this.filters).reduce<Record<string, boolean>>((acc, [key, value]) => {
        if (value) acc[key as keyof typeof acc] = true;
        return acc;
      }, {});
      this.$emit("apply-filters", activeFilters);
      this.showFilters = false;
    },
    resetFilters() {
      Object.keys(this.filters).forEach((key) => {
        this.filters[key as keyof typeof this.filters] = false;
      });
      this.applyFilters();
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s, opacity 0.5s;
}

.overlay.active {
  visibility: visible;
  opacity: 1;
}
</style>