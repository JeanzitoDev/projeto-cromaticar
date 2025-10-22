// src/types/color.ts

// Interface para Cores (match com o backend)
export interface Color {
  id_cor: number;
  nome_cor: string;
  codigo_cor: string;
  rgb: string;
}

export interface Brand {
  id_montadora: number;
  nome: string;
}

export interface Year {
  id_ano: number;
  ano: number;
}

export interface Model {
  id_modelo: number;
  nome: string;
  id_montadora: number;
}

// Interface para busca (opcional)
export interface ColorSearchParams {
  id_montadora?: number;
  id_ano?: number;
  id_modelo?: number;
}

// Interface para lojas
export interface StoreResult {
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