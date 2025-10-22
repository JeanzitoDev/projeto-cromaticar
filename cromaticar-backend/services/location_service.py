import requests
import re
from typing import List, Dict, Optional
import math

class LocationService:
    def __init__(self):
        self.osrm_url = "http://router.project-osrm.org/route/v1/driving/"
    
    def get_coordinates_from_cep(self, cep: str) -> Optional[Dict]:
        """Converte CEP em coordenadas usando API ViaCEP"""
        try:
            cep_clean = re.sub(r'\D', '', cep)
            response = requests.get(f'https://viacep.com.br/ws/{cep_clean}/json/')
            data = response.json()
            
            if 'erro' not in data:
                # Geocoding simples - em produção usar Google Maps API
                return {
                    "lat": -23.5505,  # São Paulo como fallback
                    "lng": -46.6333,
                    "city": data.get('localidade', ''),
                    "state": data.get('uf', ''),
                    "cep": cep
                }
        except Exception as e:
            print(f"Erro geocoding CEP {cep}: {e}")
        
        return None
    
    def calculate_distance_osrm(self, origin_lat: float, origin_lng: float, 
                              dest_lat: float, dest_lng: float) -> Optional[Dict]:
        """Calcula distância e tempo usando OSRM"""
        try:
            origin = f"{origin_lng},{origin_lat}"
            destination = f"{dest_lng},{dest_lat}"
            
            url = f"{self.osrm_url}{origin};{destination}?overview=false"
            response = requests.get(url, timeout=10)
            data = response.json()
            
            if data.get('code') == 'Ok' and data['routes']:
                route = data['routes'][0]
                return {
                    "distance_km": round(route['distance'] / 1000, 1),
                    "time_min": round(route['duration'] / 60, 1)
                }
                
        except Exception as e:
            print(f"Erro OSRM: {e}")
            
        return None
    
    def calculate_distance_haversine(self, lat1: float, lon1: float, 
                                   lat2: float, lon2: float) -> Dict:
        """Calcula distância em linha reta usando fórmula de Haversine"""
        R = 6371  # Raio da Terra em km
        
        dlat = math.radians(lat2 - lat1)
        dlon = math.radians(lon2 - lon1)
        
        a = (math.sin(dlat/2) * math.sin(dlat/2) + 
             math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * 
             math.sin(dlon/2) * math.sin(dlon/2))
        
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
        distance = R * c
        
        # Estimativa de tempo (60 km/h em área urbana)
        time_min = (distance / 60) * 60
        
        return {
            "distance_km": round(distance, 1),
            "time_min": round(time_min, 1)
        }
    
    def get_user_coordinates(self, cep: Optional[str] = None, 
                           lat: Optional[float] = None, 
                           lng: Optional[float] = None) -> Optional[Dict]:
        """Obtém coordenadas do usuário por CEP ou lat/lng"""
        if lat and lng:
            return {"lat": lat, "lng": lng}
        elif cep:
            return self.get_coordinates_from_cep(cep)
        else:
            # Fallback para São Paulo
            return {"lat": -23.5505, "lng": -46.6333, "city": "São Paulo"}