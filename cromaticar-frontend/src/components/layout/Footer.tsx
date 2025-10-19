import React from 'react';
import Link from 'next/link';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-text-primary text-white py-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-text-primary font-bold">C</span>
              </div>
              <h2 className="text-xl font-bold">CROMATICAR</h2>
            </div>
            <p className="text-gray-300 max-w-md">
              A forma mais inteligente e precisa de identificar cores automotivas. 
              Encontre a cor original do seu veículo com nossa base de dados completa.
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition-colors">
                  Buscar Cores
                </Link>
              </li>
              <li>
                <Link href="/brands" className="hover:text-white transition-colors">
                  Marcas
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4">Desenvolvimento</h3>
            <p className="text-gray-300">
              Projeto de TG - CodeTech
            </p>
            <p className="text-gray-300 text-sm mt-2">
              Sistema profissional para identificação de cores automotivas
            </p>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; 2024 CROMATICAR. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};