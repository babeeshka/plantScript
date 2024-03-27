<template>
  <div class="search-bar">
    <input type="text" v-on:search="searchPlants" @keyup.enter="emitSearch" placeholder="Lookup a plant" />
    <div class="button-container">
      <button @click="emitSearch">Search</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      searchTerm: '',
    };
  },
  methods: {
    emitSearch() {
      console.log("Emitting search for:", this.searchTerm);
      this.$emit('search', this.searchTerm);
    },
  },
  mounted() {
    console.log("SearchComponent mounted");
  }
};
</script>

<style scoped></style>
