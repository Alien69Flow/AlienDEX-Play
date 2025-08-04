import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Spade, Heart, Diamond, Club } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CasinoGames = () => {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [slotResult, setSlotResult] = useState<string[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const { toast } = useToast();

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];

  const rollDice = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }

    setIsRolling(true);
    setBalance(balance - betAmount);

    setTimeout(() => {
      const roll1 = Math.floor(Math.random() * 6) + 1;
      const roll2 = Math.floor(Math.random() * 6) + 1;
      setDiceResult([roll1, roll2]);

      const sum = roll1 + roll2;
      let winAmount = 0;

      if (sum === 7 || sum === 11) {
        winAmount = betAmount * 2;
        toast({
          title: "Winner!",
          description: `You rolled ${sum}! Won ${winAmount} tokens`,
        });
      } else if (sum === 2 || sum === 3 || sum === 12) {
        toast({
          title: "House Wins",
          description: `You rolled ${sum}. Better luck next time!`,
          variant: "destructive",
        });
      } else {
        winAmount = betAmount * 1.5;
        toast({
          title: "Small Win!",
          description: `You rolled ${sum}! Won ${winAmount} tokens`,
        });
      }

      setBalance(prev => prev + winAmount);
      setIsRolling(false);
    }, 1000);
  };

  const spinSlots = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }

    setIsRolling(true);
    setBalance(balance - betAmount);

    const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎"];
    
    setTimeout(() => {
      const result = [
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
      ];
      setSlotResult(result);

      let winAmount = 0;
      if (result[0] === result[1] && result[1] === result[2]) {
        if (result[0] === "💎") {
          winAmount = betAmount * 100;
        } else if (result[0] === "⭐") {
          winAmount = betAmount * 50;
        } else {
          winAmount = betAmount * 10;
        }
        toast({
          title: "JACKPOT!",
          description: `Three ${result[0]}! Won ${winAmount} tokens!`,
        });
      } else if (result[0] === result[1] || result[1] === result[2] || result[0] === result[2]) {
        winAmount = betAmount * 2;
        toast({
          title: "Small Win!",
          description: `Pair match! Won ${winAmount} tokens`,
        });
      } else {
        toast({
          title: "No Match",
          description: "Try again!",
          variant: "destructive",
        });
      }

      setBalance(prev => prev + winAmount);
      setIsRolling(false);
    }, 2000);
  };

  const playBlackjack = () => {
    toast({
      title: "Coming Soon!",
      description: "Blackjack will be available in the next update",
    });
  };

  const playPoker = () => {
    toast({
      title: "Coming Soon!",
      description: "Poker will be available in the next update",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Dice Game */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Dice1 className="text-red-400" size={24} />
            <span>Dice Roll</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center space-x-4 mb-4">
              {diceResult.length > 0 ? (
                diceResult.map((dice, index) => {
                  const DiceIcon = diceIcons[dice - 1];
                  return (
                    <DiceIcon
                      key={index}
                      size={48}
                      className="text-white animate-pulse"
                    />
                  );
                })
              ) : (
                <>
                  <Dice1 size={48} className="text-gray-400" />
                  <Dice1 size={48} className="text-gray-400" />
                </>
              )}
            </div>
            {diceResult.length > 0 && (
              <p className="text-white text-lg">
                Total: {diceResult.reduce((a, b) => a + b, 0)}
              </p>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Bet Amount</label>
            <Input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="bg-black/60 border-white/20 text-white"
              min="1"
              max={balance}
            />
          </div>
          
          <Button
            onClick={rollDice}
            disabled={isRolling}
            className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700"
          >
            {isRolling ? "Rolling..." : "Roll Dice"}
          </Button>
          
          <div className="text-xs text-gray-400">
            <p>• 7 or 11 = 2x win</p>
            <p>• 2, 3, or 12 = lose</p>
            <p>• Other numbers = 1.5x win</p>
          </div>
        </CardContent>
      </Card>

      {/* Slot Machine */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">🎰 Slot Machine</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="flex justify-center space-x-2 mb-4 p-4 bg-black/60 rounded-lg">
              {slotResult.length > 0 ? (
                slotResult.map((symbol, index) => (
                  <div
                    key={index}
                    className="text-4xl animate-bounce"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    {symbol}
                  </div>
                ))
              ) : (
                <>
                  <div className="text-4xl text-gray-400">?</div>
                  <div className="text-4xl text-gray-400">?</div>
                  <div className="text-4xl text-gray-400">?</div>
                </>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-gray-400 text-sm">Bet Amount</label>
            <Input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="bg-black/60 border-white/20 text-white"
              min="1"
              max={balance}
            />
          </div>
          
          <Button
            onClick={spinSlots}
            disabled={isRolling}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
          >
            {isRolling ? "Spinning..." : "Spin!"}
          </Button>
          
          <div className="text-xs text-gray-400">
            <p>• Three 💎 = 100x win</p>
            <p>• Three ⭐ = 50x win</p>
            <p>• Three others = 10x win</p>
            <p>• Two match = 2x win</p>
          </div>
        </CardContent>
      </Card>

      {/* Card Games */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Spade className="text-white" size={20} />
            <span>Card Games</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={playBlackjack}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
          >
            <Heart className="mr-2" size={16} />
            Blackjack
          </Button>
          
          <Button
            onClick={playPoker}
            className="w-full bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700"
          >
            <Diamond className="mr-2" size={16} />
            Texas Hold'em
          </Button>
          
          <div className="text-center">
            <Badge variant="outline" className="border-yellow-500 text-yellow-400">
              Coming Soon
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Balance & Stats */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Casino Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400">
              {balance} tokens
            </div>
            <p className="text-gray-400">Current Balance</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">Games Played</span>
              <span className="text-white">23</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Biggest Win</span>
              <span className="text-green-400">500 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Win Rate</span>
              <span className="text-yellow-400">45%</span>
            </div>
          </div>
          
          <Button
            onClick={() => setBalance(balance + 100)}
            variant="outline"
            className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/20"
          >
            Buy More Tokens
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CasinoGames;