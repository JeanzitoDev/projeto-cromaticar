import React from 'react';
import { Brand } from '@/types/brands';

interface BrandCardProps {
  brand: Brand;
  onClick?: (brand: Brand) => void;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, onClick }) => {
  return (
    <div 
      className="card p-6 text-center cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onClick?.(brand)}
    >
      {/* Logo da Marca */}
      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
        {brand.logoUrl ? (
          <img 
            src={brand.logoUrl} 
            alt={brand.nome}
            className="w-12 h-12 object-contain"
          />
        ) : (
          <span className="text-2xl text-text-secondary">🚗</span>
        )}
      </div>
      
      {/* Nome da Marca */}
      <h3 className="font-semibold text-lg text-text-primary mb-2">
        {brand.nome}
      </h3>
      
      {/* Quantidade de Cores */}
      <p className="text-text-secondary text-sm">
        {brand.quantidadeCores} cores disponíveis
      </p>
    </div>
  );
};