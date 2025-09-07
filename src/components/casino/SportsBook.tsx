import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Trophy, Gamepad2, TrendingUp, Target, Calendar } from "lucide-react";

const SportsBook = () => {
  const [betAmount, setBetAmount] = useState("");
  const [selectedBet, setSelectedBet] = useState<any>(null);

  const sportsEvents = [
    {
      id: 1,
      sport: "Football",
      category: "Football",
      league: "Premier League 25/26",
      homeTeam: "Manchester City",
      awayTeam: "Arsenal", 
      date: "Sep 15, 2025 15:00",
      odds: { home: 1.85, draw: 3.20, away: 4.50 },
      live: false
    },
    {
      id: 2,
      sport: "Football", 
      category: "Football",
      league: "Champions League 25/26",
      homeTeam: "Real Madrid",
      awayTeam: "Barcelona",
      date: "Sep 20, 2025 21:00",
      odds: { home: 2.15, draw: 3.10, away: 3.80 },
      live: false
    },
    {
      id: 3,
      sport: "Basketball",
      category: "Basketball", 
      league: "NBA 2025-26",
      homeTeam: "Lakers",
      awayTeam: "Warriors",
      date: "Sep 25, 2025 21:00",
      odds: { home: 2.10, draw: null, away: 1.72 },
      live: true
    },
    {
      id: 4,
      sport: "Tennis",
      category: "Tennis",
      league: "US Open 2025",
      homeTeam: "Djokovic",
      awayTeam: "Alcaraz", 
      date: "Sep 12, 2025 14:00",
      odds: { home: 1.95, draw: null, away: 1.80 },
      live: false
    },
    {
      id: 5,
      sport: "Formula 1",
      category: "Motorsport",
      league: "F1 2025 Season",
      homeTeam: "Verstappen",
      awayTeam: "Hamilton",
      date: "Sep 14, 2025 14:00", 
      odds: { home: 1.45, draw: null, away: 2.85 },
      live: false
    },
    {
      id: 6,
      sport: "Horse Racing",
      category: "Horse Racing",
      league: "Kentucky Derby 2026",
      homeTeam: "Thunder Bolt",
      awayTeam: "Lightning Strike",
      date: "May 2, 2026 16:00",
      odds: { home: 3.20, draw: null, away: 2.10 },
      live: false
    }
  ];

  const esportsEvents = [
    {
      id: 1,
      game: "CS2",
      category: "FPS",
      tournament: "IEM Katowice 2025",
      team1: "Navi",
      team2: "FaZe",
      date: "Sep 15, 2025 18:00",
      odds: { team1: 1.65, team2: 2.25 },
      live: true
    },
    {
      id: 2,
      game: "Dota 2",
      category: "MOBA", 
      tournament: "The International 2025",
      team1: "Team Spirit",
      team2: "PSG.LGD",
      date: "Oct 16, 2025 12:00",
      odds: { team1: 2.40, team2: 1.55 },
      live: false
    },
    {
      id: 3,
      game: "League of Legends",
      category: "MOBA",
      tournament: "Worlds 2025",
      team1: "T1",
      team2: "G2 Esports",
      date: "Nov 5, 2025 15:00",
      odds: { team1: 1.85, team2: 1.95 },
      live: false
    },
    {
      id: 4,
      game: "Valorant",
      category: "FPS", 
      tournament: "VCT Champions 2025",
      team1: "Sentinels",
      team2: "Fnatic",
      date: "Sep 28, 2025 19:00",
      odds: { team1: 2.10, team2: 1.72 },
      live: false
    }
  ];

  const predictionMarkets = [
    {
      id: 1,
      question: "Will Bitcoin reach $200,000 by end of 2025?",
      category: "Crypto",
      odds: { yes: 2.2, no: 1.6 },
      volume: "$4.8M",
      deadline: "Dec 31, 2025"
    },
    {
      id: 2,
      question: "Will Ethereum reach $8,000 in 2025?",
      category: "Crypto", 
      odds: { yes: 3.5, no: 1.25 },
      volume: "$2.1M",
      deadline: "Dec 31, 2025"
    },
    {
      id: 3,
      question: "Will NVIDIA stock price reach $1,200 by Q2 2026?",
      category: "Stocks",
      odds: { yes: 2.8, no: 1.4 },
      volume: "$1.9M",
      deadline: "Jun 30, 2026"
    },
    {
      id: 4,
      question: "Will Tesla Model 2 be released in 2025?",
      category: "Technology",
      odds: { yes: 1.8, no: 2.0 },
      volume: "$1.2M", 
      deadline: "Dec 31, 2025"
    },
    {
      id: 5,
      question: "Will OpenAI IPO in 2025?",
      category: "Technology",
      odds: { yes: 2.5, no: 1.5 },
      volume: "$3.2M",
      deadline: "Dec 31, 2025"
    },
    {
      id: 6,
      question: "Will Gold reach $4,000/oz in 2025?",
      category: "Commodities",
      odds: { yes: 4.2, no: 1.2 },
      volume: "$890K",
      deadline: "Dec 31, 2025"
    }
  ];

  const placeBet = (event: any, outcome: string, odds: number) => {
    setSelectedBet({ event, outcome, odds });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="sports" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Sports & Prediction Markets</CardTitle>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="sports" className="flex items-center gap-2">
                <Timer size={16} />
                Sports
              </TabsTrigger>
              <TabsTrigger value="esports" className="flex items-center gap-2">
                <Gamepad2 size={16} />
                Esports
              </TabsTrigger>
              <TabsTrigger value="predictions" className="flex items-center gap-2">
                <Target size={16} />
                Predictions
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="sports" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Sports Betting</h3>
                {sportsEvents.map((event) => (
                  <Card key={event.id} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{event.category}</Badge>
                            <Badge variant="outline">{event.league}</Badge>
                            {event.live && <Badge className="bg-red-500 animate-pulse">LIVE</Badge>}
                          </div>
                          <h4 className="font-bold text-lg">
                            {event.homeTeam} vs {event.awayTeam}
                          </h4>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar size={14} />
                            {event.date}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16"
                          onClick={() => placeBet(event, event.homeTeam, event.odds.home)}
                        >
                          <span className="font-medium">{event.homeTeam}</span>
                          <span className="text-lg font-bold text-primary">{event.odds.home}</span>
                        </Button>
                        {event.odds.draw && (
                          <Button
                            variant="outline"
                            className="flex flex-col gap-1 h-16"
                            onClick={() => placeBet(event, "Draw", event.odds.draw)}
                          >
                            <span className="font-medium">Draw</span>
                            <span className="text-lg font-bold text-primary">{event.odds.draw}</span>
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16"
                          onClick={() => placeBet(event, event.awayTeam, event.odds.away)}
                        >
                          <span className="font-medium">{event.awayTeam}</span>
                          <span className="text-lg font-bold text-primary">{event.odds.away}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="esports" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Esports Betting</h3>
                {esportsEvents.map((event) => (
                  <Card key={event.id} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{event.category}</Badge>
                            <Badge variant="outline">{event.tournament}</Badge>
                            {event.live && <Badge className="bg-red-500 animate-pulse">LIVE</Badge>}
                          </div>
                          <h4 className="font-bold text-lg">
                            {event.team1} vs {event.team2}
                          </h4>
                          <p className="text-sm text-muted-foreground">{event.date}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16"
                          onClick={() => placeBet(event, event.team1, event.odds.team1)}
                        >
                          <span className="font-medium">{event.team1}</span>
                          <span className="text-lg font-bold text-primary">{event.odds.team1}</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16"
                          onClick={() => placeBet(event, event.team2, event.odds.team2)}
                        >
                          <span className="font-medium">{event.team2}</span>
                          <span className="text-lg font-bold text-primary">{event.odds.team2}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="predictions" className="space-y-4">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Prediction Markets</h3>
                {predictionMarkets.map((market) => (
                  <Card key={market.id} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{market.category}</Badge>
                          <span className="text-sm text-muted-foreground">Volume: {market.volume}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2">{market.question}</h4>
                        <p className="text-sm text-muted-foreground">
                          Deadline: {market.deadline}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16 border-primary/40"
                          onClick={() => placeBet(market, "Yes", market.odds.yes)}
                        >
                          <span className="font-medium">YES</span>
                          <span className="text-lg font-bold text-primary">{market.odds.yes}</span>
                        </Button>
                        <Button
                          variant="outline"
                          className="flex flex-col gap-1 h-16 border-destructive/40"
                          onClick={() => placeBet(market, "No", market.odds.no)}
                        >
                          <span className="font-medium">NO</span>
                          <span className="text-lg font-bold text-destructive">{market.odds.no}</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </CardContent>
        </Card>

        {/* Bet Slip */}
        {selectedBet && (
          <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Bet Slip</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-primary/20 bg-muted/30">
                  <h4 className="font-bold">{selectedBet.outcome}</h4>
                  <p className="text-sm text-muted-foreground">
                    Odds: {selectedBet.odds}
                  </p>
                </div>
                <Input
                  placeholder="Enter bet amount"
                  value={betAmount}
                  onChange={(e) => setBetAmount(e.target.value)}
                  type="number"
                />
                <div className="flex justify-between text-sm">
                  <span>Potential Win:</span>
                  <span className="font-bold text-primary">
                    ${betAmount ? (parseFloat(betAmount) * selectedBet.odds).toFixed(2) : "0.00"}
                  </span>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Place Bet
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setSelectedBet(null)}
                >
                  Clear Bet
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </Tabs>
    </div>
  );
};

export default SportsBook;