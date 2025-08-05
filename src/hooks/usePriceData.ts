import { useState, useEffect } from 'react';

interface PriceData {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
}

// Simulación de datos en tiempo real
const generateRandomPrice = (basePrice: number, volatility: number = 0.05): number => {
  const change = (Math.random() - 0.5) * 2 * volatility;
  return basePrice * (1 + change);
};

export const usePriceData = () => {
  const [prices, setPrices] = useState<Record<string, PriceData>>({
    BTC: { symbol: 'BTC', price: 42150.00, change24h: 2.45, volume24h: 28500000000 },
    ETH: { symbol: 'ETH', price: 2650.00, change24h: -1.23, volume24h: 15200000000 },
    BNB: { symbol: 'BNB', price: 245.00, change24h: 3.67, volume24h: 1200000000 },
    ADA: { symbol: 'ADA', price: 0.85, change24h: 5.42, volume24h: 890000000 },
    SOL: { symbol: 'SOL', price: 98.50, change24h: -2.15, volume24h: 2100000000 },
    ALIEN: { symbol: 'ALIEN', price: 0.0045, change24h: 15.67, volume24h: 450000000 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => {
        const newPrices = { ...prevPrices };
        
        Object.keys(newPrices).forEach(symbol => {
          const currentPrice = newPrices[symbol];
          const newPrice = generateRandomPrice(currentPrice.price, 0.02);
          const change = ((newPrice - currentPrice.price) / currentPrice.price) * 100;
          
          newPrices[symbol] = {
            ...currentPrice,
            price: newPrice,
            change24h: currentPrice.change24h + (change * 0.1), // Gradual change
            volume24h: currentPrice.volume24h * (0.95 + Math.random() * 0.1), // Random volume
          };
        });
        
        return newPrices;
      });
    }, 2000); // Actualiza cada 2 segundos

    return () => clearInterval(interval);
  }, []);

  return prices;
};