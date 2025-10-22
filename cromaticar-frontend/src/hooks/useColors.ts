import { useState, useEffect } from 'react';
import { Color, ColorSearchParams } from '@/types/color';
import { colorService } from '@/services/colorService';

export function useColors() {
  const [colors, setColors] = useState<Color[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchColors = async (params: ColorSearchParams) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await colorService.searchColors(params);
      setColors(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar cores');
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setColors([]);
    setError(null);
  };

  return {
    colors,
    loading,
    error,
    searchColors,
    clearResults,
  };
}

export function useColorById(id?: string | string[]) {
  const [color, setColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        setLoading(true);
        // normaliza id caso seja um array vindo do router
        const rawId = Array.isArray(id) ? id[0] : id;
        if (!rawId) return;

        const colorData = await colorService.getColorById(rawId);
        // Normalizar campos snake_case -> camelCase
        const normalized: any = {
          ...colorData,
          // mapear nomes que o frontend espera
          idCor: (colorData as any).id_cor ?? (colorData as any).id ?? undefined,
          nome: (colorData as any).nome_cor ?? (colorData as any).nome ?? undefined,
          codigoCor: (colorData as any).codigo_cor ?? (colorData as any).codigoCor ?? undefined,
          codigoHex: (colorData as any).codigo_hex ?? (colorData as any).rgb ?? (colorData as any).codigoHex ?? undefined,
        };
        setColor(normalized as Color);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cor');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchColor();
    } else {
      setLoading(false);
    }
  }, [id]);

  return { color, loading, error };
}