import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp, Settings, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SwapInterface = () => {
  const [fromToken, setFromToken] = useState("ETH");
  const [toToken, setToToken] = useState("USDC");
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const { toast } = useToast();

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
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Swap Tokens</CardTitle>
              <Button variant="ghost" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* From Token */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">From</label>
              <div className="flex space-x-2">
                <Select value={fromToken} onValueChange={setFromToken}>
                  <SelectTrigger className="w-32 bg-black/60 border-white/20">
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
                  className="bg-black/60 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Flip Button */}
            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleFlipTokens}
                className="rounded-full p-2 hover:bg-white/10"
              >
                <ArrowDownUp size={20} />
              </Button>
            </div>

            {/* To Token */}
            <div className="space-y-2">
              <label className="text-sm text-gray-400">To</label>
              <div className="flex space-x-2">
                <Select value={toToken} onValueChange={setToToken}>
                  <SelectTrigger className="w-32 bg-black/60 border-white/20">
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
                  className="bg-black/60 border-white/20 text-white"
                />
              </div>
            </div>

            {/* Slippage Settings */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>Slippage Tolerance: {slippage}%</span>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSlippage("0.1")}
                  className={slippage === "0.1" ? "bg-blue-500/20" : ""}
                >
                  0.1%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSlippage("0.5")}
                  className={slippage === "0.5" ? "bg-blue-500/20" : ""}
                >
                  0.5%
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSlippage("1.0")}
                  className={slippage === "1.0" ? "bg-blue-500/20" : ""}
                >
                  1.0%
                </Button>
              </div>
            </div>

            <Button
              onClick={handleSwap}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              Swap Tokens
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Token Prices */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Token Prices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tokens.slice(0, 5).map((token) => (
                <div key={token.symbol} className="flex justify-between text-sm">
                  <span className="text-gray-400">{token.symbol}</span>
                  <span className="text-white">${token.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Info */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm flex items-center space-x-2">
              <Info size={16} />
              <span>Liquidity Pool</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Total Liquidity</span>
                <span className="text-white">$12.5M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">24h Volume</span>
                <span className="text-white">$2.1M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Fee (24h)</span>
                <span className="text-white">$6,300</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SwapInterface;