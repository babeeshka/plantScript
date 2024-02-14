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

export interface PlantSummary {
  id: number;
  common_name: string;
  scientific_name: string[];
  other_name?: string[];
  cycle: string;
  watering: string;
  sunlight: string[];
  default_image?: DefaultImage;
}

export interface PlantDetails extends PlantSummary {
  family?: string | null;
  origin?: string[];
  type?: string;
  dimension?: string;
  dimensions?: {
    type: string;
    min_value: number;
    max_value: number;
    unit: string;
  };
  attracts?: string[];
  propagation?: string[];
  hardiness?: {
    min: string;
    max: string;
  };
  depth_water_requirement?: string[];
  volume_water_requirement?: string[];
  watering_period?: string | null;
  watering_general_benchmark?: {
    value: string;
    unit: string;
  };
  plant_anatomy?: string[];
  pruning_month?: string[];
  pruning_count?: number[];
  seeds?: number;
  maintenance?: string | null;
  soil?: string[];
  growth_rate?: string;
  drought_tolerant?: boolean;
  salt_tolerant?: boolean;
  thorny?: boolean;
  invasive?: boolean;
  tropical?: boolean;
  indoor?: boolean;
  care_level?: string;
  pest_susceptibility?: string[];
  pest_susceptibility_api?: string;
  flowers?: boolean;
  flowering_season?: string | null;
  flower_color?: string;
  cones?: boolean;
  fruits?: boolean;
  edible_fruit?: boolean;
  edible_fruit_taste_profile?: string;
  fruit_nutritional_value?: string;
  fruit_color?: string[];
  harvest_season?: string | null;
  leaf?: boolean;
  leaf_color?: string[];
  edible_leaf?: boolean;
  cuisine?: boolean;
  medicinal?: boolean;
  poisonous_to_humans?: number;
  poisonous_to_pets?: number;
  description?: string;
}

export interface ApiResponse<T> {
  data: T[];
  to: number;
  per_page: number;
  current_page: number;
  from: number;
  last_page: number;
  total: number;
}
