import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { automotiveService } from '@/services/api';

interface StoreResult {
  name: string;
  url: string;
  type: 'physical' | 'online';
  address?: string;
  phone?: string;
  distance_km?: number;
  time_min?: number;
  ships_to_cep: boolean;
  has_product: boolean;
  product_match: string;
}

interface AutomotiveStoresProps {
  colorName: string;
  colorCode: string;
  carBrand: string;
  carModel: string;
  carYear: string;
}

export const AutomotiveStores: React.FC<AutomotiveStoresProps> = ({
  colorName,
  colorCode,
  carBrand,
  carModel,
  carYear
}) => {
  const [stores, setStores] = useState<StoreResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showStores, setShowStores] = useState(false);

  const handleSearchStores = async () => {
    setLoading(true);
    try {
      const results = await automotiveService.searchStores({
        color_name: colorName,
        color_code: colorCode,
        car_brand: carBrand,
        car_model: carModel,
        car_year: carYear,
        user_cep: '' // Pode capturar do usuário depois
      });

      setStores(results);
      setShowStores(true);
    } catch (error) {
      console.error('Erro na busca de lojas:', error);
      alert('Erro ao buscar lojas. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (!showStores) {
    return (
      <div className="search-stores-section">
        <div className="section-header">
          <h3>Encontrar Tintas e Peças</h3>
          <p>Busque lojas que vendem esta cor e autopeças para seu veículo</p>
        </div>
        
        <div className="text-center">
          <Button 
            variant="primary" 
            onClick={handleSearchStores}
            loading={loading}
            className="mb-4"
          >
            🎨 Buscar Lojas de Tintas
          </Button>
          <p className="text-sm text-text-secondary">
            Encontre lojas físicas próximas e sites que entregam na sua região
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-stores-section">
      <div className="section-header">
        <h3>Lojas Encontradas</h3>
        <p>{stores.length} resultados para "{colorName}" - {carModel}</p>
      </div>

      <div className="stores-grid">
        {stores.map((store, index) => (
          <div key={index} className="store-card">
            <div className="store-header">
              <h4 className="store-name">{store.name}</h4>
              <span className={`store-type ${store.type}`}>
                {store.type === 'physical' ? '🏪 Física' : '🛒 Online'}
              </span>
            </div>

            <div className="store-info">
              {store.distance_km && (
                <div className="store-distance">
                  📍 {store.distance_km} km • ⏱️ {store.time_min} min
                </div>
              )}
              
              {store.address && (
                <div className="store-address">
                  {store.address}
                </div>
              )}
              
              {store.phone && (
                <div className="store-phone">
                  📞 {store.phone}
                </div>
              )}
              
              {store.type === 'online' && store.ships_to_cep && (
                <div className="store-shipping">
                  🚚 Entrega disponível
                </div>
              )}
            </div>

            <div className="store-product">
              <span className={`product-match ${store.has_product ? 'available' : 'maybe'}`}>
                {store.has_product ? '✅ Provavelmente tem' : '🟡 Pode ter'}
              </span>
              <span className="product-details">{store.product_match}</span>
            </div>

            <div className="store-actions">
              <a 
                href={store.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline btn-sm"
              >
                Visitar Site
              </a>
              
              {store.type === 'physical' && store.distance_km && (
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.address || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm"
                >
                  🗺️ Ver Rota
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <Button 
          variant="outline" 
          onClick={() => setShowStores(false)}
        >
          Nova Busca
        </Button>
      </div>
    </div>
  );
};