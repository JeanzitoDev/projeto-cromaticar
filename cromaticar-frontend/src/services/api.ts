const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

// Interfaces necessárias
interface StoreResult {
  name: string;
  url: string;
  type: 'physical' | 'online';
  address?: string;
  phone?: string;
  distance_km?: number;
  time_min?: number;
  ships_to_cep: boolean;
  has_product: boolean;
  product_match: string;
}

interface Color {
  id_cor: number;
  nome_cor: string;
  codigo_cor: string;
  rgb: string;
}

interface Brand {
  id_montadora: number;
  nome: string;
}

interface Year {
  id_ano: number;
  ano: number;
}

interface Model {
  id_modelo: number;
  nome: string;
  id_montadora: number;
}

export const api = {
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params)}` : '';
    const response = await fetch(`${API_BASE_URL}${endpoint}${queryString}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },

  async post<T>(endpoint: string, data: any): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  },
};

// Serviços para cores
export const colorService = {
  async getColors(filters?: { brand?: string; year?: string; model?: string }) {
    return api.get<Color[]>('/colors', filters as Record<string, string>);
  },
};

export const brandService = {
  async getBrands() {
    return api.get<Brand[]>('/api/brands');
  },

  async getYearsByBrand(brandId: number) {
    return api.get<Year[]>(`/api/brands/${brandId}/years`);
  },

  async getModelsByBrandAndYear(brandId: number, yearId: number) {
    return api.get<Model[]>(`/api/brands/${brandId}/years/${yearId}/models`);
  },

  async getColorsByModelAndYear(modelId: number, yearId: number) {
    return api.get<Color[]>(`/api/models/${modelId}/years/${yearId}/colors`);
  }
};

// 🔥 SERVIÇO DE BUSCA DE LOJAS - AGORA EXPORTADO!
export const automotiveService = {
  async searchStores(searchData: {
    color_name: string;
    color_code: string;
    car_brand: string;
    car_model: string;
    car_year: string;
    user_cep?: string;
    user_lat?: number;
    user_lng?: number;
  }) {
    return api.post<StoreResult[]>('/api/automotive-search/search-stores', searchData);
  },

  async getUserLocation(cep: string) {
    return api.get(`/api/automotive-search/user-location?cep=${cep}`);
  }
};

// Exportar as interfaces também
export type { StoreResult, Color, Brand, Year, Model };