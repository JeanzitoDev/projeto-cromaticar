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

export function useColorById(id: string) {
  const [color, setColor] = useState<Color | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchColor = async () => {
      try {
        setLoading(true);
        const colorData = await colorService.getColorById(id);
        setColor(colorData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar cor');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchColor();
    }
  }, [id]);

  return { color, loading, error };
}