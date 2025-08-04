import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Crown, Star, Zap, Calendar, Coins } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RewardsPanel = () => {
  const [loyaltyPoints, setLoyaltyPoints] = useState(2450);
  const [vipLevel, setVipLevel] = useState(3);
  const [dailyStreak, setDailyStreak] = useState(7);
  const { toast } = useToast();

  const vipLevels = [
    { level: 1, name: "Bronze", requirement: 0, benefits: ["1% trading fee discount"] },
    { level: 2, name: "Silver", requirement: 1000, benefits: ["2% trading fee discount", "Priority support"] },
    { level: 3, name: "Gold", requirement: 5000, benefits: ["5% trading fee discount", "Exclusive tournaments", "Premium signals"] },
    { level: 4, name: "Platinum", requirement: 15000, benefits: ["10% trading fee discount", "Personal manager", "Early access"] },
    { level: 5, name: "Diamond", requirement: 50000, benefits: ["15% trading fee discount", "VIP events", "Custom limits"] },
  ];

  const dailyRewards = [
    { day: 1, reward: "10 Loyalty Points", claimed: true },
    { day: 2, reward: "20 Loyalty Points", claimed: true },
    { day: 3, reward: "5 Gaming Tokens", claimed: true },
    { day: 4, reward: "50 Loyalty Points", claimed: true },
    { day: 5, reward: "1 Lottery Ticket", claimed: true },
    { day: 6, reward: "100 Loyalty Points", claimed: true },
    { day: 7, reward: "10 Gaming Tokens", claimed: true },
  ];

  const achievements = [
    { name: "Welcome Trader", description: "Complete your first trade", points: 100, unlocked: true },
    { name: "High Roller", description: "Trade over $10,000 in volume", points: 500, unlocked: true },
    { name: "Gaming Master", description: "Win 50 games", points: 300, unlocked: false },
    { name: "Lucky Winner", description: "Win a lottery jackpot", points: 1000, unlocked: false },
    { name: "Liquidity Provider", description: "Provide liquidity for 30 days", points: 750, unlocked: false },
  ];

  const redeemableRewards = [
    { name: "Trading Fee Discount (1 day)", cost: 500, type: "discount" },
    { name: "10 Gaming Tokens", cost: 200, type: "tokens" },
    { name: "5 Lottery Tickets", cost: 300, type: "tickets" },
    { name: "Exclusive NFT", cost: 2000, type: "nft" },
    { name: "VIP Status (7 days)", cost: 1500, type: "vip" },
  ];

  const redeemReward = (reward: any) => {
    if (loyaltyPoints >= reward.cost) {
      setLoyaltyPoints(loyaltyPoints - reward.cost);
      toast({
        title: "Reward Redeemed!",
        description: `You've redeemed ${reward.name}`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: "You don't have enough loyalty points",
        variant: "destructive",
      });
    }
  };

  const claimDailyBonus = () => {
    setLoyaltyPoints(loyaltyPoints + 50);
    toast({
      title: "Daily Bonus Claimed!",
      description: "You've received 50 loyalty points",
    });
  };

  const currentVipLevel = vipLevels.find(level => level.level === vipLevel);
  const nextVipLevel = vipLevels.find(level => level.level === vipLevel + 1);
  const vipProgress = nextVipLevel ? ((loyaltyPoints - currentVipLevel!.requirement) / (nextVipLevel.requirement - currentVipLevel!.requirement)) * 100 : 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        {/* VIP Status */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Crown className="text-yellow-400" size={24} />
              <span>VIP Status</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-400">
                  {currentVipLevel?.name} Level {vipLevel}
                </div>
                <div className="text-gray-400">
                  {loyaltyPoints.toLocaleString()} Loyalty Points
                </div>
              </div>
              <Badge className="bg-yellow-500/20 text-yellow-400">
                VIP Member
              </Badge>
            </div>
            
            {nextVipLevel && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress to {nextVipLevel.name}</span>
                  <span className="text-white">
                    {loyaltyPoints.toLocaleString()} / {nextVipLevel.requirement.toLocaleString()}
                  </span>
                </div>
                <Progress value={vipProgress} className="h-2" />
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="text-white font-semibold">Current Benefits:</h4>
              <ul className="space-y-1">
                {currentVipLevel?.benefits.map((benefit, index) => (
                  <li key={index} className="text-green-400 text-sm flex items-center space-x-2">
                    <Star size={12} />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Gift className="text-purple-400" size={20} />
              <span>Achievements</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    achievement.unlocked
                      ? "bg-green-500/20 border-green-500/50"
                      : "bg-gray-500/20 border-gray-500/50"
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className={`font-semibold ${
                      achievement.unlocked ? "text-green-400" : "text-gray-400"
                    }`}>
                      {achievement.name}
                    </h4>
                    <Badge
                      variant="outline"
                      className={
                        achievement.unlocked
                          ? "border-green-500 text-green-400"
                          : "border-gray-500 text-gray-400"
                      }
                    >
                      +{achievement.points}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400">{achievement.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Redeemable Rewards */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Coins className="text-blue-400" size={20} />
              <span>Reward Store</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {redeemableRewards.map((reward, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold">{reward.name}</h4>
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                      {reward.cost} pts
                    </Badge>
                  </div>
                  <Button
                    onClick={() => redeemReward(reward)}
                    disabled={loyaltyPoints < reward.cost}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                  >
                    Redeem
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {/* Daily Rewards */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Calendar className="text-green-400" size={20} />
              <span>Daily Login</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{dailyStreak}</div>
              <p className="text-gray-400">Day Streak</p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {dailyRewards.map((reward, index) => (
                <div
                  key={index}
                  className={`p-2 rounded text-center text-xs ${
                    reward.claimed
                      ? "bg-green-500/20 border border-green-500/50"
                      : "bg-gray-500/20 border border-gray-500/50"
                  }`}
                >
                  <div className="font-semibold">Day {reward.day}</div>
                  <div className={reward.claimed ? "text-green-400" : "text-gray-400"}>
                    {reward.reward}
                  </div>
                </div>
              ))}
            </div>
            
            <Button
              onClick={claimDailyBonus}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Gift className="mr-2" size={16} />
              Claim Daily Bonus
            </Button>
          </CardContent>
        </Card>

        {/* Referral Program */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Referral Program</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              <div className="text-xl font-bold text-blue-400">15</div>
              <p className="text-gray-400 text-sm">Friends Referred</p>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Bonus Earned</span>
                <span className="text-green-400">750 pts</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Commission</span>
                <span className="text-green-400">$245</span>
              </div>
            </div>
            
            <Button variant="outline" className="w-full text-xs">
              Share Referral Link
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Challenges */}
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white text-sm">Weekly Challenges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Trade $5,000 volume</span>
                  <span className="text-yellow-400">3.2k/5k</span>
                </div>
                <Progress value={64} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Win 10 games</span>
                  <span className="text-yellow-400">7/10</span>
                </div>
                <Progress value={70} className="h-1" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Refer 2 friends</span>
                  <span className="text-green-400">2/2 ✓</span>
                </div>
                <Progress value={100} className="h-1" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RewardsPanel;