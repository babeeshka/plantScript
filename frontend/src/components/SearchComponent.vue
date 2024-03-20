<template>
  <div class="search-bar-container">
    <input type="text" v-model="localQuery" @keyup.enter="emitSearch" class="search-input"
      placeholder="Search for a plant..." />
    <button @click="emitSearch" class="search-button">Search</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    emitSearch() {
      this.$emit('search', this.searchTerm);
    },
  },
};
</script>