<template>
  <v-form @submit.prevent="save" class="plant-form">
    <v-container>
      <div class="form-section">
        <h3>General Information</h3>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.common_name" label="Common Name" />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.scientific_name" label="Scientific Name" multiple />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.other_name" label="Other Names" multiple />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.family" label="Family" />
          </v-col>
        </v-row>
      </div>

      <div class="form-section">
        <h3>Plant Details</h3>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.origin" label="Origin" multiple />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.type" label="Type" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.dimension" label="Dimension" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.cycle" label="Cycle" />
          </v-col>
        </v-row>
      </div>

      <div class="form-section">
        <h3>Care Information</h3>
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
            <v-text-field v-model="localPlant.hardiness.min" label="Hardiness Min" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.hardiness.max" label="Hardiness Max" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.maintenance" label="Maintenance" />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.growth_rate" label="Growth Rate" />
          </v-col>
        </v-row>
      </div>

      <div class="form-section">
        <h3>Additional Details</h3>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.attracts" label="Attracts" multiple />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.propagation" label="Propagation" multiple />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.pruning_month" label="Pruning Months" multiple />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.seeds" label="Seeds" type="number" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.soil" label="Soil" multiple />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.care_level" label="Care Level" />
          </v-col>
        </v-row>
      </div>

      <div class="form-section">
        <h3>Characteristics</h3>
        <v-row>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.drought_tolerant" label="Drought Tolerant" />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.salt_tolerant" label="Salt Tolerant" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.thorny" label="Thorny" />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.invasive" label="Invasive" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.tropical" label="Tropical" />
          </v-col>
          <v-col cols="12" md="6">
            <v-checkbox v-model="localPlant.indoor" label="Indoor" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.pest_susceptibility" label="Pest Susceptibility" multiple />
          </v-col>
        </v-row>
      </div>

      <div class="form-section">
        <h3>Description</h3>
        <v-row>
          <v-col cols="12">
            <v-textarea v-model="localPlant.description" label="Description" />
          </v-col>
        </v-row>
      </div>

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
  props: {
    plant: {
      type: Object as PropType<PlantDetails>,
      required: true,
    },
  },
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
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-section h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}
</style>