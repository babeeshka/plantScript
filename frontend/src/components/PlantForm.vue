<template>
  <v-form @submit.prevent="save" class="plant-form">
    <h2 class="text-h4 mb-6">{{ localPlant._id ? 'Edit Plant' : 'Create New Plant' }}</h2>

    <!-- General Information -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">General Information</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.common_name" label="Common Name" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.scientific_name" label="Scientific Name" multiple outlined chips
              small-chips />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.other_name" label="Other Names" multiple outlined chips small-chips />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.family" label="Family" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.origin" label="Origin" multiple outlined chips small-chips />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="localPlant.type" label="Type" outlined />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Dimensions -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Dimensions</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.dimensions.type" :items="['Height', 'Width', 'Spread']" label="Dimension Type"
              outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.dimensions.unit" :items="['feet', 'inches', 'centimeters', 'meters']"
              label="Unit" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="localPlant.dimensions.min_value" label="Min Value" type="number" outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model.number="localPlant.dimensions.max_value" label="Max Value" type="number" outlined />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <!-- Life Cycle and Reproduction -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Life Cycle and Reproduction</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.cycle" label="Cycle" :items="['Perennial', 'Annual', 'Biennial', 'Biannual']"
              outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.propagation" label="Propagation" multiple outlined chips small-chips
              :items="['Seeds', 'Cuttings', 'Division', 'Layering', 'Grafting']" />
          </v-col>
        </v-row>

        <v-subheader class="pl-0 text-h6">Flowers</v-subheader>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.flowers" label="Flowers" color="primary" />
          </v-col>
          <v-col cols="12" md="4" v-if="localPlant.flowers">
            <v-select v-model="localPlant.flowering_season" label="Flowering Season"
              :items="['Spring', 'Summer', 'Fall', 'Winter']" outlined />
          </v-col>
          <v-col cols="12" md="4" v-if="localPlant.flowers">
            <v-text-field v-model="localPlant.flower_color" label="Flower Color" outlined />
          </v-col>
        </v-row>

        <v-subheader class="pl-0 text-h6">Fruits</v-subheader>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.fruits" label="Fruits" color="primary" />
          </v-col>
          <v-col cols="12" md="4" v-if="localPlant.fruits">
            <v-switch v-model="localPlant.edible_fruit" label="Edible Fruit" color="primary" />
          </v-col>
        </v-row>
        <v-row v-if="localPlant.fruits && localPlant.edible_fruit">
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.fruit_color" label="Fruit Color" multiple outlined chips small-chips />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.harvest_season" label="Harvest Season"
              :items="['Spring', 'Summer', 'Fall', 'Winter']" outlined />
          </v-col>
        </v-row>

        <v-subheader class="pl-0 text-h6">Leaves</v-subheader>
        <v-row>
          <v-col cols="12" md="4">
            <v-switch v-model="localPlant.leaf" label="Leaf" color="primary" />
          </v-col>
          <v-col cols="12" md="4" v-if="localPlant.leaf">
            <v-switch v-model="localPlant.edible_leaf" label="Edible Leaf" color="primary" />
          </v-col>
        </v-row>
        <v-row v-if="localPlant.leaf">
          <v-col cols="12">
            <v-combobox v-model="localPlant.leaf_color" label="Leaf Color" multiple outlined chips small-chips />
          </v-col>
        </v-row>

        <!-- ... other fields ... -->
      </v-card-text>
    </v-card>

    <!-- Watering -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Watering</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="4">
            <v-select v-model="localPlant.watering" :items="['Frequent', 'Average', 'Minimum', 'None']" label="Watering"
              outlined />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field v-model="localPlant.watering_general_benchmark.value" label="Watering Interval" outlined
              hint="e.g., '7-10' for a range" persistent-hint />
          </v-col>
          <v-col cols="12" md="4">
            <v-select v-model="localPlant.watering_general_benchmark.unit" :items="['days', 'weeks']"
              label="Interval Unit" outlined />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Plant Anatomy -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Plant Anatomy</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.plant_anatomy[0].part"
              :items="['leaves', 'stems', 'flowers', 'fruits', 'roots', 'bark']" label="Plant Part" outlined required />
          </v-col>
          <v-col cols="12" md="6">
            <v-combobox v-model="localPlant.plant_anatomy[0].color" label="Color" multiple outlined chips small-chips
              :items="['green', 'red', 'yellow', 'blue', 'purple', 'white', 'brown']" />
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Characteristics -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Characteristics</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.growth_rate" label="Growth Rate" :items="['Slow', 'Moderate', 'Fast']"
              outlined />
          </v-col>
          <v-col cols="12" md="6">
            <v-select v-model="localPlant.maintenance" label="Maintenance" :items="['Low', 'Medium', 'High']"
              outlined />
          </v-col>
        </v-row>
        <!-- ... other characteristics ... -->
      </v-card-text>
    </v-card>

    <!-- Toxicity -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Toxicity</v-card-title>
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
      <v-card-title class="text-h5">Description</v-card-title>
      <v-card-text>
        <v-textarea v-model="localPlant.description" label="Description" outlined auto-grow />
      </v-card-text>
    </v-card>

    <!-- Images -->
    <v-card class="mb-6" outlined>
      <v-card-title class="text-h5">Images</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-img v-if="localPlant.default_image" :src="localPlant.default_image?.original_url"
              alt="Default Original Image" class="plant-image" contain max-height="300" />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <v-text-field v-if="localPlant.default_image" v-model="localPlant.default_image.original_url"
              label="Original Image URL" outlined />
          </v-col>
        </v-row>
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>Other URLs</v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field v-model="defaultImageRegularUrl" label="Regular URL" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="defaultImageMediumUrl" label="Medium URL" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="defaultImageSmallUrl" label="Small URL" outlined />
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field v-model="defaultImageThumbnail" label="Thumbnail URL" outlined />
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>

    <!-- Actions -->
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="cancel" color="secondary" text>Cancel</v-btn>
      <v-btn type="submit" color="primary" class="ml-4">Save</v-btn>
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
      localPlant: { ...this.plant } as PlantDetails,
      plantParts: ['leaves', 'stems', 'flowers', 'fruits', 'roots', 'bark'],
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
}

.v-card {
  margin-bottom: 2rem;
}

.v-card__title {
  background-color: #f5f5f5;
}

.v-card__text {
  padding-top: 20px;
}

.plant-image {
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 960px) {
  .plant-form {
    padding: 1rem;
  }

  .form-col {
    flex-basis: 100%;
    margin-bottom: 1rem;
  }
}
</style>