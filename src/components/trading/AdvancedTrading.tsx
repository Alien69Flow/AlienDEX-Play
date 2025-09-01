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

  const tokenizedAssets = [
    { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: 1.85, type: "Stock" },
    { symbol: "AAPL", name: "Apple Inc.", price: 189.30, change: -0.65, type: "Stock" },
    { symbol: "GOLD", name: "Gold Futures", price: 2040.80, change: 0.92, type: "Commodity" },
    { symbol: "CRUDE", name: "Crude Oil", price: 78.45, change: 2.15, type: "Commodity" },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="perpetuals" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Advanced Trading</CardTitle>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="perpetuals" className="flex items-center gap-2">
                <Zap size={16} />
                Perpetuals
              </TabsTrigger>
              <TabsTrigger value="futures" className="flex items-center gap-2">
                <BarChart3 size={16} />
                Futures
              </TabsTrigger>
              <TabsTrigger value="tokenized" className="flex items-center gap-2">
                <Building size={16} />
                Tokenized Assets
              </TabsTrigger>
              <TabsTrigger value="commodities" className="flex items-center gap-2">
                <Wheat size={16} />
                Commodities
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
              <div className="text-center p-8 rounded-2xl border border-primary/20 bg-muted/30">
                <Wheat className="mx-auto mb-4 text-primary" size={64} />
                <h3 className="text-2xl font-bold mb-4">Commodity Trading</h3>
                <p className="text-muted-foreground mb-6">
                  Trade tokenized commodities including precious metals, energy, and agricultural products
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <DollarSign size={24} />
                    <span>Gold</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <DollarSign size={24} />
                    <span>Silver</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <DollarSign size={24} />
                    <span>Oil</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex flex-col gap-2">
                    <Wheat size={24} />
                    <span>Wheat</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default AdvancedTrading;