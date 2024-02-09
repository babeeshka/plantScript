export interface PlantSummary {
    id: number;
    common_name: string;
    scientific_name: string[];
    // TODO add other properties as needed
  }
  
  export interface PlantDetails extends PlantSummary {
    cycle: string;
    watering: string;
    sunlight: string[];
    default_image: {
      license: number;
      license_name: string;
      license_url: string;
      original_url: string;
      regular_url: string;
      medium_url: string;
      small_url: string;
      thumbnail: string;
    };
    // extend with additional details as needed
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
  