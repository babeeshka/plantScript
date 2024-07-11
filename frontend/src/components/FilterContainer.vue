<template>
  <div class="filter-container">
    <button class="filter-toggle" @click="toggleFilters" title="Filter">
      <i class="fas fa-filter"></i>
    </button>
    <div class="overlay" :class="{ 'active': showFilters }" @click.self="toggleFilters">
      <div class="modal">
        <button class="close-btn" @click="toggleFilters">&times;</button>
        <h3>Filters</h3>
        <div class="filter-groups">
          <div class="filter-group" v-for="group in filterGroups" :key="group.name">
            <h4>{{ group.name }}</h4>
            <div class="filter-options">
              <label v-for="filter in group.filters" :key="filter.key" class="filter-option">
                <input type="checkbox" :id="filter.key" v-model="filters[filter.key]" />
                <span>{{ filter.label }}</span>
              </label>
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
.filter-container {
  display: inline-block;
  position: relative;
}

.filter-toggle {
  background-color: #51b911;
  color: white;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.filter-toggle:hover {
  background-color: #408e0a;
}

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
  transition: visibility 0s, opacity 0.3s;
  z-index: 1000;
}

.overlay.active {
  visibility: visible;
  opacity: 1;
}

.modal {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

h3 {
  margin-top: 0;
  margin-bottom: 20px;
}

.filter-groups {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.filter-group h4 {
  margin-bottom: 10px;
}

.filter-options {
  display: flex;
  flex-direction: column;
}

.filter-option {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;
}

.filter-option input {
  margin-right: 10px;
}

.filter-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.filter-buttons button {
  margin-left: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.apply-btn {
  background-color: #51b911;
  color: white;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.cancel-btn {
  background-color: #ccc;
}
</style>