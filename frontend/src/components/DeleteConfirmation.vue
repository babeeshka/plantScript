<!-- /frontend/src/components/DeleteConfirmation.vue -->
<template>
    <v-dialog v-model="show">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>Are you sure you want to delete this plant?</v-card-text>
        <v-card-actions>
          <v-btn @click="$emit('confirm')">Confirm</v-btn>
          <v-btn @click="show = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <script>
  export default {
    model: {
      prop: 'show',
      event: 'change',
    },
    props: {
      show: {
        type: Boolean,
        default: false,
      },
    },
  };
  </script>
  