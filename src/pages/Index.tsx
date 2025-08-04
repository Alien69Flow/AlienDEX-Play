import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowDownUp, Gamepad2, Dices, TicketIcon, Crown, TrendingUp, Wallet, Settings } from "lucide-react";
import SwapInterface from "@/components/dex/SwapInterface";
import GamingHub from "@/components/gaming/GamingHub";
import CasinoGames from "@/components/casino/CasinoGames";
import LotterySystem from "@/components/lottery/LotterySystem";
import TradingView from "@/components/trading/TradingView";
import RewardsPanel from "@/components/rewards/RewardsPanel";

const Index = () => {
  const [activeTab, setActiveTab] = useState("swap");
  const [userBalance, setUserBalance] = useState(1000.50);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">AlienDEX</h1>
              <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                Connected
              </Badge>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <Wallet size={20} />
                <span>${userBalance.toFixed(2)}</span>
              </div>
              <Button variant="outline" size="sm">
                <Settings size={16} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6 bg-black/30">
            <TabsTrigger value="swap" className="flex items-center space-x-2">
              <ArrowDownUp size={16} />
              <span>Swap</span>
            </TabsTrigger>
            <TabsTrigger value="trading" className="flex items-center space-x-2">
              <TrendingUp size={16} />
              <span>Trading</span>
            </TabsTrigger>
            <TabsTrigger value="gaming" className="flex items-center space-x-2">
              <Gamepad2 size={16} />
              <span>Gaming</span>
            </TabsTrigger>
            <TabsTrigger value="casino" className="flex items-center space-x-2">
              <Dices size={16} />
              <span>Casino</span>
            </TabsTrigger>
            <TabsTrigger value="lottery" className="flex items-center space-x-2">
              <TicketIcon size={16} />
              <span>Lottery</span>
            </TabsTrigger>
            <TabsTrigger value="rewards" className="flex items-center space-x-2">
              <Crown size={16} />
              <span>Rewards</span>
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