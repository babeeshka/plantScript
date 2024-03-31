<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input type="text" v-model="searchTerm" @input="handleInput" placeholder="Search plants...">
      <button class="button-primary" v-if="!dynamic" @click="emitSearch">Search</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: ['dynamic'],
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    handleInput() {
      if (this.dynamic) {
        this.emitSearch();
      }
    },
    emitSearch() {
      this.$emit('search', this.searchTerm);
    },
  },
};
</script>

<style scoped>
.search-bar-container {
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: var(--bg-color);
  padding: 1rem 0;
}

.search-bar {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  max-width: 600px;
}

.search-bar input[type="text"] {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.search-bar button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  background-color: var(--link-color);
  color: white;
  cursor: pointer;
}
</style>
