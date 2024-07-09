<template>
  <v-form @submit.prevent="save" class="plant-form">
    <h2 class="form-header">{{ plant._id ? 'Edit Plant' : 'Create New Plant' }}</h2>

    <!-- General Information -->
    <v-card class="mb-6" outlined>
      <v-card-title>General Information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.common_name" label="Common Name" outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.scientific_name" label="Scientific Name" multiple outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.other_name" label="Other Names" multiple outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.family" label="Family" outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.origin" label="Origin" multiple outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.type" label="Type" outlined dense />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dimensions -->
    <v-card class="mb-6" outlined>
      <v-card-title>Dimensions</v-card-title>
      <v-card-text>
        <v-text-field v-model="localPlant.dimension" label="Dimension" outlined dense />
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field v-model="dimensionsMinValue" :disabled="Array.isArray(localPlant.dimensions)"
              label="Min Value" type="number" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="dimensionsMaxValue" :disabled="Array.isArray(localPlant.dimensions)"
              label="Max Value" type="number" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="dimensionsUnit" :disabled="Array.isArray(localPlant.dimensions)" label="Unit"
              outlined dense />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Life Cycle and Reproduction -->
    <v-card class="mb-6" outlined>
      <v-card-title>Life Cycle and Reproduction</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.cycle" label="Cycle" :items="['Perennial', 'Annual', 'Biennial', 'Biannual']"
              outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.propagation" label="Propagation" multiple outlined dense />
          </v-col>
        </v-row>

        <v-subheader>Flowers</v-subheader>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.flowers" label="Flowers" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-if="localPlant.flowers" v-model="localPlant.flowering_season" label="Flowering Season"
              :items="['Spring', 'Summer', 'Fall', 'Winter']" outlined dense />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-if="localPlant.flowers" v-model="localPlant.flower_color" label="Flower Color" outlined
              dense />
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-subheader>Fruits</v-subheader>
        <v-row>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.fruits" label="Fruits" color="primary" />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.edible_fruit" label="Edible Fruit" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-if="localPlant.edible_fruit" v-model="localPlant.fruit_color" label="Fruit Color" multiple
              outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-if="localPlant.edible_fruit" v-model="localPlant.harvest_season" label="Harvest Season"
              outlined dense />
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-subheader>Leaves</v-subheader>
        <v-row>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.leaf" label="Leaf" color="primary" />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.edible_leaf" label="Edible Leaf" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-combobox v-if="localPlant.leaf" v-model="localPlant.leaf_color" label="Leaf Color" multiple outlined
              dense />
          </v-col>
        </v-row>

        <v-divider></v-divider>

        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.cones" label="Cones" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.cuisine" label="Cuisine" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.medicinal" label="Medicinal" color="primary" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-text-field v-model.number="localPlant.seeds" label="Seeds" type="number" outlined dense />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Care Requirements -->
    <v-card class="mb-6" outlined>
      <v-card-title>Care Requirements</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.watering" label="Watering" :items="['Frequent', 'Average', 'Minimum', 'None']"
              outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="wateringBenchmarkValue" label="Watering Benchmark" outlined dense />
            <v-text-field v-model="wateringBenchmarkUnit" label="Benchmark Unit" outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-combobox v-model="localPlant.sunlight" label="Sunlight" multiple outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-select v-model="hardinessMin" label="Hardiness Min" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
              outlined dense>
              <template v-slot:append>
                <v-tooltip right>
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>Minimum USDA Hardiness Zone</span>
                </v-tooltip>
              </template>
            </v-select>
          </v-col>
          <v-col cols="12" sm="6">
            <v-select v-model="hardinessMax" label="Hardiness Max" :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]"
              outlined dense>
              <template v-slot:append>
                <v-tooltip right>
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props">mdi-help-circle-outline</v-icon>
                  </template>
                  <span>Maximum USDA Hardiness Zone</span>
                </v-tooltip>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.soil" label="Soil" multiple outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.care_level" label="Care Level" :items="['Low', 'Medium', 'High']" outlined
              dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-combobox v-model="localPlant.pruning_month" label="Pruning Month" multiple outlined dense />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Characteristics -->
    <v-card class="mb-6" outlined>
      <v-card-title>Characteristics</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.growth_rate" label="Growth Rate" :items="['Slow', 'Moderate', 'Fast']"
              outlined dense />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.maintenance" label="Maintenance" outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.drought_tolerant" label="Drought Tolerant" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.salt_tolerant" label="Salt Tolerant" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.thorny" label="Thorny" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.invasive" label="Invasive" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.tropical" label="Tropical" color="primary" />
          </v-col>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.indoor" label="Indoor" color="primary" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-combobox v-model="localPlant.attracts" label="Attracts" multiple outlined dense />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-combobox v-model="localPlant.pest_susceptibility" label="Pest Susceptibility" multiple outlined dense />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Toxicity -->
    <v-card class="mb-6" outlined>
      <v-card-title>Toxicity</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.poisonous_to_humans" label="Poisonous to Humans" color="primary" />
          </v-col>
          <v-col cols="12" md="6">
            <v-switch v-model="localPlant.poisonous_to_pets" label="Poisonous to Pets" color="primary" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Description -->
    <v-card class="mb-6" outlined>
      <v-card-title>Description</v-card-title>
      <v-card-text>
        <v-textarea v-model="localPlant.description" label="Description" outlined dense />
      </v-card-text>
    </v-card>

    <!-- Images -->
    <v-card class="mb-6" outlined>
      <v-card-title>Images</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-img v-if="localPlant.default_image" :src="localPlant.default_image?.original_url"
              alt="Default Original Image" class="plant-image" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-if="localPlant.default_image" :value="localPlant.default_image?.original_url"
              label="Original Image URL" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-expansion-panels>
              <v-expansion-panel>
                <v-expansion-panel-header>Other URLs</v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-text-field v-model="defaultImageRegularUrl" label="Regular URL" outlined dense />
                  <v-text-field v-model="defaultImageMediumUrl" label="Medium URL" outlined dense />
                  <v-text-field v-model="defaultImageSmallUrl" label="Small URL" outlined dense />
                  <v-text-field v-model="defaultImageThumbnail" label="Thumbnail URL" outlined dense />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Actions -->
    <v-card-actions class="pt-0">
      <v-spacer></v-spacer>
      <v-btn @click="cancel" color="secondary" text="true">Cancel</v-btn>
      <v-btn type="submit" color="primary" class="ml-4" large>Save</v-btn>
    </v-card-actions>

  </v-form>
