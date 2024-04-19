<template>
  <div class="search-bar-container">
    <div class="search-bar">
      <input type="text" v-model="searchTerm" @input="handleInput" placeholder="Search plants...">
      <button v-if="!dynamic" @click="emitSearch" class="search-button">Search</button>
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
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-bar {
  display: flex;
  width: 100%;
  align-items: center;
}

.search-bar input[type="text"] {
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 20px 0 0 20px;
  outline: none;
  font-size: 1rem;
}

.search-button {
  padding: 0.75rem 1rem;
  border: none;
  background-color: #51b911;
  color: white;
  border-radius: 0 20px 20px 0;
  cursor: pointer;
  transition: background-color 0.3s;
  align-items: center;
  justify-self: auto;
}

.search-button:hover {
  background-color: #408e0a;
}
</style>
