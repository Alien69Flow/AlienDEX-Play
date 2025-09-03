import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, GitBranch, DollarSign, Clock, Repeat } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdvancedSwap = () => {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [limitPrice, setLimitPrice] = useState("");
  const [activeSwapTab, setActiveSwapTab] = useState("instant");
  const { toast } = useToast();

  const tokens = [
    { symbol: "ETH", name: "Ethereum", price: 4050 },
    { symbol: "BTC", name: "Bitcoin", price: 120500 },
    { symbol: "USDC", name: "USD Coin", price: 1 },
    { symbol: "USDT", name: "Tether", price: 1 },
    { symbol: "BNB", name: "Binance Coin", price: 820 },
    { symbol: "ADA", name: "Cardano", price: 0.95 },
    { symbol: "SOL", name: "Solana", price: 210 },
  ];

  const handleSwap = () => {
    toast({
      title: `${activeSwapTab === 'instant' ? 'Instant Swap' : activeSwapTab === 'limit' ? 'Limit Order' : 'Buy Order'} Initiated`,
      description: `${activeSwapTab} order for ${fromAmount} ${fromToken}`,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-foreground">Advanced Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeSwapTab} onValueChange={setActiveSwapTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="bridge" className="flex items-center gap-2">
                <GitBranch size={16} />
                <span>Bridge</span>
              </TabsTrigger>
              <TabsTrigger value="fiat" className="flex items-center gap-2">
                <DollarSign size={16} />
                <span>Buy/Sell</span>
              </TabsTrigger>
              <TabsTrigger value="instant" className="flex items-center gap-2">
                <ArrowDownUp size={16} />
                <span>Instant</span>
              </TabsTrigger>
              <TabsTrigger value="limit" className="flex items-center gap-2">
                <Clock size={16} />
                <span>Limit</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="instant" className="space-y-6">
              {/* Instant Swap Interface */}
              <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
                <label className="text-sm text-muted-foreground font-medium">From</label>
                <div className="flex gap-3 mt-3">
                  <Select value={fromToken} onValueChange={setFromToken}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="0.0"
                    value={fromAmount}
                    onChange={(e) => setFromAmount(e.target.value)}
                    className="flex-1 text-xl font-bold text-right"
                  />
                </div>
              </div>

              <div className="flex justify-center">
                <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
                  <ArrowDownUp size={20} />
                </Button>
              </div>

              <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
                <label className="text-sm text-muted-foreground font-medium">To</label>
                <div className="flex gap-3 mt-3">
                  <Select value={toToken} onValueChange={setToToken}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tokens.map((token) => (
                        <SelectItem key={token.symbol} value={token.symbol}>
                          {token.symbol}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="0.0"
                    value={toAmount}
                    onChange={(e) => setToAmount(e.target.value)}
                    className="flex-1 text-xl font-bold text-right"
                  />
                </div>
              </div>

              {/* Slippage Settings */}
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <span className="text-sm">Slippage Tolerance</span>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs">0.1%</Button>
                  <Button variant="outline" size="sm" className="text-xs">0.5%</Button>
                  <Button variant="outline" size="sm" className="text-xs bg-primary text-primary-foreground">1.0%</Button>
                  <Button variant="outline" size="sm" className="text-xs">2.0%</Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="limit" className="space-y-6">
              {/* Limit Order Interface */}
              <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
                <label className="text-sm text-muted-foreground font-medium">Limit Price</label>
                <Input
                  placeholder="Enter limit price"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  className="mt-3 text-xl font-bold"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
                  <label className="text-sm text-muted-foreground font-medium">Sell</label>
                  <div className="flex gap-3 mt-3">
                    <Select value={fromToken} onValueChange={setFromToken}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="0.0"
                      value={fromAmount}
                      onChange={(e) => setFromAmount(e.target.value)}
                      className="text-right font-bold"
                    />
                  </div>
                </div>
                <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
                  <label className="text-sm text-muted-foreground font-medium">Buy</label>
                  <div className="flex gap-3 mt-3">
                    <Select value={toToken} onValueChange={setToToken}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tokens.map((token) => (
                          <SelectItem key={token.symbol} value={token.symbol}>
                            {token.symbol}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="0.0"
                      value={toAmount}
                      onChange={(e) => setToAmount(e.target.value)}
                      className="text-right font-bold"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="fiat" className="space-y-6">
              {/* Fiat Buy/Sell Interface */}
              <div className="text-center p-6 rounded-2xl border border-primary/20 bg-muted/30">
                <DollarSign className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Buy & Sell with Fiat</h3>
                <p className="text-muted-foreground mb-4">
                  Purchase crypto directly with credit card, bank transfer, or sell crypto to your bank account
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-14 text-lg font-bold">
                    Buy Crypto
                  </Button>
                  <Button variant="outline" className="h-14 text-lg font-bold">
                    Sell Crypto
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bridge" className="space-y-6">
              {/* Bridge Interface */}
              <div className="text-center p-6 rounded-2xl border border-primary/20 bg-muted/30">
                <GitBranch className="mx-auto mb-4 text-primary" size={48} />
                <h3 className="text-xl font-bold mb-2">Cross-Chain Bridge</h3>
                <p className="text-muted-foreground mb-4">
                  Transfer tokens between different blockchains seamlessly
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground font-medium">From Chain</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground font-medium">To Chain</label>
                    <Select>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select chain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ethereum">Ethereum</SelectItem>
                        <SelectItem value="bsc">Binance Smart Chain</SelectItem>
                        <SelectItem value="polygon">Polygon</SelectItem>
                        <SelectItem value="arbitrum">Arbitrum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </TabsContent>

            <Button
              onClick={handleSwap}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground mt-6"
            >
              {activeSwapTab === 'instant' ? 'Swap Tokens' : 
               activeSwapTab === 'limit' ? 'Place Limit Order' :
               activeSwapTab === 'fiat' ? 'Continue to Payment' : 'Start Bridge'}
            </Button>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedSwap;