import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  return (
    <header className="bg-surface/80 backdrop-blur-lg sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary tracking-wide">CROMATICAR</h1>
              <p className="text-text-secondary text-xs hidden sm:block">
                Identificação inteligente de cores automotivas
              </p>
            </div>
          </Link>

          {/* Navegação */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Início
            </Link>
            <Link 
              href="/search" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Buscar Cores
            </Link>
            <Link 
              href="/brands" 
              className="text-text-secondary hover:text-primary transition-colors font-medium"
            >
              Marcas
            </Link>
          </nav>

          {/* Botão de Ação */}
          <Link href="/search">
            <Button variant="secondary" size="sm">
              Começar Busca
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
