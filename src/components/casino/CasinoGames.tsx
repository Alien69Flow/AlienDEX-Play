import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Spade, TrendingUp, Trophy, Star, Dice1 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClassicCasinoGames from "./ClassicCasinoGames";
import SportsBook from "./SportsBook";

const CasinoGames = () => {
  const { toast } = useToast();

  const featuredGames = [
    { 
      name: "Blackjack Pro", 
      type: "Cards", 
      players: "2,341", 
      minBet: "1", 
      maxWin: "1000x",
      popularity: "🔥 Hot"
    },
    { 
      name: "Roulette Royal", 
      type: "Table", 
      players: "1,856", 
      minBet: "0.5", 
      maxWin: "35x",
      popularity: "⭐ Popular"
    },
    { 
      name: "Poker Championship", 
      type: "Cards", 
      players: "892", 
      minBet: "5", 
      maxWin: "500x",
      popularity: "💎 Premium"
    },
    { 
      name: "Dice Master", 
      type: "Dice", 
      players: "3,124", 
      minBet: "0.1", 
      maxWin: "100x",
      popularity: "🚀 Trending"
    }
  ];

  const liveStats = [
    { label: "Active Players", value: "12,847" },
    { label: "Games Today", value: "89,234" },
    { label: "Total Payouts", value: "$2.4M" },
    { label: "Biggest Win Today", value: "$45,600" }
  ];

  const quickPlay = (gameName: string) => {
    toast({
      title: "Starting Game",
      description: `Loading ${gameName}...`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="casino" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Casino & Betting</CardTitle>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="casino" className="flex items-center gap-2">
                <Spade size={16} />
                Casino
              </TabsTrigger>
              <TabsTrigger value="games" className="flex items-center gap-2">
                <Dice1 size={16} />
                Games
              </TabsTrigger>
              <TabsTrigger value="betting" className="flex items-center gap-2">
                <TrendingUp size={16} />
                Live Betting
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="casino" className="space-y-6">
              {/* Live Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {liveStats.map((stat, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold text-primary">{stat.value}</p>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Featured Games */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="text-primary" size={24} />
                    Featured Games
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredGames.map((game, index) => (
                      <div key={index} className="p-4 rounded-lg border border-primary/10 bg-background/50">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-bold text-lg">{game.name}</h4>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">{game.type}</Badge>
                              <Badge variant="outline" className="text-xs">{game.popularity}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{game.players} playing</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                          <div>
                            <p className="text-muted-foreground">Min Bet</p>
                            <p className="font-bold">{game.minBet} tokens</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Max Win</p>
                            <p className="font-bold text-primary">{game.maxWin}</p>
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={() => quickPlay(game.name)}
                        >
                          Quick Play
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Daily Tournaments */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="text-primary" size={24} />
                    Daily Tournaments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border border-primary/10 bg-background/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Blackjack Championship</h4>
                          <p className="text-sm text-muted-foreground">Starts in 2h 15m</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">Prize Pool</p>
                          <p className="text-2xl font-bold">10,000 tokens</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm">Entry: 50 tokens • 156 players</span>
                        <Button size="sm">Join Tournament</Button>
                      </div>
                    </div>
                    
                    <div className="p-4 rounded-lg border border-primary/10 bg-background/50">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-bold">Poker Night</h4>
                          <p className="text-sm text-muted-foreground">Starts in 4h 30m</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">Prize Pool</p>
                          <p className="text-2xl font-bold">25,000 tokens</p>
                        </div>
                      </div>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-sm">Entry: 100 tokens • 89 players</span>
                        <Button size="sm">Join Tournament</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="games" className="space-y-4">
              <ClassicCasinoGames />
            </TabsContent>

            <TabsContent value="betting" className="space-y-4">
              <SportsBook />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default CasinoGames;