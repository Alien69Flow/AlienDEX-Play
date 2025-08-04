import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Ticket, Clock, Trophy, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const LotterySystem = () => {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [ticketCount, setTicketCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState("2d 14h 32m");
  const { toast } = useToast();

  const currentLottery = {
    jackpot: 125000,
    participants: 3847,
    ticketPrice: 5,
    drawDate: "2024-01-15T20:00:00Z",
  };

  const pastDraws = [
    { date: "2024-01-08", jackpot: 89000, winner: "0x1234...5678", numbers: [7, 14, 23, 31, 42, 49] },
    { date: "2024-01-01", jackpot: 67000, winner: "0x9876...4321", numbers: [3, 18, 25, 36, 41, 47] },
    { date: "2023-12-25", jackpot: 156000, winner: "0x5555...9999", numbers: [12, 19, 28, 33, 45, 50] },
  ];

  const selectNumber = (num: number) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter(n => n !== num));
    } else if (selectedNumbers.length < 6) {
      setSelectedNumbers([...selectedNumbers, num].sort((a, b) => a - b));
    } else {
      toast({
        title: "Maximum Numbers Selected",
        description: "You can only select 6 numbers for the lottery",
        variant: "destructive",
      });
    }
  };

  const buyTicket = () => {
    if (selectedNumbers.length !== 6) {
      toast({
        title: "Incomplete Selection",
        description: "Please select exactly 6 numbers",
        variant: "destructive",
      });
      return;
    }

    setTicketCount(ticketCount + 1);
    toast({
      title: "Ticket Purchased!",
      description: `Your numbers: ${selectedNumbers.join(", ")}`,
    });
    setSelectedNumbers([]);
  };

  const quickPick = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const num = Math.floor(Math.random() * 49) + 1;
      if (!numbers.includes(num)) {
        numbers.push(num);
      }
    }
    setSelectedNumbers(numbers.sort((a, b) => a - b));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* Current Lottery */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Trophy className="text-yellow-400" size={24} />
              <span>Weekly Mega Lottery</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                ${currentLottery.jackpot.toLocaleString()}
              </div>
              <p className="text-gray-400">Current Jackpot</p>
              <div className="flex justify-center items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2 text-blue-400">
                  <Users size={16} />
                  <span>{currentLottery.participants.toLocaleString()} players</span>
                </div>
                <div className="flex items-center space-x-2 text-red-400">
                  <Clock size={16} />
                  <span>{timeLeft}</span>
                </div>
              </div>
            </div>

            {/* Number Selection */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Select Your Numbers (Choose 6)</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 49 }, (_, i) => i + 1).map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    size="sm"
                    onClick={() => selectNumber(num)}
                    className={`h-10 w-10 p-0 ${
                      selectedNumbers.includes(num)
                        ? "bg-yellow-500 border-yellow-500 text-black"
                        : "bg-black/60 border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {num}
                  </Button>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={quickPick} variant="outline" className="flex-1">
                  Quick Pick
                </Button>
                <Button onClick={() => setSelectedNumbers([])} variant="outline" className="flex-1">
                  Clear All
                </Button>
              </div>
            </div>

            {/* Selected Numbers */}
            <div className="space-y-2">
              <h4 className="text-white">Your Selection:</h4>
              <div className="flex space-x-2">
                {selectedNumbers.map((num) => (
                  <Badge key={num} className="bg-yellow-500 text-black">
                    {num}
                  </Badge>
                ))}
                {Array.from({ length: 6 - selectedNumbers.length }, (_, i) => (
                  <Badge key={`empty-${i}`} variant="outline" className="border-gray-500 text-gray-500">
                    ?
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-gray-400">
                Ticket Price: {currentLottery.ticketPrice} tokens
              </div>
              <Button
                onClick={buyTicket}
                disabled={selectedNumbers.length !== 6}
                className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              >
                <Ticket className="mr-2" size={16} />
                Buy Ticket
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Past Draws */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Recent Draws</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastDraws.map((draw, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="text-white font-semibold">{draw.date}</div>
                      <div className="text-green-400">${draw.jackpot.toLocaleString()}</div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      Won
                    </Badge>
                  </div>
                  <div className="flex space-x-2 mb-2">
                    {draw.numbers.map((num) => (
                      <Badge key={num} className="bg-blue-500 text-white">
                        {num}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-sm text-gray-400">
                    Winner: {draw.winner}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Your Tickets */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Ticket className="text-blue-400" size={20} />
              <span>Your Tickets</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-blue-400">{ticketCount}</div>
              <p className="text-gray-400">Tickets for this draw</p>
            </div>
            
            {ticketCount > 0 && (
              <div className="space-y-2">
                <h4 className="text-white text-sm">Your Entries:</h4>
                {Array.from({ length: ticketCount }, (_, i) => (
                  <div key={i} className="p-2 rounded bg-blue-500/20 text-sm">
                    <span className="text-blue-400">Ticket #{i + 1}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Lottery Types */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Other Lotteries</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="p-3 rounded bg-purple-500/20 border border-purple-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Daily Draw</span>
                <Badge variant="outline" className="border-purple-500 text-purple-400">
                  Active
                </Badge>
              </div>
              <div className="text-purple-400">$5,000 Prize</div>
              <div className="text-sm text-gray-400">Draw in 6h 23m</div>
            </div>
            
            <div className="p-3 rounded bg-green-500/20 border border-green-500/30">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white font-semibold">Instant Win</span>
                <Badge variant="outline" className="border-green-500 text-green-400">
                  Available
                </Badge>
              </div>
              <div className="text-green-400">Win up to $1,000</div>
              <div className="text-sm text-gray-400">Scratch cards</div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Lottery Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Tickets Bought</span>
              <span className="text-white">47</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Spent</span>
              <span className="text-white">235 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Won</span>
              <span className="text-green-400">120 tokens</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Biggest Win</span>
              <span className="text-yellow-400">85 tokens</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LotterySystem;