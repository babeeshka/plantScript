// type for Default Image which is present in both fetchSpeciesList and fetchPlantDetails
export interface DefaultImage {
  license: number;
  license_name: string;
  license_url: string;
  original_url: string;
  regular_url: string;
  medium_url: string;
  small_url: string;
  thumbnail: string;
}

// type for fetchSpeciesList based on perenual response
export interface PlantSummary {
  id?: number | string;
  common_name: string;
  scientific_name: string[];
  other_name?: string[];
  cycle?: string | null;
  watering?: string;
  sunlight?: string[];
  default_image?: DefaultImage | null;
  isManualEntry?: boolean;
}

// type for PlantAnatomy which is present in fetchPlantDetails
export interface PlantAnatomy {
  part: string;
  color: string[];
}

export interface PruningCount {
  amount: number;
  interval: string;
}

// type for fetchPlantDetails based on perenual response
export interface PlantDetails extends PlantSummary {
  _id?: string;
  family?: string | null;
  origin?: string[] | null;
  type: string;
  dimension?: string | null;
  dimensions?: {
    type?: string | null;
    min_value?: number;
    max_value?: number;
    unit?: string;
  } | [];
  cycle?: string | null;
  attracts?: string[] | null;
  propagation: string[];
  hardiness?: {
    min?: string;
    max?: string;
  } | null;
  hardiness_location?: {
    full_url: string;
    full_iframe: string;
  } | null;
  watering: string;
  depth_water_requirement?: {
    unit: string | null;
    value: number | null;
  } | [];
  volume_water_requirement?: {
    unit: string;
    value: number;
  } | [];
  watering_period?: string | null;
  watering_general_benchmark?: {
    value: string | null;
    unit: string | null;
  } | null;
  plant_anatomy: PlantAnatomy[];
  sunlight: string[];
  pruning_month: string[] | null;
  pruning_count?: PruningCount | null;
  seeds?: number | null;
  maintenance: string | null;
  care_guides?: string | null;
  soil: string[];
  growth_rate: string;
  drought_tolerant: boolean;
  salt_tolerant: boolean;
  thorny: boolean;
  invasive: boolean;
  tropical: boolean;
  indoor: boolean;
  care_level: string | null;
  pest_susceptibility?: string[] | null;
  pest_susceptibility_api?: string | null;
  flowers: boolean;
  flowering_season: string | null;
  flower_color: string;
  cones: boolean;
  fruits: boolean;
  edible_fruit: boolean;
  edible_fruit_taste_profile?: string | null;
  fruit_nutritional_value?: string | null;
  fruit_color: string[];
  harvest_season?: string | null;
  leaf: boolean;
  leaf_color: string[];
  edible_leaf: boolean;
  cuisine: boolean;
  medicinal: boolean;
  poisonous_to_humans: number;
  poisonous_to_pets: number;
  description: string | null;
  default_image?: DefaultImage | null;
  other_images?: any;
}

// type for fetchSpeciesList from perenual API
export interface ApiResponse<T> {
  data: T[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}

// Extract only non-optional boolean keys from PlantDetails
type BooleanKeysOf<T> = {
  [K in keyof T]-?: T[K] extends boolean ? K : never
}[keyof T];

// Extract only optional boolean keys from PlantDetails
export type PlantFilterKeys = BooleanKeysOf<PlantDetails>;

// type for fetchSpeciesList from perenual API
export interface PaginationParams {
  limit: number;
  offset: number;
  searchTerm?: string;
  filters?: Record<PlantFilterKeys, boolean>;
}

// type for feature icons
export interface FeatureIcons {
  [key: string]: string;
  edible: string;
  poisonous: string;
  perennial: string;
  annual: string;
  biennial: string;
  frequent_watering: string;
  average_watering: string;
  minimum_watering: string;
  no_watering: string;
  full_shade: string;
  part_shade: string;
  part_sun_shade: string;
  full_sun: string;
};

// type for  plant diseases
export interface PlantDisease {
  id: number;
  name: string;
  description: string;
  treatment: string;
  prevention: string;
  symptoms: string[];
  species_ids: number[];
  image_url: string;
}

export interface PlantGuideSection {
  id: number;
  type: string;
  description: string;
}

export interface PlantGuide {
  id: number;
  species_id: number;
  common_name: string;
  scientific_name: string[];
  section: PlantGuideSection[];
}