import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, Gamepad2, Dices, TicketIcon, Crown, TrendingUp, Wallet, Settings, Wifi } from "lucide-react";
import SwapInterface from "@/components/dex/SwapInterface";
import GamingHub from "@/components/gaming/GamingHub";
import CasinoGames from "@/components/casino/CasinoGames";
import LotterySystem from "@/components/lottery/LotterySystem";
import TradingView from "@/components/trading/TradingView";
import RewardsPanel from "@/components/rewards/RewardsPanel";
import { usePriceData } from "@/hooks/usePriceData";
import logoImage from "@/assets/aliendex-logo.png";

const Index = () => {
  const [activeTab, setActiveTab] = useState("swap");
  const [showSettings, setShowSettings] = useState(false);
  const priceData = usePriceData();
  const [userBalance, setUserBalance] = useState(1000.50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background font-nasalization">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Card className="mb-6 border border-primary/20 shadow-card-enhanced relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-card opacity-80"></div>
          <div className="absolute inset-0 bg-gradient-neon opacity-10 animate-pulse"></div>
          <CardHeader className="relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shadow-neon border border-primary/30 bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img src={logoImage} alt="AlienDEX" className="w-full h-full object-contain drop-shadow-glow" />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold bg-gradient-neon bg-clip-text text-transparent drop-shadow-sm">
                    AlienDEX
                  </CardTitle>
                  <p className="text-sm text-muted-foreground font-medium">Decentralized Exchange & Gaming Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30 shadow-neon">
                  <Wifi className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-sm text-primary font-semibold">Connected</span>
                </div>
                <div className="text-right px-4 py-2 bg-gradient-to-br from-muted/50 to-background/50 rounded-lg border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Balance</p>
                  <p className="font-bold text-lg text-foreground">${userBalance.toFixed(2)}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="relative overflow-hidden group border-primary/30 hover:border-primary shadow-green hover:shadow-neon transition-all duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  <Settings className={`w-4 h-4 transition-all duration-300 ${showSettings ? 'rotate-180 text-secondary' : 'group-hover:rotate-90 group-hover:text-primary'}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Live Price Ticker */}
        <Card className="mb-6 border border-primary/20 shadow-card-enhanced relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-card opacity-90"></div>
          <div className="absolute inset-0 bg-gradient-ticker animate-pulse"></div>
          <CardContent className="p-4 relative z-10">
            <div className="flex items-center gap-8 overflow-x-auto scrollbar-hide">
              {Object.values(priceData).map((token, index) => (
                <div key={token.symbol} className="flex items-center gap-3 min-w-fit px-4 py-2 bg-gradient-to-r from-muted/30 to-background/30 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 hover:shadow-green">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${token.symbol === 'ALIEN' ? 'bg-secondary animate-pulse' : 'bg-primary'}`}></div>
                    <span className="font-bold text-foreground text-sm">{token.symbol}</span>
                  </div>
                  <span className="text-foreground font-semibold">
                    ${token.price.toFixed(token.symbol === 'ALIEN' ? 2 : 2)}
                  </span>
                  <span className={`text-sm font-semibold px-2 py-1 rounded-full ${
                    token.change24h >= 0 
                      ? 'text-primary bg-primary/20' 
                      : 'text-destructive bg-destructive/20'
                  }`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-gradient-to-r from-muted/50 to-background/50 border border-primary/20 p-2 rounded-xl shadow-card-enhanced">
            <TabsTrigger 
              value="swap" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <ArrowDownUp className="w-4 h-4" />
              <span className="font-semibold">Swap</span>
            </TabsTrigger>
            <TabsTrigger 
              value="trading" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="font-semibold">Trading</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gaming" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <Gamepad2 className="w-4 h-4" />
              <span className="font-semibold">Gaming</span>
            </TabsTrigger>
            <TabsTrigger 
              value="casino" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <Dices className="w-4 h-4" />
              <span className="font-semibold">Casino</span>
            </TabsTrigger>
            <TabsTrigger 
              value="lottery" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <TicketIcon className="w-4 h-4" />
              <span className="font-semibold">Lottery</span>
            </TabsTrigger>
            <TabsTrigger 
              value="rewards" 
              className="flex items-center gap-2 transition-all duration-300 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-green hover:bg-primary/10"
            >
              <Crown className="w-4 h-4" />
              <span className="font-semibold">Rewards</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="swap">
            <SwapInterface />
          </TabsContent>

          <TabsContent value="trading">
            <TradingView />
          </TabsContent>

          <TabsContent value="gaming">
            <GamingHub />
          </TabsContent>

          <TabsContent value="casino">
            <CasinoGames />
          </TabsContent>

          <TabsContent value="lottery">
            <LotterySystem />
          </TabsContent>

          <TabsContent value="rewards">
            <RewardsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;