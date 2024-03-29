<template>
    <div class="filter-container" v-if="showFilters" ref="filterContainer">
        <!-- filter options -->
        <div class="filter-options">
            <label><input type="checkbox" v-model="filters.droughtTolerant"> Drought Tolerant</label>
            <label><input type="checkbox" v-model="filters.saltTolerant"> Salt Tolerant</label>
            <label><input type="checkbox" v-model="filters.thorny"> Thorny</label>
            <label><input type="checkbox" v-model="filters.invasive"> Invasive</label>
            <label><input type="checkbox" v-model="filters.tropical"> Tropical</label>
            <label><input type="checkbox" v-model="filters.indoor"> Indoor</label>
            <label><input type="checkbox" v-model="filters.flowers"> Flowers</label>
            <label><input type="checkbox" v-model="filters.fruits"> Fruits</label>
            <label><input type="checkbox" v-model="filters.cones"> Cones</label>
            <label><input type="checkbox" v-model="filters.leaf"> Leaf</label>
            <label><input type="checkbox" v-model="filters.poisonous_to_humans"> Poisonous to Humans</label>
            <label><input type="checkbox" v-model="filters.poisonous_to_animals"> Poisonous to Animals</label>
        </div>
        <div class="filter-buttons">
            <button @click="applyFilters">Apply Filters</button>
            <button @click="resetFilters">Reset</button>
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
                poisonous_to_animals: false
            },
            showFilters: false,
        };
    },
    methods: {
        toggleFilters() {
            this.showFilters = !this.showFilters;
            this.$nextTick(() => {
                const displayStyle = window.getComputedStyle(this.$refs.filterContainer).display;
                console.log("Current display style:", displayStyle);
            });
        },
        applyFilters() {
            this.$emit('filter', this.filters);
        },
        resetFilters() {
            this.filters = {
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
                poisonous_to_animals: false
            };
        },
        updateFilters(selectedFilters) {
            this.selectedFilters = selectedFilters;
            this.applyFilters();
        },
    },
};
</script>


<style scoped>
/* Hide the filter container by default */
.filter-container {
    background-color: white;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
    width: 90%;
    margin: auto;
    margin-bottom: 10px;
}

.show-filters+.filter-container-placeholder {
    height: --filter-container-height;
}

/* When showFilters is true, set display to block to show the container */
.show-filters .filter-container {
    display: block;
}

.filter-options {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 5px;
    margin-bottom: 15px;
}

.filter-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
}
</style>