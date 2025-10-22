from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
import logging

from config.database import db_config
from services.database_service import database_service
from routes.colors import router as colors_router
from routes.automotive import router as automotive_router  # ← ESTAVA FALTANDO!

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("🚀 Iniciando Cromaticar API...")
    
    try:
        # Testar conexão com banco
        if await database_service.test_connection():
            logger.info("✅ Conectado ao Supabase")
            
            # Verificar se temos dados
            result = await database_service.fetch_one("SELECT COUNT(*) FROM montadora")
            logger.info(f"📊 Montadoras no banco: {result[0]}")
            
        else:
            logger.error("❌ Não foi possível conectar ao Supabase")
            logger.info(f"💡 DATABASE_URL: {os.getenv('DATABASE_URL', 'Não configurada')}")
            
    except Exception as e:
        logger.error(f"❌ Erro na inicialização: {e}")
    
    yield
    
    # Shutdown
    logger.info("👋 Encerrando Cromaticar API...")

app = FastAPI(
    title="Cromaticar API",
    description="Sistema de identificação de cores automotivas - Supabase",
    version="2.0.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Incluir rotas (AGORA COMPLETO)
app.include_router(colors_router)
app.include_router(automotive_router)  # ← AGORA INCLUÍDO!

@app.get("/")
async def root():
    return {
        "message": "Cromaticar API - Supabase",
        "status": "online",
        "database": "Supabase PostgreSQL",
        "endpoints": {
            "colors": "/api/brands",
            "automotive_search": "/api/automotive-search/search-stores"
        }
    }

@app.get("/health")
async def health_check():
    """Health check completo"""
    try:
        db_healthy = await database_service.test_connection()
        
        brands_count = 0
        if db_healthy:
            result = await database_service.fetch_one("SELECT COUNT(*) FROM montadora")
            brands_count = result[0] if result else 0
        
        return {
            "status": "healthy" if db_healthy else "degraded",
            "database": {
                "connected": db_healthy,
                "brands_count": brands_count
            },
            "service": "cromaticar-api"
        }
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    debug = os.getenv("DEBUG", "false").lower() == "true"
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=port,
        reload=debug
    )