import { api } from './api';
import { Brand } from '@/types/brands';

export const brandService = {
  async getAllBrands(): Promise<Brand[]> {
    return api.get<Brand[]>('/brands');
  },

  async getBrandById(id: string): Promise<Brand> {
    return api.get<Brand>(`/brands/${id}`);
  },

  async searchBrands(query: string): Promise<Brand[]> {
    return api.get<Brand[]>(`/brands/search?q=${query}`);
  },
};