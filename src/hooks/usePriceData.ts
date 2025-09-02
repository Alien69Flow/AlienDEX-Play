import { useState, useEffect } from 'react';
import axios from 'axios';

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

// Mapeo de symbols para CoinGecko API
const COINGECKO_IDS = {
  ATOM: 'cosmos',
  BTC: 'bitcoin',
  ETH: 'ethereum', 
  BNB: 'binancecoin',
  ADA: 'cardano',
  SOL: 'solana',
  TAO: 'bittensor',
  INJ: 'injective-protocol',
  POL: 'polymath',
  XAUT: 'tether-gold',
  ALIEN: 'alien-token' // Placeholder - usar el ID real de ALIEN token
};

export const usePriceData = () => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({
    ATOM: { symbol: 'ATOM', price: 8.50, change24h: 3.25, volume24h: 125000000 },
    BTC: { symbol: 'BTC', price: 120500.00, change24h: 2.45, volume24h: 28500000000 },
    ETH: { symbol: 'ETH', price: 4050.00, change24h: -1.23, volume24h: 15200000000 },
    BNB: { symbol: 'BNB', price: 820.00, change24h: 3.67, volume24h: 1200000000 },
    ADA: { symbol: 'ADA', price: 0.95, change24h: 5.42, volume24h: 890000000 },
    SOL: { symbol: 'SOL', price: 210.00, change24h: -2.15, volume24h: 2100000000 },
    TAO: { symbol: 'TAO', price: 450.00, change24h: 8.75, volume24h: 89000000 },
    INJ: { symbol: 'INJ', price: 32.50, change24h: -2.15, volume24h: 67000000 },
    POL: { symbol: 'POL', price: 0.85, change24h: 1.85, volume24h: 45000000 },
    XAUT: { symbol: 'XAUT', price: 2040.50, change24h: 0.25, volume24h: 25000000 },
    ALIEN: { symbol: 'ALIEN', price: 69.00, change24h: 15.67, volume24h: 450000000 },
  });

  const fetchRealPrices = async () => {
    try {
      const ids = Object.values(COINGECKO_IDS).filter(id => id !== 'alien-token').join(',');
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`,
        {
          headers: {
            'Accept': 'application/json',
          },
          timeout: 10000,
        }
      );

      const newPrices: Record<string, PriceData> = {};
      
      Object.entries(COINGECKO_IDS).forEach(([symbol, id]) => {
        if (id === 'alien-token') {
          // Mantener ALIEN con precio fijo y simulación
          newPrices[symbol] = {
            symbol,
            price: 69.00 + (Math.random() - 0.5) * 2,
            change24h: 15.67 + (Math.random() - 0.5) * 5,
            volume24h: 450000000 * (0.9 + Math.random() * 0.2)
          };
        } else {
          const data = response.data[id];
          if (data) {
            newPrices[symbol] = {
              symbol,
              price: data.usd,
              change24h: data.usd_24h_change || 0,
              volume24h: data.usd_24h_vol || 0
            };
          }
        }
      });

      setPrices(newPrices);
    } catch (error) {
      console.error('Error fetching real prices:', error);
      // Mantener precios simulados si falla la API
    }
  };

  useEffect(() => {
    // Obtener precios reales al inicio
    fetchRealPrices();
    
    // Actualizar cada 30 segundos para evitar rate limits
    const interval = setInterval(fetchRealPrices, 30000);

    return () => clearInterval(interval);
  }, []);

  return prices;
};