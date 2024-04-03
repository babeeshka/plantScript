<template>
  <v-form @submit.prevent="save" class="plant-form">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="localPlant.common_name" label="Common Name" />
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox v-model="localPlant.scientific_name" label="Scientific Name" multiple />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="localPlant.family" label="Family" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="localPlant.type" label="Type" />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="localPlant.cycle" label="Cycle" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="localPlant.watering" label="Watering" />
        </v-col>
        <v-col cols="12" md="6">
          <v-combobox v-model="localPlant.sunlight" label="Sunlight" multiple />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field :model-value="localPlant.hardiness?.min"
            @update:model-value="value => localPlant.hardiness = { ...localPlant.hardiness, min: value }"
            label="Hardiness Min" />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field :model-value="localPlant.hardiness?.max"
            @update:model-value="value => localPlant.hardiness = { ...localPlant.hardiness, max: value }"
            label="Hardiness Max" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="localPlant.maintenance" label="Maintenance" />
        </v-col>
        <v-col cols="12" md="4">
          <v-combobox v-model="localPlant.soil" label="Soil" multiple />
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field v-model="localPlant.growth_rate" label="Growth Rate" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-checkbox v-model="localPlant.indoor" label="Indoor" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="localPlant.care_level" label="Care Level" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-textarea v-model="localPlant.description" label="Description" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" class="text-right">
          <v-btn type="submit" color="primary" class="mr-4">Save</v-btn>
          <v-btn @click="cancel" color="secondary">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { PlantDetails } from '@rootTypes/plantInterfaces';

export default defineComponent({
  computed: {
    localPlant: {
      get(): PlantDetails {
        return this.plant;
      },
      set(value: PlantDetails) {
        this.$emit('update:plant', value);
      },
    },
  },
  props: {
    plant: {
      type: Object as PropType<PlantDetails>,
      required: true,
    },
  },
  methods: {
    save() {
      this.$emit('save', this.localPlant);
    },
    cancel() {
      this.$emit('cancel');
    },
  },
});
</script>

<style scoped>
.plant-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  justify-content: center;
}
</style>