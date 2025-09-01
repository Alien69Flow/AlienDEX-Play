import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { usePriceData } from "@/hooks/usePriceData";
const SwapInterface = () => {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const { toast } = useToast();
  const priceData = usePriceData();
  const tokens = [
    { symbol: "ETH", name: "Ethereum", price: 2500 },
    { symbol: "BTC", name: "Bitcoin", price: 45000 },
    { symbol: "USDC", name: "USD Coin", price: 1 },
    { symbol: "USDT", name: "Tether", price: 1 },
    { symbol: "BNB", name: "Binance Coin", price: 300 },
    { symbol: "ADA", name: "Cardano", price: 0.5 },
    { symbol: "SOL", name: "Solana", price: 100 },
  ];

  const handleSwap = () => {
    if (!fromAmount || !toAmount) {
      toast({
        title: "Error",
        description: "Please enter amounts to swap",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap Initiated",
      description: `Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
    });
  };

  const handleFlipTokens = () => {
    setFromToken(toToken);
    setToToken(fromToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-foreground">Swap Tokens</CardTitle>
              <Button variant="ghost" size="sm" className="hover:bg-muted/80">
                <Settings size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* From Token */}
            <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
              <label className="text-sm text-muted-foreground font-medium">From</label>
              <div className="flex gap-3 mt-3">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-40 bg-background/60 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground">{token.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="0.0"
                  value={fromAmount}
                  onChange={(e) => setFromAmount(e.target.value)}
                  className="flex-1 text-xl font-bold bg-background/60 border-border text-right"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Balance: 0.00</span>
                <span>≈ $0.00</span>
              </div>
            </div>

            {/* Flip Button */}
            <div className="flex justify-center -my-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleFlipTokens}
                className="rounded-full border-primary/30 hover:bg-primary/10 hover:border-primary/50 h-10 w-10"
              >
                <ArrowDownUp size={20} />
              </Button>
            </div>

            {/* To Token */}
            <div className="p-4 rounded-2xl border border-primary/20 bg-muted/30">
              <label className="text-sm text-muted-foreground font-medium">To (estimated)</label>
              <div className="flex gap-3 mt-3">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-40 bg-background/60 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tokens.map((token) => (
                      <SelectItem key={token.symbol} value={token.symbol}>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{token.symbol}</span>
                          <span className="text-xs text-muted-foreground">{token.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Input
                  placeholder="0.0"
                  value={toAmount}
                  onChange={(e) => setToAmount(e.target.value)}
                  className="flex-1 text-xl font-bold bg-background/60 border-border text-right"
                />
              </div>
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>Balance: 0.00</span>
                <span>≈ $0.00</span>
              </div>
            </div>

            {/* Transaction Details */}
            <div className="p-4 rounded-xl bg-muted/20 border border-border">
              <div className="flex justify-between items-center text-sm mb-3">
                <span className="text-muted-foreground">Slippage Tolerance</span>
                <span className="font-medium">{slippage}%</span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={slippage === "0.1" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSlippage("0.1")}
                  className="flex-1"
                >
                  0.1%
                </Button>
                <Button
                  variant={slippage === "0.5" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSlippage("0.5")}
                  className="flex-1"
                >
                  0.5%
                </Button>
                <Button
                  variant={slippage === "1.0" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSlippage("1.0")}
                  className="flex-1"
                >
                  1.0%
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSwap}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground"
            >
              Swap Tokens
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Token Prices */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-sm">Token Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.values(priceData).map((token) => (
                <div key={token.symbol} className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/30 transition-colors">
                  <span className="text-muted-foreground font-medium">{token.symbol}</span>
                  <div className="text-right">
                    <span className="text-foreground block font-bold">
                      ${token.price.toLocaleString('en-US', { 
                        minimumFractionDigits: token.price < 1 ? 4 : 2,
                        maximumFractionDigits: token.price < 1 ? 6 : 2
                      })}
                    </span>
                    <span className={`text-xs font-medium ${token.change24h >= 0 ? "text-primary" : "text-destructive"}`}>
                      {token.change24h >= 0 ? "+" : ""}{token.change24h.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Info */}
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground text-sm flex items-center gap-2">
              <Info size={16} />
              <span>Pool Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">Total Liquidity</span>
                <span className="text-foreground font-bold">$12.5M</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">24h Volume</span>
                <span className="text-foreground font-bold">$2.1M</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg hover:bg-muted/30 transition-colors">
                <span className="text-muted-foreground">Fee (24h)</span>
                <span className="text-foreground font-bold">$6,300</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwapInterface;