import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Zap, Target, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GamingHub = () => {
  const [userLevel, setUserLevel] = useState(12);
  const [xp, setXp] = useState(2450);
  const [maxXp] = useState(3000);
  const [tokens, setTokens] = useState(150);
  const { toast } = useToast();

  const games = [
    {
      id: 1,
      name: "Trading Battle",
      description: "Compete with other traders in real-time",
      reward: "50-500 tokens",
      players: 1234,
      difficulty: "Medium",
      type: "PvP",
    },
    {
      id: 2,
      name: "Liquidity Hunter",
      description: "Find the best liquidity pools",
      reward: "25-200 tokens",
      players: 856,
      difficulty: "Easy",
      type: "Solo",
    },
    {
      id: 3,
      name: "Yield Farmer",
      description: "Maximize your farming strategies",
      reward: "100-1000 tokens",
      players: 567,
      difficulty: "Hard",
      type: "Strategy",
    },
    {
      id: 4,
      name: "Price Predictor",
      description: "Predict token price movements",
      reward: "75-750 tokens",
      players: 2341,
      difficulty: "Medium",
      type: "Prediction",
    },
  ];

  const achievements = [
    { name: "First Swap", earned: true, xp: 100 },
    { name: "High Roller", earned: true, xp: 500 },
    { name: "Liquidity Provider", earned: false, xp: 250 },
    { name: "Diamond Hands", earned: false, xp: 1000 },
  ];

  const playGame = (gameId: number) => {
    const game = games.find(g => g.id === gameId);
    toast({
      title: "Game Started!",
      description: `Starting ${game?.name}. Good luck!`,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {games.map((game) => (
            <Card key={game.id} className="bg-black/40 border-white/10 hover:border-blue-500/50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-white text-lg">{game.name}</CardTitle>
                  <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                    {game.type}
                  </Badge>
                </div>
                <p className="text-gray-400 text-sm">{game.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Reward</span>
                    <span className="text-green-400">{game.reward}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Players</span>
                    <span className="text-white">{game.players.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Difficulty</span>
                    <Badge
                      variant="outline"
                      className={
                        game.difficulty === "Easy"
                          ? "border-green-500 text-green-400"
                          : game.difficulty === "Medium"
                          ? "border-yellow-500 text-yellow-400"
                          : "border-red-500 text-red-400"
                      }
                    >
                      {game.difficulty}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => playGame(game.id)}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
                  >
                    Play Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leaderboard */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={20} />
              <span>Weekly Leaderboard</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { rank: 1, name: "CryptoMaster", score: 15420 },
                { rank: 2, name: "DefiWarrior", score: 12890 },
                { rank: 3, name: "YieldHunter", score: 11560 },
                { rank: 4, name: "SwapKing", score: 9870 },
                { rank: 5, name: "LiquidityLord", score: 8650 },
              ].map((player) => (
                <div key={player.rank} className="flex items-center justify-between p-2 rounded bg-white/5">
                  <div className="flex items-center space-x-3">
                    <span className="text-yellow-400 font-bold">#{player.rank}</span>
                    <span className="text-white">{player.name}</span>
                  </div>
                  <span className="text-blue-400">{player.score.toLocaleString()} pts</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Player Stats */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Star className="text-yellow-400" size={20} />
              <span>Your Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">Level {userLevel}</div>
              <div className="text-sm text-gray-400">
                {xp.toLocaleString()} / {maxXp.toLocaleString()} XP
              </div>
              <Progress value={(xp / maxXp) * 100} className="mt-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Gaming Tokens</span>
                <span className="text-yellow-400 flex items-center space-x-1">
                  <Zap size={16} />
                  <span>{tokens}</span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Games Played</span>
                <span className="text-white">47</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win Rate</span>
                <span className="text-green-400">68%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Award className="text-purple-400" size={20} />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-2 rounded ${
                    achievement.earned ? "bg-green-500/20" : "bg-gray-500/20"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Target
                      size={16}
                      className={achievement.earned ? "text-green-400" : "text-gray-400"}
                    />
                    <span
                      className={achievement.earned ? "text-green-400" : "text-gray-400"}
                    >
                      {achievement.name}
                    </span>
                  </div>
                  <span className="text-sm text-yellow-400">+{achievement.xp} XP</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenges */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Daily Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Complete 3 swaps</span>
                <span className="text-yellow-400">2/3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Win a trading battle</span>
                <span className="text-green-400">✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Provide liquidity</span>
                <span className="text-red-400">0/1</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GamingHub;