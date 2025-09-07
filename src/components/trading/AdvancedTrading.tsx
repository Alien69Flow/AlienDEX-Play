import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, BarChart3, Zap, Building, Wheat, DollarSign } from "lucide-react";

const AdvancedTrading = () => {
  const [activePosition, setActivePosition] = useState<string | null>(null);

  const perpetuals = [
    { pair: "BTC/USDT", price: 120500, change: 2.45, volume: "2.8B", funding: 0.01 },
    { pair: "ETH/USDT", price: 4050, change: -1.23, volume: "1.5B", funding: -0.02 },
    { pair: "SOL/USDT", price: 210, change: 3.67, volume: "420M", funding: 0.005 },
  ];

  const futures = [
    { contract: "BTC-MAR25", price: 125000, premium: 4.2, openInterest: "850M" },
    { contract: "ETH-MAR25", price: 4200, premium: 3.8, openInterest: "520M" },
    { contract: "SOL-MAR25", price: 230, premium: 9.5, openInterest: "180M" },
  ];

  const commodities = [
    { symbol: "XAUUSD", name: "Gold", price: 3582.50, change: 1.85, volume: "15.2B", type: "Precious Metal" },
    { symbol: "XAGUSD", name: "Silver", price: 48.20, change: 2.45, volume: "2.8B", type: "Precious Metal" },
    { symbol: "XPDUSD", name: "Palladium", price: 1245.80, change: -1.20, volume: "890M", type: "Precious Metal" },
    { symbol: "XPTUSD", name: "Platinum", price: 965.40, change: 0.85, volume: "1.2B", type: "Precious Metal" },
    { symbol: "WTIUSD", name: "Crude Oil WTI", price: 79.45, change: -0.65, volume: "8.9B", type: "Energy" },
    { symbol: "BRUSD", name: "Brent Oil", price: 82.80, change: -0.45, volume: "7.8B", type: "Energy" },
    { symbol: "NGASUSD", name: "Natural Gas", price: 3.52, change: 3.45, volume: "2.1B", type: "Energy" },
    { symbol: "WHTUSD", name: "Wheat", price: 548.90, change: 1.75, volume: "950M", type: "Agriculture" },
    { symbol: "CORNUSD", name: "Corn", price: 435.20, change: -0.95, volume: "720M", type: "Agriculture" },
    { symbol: "COFUSD", name: "Coffee", price: 248.10, change: 3.15, volume: "480M", type: "Agriculture" },
    { symbol: "COCUSD", name: "Cocoa", price: 3875.60, change: 4.85, volume: "420M", type: "Agriculture" },
    { symbol: "SOYUSD", name: "Soybeans", price: 1385.40, change: 1.25, volume: "680M", type: "Agriculture" },
    { symbol: "SUGUSD", name: "Sugar", price: 21.45, change: 2.10, volume: "350M", type: "Agriculture" },
    { symbol: "COTUSD", name: "Cotton", price: 78.25, change: -0.80, volume: "280M", type: "Agriculture" }
  ];

  const tokenizedAssets = [
    { symbol: "AAPL", name: "Apple Inc.", price: 189.30, change: -0.65, type: "Stock" },
    { symbol: "AMZN", name: "Amazon Inc.", price: 178.90, change: -0.45, type: "Stock" },
    { symbol: "GOOGL", name: "Alphabet Inc.", price: 165.80, change: 2.40, type: "Stock" },
    { symbol: "META", name: "Meta Platforms", price: 485.20, change: 1.95, type: "Stock" },
    { symbol: "MSFT", name: "Microsoft Corp.", price: 425.60, change: 1.20, type: "Stock" },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 890.40, change: 3.85, type: "Stock" },
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: 1.85, type: "Stock" },
    { symbol: "NFLX", name: "Netflix Inc.", price: 612.80, change: 0.75, type: "Stock" },
    { symbol: "AMD", name: "AMD Inc.", price: 148.90, change: 2.15, type: "Stock" },
    { symbol: "CRM", name: "Salesforce Inc.", price: 285.40, change: -1.05, type: "Stock" },
    { symbol: "ORCL", name: "Oracle Corp.", price: 142.60, change: 0.95, type: "Stock" },
    { symbol: "QQQ", name: "NASDAQ 100 ETF", price: 405.20, change: 1.45, type: "ETF" },
    { symbol: "SPY", name: "S&P 500 ETF", price: 512.80, change: 0.85, type: "ETF" },
    { symbol: "VTI", name: "Vanguard Total Stock", price: 268.90, change: 0.75, type: "ETF" },
    { symbol: "IWM", name: "Russell 2000 ETF", price: 225.40, change: 1.25, type: "ETF" },
    { symbol: "EFA", name: "MSCI EAFE ETF", price: 78.60, change: 0.55, type: "ETF" }
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="perpetuals" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Advanced Trading</CardTitle>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="commodities" className="flex items-center gap-2">
                <Wheat size={16} />
                Commodities
              </TabsTrigger>
              <TabsTrigger value="futures" className="flex items-center gap-2">
                <BarChart3 size={16} />
                Futures
              </TabsTrigger>
              <TabsTrigger value="perpetuals" className="flex items-center gap-2">
                <Zap size={16} />
                Perpetuals
              </TabsTrigger>
              <TabsTrigger value="tokenized" className="flex items-center gap-2">
                <Building size={16} />
                Tokenized Assets
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="perpetuals" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Perpetual Contracts</h3>
                {perpetuals.map((perp, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{perp.pair}</h4>
                          <Badge variant={perp.funding >= 0 ? "default" : "destructive"} className="text-xs">
                            Funding: {perp.funding > 0 ? "+" : ""}{perp.funding}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${perp.price.toLocaleString()}</p>
                          <p className={`text-sm font-medium ${perp.change >= 0 ? "text-primary" : "text-destructive"}`}>
                            {perp.change >= 0 ? "+" : ""}{perp.change}%
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-3">
                        <span>24h Volume: {perp.volume}</span>
                        <span>Next Funding: 02:45:12</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Long
                        </Button>
                        <Button variant="destructive">
                          Short
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="futures" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Futures Contracts</h3>
                {futures.map((future, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{future.contract}</h4>
                          <Badge className="text-xs">
                            Premium: {future.premium}%
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${future.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">
                            Open Interest: {future.openInterest}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Buy Future
                        </Button>
                        <Button variant="outline">
                          Sell Future
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tokenized" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Tokenized Assets</h3>
                {tokenizedAssets.map((asset, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{asset.symbol}</h4>
                          <p className="text-sm text-muted-foreground">{asset.name}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {asset.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${asset.price}</p>
                          <p className={`text-sm font-medium ${asset.change >= 0 ? "text-primary" : "text-destructive"}`}>
                            {asset.change >= 0 ? "+" : ""}{asset.change}%
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Buy
                        </Button>
                        <Button variant="outline">
                          Sell
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="commodities" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Commodity Trading</h3>
                {commodities.map((commodity, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <h4 className="font-bold text-lg">{commodity.name}</h4>
                          <p className="text-sm text-muted-foreground">{commodity.symbol}</p>
                          <Badge variant="secondary" className="text-xs mt-1">
                            {commodity.type}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold">${commodity.price}</p>
                          <p className={`text-sm font-medium ${commodity.change >= 0 ? "text-primary" : "text-destructive"}`}>
                            {commodity.change >= 0 ? "+" : ""}{commodity.change}%
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground mb-3">
                        <span>24h Volume: {commodity.volume}</span>
                        <span>Market: Open</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Buy
                        </Button>
                        <Button variant="outline">
                          Sell
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdvancedTrading;