import React, { useState, useEffect } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const BrandsPage: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState<any[]>([]);

  // Simulação de carregamento de marcas do backend
  useEffect(() => {
    const loadBrands = async () => {
      setLoading(true);
      
      // TODO: Substituir por chamada real à API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock de dados - será substituído pelo backend
      const mockBrands = [
        { id: '1', name: 'Chevrolet', colorCount: 45, logo: '🚗' },
        { id: '2', name: 'Ford', colorCount: 38, logo: '🚙' },
        { id: '3', name: 'Volkswagen', colorCount: 42, logo: '🚐' },
        { id: '4', name: 'Fiat', colorCount: 35, logo: '🚗' },
        { id: '5', name: 'Toyota', colorCount: 40, logo: '🚙' },
        { id: '6', name: 'Honda', colorCount: 36, logo: '🚗' },
        { id: '7', name: 'Hyundai', colorCount: 32, logo: '🚙' },
        { id: '8', name: 'Nissan', colorCount: 34, logo: '🚗' },
      ];
      
      setBrands(mockBrands);
      setLoading(false);
    };

    loadBrands();
  }, []);

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBrandClick = (brand: any) => {
    // TODO: Navegar para página de cores da marca ou filtrar na busca
    console.log('Marca selecionada:', brand);
    // Exemplo: window.location.href = `/search?brand=${brand.id}`;
  };

  return (
    <>
      <Head>
        <title>Marcas - CROMATICAR</title>
        <meta name="description" content="Explore cores por marca de veículo" />
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
            <h2>Marcas de Veículos</h2>
            <p>Selecione uma marca para explorar suas cores disponíveis</p>
          </div>

          {/* Search Bar */}
          <div className="search-filters" style={{ maxWidth: '500px', marginBottom: '40px' }}>
            <div className="filter-group">
              <label>Buscar marca</label>
              <input
                type="text"
                className="filter-input"
                placeholder="Digite o nome da marca..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

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
              <p>Carregando marcas...</p>
            </div>
          )}

          {/* Brands Grid */}
          {!loading && (
            <>
              <div className="section-header">
                <h3>
                  {filteredBrands.length > 0 
                    ? `Todas as Marcas (${filteredBrands.length})`
                    : 'Nenhuma marca encontrada'
                  }
                </h3>
              </div>

              {filteredBrands.length > 0 ? (
                <div className="brands-grid">
                  {filteredBrands.map((brand) => (
                    <div 
                      key={brand.id} 
                      className="brand-card"
                      onClick={() => handleBrandClick(brand)}
                    >
                      <div className="brand-logo">
                        {brand.logo}
                      </div>
                      <h3 className="brand-name">
                        {brand.name}
                      </h3>
                      <p className="brand-count">
                        {brand.colorCount} cores disponíveis
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-results">
                  <h3>Nenhuma marca encontrada</h3>
                  <p>Tente ajustar o termo de busca</p>
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
        
        .brands-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: clamp(1rem, 2vw, 1.5rem);
          max-width: 1200px;
          margin: 0 auto;
        }

        .brand-card {
          background: white;
          border-radius: 12px;
          border: 1px solid #E5E5E5;
          box-shadow: 0 1px 4px rgba(0,0,0,0.08);
          text-align: center;
          padding: clamp(1.5rem, 3vw, 2rem) clamp(1rem, 2vw, 1.5rem);
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .brand-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
        }

        .brand-logo {
          font-size: clamp(2rem, 6vw, 3rem);
          margin-bottom: clamp(0.75rem, 2vw, 1rem);
        }

        .brand-name {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(1rem, 2vw, 1.25rem);
          color: #1A1A1A;
          margin-bottom: 0.5rem;
        }

        .brand-count {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          font-size: clamp(0.75rem, 1.5vw, 0.875rem);
          color: #6C63FF;
        }
      `}</style>
    </>
  );
};

export default BrandsPage;