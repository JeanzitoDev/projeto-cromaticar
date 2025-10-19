import React from 'react';
import { Color } from '@/types/color';
import { copyToClipboard } from '@/utils/helpers';
import { Button } from '@/components/ui/Button';

interface ColorCardProps {
  color: Color;
  onView?: (color: Color) => void;
}

export const ColorCard: React.FC<ColorCardProps> = ({ color, onView }) => {
  const handleCopyCode = async () => {
    await copyToClipboard(color.codigoHex);
    // Você pode adicionar um toast de sucesso aqui
  };

  return (
    <div className="card p-4">
      {/* Preview da Cor */}
      <div 
        className="w-full h-32 rounded-lg mb-3 border border-border"
        style={{ backgroundColor: color.codigoHex }}
      />
      
      {/* Informações da Cor */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg text-text-primary">
          {color.nome}
        </h3>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-text-secondary font-mono">
            {color.codigoHex}
          </span>
          <span className="text-xs bg-primary text-white px-2 py-1 rounded">
            {color.codigoCor}
          </span>
        </div>
        
        <div className="text-sm text-text-secondary">
          <p>{color.montadora}</p>
          <p>{color.modelo} • {color.ano}</p>
        </div>
        
        {/* Ações */}
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onView?.(color)}
          >
            Visualizar
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="flex-1"
            onClick={handleCopyCode}
          >
            Copiar
          </Button>
        </div>
      </div>
    </div>
  );
};