import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>CROMATICAR - Identificação Inteligente de Cores Automotivas</title>
        <meta name="description" content="Sistema profissional para identificação de cores automotivas" />
      </Head>

      <div className="main-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo">CROMATICAR</div>
            <Link href="/search" className="btn btn-primary">
              Iniciar busca
            </Link>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Encontre a Cor Exata do Seu Veículo</h1>
            <p>A forma mais inteligente de identificar cores automotivas com precisão.</p>
            <div className="hero-buttons">
              <Link href="/search" className="btn btn-primary">
                Iniciar busca
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features">
          <div className="section-header">
            <h2>Uma Ferramenta Completa</h2>
            <p>Tudo que você precisa para identificar cores com precisão e rapidez</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon primary">🎨</div>
              <h3>Códigos Oficiais</h3>
              <p>Base de dados com códigos oficiais das principais montadoras</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon primary">⚡</div>
              <h3>Busca Inteligente</h3>
              <p>Encontre cores por montadora, modelo e ano em segundos</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon primary">📱</div>
              <h3>Totalmente Responsivo</h3>
              <p>Experiência perfeita em desktop, tablet e mobile</p>
            </div>
          </div>
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
    </>
  );
};

export default Home;