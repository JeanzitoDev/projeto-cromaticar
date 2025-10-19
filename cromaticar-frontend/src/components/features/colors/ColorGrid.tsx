import React from 'react';
import { Color } from '@/types/color';
import { ColorCard } from './ColorCard';

interface ColorGridProps {
  colors: Color[];
  loading?: boolean;
  onColorClick?: (color: Color) => void;
}

export const ColorGrid: React.FC<ColorGridProps> = ({ 
  colors, 
  loading = false,
  onColorClick 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card p-4 animate-pulse">
            <div className="w-full h-32 bg-gray-300 rounded-lg mb-3"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-3 bg-gray-300 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (colors.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-text-secondary text-lg">
          Nenhuma cor encontrada
        </div>
        <p className="text-text-secondary mt-2">
          Tente ajustar os filtros de busca
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {colors.map((color) => (
        <ColorCard
          key={color.id}
          color={color}
          onView={onColorClick}
        />
      ))}
    </div>
  );
};