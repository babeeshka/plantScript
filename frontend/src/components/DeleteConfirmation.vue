<template>
  <v-dialog :model-value="show" @update:model-value="$emit('change', $event)">
    <v-card>
      <v-card-title>Confirm Deletion</v-card-title>
      <v-card-text>Are you sure you want to delete this plant?</v-card-text>
      <v-card-actions>
        <v-btn @click="$emit('confirm')">Confirm</v-btn>
        <v-btn @click="$emit('change', false)">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
export default {
  props: {
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['change', 'confirm'],
};
</script>