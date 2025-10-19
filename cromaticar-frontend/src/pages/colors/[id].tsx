import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useColorById } from '@/hooks/useColors';
import { copyToClipboard } from '@/utils/helpers';

const ColorDetailPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const { color, loading, error } = useColorById(id as string);

  const handleCopyCode = async (code: string) => {
    await copyToClipboard(code);
    // Aqui você pode adicionar um toast de sucesso
    alert('Código copiado para a área de transferência!');
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </Layout>
    );
  }

  if (error || !color) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-text-primary mb-4">
            Cor não encontrada
          </h1>
          <p className="text-text-secondary mb-6">
            {error || 'A cor solicitada não existe em nossa base de dados.'}
          </p>
          <Button onClick={handleBack}>
            Voltar
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{color.nome} - CROMATICAR</title>
        <meta name="description" content={`Detalhes da cor ${color.nome} para ${color.montadora} ${color.modelo}`} />
      </Head>

      <Layout>
        <div className="max-w-6xl mx-auto">
          {/* Botão Voltar */}
          <button 
            onClick={handleBack}
            className="flex items-center gap-2 text-text-secondary hover:text-text-primary mb-6 transition-colors"
          >
            ← Voltar
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Preview da Cor */}
            <div className="space-y-6">
              <div 
                className="w-full h-96 rounded-2xl shadow-lg border border-border"
                style={{ backgroundColor: color.codigoHex }}
              />
              
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="primary"
                  onClick={() => handleCopyCode(color.codigoHex)}
                  className="w-full"
                >
                  Copiar HEX
                </Button>
                <Button 
                  variant="secondary"
                  onClick={() => handleCopyCode(color.codigoCor)}
                  className="w-full"
                >
                  Copiar Código
                </Button>
              </div>
            </div>

            {/* Informações da Cor */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-text-primary mb-2">
                  {color.nome}
                </h1>
                <p className="text-text-secondary text-lg">
                  {color.montadora} • {color.modelo} • {color.ano}
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border space-y-4">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Informações Técnicas
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Código HEX
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg">
                        {color.codigoHex}
                      </code>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Código da Cor
                    </label>
                    <div className="flex items-center gap-2">
                      <code className="bg-gray-100 px-3 py-2 rounded-lg font-mono text-lg">
                        {color.codigoCor}
                      </code>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Montadora
                    </label>
                    <p className="font-medium">{color.montadora}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Modelo
                    </label>
                    <p className="font-medium">{color.modelo}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Ano
                    </label>
                    <p className="font-medium">{color.ano}</p>
                  </div>
                </div>

                {color.categoria && (
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-1">
                      Categoria
                    </label>
                    <p className="font-medium">{color.categoria}</p>
                  </div>
                )}
              </div>

              {/* Cores Similares (placeholder) */}
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h2 className="text-xl font-semibold text-text-primary mb-4">
                  Cores Relacionadas
                </h2>
                <p className="text-text-secondary">
                  Funcionalidade em desenvolvimento - em breve você poderá ver cores similares aqui.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ColorDetailPage;