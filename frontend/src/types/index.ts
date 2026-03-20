export interface AWSService {
  id: string;
  name: string;
  category: string;
  description: string;
  key_features: string[];
  use_cases: string[];
  pricing_notes: string;
  pricing_model: string;
  free_tier: string;
  docs_url: string;
}

export interface ServicesResponse {
  services: AWSService[];
  total: number;
}

export interface CategoriesResponse {
  categories: string[];
}
