<template>
    <v-form>
      <v-text-field v-model="plant.common_name" label="Common Name" />
      <v-text-field v-model="plant.scientific_name" label="Scientific Name" />
      <v-text-field v-model="plant.family" label="Family" />
      <v-text-field v-model="plant.type" label="Type" />
      <!-- other important fields the user could interact with -->
      <v-btn @click="save">Save</v-btn>
    </v-form>
  </template>
  
  <script>
  export default {
    props: {
      plant: {
        type: Object,
        default: () => ({}),
      },
    },
    methods: {
      save() {
        this.$emit('save', this.plant);
      },
    },
  };
  </script>
  