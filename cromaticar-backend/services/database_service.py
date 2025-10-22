from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from typing import List, Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class DatabaseService:
    """Serviço SIMPLIFICADO - apenas consultas"""
    
    def __init__(self, db_config):
        self.db_config = db_config
    
    async def test_connection(self) -> bool:
        """Testa a conexão com o banco"""
        try:
            async with self.db_config.async_engine.connect() as conn:
                result = await conn.execute(text("SELECT 1"))
                return result.scalar() == 1
        except ModuleNotFoundError as e:
            # Erro comum em ambientes sem o driver asyncpg instalado
            logger.error(
                "Erro na conexão com o banco: driver async não encontrado.\n"
                "Instale as dependências: python -m pip install asyncpg\n"
                "ou: python -m pip install -r requirements.txt"
            )
            return False
        except Exception as e:
            logger.error(f"Erro na conexão com o banco: {e}")
            return False
    
    async def fetch_all(self, query: str, params: Dict = None) -> List[Any]:
        """Busca todos os resultados - PARA CONSULTAS"""
        try:
            async with self.db_config.async_engine.connect() as conn:
                result = await conn.execute(text(query), params or {})
                return result.fetchall()
        except Exception as e:
            logger.error(f"Erro buscando dados: {e}")
            raise
    
    async def fetch_one(self, query: str, params: Dict = None) -> Optional[Any]:
        """Busca um único resultado - PARA CONSULTAS"""
        try:
            async with self.db_config.async_engine.connect() as conn:
                result = await conn.execute(text(query), params or {})
                return result.fetchone()
        except Exception as e:
            logger.error(f"Erro buscando um registro: {e}")
            raise

# Instância global
from config.database import db_config
database_service = DatabaseService(db_config)