import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const TradingView = () => {
  const [selectedPair, setSelectedPair] = useState("ETH/USDT");
  const [orderType, setOrderType] = useState("market");
  const [side, setSide] = useState("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const { toast } = useToast();

  const tradingPairs = [
    { pair: "ETH/USDT", price: 2450.32, change: 2.34, volume: "12.5M" },
    { pair: "BTC/USDT", price: 44250.67, change: -1.23, volume: "8.9M" },
    { pair: "BNB/USDT", price: 315.89, change: 3.45, volume: "5.2M" },
    { pair: "ADA/USDT", price: 0.4567, change: 5.67, volume: "3.1M" },
    { pair: "SOL/USDT", price: 98.76, change: -2.10, volume: "4.8M" },
  ];

  const orderBook = {
    bids: [
      { price: 2449.50, amount: 2.543, total: 6229.98 },
      { price: 2449.00, amount: 1.234, total: 3022.17 },
      { price: 2448.75, amount: 3.876, total: 9491.55 },
      { price: 2448.50, amount: 0.987, total: 2417.67 },
      { price: 2448.25, amount: 2.156, total: 5278.41 },
    ],
    asks: [
      { price: 2450.50, amount: 1.876, total: 4597.14 },
      { price: 2451.00, amount: 2.345, total: 5747.89 },
      { price: 2451.25, amount: 0.789, total: 1934.24 },
      { price: 2451.75, amount: 3.234, total: 7926.61 },
      { price: 2452.00, amount: 1.567, total: 3842.28 },
    ],
  };

  const recentTrades = [
    { price: 2450.32, amount: 0.145, time: "14:32:15", type: "buy" },
    { price: 2450.15, amount: 0.876, time: "14:32:10", type: "sell" },
    { price: 2450.45, amount: 0.234, time: "14:32:05", type: "buy" },
    { price: 2450.20, amount: 1.543, time: "14:32:00", type: "sell" },
    { price: 2450.55, amount: 0.987, time: "14:31:55", type: "buy" },
  ];

  const placeOrder = () => {
    if (!amount) {
      toast({
        title: "Error",
        description: "Please enter an amount",
        variant: "destructive",
      });
      return;
    }

    if (orderType === "limit" && !price) {
      toast({
        title: "Error",
        description: "Please enter a price for limit order",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Placed",
      description: `${side.toUpperCase()} ${amount} ${selectedPair.split("/")[0]} ${
        orderType === "limit" ? `at $${price}` : "at market price"
      }`,
    });

    setAmount("");
    setPrice("");
  };

  const currentPair = tradingPairs.find(p => p.pair === selectedPair);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Trading Pairs */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-sm">Markets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {tradingPairs.map((pair) => (
              <div
                key={pair.pair}
                onClick={() => setSelectedPair(pair.pair)}
                className={`p-3 rounded cursor-pointer transition-colors ${
                  selectedPair === pair.pair ? "bg-blue-500/20" : "hover:bg-white/5"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">{pair.pair}</span>
                  <Badge
                    variant="outline"
                    className={
                      pair.change > 0
                        ? "border-green-500 text-green-400"
                        : "border-red-500 text-red-400"
                    }
                  >
                    {pair.change > 0 ? "+" : ""}{pair.change}%
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-white">${pair.price.toLocaleString()}</span>
                  <span className="text-gray-400 text-sm">{pair.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chart & Order Book */}
      <div className="lg:col-span-2 space-y-6">
        {/* Price Header */}
        <Card className="bg-black/40 border-white/10">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedPair}</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-white">
                    ${currentPair?.price.toLocaleString()}
                  </span>
                  <div className={`flex items-center space-x-1 ${
                    currentPair && currentPair.change > 0 ? "text-green-400" : "text-red-400"
                  }`}>
                    {currentPair && currentPair.change > 0 ? (
                      <TrendingUp size={20} />
                    ) : (
                      <TrendingDown size={20} />
                    )}
                    <span>{currentPair?.change}%</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-sm">24h Volume</div>
                <div className="text-white font-semibold">{currentPair?.volume}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Chart Placeholder */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <BarChart3 size={20} />
              <span>Price Chart</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-gradient-to-br from-green-500/10 to-red-500/10 rounded-lg flex items-center justify-center">
              <p className="text-gray-400">Trading Chart will be integrated here</p>
            </div>
          </CardContent>
        </Card>

        {/* Order Book */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Order Book</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {/* Bids */}
              <div>
                <h4 className="text-green-400 text-sm mb-2">Bids</h4>
                <div className="space-y-1">
                  {orderBook.bids.map((bid, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-green-400">{bid.price}</span>
                      <span className="text-white">{bid.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Asks */}
              <div>
                <h4 className="text-red-400 text-sm mb-2">Asks</h4>
                <div className="space-y-1">
                  {orderBook.asks.map((ask, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-red-400">{ask.price}</span>
                      <span className="text-white">{ask.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Panel */}
      <div className="space-y-4">
        {/* Order Form */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <DollarSign size={20} />
              <span>Place Order</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Buy/Sell Toggle */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                onClick={() => setSide("buy")}
                variant={side === "buy" ? "default" : "outline"}
                className={side === "buy" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                Buy
              </Button>
              <Button
                onClick={() => setSide("sell")}
                variant={side === "sell" ? "default" : "outline"}
                className={side === "sell" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                Sell
              </Button>
            </div>

            {/* Order Type */}
            <Select value={orderType} onValueChange={setOrderType}>
              <SelectTrigger className="bg-black/60 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="market">Market</SelectItem>
                <SelectItem value="limit">Limit</SelectItem>
              </SelectContent>
            </Select>

            {/* Price (for limit orders) */}
            {orderType === "limit" && (
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Price</label>
                <Input
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-black/60 border-white/20 text-white"
                />
              </div>
            )}

            {/* Amount */}
            <div className="space-y-2">
              <label className="text-gray-400 text-sm">Amount</label>
              <Input
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/60 border-white/20 text-white"
              />
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                25%
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                50%
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                75%
              </Button>
              <Button variant="outline" size="sm" className="text-xs">
                100%
              </Button>
            </div>

            <Button
              onClick={placeOrder}
              className={`w-full ${
                side === "buy"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {side === "buy" ? "Buy" : "Sell"} {selectedPair.split("/")[0]}
            </Button>
          </CardContent>
        </Card>

        {/* Recent Trades */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Recent Trades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span
                    className={trade.type === "buy" ? "text-green-400" : "text-red-400"}
                  >
                    {trade.price}
                  </span>
                  <span className="text-white">{trade.amount}</span>
                  <span className="text-gray-400">{trade.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingView;