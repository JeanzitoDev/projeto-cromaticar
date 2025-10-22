import React from 'react';
import { Color } from '@/types/color';

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
          <div key={i} className="color-card animate-pulse">
            <div className="color-preview">
              <div className="color-sample bg-gray-300"></div>
            </div>
            <div className="color-info">
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
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
    <div className="colors-grid">
      {colors.map((color) => (
        <div key={color.id_cor} className="color-card">
          <div className="color-preview">
            <div 
              className="color-sample"
              style={{ 
                backgroundColor: `rgb(${color.rgb})`,
                border: color.rgb === '255,255,255' ? '1px solid #E5E5E5' : 'none'
              }}
            />
          </div>
          <div className="color-info">
            <h4 className="color-name">{color.nome_cor}</h4>
            <div className="color-code">{color.codigo_cor}</div>
            {color.rgb && (
              <div className="color-rgb">RGB: {color.rgb}</div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};