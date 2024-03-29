<template>
  <div class="search-bar-container">
    <input type="text" v-model="searchTerm" @input="handleInput" placeholder="Search plants...">
    <button class="button-primary" v-if="!dynamic" @click="emitSearch">Search</button>
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
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin: 10px 0;
}

.search-bar {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 1rem;
}

.search-bar input[type="text"] {
  flex-grow: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
