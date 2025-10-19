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
    if (params.montadora) queryParams.append('montadora', params.montadora);
    if (params.modelo) queryParams.append('modelo', params.modelo);
    if (params.ano) queryParams.append('ano', params.ano.toString());
    
    return api.get<Color[]>(`/colors/search?${queryParams}`);
  },

  async getPopularColors(): Promise<Color[]> {
    return api.get<Color[]>('/colors/popular');
  },
};