import os
import ssl
from sqlalchemy import create_engine, text
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from typing import Optional
import dotenv
from dotenv import load_dotenv

# Carrega variáveis do arquivo .env (se existir) para que os getenv funcionem ao executar
load_dotenv()
class DatabaseConfig:
    """Configuração SIMPLIFICADA - apenas conexão para consultas"""
    
    def __init__(self):
        self._engine = None
        self._async_engine = None
        self._async_session = None
        
    def get_connection_string(self) -> str:
        """Usa apenas DATABASE_URL do ambiente"""
        url = os.getenv('DATABASE_URL')
        if not url:
                raise ValueError(
                    "DATABASE_URL não configurada. Crie um arquivo .env na raiz do backend com\n"
                    "DATABASE_URL=postgresql://user:pass@host:5432/dbname or configure the env var in your environment."
                )
        return url
    
    def get_async_connection_string(self) -> str:
        """Converte para conexão assíncrona"""
        sync_url = self.get_connection_string()
        return sync_url.replace('postgresql://', 'postgresql+asyncpg://', 1)
    
    def init_engines(self):
        """Inicializa os engines de conexão"""
        # Usaremos apenas o driver assíncrono (asyncpg) para evitar dependência de psycopg2
        async_url = self.get_async_connection_string()

        # SSL para Supabase (asyncpg aceita connect_args via SQLAlchemy)
        ssl_context = ssl.create_default_context()
        ssl_context.check_hostname = False
        ssl_context.verify_mode = ssl.CERT_NONE

        self._async_engine = create_async_engine(
            async_url,
            echo=False,  # Desativa logs de queries em produção
            pool_pre_ping=True,
            pool_recycle=300,
            connect_args={"ssl": ssl_context}
        )
        
        # Session factory assíncrona
        self._async_session = sessionmaker(
            self._async_engine,
            class_=AsyncSession,
            expire_on_commit=False
        )
    
    @property
    def engine(self):
        # Mantido por compatibilidade; não cria engine síncrono.
        raise RuntimeError("Engine síncrono não suportado neste ambiente. Use async_engine ou async_session.")
    
    @property
    def async_engine(self):
        if self._async_engine is None:
            self.init_engines()
        return self._async_engine
    
    @property
    def async_session(self):
        if self._async_session is None:
            self.init_engines()
        return self._async_session

# Instância global
db_config = DatabaseConfig()