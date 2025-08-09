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
        <Card className="mb-8 border border-primary/30 shadow-cosmic relative overflow-hidden group backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-muted/50 to-card/80"></div>
          <div className="absolute inset-0 bg-gradient-neon opacity-5 animate-pulse"></div>
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-primary blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-1000"></div>
          <CardHeader className="relative z-10 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-cosmic border-2 border-primary/40 bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm">
                    <img src={logoImage} alt="AlienDEX" className="w-full h-full object-contain drop-shadow-glow" />
                  </div>
                  <div className="absolute -inset-2 bg-gradient-primary rounded-2xl blur-md opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <CardTitle className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent drop-shadow-lg tracking-wide">
                    AlienDEX
                  </CardTitle>
                  <p className="text-muted-foreground font-medium text-lg mt-1 tracking-wide">Decentralized Exchange & Gaming Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl border border-primary/40 shadow-neon backdrop-blur-sm">
                  <Wifi className="w-5 h-5 text-primary animate-pulse" />
                  <span className="text-primary font-bold text-lg">Connected</span>
                </div>
                <div className="text-right px-6 py-3 bg-gradient-to-br from-muted/60 to-background/60 rounded-2xl border border-border shadow-deep backdrop-blur-sm">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Total Balance</p>
                  <p className="font-bold text-2xl text-foreground mt-1">${userBalance.toFixed(2)}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="relative overflow-hidden group border-2 border-primary/40 hover:border-primary shadow-green hover:shadow-cosmic transition-all duration-500 w-14 h-14 rounded-xl backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-cosmic blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <Settings className={`w-5 h-5 transition-all duration-500 ${showSettings ? 'rotate-180 text-secondary scale-110' : 'group-hover:rotate-90 group-hover:text-primary group-hover:scale-110'}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Live Price Ticker */}
        <Card className="mb-8 border border-primary/30 shadow-cosmic relative overflow-hidden backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-muted/40 to-card/80"></div>
          <div className="absolute inset-0 bg-gradient-ticker animate-pulse"></div>
          <div className="absolute -top-5 -left-5 w-32 h-32 bg-gradient-primary blur-3xl opacity-10 animate-pulse"></div>
          <CardContent className="p-6 relative z-10">
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
              {Object.values(priceData).map((token, index) => (
                <div 
                  key={token.symbol} 
                  className="flex items-center gap-4 min-w-fit px-6 py-4 bg-gradient-to-br from-muted/40 to-background/40 rounded-2xl border border-primary/30 hover:border-primary/60 transition-all duration-500 hover:shadow-cosmic hover:scale-105 backdrop-blur-sm group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      token.symbol === 'ALIEN' 
                        ? 'bg-gradient-to-r from-secondary to-primary animate-pulse shadow-lg' 
                        : 'bg-gradient-to-r from-primary to-secondary shadow-md'
                    }`}></div>
                    <span className="font-bold text-foreground text-lg tracking-wider">{token.symbol}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground font-bold text-xl">
                      ${token.price.toLocaleString('en-US', { 
                        minimumFractionDigits: token.symbol === 'ADA' ? 2 : 0,
                        maximumFractionDigits: token.symbol === 'ADA' ? 2 : 0
                      })}
                    </span>
                    <div className={`text-sm font-bold px-3 py-1 rounded-full mt-1 ${
                      token.change24h >= 0 
                        ? 'text-primary bg-primary/20 border border-primary/30' 
                        : 'text-destructive bg-destructive/20 border border-destructive/30'
                    }`}>
                      {token.change24h >= 0 ? '▲' : '▼'} {Math.abs(token.change24h).toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <Card className="mb-8 border border-primary/30 shadow-cosmic backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-card/60 via-muted/30 to-card/60"></div>
            <TabsList className="relative z-10 grid w-full grid-cols-6 p-3 m-4 bg-gradient-to-r from-muted/50 via-background/50 to-muted/50 border border-primary/30 rounded-2xl shadow-deep backdrop-blur-sm">
              <TabsTrigger 
                value="swap" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <ArrowDownUp className="w-5 h-5" />
                <span className="font-bold text-lg">Swap</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trading" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <TrendingUp className="w-5 h-5" />
                <span className="font-bold text-lg">Trading</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gaming" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Gamepad2 className="w-5 h-5" />
                <span className="font-bold text-lg">Gaming</span>
              </TabsTrigger>
              <TabsTrigger 
                value="casino" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Dices className="w-5 h-5" />
                <span className="font-bold text-lg">Casino</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lottery" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <TicketIcon className="w-5 h-5" />
                <span className="font-bold text-lg">Lottery</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rewards" 
                className="flex items-center gap-3 py-4 px-6 transition-all duration-500 data-[state=active]:bg-gradient-button data-[state=active]:text-primary-foreground data-[state=active]:shadow-cosmic data-[state=active]:scale-105 hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Crown className="w-5 h-5" />
                <span className="font-bold text-lg">Rewards</span>
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="swap" className="space-y-6">
            <SwapInterface />
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <TradingView />
          </TabsContent>

          <TabsContent value="gaming" className="space-y-6">
            <GamingHub />
          </TabsContent>

          <TabsContent value="casino" className="space-y-6">
            <CasinoGames />
          </TabsContent>

          <TabsContent value="lottery" className="space-y-6">
            <LotterySystem />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <RewardsPanel />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;