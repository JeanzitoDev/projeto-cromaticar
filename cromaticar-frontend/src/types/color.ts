export interface Color {
  id: string;
  nome: string;
  codigoHex: string;
  montadora: string;
  modelo: string;
  ano: number;
  codigoCor: string;
  categoria?: string;
  imagemUrl?: string;
}

export interface ColorSearchParams {
  montadora?: string;
  modelo?: string;
  ano?: number;
  query?: string;
}