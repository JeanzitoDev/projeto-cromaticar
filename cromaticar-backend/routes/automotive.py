from fastapi import APIRouter, HTTPException
from services.scraping_service import AutomotiveScrapingService
from services.location_service import LocationService
from models.schemas import AutomotiveSearchRequest, StoreResult

router = APIRouter(prefix="/api/automotive-search", tags=["Automotive Search"])
scraping_service = AutomotiveScrapingService()
location_service = LocationService()

@router.post("/search-stores", response_model=list[StoreResult])
async def search_automotive_stores(request: AutomotiveSearchRequest):
    """
    Busca lojas de tintas automotivas e autopeças
    """
    try:
        # 1. Obter localização do usuário
        user_location = location_service.get_user_coordinates(
            request.user_cep, 
            request.user_lat, 
            request.user_lng
        )
        
        # 2. Buscar lojas físicas
        physical_stores = scraping_service.search_automotive_stores(
            request.color_name,
            request.car_model,
            user_location
        )
        
        # 3. Buscar lojas online
        online_stores = scraping_service.search_online_stores(
            request.color_code,
            request.car_model,
            request.user_cep or ""
        )
        
        # 4. Calcular distâncias para lojas físicas
        for store in physical_stores:
            if store.get('lat') and store.get('lng') and user_location:
                distance_info = location_service.calculate_distance_haversine(
                    user_location["lat"], user_location["lng"],
                    store["lat"], store["lng"]
                )
                store.update(distance_info)
        
        # 5. Combinar e formatar resultados
        results = []
        
        # Lojas físicas
        for store in physical_stores:
            results.append(StoreResult(
                name=store["name"],
                url=store["url"],
                type="physical",
                address=store.get("address"),
                phone=store.get("phone"),
                distance_km=store.get("distance_km"),
                time_min=store.get("time_min"),
                ships_to_cep=False,
                has_product=store["has_product"],
                product_match=store["product_match"]
            ))
        
        # Lojas online
        for store in online_stores:
            results.append(StoreResult(
                name=store["name"],
                url=store["url"],
                type="online",
                ships_to_cep=store["ships_to_cep"],
                has_product=store["has_product"],
                product_match=store["product_match"]
            ))
        
        # 6. Ordenar resultados
        physical_results = [r for r in results if r.type == "physical"]
        online_results = [r for r in results if r.type == "online"]
        
        physical_results.sort(key=lambda x: x.distance_km or float('inf'))
        
        final_results = physical_results + online_results
        
        return final_results[:10]
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro na busca: {str(e)}")

@router.get("/user-location")
async def get_user_location(cep: str = None):
    """Obtém localização por CEP"""
    location = location_service.get_coordinates_from_cep(cep) if cep else None
    
    if location:
        return location
    else:
        raise HTTPException(status_code=404, detail="Localização não encontrada")