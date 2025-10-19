import React, { useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/layout/Layout';
import { SearchBar } from '@/components/features/search/SearchBar';
import { ColorGrid } from '@/components/features/colors/ColorGrid';
import { useColors } from '@/hooks/useColors';
import { Color } from '@/types/color';

const SearchPage: NextPage = () => {
  const router = useRouter();
  const { colors, loading, error, searchColors } = useColors();
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (filters: any) => {
    setHasSearched(true);
    await searchColors(filters);
  };

  const handleColorClick = (color: Color) => {
    router.push(`/colors/${color.id}`);
  };

  return (
    <>
      <Head>
        <title>Buscar Cores - CROMATICAR</title>
        <meta name="description" content="Busque cores automotivas por montadora, modelo e ano" />
      </Head>

      <Layout>
        <div className="max-w-7xl mx-auto">
          <div className="text-center pt-8 pb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
              Buscar Cores Automotivas
            </h1>
            <p className="text-text-secondary text-lg max-w-2xl mx-auto">
              Utilize os filtros abaixo para encontrar a cor exata do seu veículo
            </p>
          </div>

          <SearchBar 
            onSearch={handleSearch}
            loading={loading}
            className="mb-12"
          />

          <section>
            {error && (
              <div className="bg-red-100 border border-red-200 text-red-800 rounded-lg p-4 mb-6 text-center">
                <strong>Erro na busca:</strong> {error}
              </div>
            )}

            {hasSearched && !loading && (
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-text-primary">
                  Resultados da Busca
                </h2>
                <span className="text-text-secondary font-medium bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {colors.length} {colors.length === 1 ? 'cor encontrada' : 'cores encontradas'}
                </span>
              </div>
            )}
            
            {/* O ColorGrid já tem um estado de loading, então não precisamos de um spinner aqui */}
            <ColorGrid 
              colors={colors}
              loading={loading}
              onColorClick={handleColorClick}
            />

            {/* O ColorGrid já tem a mensagem de "Nenhuma cor encontrada" */}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default SearchPage;
