from pydantic import BaseModel
from typing import List, Optional

# Schemas para o DER
class Brand(BaseModel):
    id_montadora: int
    nome: str

class Year(BaseModel):
    id_ano: int
    ano: int

class Model(BaseModel):
    id_modelo: int
    nome: str
    id_montadora: int

class Color(BaseModel):
    id_cor: int
    nome_cor: str
    codigo_cor: Optional[str] = None
    rgb: str

# Schemas para busca de lojas
class StoreResult(BaseModel):
    name: str
    url: str
    type: str  # 'physical' or 'online'
    address: Optional[str] = None
    phone: Optional[str] = None
    distance_km: Optional[float] = None
    time_min: Optional[float] = None
    ships_to_cep: bool = False
    has_product: bool = False
    product_match: str

class AutomotiveSearchRequest(BaseModel):
    color_name: str
    color_code: str
    car_brand: str
    car_model: str
    car_year: str
    user_cep: Optional[str] = None
    user_lat: Optional[float] = None
    user_lng: Optional[float] = None