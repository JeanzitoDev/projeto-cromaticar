import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const SearchPage: NextPage = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Estados para dados que virão do backend
  const [brands, setBrands] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [models, setModels] = useState<string[]>([]);
  const [colors, setColors] = useState<any[]>([]);

  // Simulação de carregamento de dados do backend
  useEffect(() => {
    // TODO: Substituir por chamada real à API
    const loadInitialData = async () => {
      setLoading(true);
      
      // Simulando delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados mockados - serão substituídos pelo backend
      setBrands(['Chevrolet', 'Ford', 'Volkswagen', 'Fiat', 'Toyota', 'Honda']);
      setYears(['2023', '2022', '2021', '2020', '2019', '2018']);
      
      setLoading(false);
    };

    loadInitialData();
  }, []);

  // Simulação de carregamento de modelos quando marca é selecionada
  useEffect(() => {
    if (selectedBrand) {
      // TODO: Chamada à API para buscar modelos da marca selecionada
      const loadModels = async () => {
        setLoading(true);
        
        await new Promise(resolve => setTimeout(resolve, 300));
        
        // Mock de modelos baseado na marca
        const mockModels: { [key: string]: string[] } = {
          'Chevrolet': ['S10', 'Onix', 'Tracker', 'Cruze'],
          'Ford': ['Ranger', 'Fiesta', 'Focus', 'EcoSport'],
          'Volkswagen': ['Gol', 'Polo', 'Virtus', 'T-Cross'],
          'Fiat': ['Strada', 'Argo', 'Cronos', 'Mobi'],
          'Toyota': ['Hilux', 'Corolla', 'Yaris', 'SW4'],
          'Honda': ['Civic', 'HR-V', 'City', 'WR-V']
        };
        
        setModels(mockModels[selectedBrand] || []);
        setLoading(false);
      };

      loadModels();
    } else {
      setModels([]);
      setSelectedModel('');
    }
  }, [selectedBrand]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    try {
      // TODO: Substituir por chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock de dados de cores - será substituído pelo backend
      const mockColors = [
        { 
          id: '1', 
          name: 'Vermelho Chili', 
          code: '#FF3B30', 
          type: 'Sólido', 
          brand: selectedBrand || 'Chevrolet', 
          model: selectedModel || 'S10', 
          year: selectedYear || '2023' 
        },
        { 
          id: '2', 
          name: 'Cinza Graphite', 
          code: '#666666', 
          type: 'Metálico', 
          brand: selectedBrand || 'Chevrolet', 
          model: selectedModel || 'S10', 
          year: selectedYear || '2023' 
        },
      ].filter(color => 
        (!selectedBrand || color.brand === selectedBrand) &&
        (!selectedYear || color.year === selectedYear) &&
        (!selectedModel || color.model === selectedModel)
      );

      setColors(mockColors);
    } catch (error) {
      console.error('Erro na busca:', error);
      setColors([]);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSelectedYear('');
    setSelectedModel('');
    setHasSearched(false);
    setColors([]);
  };

  return (
    <>
      <Head>
        <title>Buscar Cores - CROMATICAR</title>
        <meta name="description" content="Busque cores automotivas por montadora, modelo e ano" />
      </Head>

      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <Link href="/" className="logo">CROMATICAR</Link>
            <Link href="/" className="btn btn-outline">
              Voltar ao Início
            </Link>
          </div>
        </header>

        {/* Main Content */}
        <section className="search-section">
          <div className="section-header">
            <h2>Buscar Cores Automotivas</h2>
            <p>Utilize os filtros abaixo para encontrar a cor exata do seu veículo</p>
          </div>

          {/* Search Filters */}
          <form onSubmit={handleSearch} className="search-filters">
            <div className="filters-grid">
              <div className="filter-group">
                <label>Montadora</label>
                <select 
                  className="filter-input"
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  disabled={loading}
                >
                  <option value="">{loading ? 'Carregando...' : 'Selecione a montadora'}</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Ano</label>
                <select 
                  className="filter-input"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  disabled={loading}
                >
                  <option value="">{loading ? 'Carregando...' : 'Selecione o ano'}</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Modelo</label>
                <select 
                  className="filter-input"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  disabled={loading || !selectedBrand}
                >
                  <option value="">
                    {loading ? 'Carregando...' : 
                     !selectedBrand ? 'Selecione primeiro a montadora' : 
                     'Selecione o modelo'}
                  </option>
                  {models.map(model => (
                    <option key={model} value={model}>{model}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={handleClear}
                disabled={loading}
              >
                Limpar Filtros
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Buscando...' : 'Buscar cores'}
              </button>
            </div>
          </form>

          {/* Loading State */}
          {loading && (
            <div className="section-header">
              <div className="loading-spinner" style={{ 
                width: '40px', 
                height: '40px', 
                margin: '0 auto',
                border: '4px solid #f3f3f3',
                borderTop: '4px solid #1F3C88',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></div>
              <p>Carregando resultados...</p>
            </div>
          )}

          {/* Results Section */}
          {hasSearched && !loading && (
            <>
              <div className="section-header">
                <h3>
                  {colors.length > 0 
                    ? `Cores Disponíveis (${colors.length})`
                    : 'Nenhuma cor encontrada'
                  }
                </h3>
                <p>
                  {colors.length > 0 
                    ? 'Resultados baseados nos filtros selecionados'
                    : 'Tente ajustar os filtros de busca'
                  }
                </p>
              </div>

              {/* Colors Grid */}
              {colors.length > 0 ? (
                <div className="colors-grid">
                  {colors.map((color) => (
                    <div key={color.id} className="color-card">
                      <div className="color-preview">
                        <div 
                          className="color-sample"
                          style={{ backgroundColor: color.code }}
                        />
                      </div>
                      <div className="color-info">
                        <h4 className="color-name">{color.name}</h4>
                        <div className="color-code">{color.code}</div>
                        <span className="color-type">{color.type}</span>
                        <div className="color-details">
                          {color.brand} • {color.model} • {color.year}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>Nenhuma cor encontrada</h3>
                  <p>Verifique os filtros selecionados e tente novamente</p>
                </div>
              )}
            </>
          )}
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content">
            <div>
              <div className="footer-logo">
                <div className="logo">CROMATICAR</div>
              </div>
              <p className="footer-description">
                A forma mais inteligente e precisa de identificar cores automotivas. 
                Encontre a cor original do seu veículo com nossa base de dados completa.
              </p>
            </div>
            
            <div>
              <h3>Navegação</h3>
              <ul className="footer-links">
                <li><Link href="/">Início</Link></li>
                <li><Link href="/search">Buscar Cores</Link></li>
                <li><Link href="/brands">Marcas</Link></li>
              </ul>
            </div>
            
            <div>
              <h3>Desenvolvimento</h3>
              <p className="footer-description">
                Projeto de TG - CodeTech
                <br />
                Sistema profissional para identificação de cores automotivas
              </p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 CROMATICAR. Todos os direitos reservados.</p>
          </div>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default SearchPage;