from fastapi import APIRouter, HTTPException
from models.schemas import Brand, Year, Model, Color

router = APIRouter(prefix="/api", tags=["Colors"])

@router.get("/brands", response_model=list[Brand])
async def get_brands():
    """Retorna todas as montadoras - CONSULTA"""
    try:
        from services.database_service import database_service
        result = await database_service.fetch_all(
            "SELECT id_montadora, nome FROM montadora ORDER BY nome"
        )
        
        brands = [
            Brand(id_montadora=row[0], nome=row[1]) 
            for row in result
        ]
        
        return brands
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar montadoras: {str(e)}")

@router.get("/brands/{brand_id}/years", response_model=list[Year])
async def get_years_by_brand(brand_id: int):
    """Retorna anos disponíveis para uma montadora - CONSULTA"""
    try:
        from services.database_service import database_service
        result = await database_service.fetch_all('''
            SELECT DISTINCT a.id_ano, a.ano
            FROM modelo_ano_cor mac
            JOIN modelo m ON mac.id_modelo = m.id_modelo
            JOIN ano a ON mac.id_ano = a.id_ano
            WHERE m.id_montadora = $1
            ORDER BY a.ano DESC
        ''', {"1": brand_id})
        
        years = [
            Year(id_ano=row[0], ano=row[1]) 
            for row in result
        ]
        
        if not years:
            raise HTTPException(status_code=404, detail="Nenhum ano encontrado para esta montadora")
        
        return years
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar anos: {str(e)}")

@router.get("/brands/{brand_id}/years/{year_id}/models", response_model=list[Model])
async def get_models_by_brand_and_year(brand_id: int, year_id: int):
    """Retorna modelos disponíveis para montadora e ano - CONSULTA"""
    try:
        from services.database_service import database_service
        result = await database_service.fetch_all('''
            SELECT DISTINCT m.id_modelo, m.nome, m.id_montadora
            FROM modelo_ano_cor mac
            JOIN modelo m ON mac.id_modelo = m.id_modelo
            WHERE m.id_montadora = $1 AND mac.id_ano = $2
            ORDER BY m.nome
        ''', {"1": brand_id, "2": year_id})
        
        models = [
            Model(id_modelo=row[0], nome=row[1], id_montadora=row[2])
            for row in result
        ]
        
        if not models:
            raise HTTPException(status_code=404, detail="Nenhum modelo encontrado para esta combinação")
        
        return models
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar modelos: {str(e)}")

@router.get("/models/{model_id}/years/{year_id}/colors", response_model=list[Color])
async def get_colors_by_model_and_year(model_id: int, year_id: int):
    """Retorna cores disponíveis para modelo e ano - CONSULTA"""
    try:
        from services.database_service import database_service
        result = await database_service.fetch_all('''
            SELECT c.id_cor, c.nome_cor, c.codigo_cor, c.rgb
            FROM modelo_ano_cor mac
            JOIN cor c ON mac.id_cor = c.id_cor
            WHERE mac.id_modelo = $1 AND mac.id_ano = $2
            ORDER BY c.nome_cor
        ''', {"1": model_id, "2": year_id})
        
        colors = [
            Color(id_cor=row[0], nome_cor=row[1], codigo_cor=row[2], rgb=row[3])
            for row in result
        ]
        
        if not colors:
            raise HTTPException(status_code=404, detail="Nenhuma cor encontrada para este modelo/ano")
        
        return colors
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar cores: {str(e)}")