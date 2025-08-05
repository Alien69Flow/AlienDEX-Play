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
        <Card className="mb-6 bg-gradient-card backdrop-blur-sm border-border shadow-glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src={logoImage} alt="AlienDEX" className="w-full h-full object-contain" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    AlienDEX
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">Decentralized Exchange & Gaming Hub</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-full">
                  <Wifi className="w-4 h-4 text-primary" />
                  <span className="text-sm text-primary">Connected</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Balance</p>
                  <p className="font-bold text-foreground">${userBalance.toFixed(2)}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="relative overflow-hidden group"
                >
                  <Settings className={`w-4 h-4 transition-transform duration-300 ${showSettings ? 'rotate-180' : 'group-hover:rotate-90'}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Live Price Ticker */}
        <Card className="mb-6 bg-gradient-card backdrop-blur-sm border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-6 overflow-x-auto">
              {Object.values(priceData).map((token) => (
                <div key={token.symbol} className="flex items-center gap-2 min-w-fit">
                  <span className="font-semibold text-foreground">{token.symbol}</span>
                  <span className="text-foreground">${token.price.toFixed(token.symbol === 'ALIEN' ? 6 : 2)}</span>
                  <span className={`text-sm ${token.change24h >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-muted border-border">
            <TabsTrigger value="swap" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <ArrowDownUp className="w-4 h-4" />
              Swap
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TrendingUp className="w-4 h-4" />
              Trading
            </TabsTrigger>
            <TabsTrigger value="gaming" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Gamepad2 className="w-4 h-4" />
              Gaming
            </TabsTrigger>
            <TabsTrigger value="casino" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Dices className="w-4 h-4" />
              Casino
            </TabsTrigger>
            <TabsTrigger value="lottery" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <TicketIcon className="w-4 h-4" />
              Lottery
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Crown className="w-4 h-4" />
              Rewards
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