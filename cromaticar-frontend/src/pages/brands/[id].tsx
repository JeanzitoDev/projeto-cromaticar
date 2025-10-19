import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { ColorGrid } from '@/components/features/colors/ColorGrid';
import { Select } from '@/components/ui/Select';
import { useColors } from '@/hooks/useColors';
import { useBrands } from '@/hooks/useBrands';
import { Brand } from '@/types/brands';
import { Color } from '@/types/color';

const BrandColorsPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const { brands } = useBrands();
  const { colors, loading, error, searchColors } = useColors();

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedModel, setSelectedModel] = useState('');

  // Encontrar a marca baseada no ID
  useEffect(() => {
    if (id && brands.length > 0) {
      const brand = brands.find(b => b.id === id);
      setSelectedBrand(brand || null);
      
      if (brand) {
        // Carregar cores da marca
        searchColors({ montadora: brand.nome });
      }
    }
  }, [id, brands, searchColors]);

  // Buscar cores quando filtros mudarem
  useEffect(() => {
    if (selectedBrand) {
      searchColors({
        montadora: selectedBrand.nome,
        ano: selectedYear ? parseInt(selectedYear) : undefined,
        modelo: selectedModel || undefined
      });
    }
  }, [selectedBrand, selectedYear, selectedModel, searchColors]);

  const handleColorClick = (color: Color) => {
    router.push(`/colors/${color.id}`);
  };

  if (!selectedBrand && !loading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Marca não encontrada
          </h1>
          <button 
            onClick={() => router.back()}
            className="text-primary hover:underline"
          >
            Voltar para lista de marcas
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{selectedBrand?.nome} - CROMATICAR</title>
        <meta name="description" content={`Cores disponíveis para ${selectedBrand?.nome}`} />
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto">
          {/* Cabeçalho da Marca */}
          <div className="flex items-center gap-4 mb-8">
            {selectedBrand?.logoUrl && (
              <img 
                src={selectedBrand.logoUrl} 
                alt={selectedBrand.nome}
                className="w-16 h-16 object-contain"
              />
            )}
            <div>
              <h1 className="text-4xl font-bold text-text-primary">
                {selectedBrand?.nome}
              </h1>
              <p className="text-text-secondary text-lg">
                Explore as cores disponíveis para {selectedBrand?.nome}
              </p>
            </div>
          </div>

          {/* Filtros */}
          <div className="bg-surface rounded-xl p-6 border border-border mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Ano"
                value={selectedYear}
                options={[
                  { value: '', label: 'Todos os anos' },
                  { value: '2023', label: '2023' },
                  { value: '2022', label: '2022' },
                  { value: '2021', label: '2021' },
                  { value: '2020', label: '2020' },
                  { value: '2019', label: '2019' },
                ]}
                onChange={(e) => setSelectedYear(e.target.value)}
              />

              <Select
                label="Modelo"
                value={selectedModel}
                options={[
                  { value: '', label: 'Todos os modelos' },
                  ...(selectedBrand?.modelos?.map(model => ({
                    value: model,
                    label: model
                  })) || [])
                ]}
                onChange={(e) => setSelectedModel(e.target.value)}
              />

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedYear('');
                    setSelectedModel('');
                  }}
                  className="text-primary hover:underline text-sm"
                >
                  Limpar filtros
                </button>
              </div>
            </div>
          </div>

          {/* Resultados */}
          <section>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <div className="text-red-800 font-medium">Erro ao carregar cores</div>
                <div className="text-red-600 text-sm mt-1">{error}</div>
              </div>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-text-primary">
                Cores Disponíveis
              </h2>
              <span className="text-text-secondary">
                {colors.length} {colors.length === 1 ? 'cor encontrada' : 'cores encontradas'}
              </span>
            </div>

            <ColorGrid 
              colors={colors}
              loading={loading}
              onColorClick={handleColorClick}
            />
          </section>
        </div>
      </Layout>
    </>
  );
};

export default BrandColorsPage;
