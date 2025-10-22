import { api } from './api';
import { Color, ColorSearchParams } from '@/types/color';

export const colorService = {
  async getAllColors(): Promise<Color[]> {
    return api.get<Color[]>('/colors');
  },

  async getColorsByBrand(brandId: string): Promise<Color[]> {
    return api.get<Color[]>(`/brands/${brandId}/colors`);
  },

  async getColorById(id: string): Promise<Color> {
    return api.get<Color>(`/colors/${id}`);
  },

  async searchColors(params: ColorSearchParams): Promise<Color[]> {
    const queryParams = new URLSearchParams();
    
    if (params.query) queryParams.append('q', params.query);
    if (params.id_montadora) queryParams.append('id_montadora', params.id_montadora.toString());
    if (params.id_modelo) queryParams.append('id_modelo', params.id_modelo.toString());
    if (params.id_ano) queryParams.append('id_ano', params.id_ano.toString());
    
    return api.get<Color[]>(`/colors/search?${queryParams}`);
  },

  async getPopularColors(): Promise<Color[]> {
    return api.get<Color[]>('/colors/popular');
  },
};  