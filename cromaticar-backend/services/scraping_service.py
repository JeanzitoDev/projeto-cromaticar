import requests
from bs4 import BeautifulSoup
from googlesearch import search
import time
import re
from typing import List, Dict, Optional
import random

class AutomotiveScrapingService:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
    
    def search_automotive_stores(self, color_name: str, car_model: str, location: Optional[Dict] = None) -> List[Dict]:
        """Busca lojas físicas de tintas automotivas"""
        base_queries = [
            f'loja tinta automotiva "{color_name}" "{car_model}"',
            f'pintura automotiva "{car_model}" loja',
            f'tinta "{color_name}" automóvel "{car_model}"',
        ]
        
        if location and location.get('city'):
            queries = [f'{q} {location["city"]}' for q in base_queries]
        else:
            queries = base_queries
        
        all_stores = []
        
        for query in queries:
            try:
                stores = self._search_google_stores(query, color_name, car_model, location)
                all_stores.extend(stores)
                time.sleep(1)
            except Exception as e:
                print(f"Erro na busca: {query} - {e}")
        
        # Remove duplicatas
        seen_urls = set()
        unique_stores = []
        
        for store in all_stores:
            if store['url'] not in seen_urls:
                seen_urls.add(store['url'])
                unique_stores.append(store)
        
        return unique_stores[:8]
    
    def _search_google_stores(self, query: str, color_name: str, car_model: str, location: Optional[Dict]) -> List[Dict]:
        """Busca específica no Google"""
        stores = []
        
        try:
            for url in search(query, num_results=3, lang='pt-br'):
                store_data = self.extract_store_info(url, color_name, car_model)
                if store_data:
                    if location:
                        store_data.update({
                            "lat": location["lat"] + random.uniform(-0.05, 0.05),
                            "lng": location["lng"] + random.uniform(-0.05, 0.05)
                        })
                    stores.append(store_data)
                    
        except Exception as e:
            print(f"Erro Google search: {e}")
            
        return stores
    
    def extract_store_info(self, url: str, color_name: str, car_model: str) -> Optional[Dict]:
        """Extrai informações da loja física"""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            store_name = self._extract_store_name(soup, url)
            address = self._extract_address(soup)
            phone = self._extract_phone(soup)
            
            has_product = self._check_product_availability(soup, color_name, car_model)
            
            if store_name:
                return {
                    "name": store_name,
                    "url": url,
                    "address": address,
                    "phone": phone,
                    "has_product": has_product,
                    "product_match": f"{color_name} - {car_model}",
                    "type": "physical"
                }
                
        except Exception as e:
            print(f"Erro scraping {url}: {e}")
            
        return None
    
    def search_online_stores(self, color_code: str, car_model: str, user_cep: str = None) -> List[Dict]:
        """Busca lojas online"""
        queries = [
            f'comprar tinta automotiva "{color_code}" "{car_model}" online',
            f'tinta "{color_code}" "{car_model}" venda online',
        ]
        
        all_stores = []
        
        for query in queries:
            try:
                stores = self._search_google_online(query, color_code, car_model, user_cep)
                all_stores.extend(stores)
                time.sleep(1)
            except Exception as e:
                print(f"Erro busca online: {query} - {e}")
        
        # Remove duplicatas
        seen_urls = set()
        unique_stores = []
        
        for store in all_stores:
            if store['url'] not in seen_urls:
                seen_urls.add(store['url'])
                unique_stores.append(store)
        
        return unique_stores[:6]
    
    def _search_google_online(self, query: str, color_code: str, car_model: str, user_cep: str) -> List[Dict]:
        """Busca específica para lojas online"""
        stores = []
        
        try:
            for url in search(query, num_results=3, lang='pt-br'):
                store_data = self.extract_online_store_info(url, color_code, car_model, user_cep)
                if store_data:
                    stores.append(store_data)
                    
        except Exception as e:
            print(f"Erro Google online: {e}")
            
        return stores
    
    def extract_online_store_info(self, url: str, color_code: str, car_model: str, cep: str) -> Optional[Dict]:
        """Extrai informações de lojas online"""
        try:
            response = requests.get(url, headers=self.headers, timeout=10)
            soup = BeautifulSoup(response.content, 'html.parser')
            
            store_name = self._extract_store_name(soup, url)
            ships_to_cep = self._check_shipping(soup, cep)
            has_product = self._check_product_availability(soup, color_code, car_model)
            
            if store_name and (has_product or ships_to_cep):
                return {
                    "name": store_name,
                    "url": url,
                    "type": "online",
                    "ships_to_cep": ships_to_cep,
                    "has_product": has_product,
                    "product_match": f"{color_code} - {car_model}"
                }
                
        except Exception as e:
            print(f"Erro scraping online {url}: {e}")
            
        return None
    
    def _extract_store_name(self, soup, url: str) -> str:
        """Extrai nome da loja"""
        title = soup.find('title')
        if title:
            name = title.get_text().split(' - ')[0].split(' | ')[0]
            if len(name) > 3 and len(name) < 50:
                return name.strip()
        
        meta_name = soup.find('meta', property='og:site_name')
        if meta_name and meta_name.get('content'):
            return meta_name.get('content').strip()
            
        domain = url.split('//')[-1].split('/')[0]
        return domain.replace('www.', '').split('.')[0].title()
    
    def _extract_address(self, soup) -> str:
        """Extrai endereço do site"""
        text = soup.get_text()
        
        address_patterns = [
            r'Rua\s+[\w\s]+\s*,\s*\d+[\s\w]*,\s*[\w\s]+-\s*[\w\s]+,?\s*CEP?\s*\d{5}-?\d{3}',
            r'Av\.?\s+[\w\s]+\s*,\s*\d+[\s\w]*,\s*[\w\s]+-\s*[\w\s]+,?\s*CEP?\s*\d{5}-?\d{3}',
        ]
        
        for pattern in address_patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return match.group().strip()
                
        return ""
    
    def _extract_phone(self, soup) -> str:
        """Extrai telefone do site"""
        text = soup.get_text()
        
        phone_patterns = [
            r'\(?\d{2}\)?\s?\d{4,5}-\d{4}',
            r'\(?\d{2}\)?\s?\d{5}-\d{4}',
        ]
        
        for pattern in phone_patterns:
            matches = re.findall(pattern, text)
            if matches:
                return matches[0]
                
        return ""
    
    def _check_product_availability(self, soup, color_name: str, car_model: str) -> bool:
        """Verifica se o site menciona o produto"""
        text = soup.get_text().lower()
        color_lower = color_name.lower()
        model_lower = car_model.lower()
        
        color_mentions = color_lower in text
        model_mentions = model_lower in text
        
        keywords = ['tinta', 'automotiva', 'pintura', 'cor', 'color', 'verniz']
        has_keywords = any(keyword in text for keyword in keywords)
        
        return (color_mentions or model_mentions) and has_keywords
    
    def _check_shipping(self, soup, cep: str) -> bool:
        """Verifica se entrega no CEP"""
        text = soup.get_text().lower()
        
        shipping_keywords = [
            'entregamos', 'frete', 'envio', 'entrega', 'shipping', 'enviamos',
            'todo brasil', 'todo o país', 'nacional'
        ]
        
        return any(keyword in text for keyword in shipping_keywords)