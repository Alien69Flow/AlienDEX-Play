import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dice1, Dice2, Dice3, Dice4, Dice5, Dice6, Spade, Heart, Diamond, Club, RotateCcw, Shuffle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClassicCasinoGames = () => {
  const [balance, setBalance] = useState(1000);
  const [betAmount, setBetAmount] = useState(10);
  const [diceResult, setDiceResult] = useState<number[]>([]);
  const [slotResult, setSlotResult] = useState<string[]>([]);
  const [blackjackHand, setBlackjackHand] = useState<string[]>([]);
  const [dealerHand, setDealerHand] = useState<string[]>([]);
  const [rouletteResult, setRouletteResult] = useState<number | null>(null);
  const [rouletteColor, setRouletteColor] = useState<string>("");
  const [pokerHand, setPokerHand] = useState<string[]>([]);
  const [isGameActive, setIsGameActive] = useState(false);
  const { toast } = useToast();

  const diceIcons = [Dice1, Dice2, Dice3, Dice4, Dice5, Dice6];
  
  const cards = ['A♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠', '8♠', '9♠', '10♠', 'J♠', 'Q♠', 'K♠',
                'A♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥', '8♥', '9♥', '10♥', 'J♥', 'Q♥', 'K♥',
                'A♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦', '8♦', '9♦', '10♦', 'J♦', 'Q♦', 'K♦',
                'A♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣', '8♣', '9♣', '10♣', 'J♣', 'Q♣', 'K♣'];

  // BLACKJACK GAME
  const startBlackjack = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }
    
    setBalance(balance - betAmount);
    setIsGameActive(true);
    
    // Deal initial cards
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const playerCards = [shuffled[0], shuffled[2]];
    const dealerCards = [shuffled[1]]; // Dealer gets one card initially
    
    setBlackjackHand(playerCards);
    setDealerHand(dealerCards);
    
    const playerValue = calculateHandValue(playerCards);
    if (playerValue === 21) {
      // Blackjack!
      const winAmount = betAmount * 2.5;
      setBalance(prev => prev + winAmount);
      toast({
        title: "BLACKJACK!",
        description: `Natural 21! Won ${winAmount} tokens!`,
      });
      setIsGameActive(false);
    }
  };

  const calculateHandValue = (hand: string[]) => {
    let value = 0;
    let aces = 0;
    
    hand.forEach(card => {
      const rank = card.slice(0, -1);
      if (['J', 'Q', 'K'].includes(rank)) {
        value += 10;
      } else if (rank === 'A') {
        value += 11;
        aces++;
      } else {
        value += parseInt(rank);
      }
    });
    
    // Adjust for aces
    while (value > 21 && aces > 0) {
      value -= 10;
      aces--;
    }
    
    return value;
  };

  const hitBlackjack = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const newCard = shuffled[0];
    const newHand = [...blackjackHand, newCard];
    setBlackjackHand(newHand);
    
    const handValue = calculateHandValue(newHand);
    if (handValue > 21) {
      toast({
        title: "Bust!",
        description: "You went over 21. House wins!",
        variant: "destructive",
      });
      setIsGameActive(false);
    }
  };

  const standBlackjack = () => {
    // Dealer plays
    let dealerCards = [...dealerHand];
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    let cardIndex = 0;
    
    while (calculateHandValue(dealerCards) < 17) {
      dealerCards.push(shuffled[cardIndex++]);
    }
    
    setDealerHand(dealerCards);
    
    const playerValue = calculateHandValue(blackjackHand);
    const dealerValue = calculateHandValue(dealerCards);
    
    if (dealerValue > 21 || playerValue > dealerValue) {
      const winAmount = betAmount * 2;
      setBalance(prev => prev + winAmount);
      toast({
        title: "You Win!",
        description: `Won ${winAmount} tokens!`,
      });
    } else if (playerValue === dealerValue) {
      setBalance(prev => prev + betAmount); // Push - return bet
      toast({
        title: "Push!",
        description: "It's a tie! Bet returned.",
      });
    } else {
      toast({
        title: "Dealer Wins",
        description: "Better luck next time!",
        variant: "destructive",
      });
    }
    
    setIsGameActive(false);
  };

  // ROULETTE GAME
  const playRoulette = (betType: string) => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }
    
    setBalance(balance - betAmount);
    
    setTimeout(() => {
      const result = Math.floor(Math.random() * 37); // 0-36
      let color = "";
      
      if (result === 0) {
        color = "green";
      } else if ([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36].includes(result)) {
        color = "red";
      } else {
        color = "black";
      }
      
      setRouletteResult(result);
      setRouletteColor(color);
      
      let won = false;
      let winAmount = 0;
      
      switch (betType) {
        case "red":
          if (color === "red") {
            won = true;
            winAmount = betAmount * 2;
          }
          break;
        case "black":
          if (color === "black") {
            won = true;
            winAmount = betAmount * 2;
          }
          break;
        case "even":
          if (result > 0 && result % 2 === 0) {
            won = true;
            winAmount = betAmount * 2;
          }
          break;
        case "odd":
          if (result % 2 === 1) {
            won = true;
            winAmount = betAmount * 2;
          }
          break;
      }
      
      if (won) {
        setBalance(prev => prev + winAmount);
        toast({
          title: "You Win!",
          description: `Number ${result} (${color})! Won ${winAmount} tokens!`,
        });
      } else {
        toast({
          title: "House Wins",
          description: `Number ${result} (${color}). Better luck next time!`,
          variant: "destructive",
        });
      }
    }, 2000);
  };

  // POKER GAME (5 Card Draw)
  const dealPoker = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }
    
    setBalance(balance - betAmount);
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    const hand = shuffled.slice(0, 5);
    setPokerHand(hand);
    
    const handRank = evaluatePokerHand(hand);
    const winAmount = getPokerPayout(handRank, betAmount);
    
    if (winAmount > 0) {
      setBalance(prev => prev + winAmount);
      toast({
        title: `${handRank}!`,
        description: `Won ${winAmount} tokens!`,
      });
    } else {
      toast({
        title: "No Win",
        description: "Try again for a winning hand!",
        variant: "destructive",
      });
    }
  };

  const evaluatePokerHand = (hand: string[]) => {
    // Simplified poker hand evaluation
    const ranks = hand.map(card => card.slice(0, -1));
    const suits = hand.map(card => card.slice(-1));
    
    const rankCounts = ranks.reduce((acc: any, rank) => {
      acc[rank] = (acc[rank] || 0) + 1;
      return acc;
    }, {});
    
    const counts = Object.values(rankCounts).sort((a: any, b: any) => b - a);
    const isFlush = suits.every(suit => suit === suits[0]);
    
    if (counts[0] === 4) return "Four of a Kind";
    if (counts[0] === 3 && counts[1] === 2) return "Full House";
    if (isFlush) return "Flush";
    if (counts[0] === 3) return "Three of a Kind";
    if (counts[0] === 2 && counts[1] === 2) return "Two Pair";
    if (counts[0] === 2) return "Pair";
    return "High Card";
  };

  const getPokerPayout = (handRank: string, bet: number) => {
    const payouts: { [key: string]: number } = {
      "Four of a Kind": 25,
      "Full House": 9,
      "Flush": 6,
      "Three of a Kind": 3,
      "Two Pair": 2,
      "Pair": 1,
      "High Card": 0
    };
    return bet * (payouts[handRank] || 0);
  };

  // DICE GAMES
  const rollDice = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }

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
          description: `Rolled ${sum}! Won ${winAmount} tokens`,
        });
      } else if (sum === 2 || sum === 3 || sum === 12) {
        toast({
          title: "House Wins",
          description: `Rolled ${sum}. Better luck next time!`,
          variant: "destructive",
        });
      } else {
        winAmount = Math.floor(betAmount * 1.5);
        toast({
          title: "Small Win!",
          description: `Rolled ${sum}! Won ${winAmount} tokens`,
        });
      }

      if (winAmount > 0) {
        setBalance(prev => prev + winAmount);
      }
    }, 1000);
  };

  // SLOT MACHINE
  const spinSlots = () => {
    if (betAmount > balance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough tokens to make this bet",
        variant: "destructive",
      });
      return;
    }

    setBalance(balance - betAmount);

    const symbols = ["🍒", "🍋", "🍊", "🍇", "⭐", "💎", "🔔", "7️⃣"];
    
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
        } else if (result[0] === "7️⃣") {
          winAmount = betAmount * 30;
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

      if (winAmount > 0) {
        setBalance(prev => prev + winAmount);
      }
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="blackjack" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Classic Casino Games</CardTitle>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
              <TabsTrigger value="blackjack" className="flex items-center gap-2">
                <Spade size={16} />
                Blackjack
              </TabsTrigger>
              <TabsTrigger value="roulette" className="flex items-center gap-2">
                <RotateCcw size={16} />
                Roulette
              </TabsTrigger>
              <TabsTrigger value="poker" className="flex items-center gap-2">
                <Diamond size={16} />
                Poker
              </TabsTrigger>
              <TabsTrigger value="dice" className="flex items-center gap-2">
                <Dice1 size={16} />
                Dice
              </TabsTrigger>
              <TabsTrigger value="slots" className="flex items-center gap-2">
                <Shuffle size={16} />
                Slots
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Balance & Bet Controls */}
            <div className="flex flex-col md:flex-row gap-4 p-4 bg-muted/30 rounded-xl">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Balance</p>
                <p className="text-2xl font-bold text-primary">{balance} tokens</p>
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">Bet Amount</label>
                <Input
                  type="number"
                  value={betAmount}
                  onChange={(e) => setBetAmount(Number(e.target.value))}
                  className="bg-background/60 border-primary/30"
                  min="1"
                  max={balance}
                />
              </div>
              <Button
                onClick={() => setBalance(balance + 100)}
                variant="outline"
                className="border-primary/30"
              >
                Buy 100 Tokens
              </Button>
            </div>

            <TabsContent value="blackjack" className="space-y-4">
              <Card className="border border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Blackjack</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2">Your Hand ({calculateHandValue(blackjackHand)})</h4>
                      <div className="flex gap-2 mb-4 min-h-[60px] items-center">
                        {blackjackHand.map((card, i) => (
                          <Badge key={i} variant="outline" className="text-lg p-2">
                            {card}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Dealer Hand ({dealerHand.length > 0 ? calculateHandValue(dealerHand) : '?'})</h4>
                      <div className="flex gap-2 mb-4 min-h-[60px] items-center">
                        {dealerHand.map((card, i) => (
                          <Badge key={i} variant="outline" className="text-lg p-2">
                            {card}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {!isGameActive ? (
                      <Button onClick={startBlackjack} className="bg-primary hover:bg-primary/90">
                        Deal Cards
                      </Button>
                    ) : (
                      <>
                        <Button onClick={hitBlackjack} variant="outline">
                          Hit
                        </Button>
                        <Button onClick={standBlackjack} className="bg-primary hover:bg-primary/90">
                          Stand
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roulette" className="space-y-4">
              <Card className="border border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Roulette</h3>
                  
                  <div className="text-center mb-6">
                    {rouletteResult !== null && (
                      <div className="mb-4">
                        <div className={`inline-block px-6 py-4 rounded-full text-2xl font-bold ${
                          rouletteColor === 'red' ? 'bg-red-500 text-white' :
                          rouletteColor === 'black' ? 'bg-black text-white' :
                          'bg-green-500 text-white'
                        }`}>
                          {rouletteResult}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">Last Result</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Button onClick={() => playRoulette('red')} className="bg-red-500 hover:bg-red-600">
                      Red (2x)
                    </Button>
                    <Button onClick={() => playRoulette('black')} className="bg-black hover:bg-gray-800 text-white">
                      Black (2x)
                    </Button>
                    <Button onClick={() => playRoulette('even')} variant="outline" className="border-primary/30">
                      Even (2x)
                    </Button>
                    <Button onClick={() => playRoulette('odd')} variant="outline" className="border-primary/30">
                      Odd (2x)
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="poker" className="space-y-4">
              <Card className="border border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">5-Card Draw Poker</h3>
                  
                  <div className="flex gap-2 mb-6 min-h-[60px] items-center justify-center">
                    {pokerHand.map((card, i) => (
                      <Badge key={i} variant="outline" className="text-lg p-2">
                        {card}
                      </Badge>
                    ))}
                  </div>
                  
                  <Button onClick={dealPoker} className="w-full bg-primary hover:bg-primary/90">
                    Deal New Hand
                  </Button>
                  
                  <div className="text-xs text-muted-foreground mt-4 space-y-1">
                    <p>• Pair = 1x • Two Pair = 2x • Three of a Kind = 3x</p>
                    <p>• Flush = 6x • Full House = 9x • Four of a Kind = 25x</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="dice" className="space-y-4">
              <Card className="border border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Dice Roll</h3>
                  
                  <div className="text-center mb-6">
                    <div className="flex justify-center gap-4 mb-4">
                      {diceResult.length > 0 ? (
                        diceResult.map((dice, index) => {
                          const DiceIcon = diceIcons[dice - 1];
                          return (
                            <DiceIcon
                              key={index}
                              size={64}
                              className="text-primary animate-pulse"
                            />
                          );
                        })
                      ) : (
                        <>
                          <Dice1 size={64} className="text-muted-foreground" />
                          <Dice1 size={64} className="text-muted-foreground" />
                        </>
                      )}
                    </div>
                    {diceResult.length > 0 && (
                      <p className="text-xl font-bold">
                        Total: {diceResult.reduce((a, b) => a + b, 0)}
                      </p>
                    )}
                  </div>
                  
                  <Button onClick={rollDice} className="w-full bg-primary hover:bg-primary/90">
                    Roll Dice
                  </Button>
                  
                  <div className="text-xs text-muted-foreground mt-4">
                    <p>• 7 or 11 = 2x win • 2, 3, or 12 = lose • Other numbers = 1.5x win</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="slots" className="space-y-4">
              <Card className="border border-primary/20 bg-muted/30">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Slot Machine</h3>
                  
                  <div className="text-center mb-6">
                    <div className="flex justify-center gap-2 mb-4 p-6 bg-background/60 rounded-xl">
                      {slotResult.length > 0 ? (
                        slotResult.map((symbol, index) => (
                          <div
                            key={index}
                            className="text-6xl animate-bounce"
                            style={{ animationDelay: `${index * 200}ms` }}
                          >
                            {symbol}
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="text-6xl text-muted-foreground">?</div>
                          <div className="text-6xl text-muted-foreground">?</div>
                          <div className="text-6xl text-muted-foreground">?</div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button onClick={spinSlots} className="w-full bg-primary hover:bg-primary/90">
                    Spin!
                  </Button>
                  
                  <div className="text-xs text-muted-foreground mt-4 space-y-1">
                    <p>• Three 💎 = 100x • Three ⭐ = 50x • Three 7️⃣ = 30x</p>
                    <p>• Three others = 10x • Two match = 2x</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default ClassicCasinoGames;