</template>


<script lang="ts">
import axios from 'axios';
import { defineComponent, PropType } from 'vue';
import { PlantDetails, DefaultImage, PlantAnatomy, PruningCount } from '@rootTypes/plantInterfaces';

export default defineComponent({
  data() {
    return {
      panel: [],
      showMoreImages: false,
    };
  },
  props: {
    plant: {
      type: Object as PropType<PlantDetails>,
      required: true,
    },
  },
  computed: {
    localPlant(): PlantDetails {
      return this.plant;
    },
    defaultImage(): DefaultImage {
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
    defaultImageRegularUrl: {
      get(): string {
        return this.localPlant.default_image?.regular_url || '';
      },
      set(value: string) {
        if (this.localPlant.default_image) {
          this.localPlant.default_image.regular_url = value;
        }
      },
    },
    defaultImageMediumUrl: {
      get(): string {
        return this.localPlant.default_image?.medium_url || '';
      },
      set(value: string) {
        if (this.localPlant.default_image) {
          this.localPlant.default_image.medium_url = value;
        }
      },
    },
    defaultImageSmallUrl: {
      get(): string {
        return this.localPlant.default_image?.small_url || '';
      },
      set(value: string) {
        if (this.localPlant.default_image) {
          this.localPlant.default_image.small_url = value;
        }
      },
    },
    defaultImageThumbnail: {
      get(): string {
        return this.localPlant.default_image?.thumbnail || '';
      },
      set(value: string) {
        if (this.localPlant.default_image) {
          this.localPlant.default_image.thumbnail = value;
        }
      },
    },
    plantAnatomy(): PlantAnatomy[] {
      return this.localPlant.plant_anatomy || [];
    },
    pruningCount(): PruningCount | undefined {
      return this.localPlant.pruning_count ?? undefined;
    },
    hardinessMin: {
      get(): number {
        return parseInt(this.localPlant.hardiness?.min || '0', 10);
      },
      set(value: number) {
        if (!this.localPlant.hardiness) {
          this.localPlant.hardiness = { min: '0', max: '0' };
        }
        this.localPlant.hardiness.min = String(value);
        this.$emit('update:plant', this.localPlant);
      }
    },
    hardinessMax: {
      get(): number {
        return parseInt(this.localPlant.hardiness?.max || '0', 10);
      },
      set(value: number) {
        if (!this.localPlant.hardiness) {
          this.localPlant.hardiness = { min: '0', max: '0' };
        }
        this.localPlant.hardiness.max = String(value);
        this.$emit('update:plant', this.localPlant);
      }
    },
    dimensionsMinValue: {
      get(): number | undefined {
        return !Array.isArray(this.localPlant.dimensions) ? this.localPlant.dimensions?.min_value : undefined;
      },
      set(value: number | undefined) {
        if (!Array.isArray(this.localPlant.dimensions) && this.localPlant.dimensions) {
          this.localPlant.dimensions.min_value = value;
        }
      },
    },
    dimensionsMaxValue: {
      get(): number | undefined {
        return !Array.isArray(this.localPlant.dimensions) ? this.localPlant.dimensions?.max_value : undefined;
      },
      set(value: number | undefined) {
        if (!Array.isArray(this.localPlant.dimensions) && this.localPlant.dimensions) {
          this.localPlant.dimensions.max_value = value;
        }
      },
    },
    dimensionsUnit: {
      get(): string | undefined {
        return !Array.isArray(this.localPlant.dimensions) ? this.localPlant.dimensions?.unit : undefined;
      },
      set(value: string | undefined) {
        if (!Array.isArray(this.localPlant.dimensions) && this.localPlant.dimensions) {
          this.localPlant.dimensions.unit = value;
        }
      },
    },
    wateringBenchmarkValue: {
      get(): string | null | undefined {
        return this.localPlant.watering_general_benchmark?.value;
      },
      set(value: string | null | undefined) {
        if (this.localPlant.watering_general_benchmark) {
          this.localPlant.watering_general_benchmark.value = value;
        }
      },
    },
    wateringBenchmarkUnit: {
      get(): string | null | undefined {
        return this.localPlant.watering_general_benchmark?.unit;
      },
      set(value: string | null | undefined) {
        if (this.localPlant.watering_general_benchmark) {
          this.localPlant.watering_general_benchmark.unit = value;
        }
      },
    },
  },
  methods: {
    async submitForm() {
      try {
        const response = await axios.post('/api/plants', this.localPlant);
        console.log('Plant created:', response.data);
      } catch (error) {
        console.error('Error creating plant:', error);
      }
    },
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
  max-width: 1200px;
  width: 100%;
  margin: auto;
  padding: 2rem;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.05);
}

.form-section {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.05);
}

.form-section h3 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.25rem;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
}

.form-col {
  flex: 1;
  padding: 0 0.5rem;
}

.form-col label {
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
  font-size: 0.9rem;
}

.form-col input,
.form-col select,
.form-col textarea {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.form-col input[type="checkbox"],
.form-col input[type="radio"] {
  display: inline-block;
  width: auto;
  margin-right: 0.5rem;
}

.plant-image {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.image-container {
  margin-bottom: 1rem;
}

.image-url {
  margin-top: 0.5rem;
}

.other-urls {
  margin-top: 1rem;
}

.form-actions {
  margin-top: 2rem;
  text-align: right;
}

.form-actions button {
  margin-left: 1rem;
}

@media (max-width: 768px) {
  .plant-form {
    padding: 1rem;
  }

  .form-col {
    flex-basis: 100%;
    margin-bottom: 1rem;
  }
}
</style>