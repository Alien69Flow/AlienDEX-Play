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
import AdvancedTrading from "@/components/trading/AdvancedTrading";
import RewardsPanel from "@/components/rewards/RewardsPanel";
import SettingsModal from "@/components/settings/SettingsModal";
import { usePriceData } from "@/hooks/usePriceData";
import { useWallet } from "@/hooks/useWallet";
import logoImage from "/lovable-uploads/240619a7-e276-4620-b32c-e03d0863931b.png";

const Index = () => {
  const [activeTab, setActiveTab] = useState("swap");
  const [showSettings, setShowSettings] = useState(false);
  const priceData = usePriceData();
  const { wallet, connectWallet, disconnect, isLoading, getShortAddress, isMetaMaskInstalled } = useWallet();
  
  // Ordenar tokens por precio (BTC, ETH, XAUT, BNB, TAO, SOL, ALIEN, etc.)
  const sortedTokens = Object.values(priceData).sort((a, b) => {
    const order = ['BTC', 'ETH', 'XAUT', 'BNB', 'TAO', 'SOL', 'ALIEN', 'INJ', 'ADA', 'ATOM', 'POL', 'EUR/USD'];
    return order.indexOf(a.symbol) - order.indexOf(b.symbol);
  });
  const displayTokens = sortedTokens.slice(0, 7);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background font-nasalization">
      <div className="container mx-auto p-6">
        {/* Header */}
        <Card className="mb-8 border border-primary/30 shadow-lg relative backdrop-blur-xl bg-card/80">
          <div className="absolute inset-0 bg-gradient-to-br from-card/80 via-muted/50 to-card/80"></div>
          <CardHeader className="relative z-10 p-4 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="relative">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm border border-primary/20">
                    <img src={logoImage} alt="AlienDEX" className="w-12 h-12 md:w-16 md:h-16 object-contain" />
                  </div>
                </div>
                <div className="text-center md:text-left">
                  <CardTitle className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent tracking-wide">
                    AlienDEX
                  </CardTitle>
                  <p className="text-muted-foreground font-medium text-sm md:text-lg mt-1 tracking-wide">Decentralized Exchange & Gaming Hub</p>
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-3 md:gap-6 w-full md:w-auto">
                {wallet.isConnected ? (
                  <div className="flex items-center gap-3 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl border border-primary/40 shadow-neon backdrop-blur-sm">
                    <Wifi className="w-4 h-4 md:w-5 md:h-5 text-primary animate-pulse" />
                    <span className="text-primary font-bold text-sm md:text-lg">{getShortAddress(wallet.address)}</span>
                  </div>
                ) : (
                  <Button 
                    onClick={connectWallet}
                    disabled={isLoading || !isMetaMaskInstalled}
                    className="flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-2xl border border-primary/40 shadow-neon backdrop-blur-sm hover:from-primary/40 hover:to-secondary/40"
                  >
                    <Wallet className="w-4 h-4 md:w-5 md:h-5" />
                    <span className="font-bold text-sm md:text-lg">
                      {!isMetaMaskInstalled ? 'Install MetaMask' : 
                       isLoading ? 'Connecting...' : 'Connect Wallet'}
                    </span>
                  </Button>
                )}
                
                <div className="text-center px-4 py-2 md:px-6 md:py-3 bg-gradient-to-br from-muted/60 to-background/60 rounded-2xl border border-border shadow-deep backdrop-blur-sm">
              <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Total Balance</span>
                <span>${wallet.isConnected ? (parseFloat(wallet.balance) * (priceData.ETH?.price || 4050)).toFixed(2) : "Connect Wallet"}</span>
              </div>
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setShowSettings(!showSettings)}
                  className="relative border-2 border-primary/40 hover:border-primary shadow-sm hover:shadow-md transition-all duration-300 w-12 h-12 md:w-14 md:h-14 rounded-xl backdrop-blur-sm"
                >
                  <Settings className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 ${showSettings ? 'rotate-180 text-secondary' : 'hover:rotate-90 hover:text-primary'}`} />
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Live Price Ticker */}
        <Card className="mb-8 border border-primary/30 shadow-sm relative backdrop-blur-xl bg-card/60">
          <div className="absolute inset-0 bg-gradient-to-r from-card/80 via-muted/40 to-card/80"></div>
          <CardContent className="p-3 md:p-6 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-4">
              {displayTokens.map((token, index) => (
                <div 
                  key={token.symbol} 
                  className="flex flex-col gap-2 p-3 md:p-4 bg-gradient-to-br from-muted/40 to-background/40 rounded-xl border border-primary/30 hover:border-primary/60 transition-all duration-300 backdrop-blur-sm"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 md:gap-3">
                    <div className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                      token.symbol === 'ALIEN' 
                        ? 'bg-gradient-to-r from-secondary to-primary animate-pulse shadow-lg' 
                        : 'bg-gradient-to-r from-primary to-secondary shadow-md'
                    }`}></div>
                    <span className="font-bold text-foreground text-sm md:text-lg tracking-wider">{token.symbol}</span>
                  </div>
                  <div className="text-left md:text-right">
                    <span className="text-foreground font-bold text-lg md:text-xl block">
                      ${token.price.toLocaleString('en-US', { 
                        minimumFractionDigits: token.price < 1 ? 4 : 2,
                        maximumFractionDigits: token.price < 1 ? 6 : 2
                      })}
                    </span>
                    <div className={`text-xs md:text-sm font-bold px-2 py-1 md:px-3 md:py-1 rounded-full mt-1 inline-block ${
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
          <Card className="mb-8 border border-primary/30 shadow-sm backdrop-blur-xl relative bg-card/60">
            <div className="absolute inset-0 bg-gradient-to-r from-card/60 via-muted/30 to-card/60"></div>
            <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 relative z-10 h-auto p-2 bg-gradient-to-r from-muted/50 via-background/50 to-muted/50 border border-primary/30 rounded-2xl shadow-deep backdrop-blur-sm m-3 md:m-4 gap-2">
              <TabsTrigger 
                value="casino" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Dices className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Casino</span>
              </TabsTrigger>
              <TabsTrigger 
                value="gaming" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Gamepad2 className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Gaming</span>
              </TabsTrigger>
              <TabsTrigger 
                value="lottery" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <TicketIcon className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Lottery</span>
              </TabsTrigger>
              <TabsTrigger 
                value="rewards" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <Crown className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Rewards</span>
              </TabsTrigger>
              <TabsTrigger 
                value="swap" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <ArrowDownUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Swap</span>
              </TabsTrigger>
              <TabsTrigger 
                value="trading" 
                className="flex flex-col md:flex-row items-center gap-1 md:gap-2 py-3 px-2 md:py-4 md:px-4 transition-all duration-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-secondary data-[state=active]:text-primary-foreground hover:bg-primary/10 rounded-xl border border-transparent data-[state=active]:border-primary/30"
              >
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
                <span className="font-bold text-xs md:text-sm">Trading</span>
              </TabsTrigger>
            </TabsList>
          </Card>

          <TabsContent value="casino" className="space-y-6">
            <CasinoGames />
          </TabsContent>

          <TabsContent value="gaming" className="space-y-6">
            <GamingHub />
          </TabsContent>

          <TabsContent value="lottery" className="space-y-6">
            <LotterySystem />
          </TabsContent>

          <TabsContent value="rewards" className="space-y-6">
            <RewardsPanel />
          </TabsContent>

          <TabsContent value="swap" className="space-y-6">
            <SwapInterface />
          </TabsContent>

          <TabsContent value="trading" className="space-y-6">
            <AdvancedTrading />
          </TabsContent>
        </Tabs>

        {/* Settings Modal */}
        <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      </div>
    </div>
  );
};

export default Index;