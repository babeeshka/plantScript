<template>
  <v-form @submit.prevent="save" class="plant-form">
    <v-card>
      <v-card-title>
        <h2 class="form-header">{{ plant.id ? 'Edit Plant' : 'Add New Plant' }}</h2>
      </v-card-title>
      <v-card-text>
        <v-expansion-panels v-model="panel" multiple>
          <v-expansion-panel>
            <v-expansion-panel-header>General Information</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Images</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
                <v-row>
                  <v-col cols="12">
                    <div class="image-container">
                      <img v-if="defaultImage.regular_url" :src="defaultImage.regular_url" alt="Plant Image"
                        class="plant-image" />
                    </div>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.regular_url" label="Regular Image URL" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.original_url" label="Original Image URL" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.medium_url" label="Medium Image URL" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.small_url" label="Small Image URL" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.thumbnail" label="Thumbnail URL" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.license_url" label="License URL" />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.license_name" label="License Name" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <v-text-field v-model="defaultImage.license" label="License" type="number" />
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Plant Details</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header> Care Information</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
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
                    <!-- Use optional chaining and nullish coalescing for hardiness.min -->
                    <v-text-field v-model="hardinessMin" label="Hardiness Min" />
                  </v-col>
                  <v-col cols="12" md="6">
                    <!-- Use optional chaining and nullish coalescing for hardiness.max -->
                    <v-text-field v-model="hardinessMax" label="Hardiness Max" />
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Additional Details</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
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
            </v-expansion-panel-content>
          </v-expansion-panel>

          <v-expansion-panel>
            <v-expansion-panel-header>Characteristics</v-expansion-panel-header>
            <v-expansion-panel-content>
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
            </v-expansion-panel-content>
          </v-expansion-panel>


          <v-expansion-panel>
            <v-expansion-panel-header>Description</v-expansion-panel-header>
            <v-expansion-panel-content>
              <div class="form-section">
                <h3>Description</h3>
                <v-row>
                  <v-col cols="12">
                    <v-textarea v-model="localPlant.description" label="Description" />
                  </v-col>
                </v-row>
              </div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
      <v-card-actions class="pt-0">
        <v-spacer></v-spacer>
        <v-btn @click="cancel" color="secondary" text>Cancel</v-btn>
        <v-btn type="submit" color="primary" class="ml-4" large>Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType, computed } from 'vue';
import { PlantDetails, DefaultImage, PlantAnatomy, PruningCount } from '@rootTypes/plantInterfaces';
import PlaceholderImage from './PlaceholderImage.vue';

export default defineComponent({
  components: {
    PlaceholderImage
  },
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
    defaultImage: {
      get(): DefaultImage {
        return this.localPlant.default_image ?? {
          license: 0,
          license_name: '',
          license_url: '',
          original_url: '',
          regular_url: '',
          medium_url: '',
          small_url: '',
          thumbnail: '',
        };
      },
      set(value: DefaultImage) {
        this.localPlant.default_image = value;
      },
    },
    plantAnatomy: {
      get(): PlantAnatomy[] {
        return this.localPlant.plant_anatomy || [];
      },
      set(value: PlantAnatomy[]) {
        this.localPlant.plant_anatomy = value;
      },
    },
    pruningCount: {
      get(): PruningCount | undefined {
        return this.localPlant.pruning_count ?? undefined;
      },
      set(value: PruningCount | undefined) {
        this.localPlant.pruning_count = value;
      },
    },
    hardinessMin: {
      get() {
        return this.localPlant.hardiness?.min ?? '';
      },
      set(value: string) {
        if (this.localPlant.hardiness) {
          this.localPlant.hardiness.min = value;
        } else {
          this.localPlant.hardiness = { min: value, max: '' };
        }
      }
    },
    hardinessMax: {
      get() {
        return this.localPlant.hardiness?.max ?? '';
      },
      set(value: string) {
        if (this.localPlant.hardiness) {
          this.localPlant.hardiness.max = value;
        } else {
          this.localPlant.hardiness = { min: '', max: value };
        }
      }
    }
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/api/plants', this.localPlant);
        console.log('Plant created:', response.data);
        // Reset form or navigate to another page
      } catch (error) {
        console.error('Error creating plant:', error);
        // Handle error and display message to the user
      }
    },
    save() {
      this.$emit('save', this.localPlant);
    },
    cancel() {
      this.$emit('cancel');
    },
  }
});

</script>

<style scoped>
.plant-form {
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

.form-header {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #333;
}
</style>