import { useState, useEffect } from 'react';
import { Brand } from '@/types/brands';
import { brandService } from '@/services/brandService';

export function useBrands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { 
    const fetchBrands = async () => {
      try {
        const brandsData = await brandService.getAllBrands();
        setBrands(brandsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar marcas');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const searchBrands = async (query: string) => {
    if (!query.trim()) {
      // Se query vazia, retorna todas as marcas
      const allBrands = await brandService.getAllBrands();
      setBrands(allBrands);
      return;
    }

    setLoading(true);
    try {
      const results = await brandService.searchBrands(query);
      setBrands(results);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao buscar marcas');
    } finally {
      setLoading(false);
    }
  };

  return {
    brands,
    loading,
    error,
    searchBrands,
  };
}