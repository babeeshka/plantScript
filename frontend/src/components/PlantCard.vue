<template>
  <div class="plant-card" @click="handleClick">

    <!-- Plant Image -->
    <div class="plant-image-container">
      <img v-if="plant.default_image" :src="plant.default_image.regular_url || plant.default_image.original_url"
        :alt="plant.common_name" />
      <div v-else class="placeholder-container">
        <PlaceholderImage />
      </div>
    </div>

    <!-- Plant Details -->
    <div class="plant-info">
      <h3 class="plant-name">{{ plant.common_name }}</h3>
      <p class="plant-scientific-name">{{ plant.scientific_name.join(', ') }}</p>
      <div class="plant-features">
        <template v-for="feature in plantFeatures">
          <span v-if="shouldShowFeatureIcon(feature.name)" :title="feature.title"
            :class="['feature-icon', feature.name]">
            <img :src="featureIcons[feature.name]" :alt="feature.title" @load="onIconLoad" />
          </span>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlaceholderImage from '@/components/PlaceholderImage.vue';
import { FeatureIcons } from '@rootTypes/plantInterfaces';

export default defineComponent({
  components: {
    PlaceholderImage,
  },
  props: {
    plant: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      featureIcons: {
        edible: '/icons/edible.svg',
        poisonous: '/icons/poisonous.svg',
        perennial: '/icons/perennial.svg',
        annual: '/icons/annual.svg',
        biennial: '/icons/biennial.svg',
        frequent_watering: '/icons/frequent_watering.svg',
        average_watering: '/icons/average_watering.svg',
        minimum_watering: '/icons/minimum_watering.svg',
        no_watering: '/icons/no_watering.svg',
        full_shade: '/icons/full_shade.svg',
        part_shade: '/icons/partial_shade.svg',
        part_sun_shade: '/icons/part_sun_shade.svg',
        full_sun: '/icons/full_sun.svg',
      } as FeatureIcons,
      plantFeatures: [
        { name: 'edible', title: 'Edible' },
        { name: 'poisonous', title: 'Poisonous' },
        { name: 'perennial', title: 'Perennial' },
        { name: 'annual', title: 'Annual' },
        { name: 'biennial', title: 'Biennial' },
        { name: 'frequent_watering', title: 'Frequent Watering' },
        { name: 'average_watering', title: 'Average Watering' },
        { name: 'minimum_watering', title: 'Minimum Watering' },
        { name: 'no_watering', title: 'No Watering' },
        { name: 'full_shade', title: 'Full Shade' },
        { name: 'part_shade', title: 'Part Shade' },
        { name: 'part_sun_shade', title: 'Sun to Part Shade' },
        { name: 'full_sun', title: 'Full Sun' },
      ],
    };
  },
  methods: {
    handleClick(event: MouseEvent): void {
      this.$emit('showPlantDetails', this.plant);
    },
    shouldShowFeatureIcon(featureName: string) {
      switch (featureName) {
        case 'edible':
          return this.plant.edible_fruit || this.plant.edible_leaf;
        case 'poisonous':
          return this.plant.poisonous_to_humans || this.plant.poisonous_to_pets;
        case 'perennial':
          return this.plant.cycle === 'Perennial';
        case 'annual':
          return this.plant.cycle === 'Annual';
        case 'biennial':
          return this.plant.cycle === 'Biennial';
        case 'frequent_watering':
          return this.plant.watering === 'Frequent';
        case 'average_watering':
          return this.plant.watering === 'Average';
        case 'minimum_watering':
          return this.plant.watering === 'Minimum';
        case 'no_watering':
          return this.plant.watering === 'None';
        case 'full_shade':
          return this.plant.sunlight && this.plant.sunlight.includes('Full shade');
        case 'part_shade':
          return this.plant.sunlight && this.plant.sunlight.includes('Part shade');
        case 'part_sun_shade':
          return this.plant.sunlight && this.plant.sunlight.includes('Sun-Part shade');
        case 'full_sun':
          return this.plant.sunlight && this.plant.sunlight.includes('Full sun');
        default:
          return false;
      }
    },
    getFeatureTitle(featureName: string) {
      const feature = this.plantFeatures.find(feature => feature.name === featureName);
      return feature ? feature.title : '';
    },
    onIconLoad(event: Event): void {
      (event.target as HTMLElement).classList.add('loaded');
    },
  },
});
</script>

<style scoped>
.plant-card {
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: box-shadow 0.3s, transform 0.3s;
  cursor: pointer;
}

.plant-image-container {
  flex: 1;
  display: block;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.plant-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.plant-info {
  padding: 1rem;
  text-align: left;
}

.plant-info h3 {
  margin: 0;
  font-size: 1.2rem;
}

.plant-info p {
  margin: 0.5rem 0;
  color: #666;
}

.plant-features {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  color: #555;
  font-size: 1rem;
  text-align: center;
}

.plant-name {
  margin: 0;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.plant-scientific-name {
  margin: 0.5rem 0;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
</style>