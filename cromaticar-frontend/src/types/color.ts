// src/types/color.ts

// Interface para Cores (extendida para incluir todas as propriedades usadas)
export interface Color {
  id_cor: number;
  nome_cor: string;
  codigo_cor: string;
  rgb: string;
  // Adicione estas propriedades que estão sendo usadas no código
  id?: number;                    // Para compatibilidade
  nome?: string;                  // Para compatibilidade  
  montadora?: string;
  modelo?: string;
  ano?: number;
  categoria?: string;
  codigoHex?: string;             // Sinônimo para rgb
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

// Interface para busca (corrigida)
export interface ColorSearchParams {
  query?: string;                 // Adicione esta linha
  id_montadora?: number;
  id_ano?: number;
  id_modelo?: number;
  // Opcional: adicione estas se precisar
  montadora?: string;
  modelo?: string;
  ano?: number;
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