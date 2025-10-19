import React, { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';

interface SearchFilters {
  query: string;
  montadora: string;
  ano: string;
  modelo: string;
}

interface SearchBarProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  loading = false,
  className = '' 
}) => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    montadora: '',
    ano: '',
    modelo: ''
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleClear = () => {
    const clearedFilters = {
      query: '',
      montadora: '',
      ano: '',
      modelo: ''
    };
    setFilters(clearedFilters);
    onSearch(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters).some(value => value !== '');

  return (
    <div className={`bg-surface rounded-2xl p-6 sm:p-8 shadow-sm border border-border ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <Input
          label="Nome ou código da cor"
          placeholder="Ex: Azul Blue Eyes"
          value={filters.query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, query: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />

        <Select
          label="Montadora"
          value={filters.montadora}
          options={[
            { value: 'chevrolet', label: 'Chevrolet' },
            { value: 'ford', label: 'Ford' },
            { value: 'volkswagen', label: 'Volkswagen' },
            { value: 'fiat', label: 'Fiat' },
            { value: 'toyota', label: 'Toyota' },
          ]}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({ ...prev, montadora: e.target.value }))}
        />

        <Select
          label="Ano"
          value={filters.ano}
          options={[
            { value: '2023', label: '2023' },
            { value: '2022', label: '2022' },
            { value: '2021', label: '2021' },
            { value: '2020', label: '2020' },
            { value: '2019', label: '2019' },
          ]}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFilters(prev => ({ ...prev, ano: e.target.value }))}
        />
        
        <Input
          label="Modelo"
          placeholder="Ex: Onix"
          value={filters.modelo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilters(prev => ({ ...prev, modelo: e.target.value }))}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-end mt-6 border-t border-border pt-6">
        {hasActiveFilters && (
          <Button variant="outline" size="md" onClick={handleClear} className="w-full sm:w-auto">
            Limpar Filtros
          </Button>
        )}
        <Button 
          variant="primary"
          size="md"
          loading={loading}
          onClick={handleSearch}
          className="w-full sm:w-auto"
        >
          Buscar Cores
        </Button>
      </div>
    </div>
  );
};

