import React from 'react';
import { Brand } from '@/types/brands';
import { BrandCard } from './BrandCard';

interface BrandGridProps {
  brands: Brand[];
  loading?: boolean;
  onBrandClick?: (brand: Brand) => void;
}

export const BrandGrid: React.FC<BrandGridProps> = ({ 
  brands, 
  loading = false,
  onBrandClick 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="card p-6 animate-pulse">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-300 rounded-full"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2 mx-auto"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {brands.map((brand) => (
        <BrandCard
          key={brand.id}
          brand={brand}
          onClick={onBrandClick}
        />
      ))}
    </div>
  );
};