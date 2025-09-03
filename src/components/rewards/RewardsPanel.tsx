import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Target, Trophy, Star, Zap, Calendar, CheckCircle, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StakingRewards from "./StakingRewards";

const RewardsPanel = () => {
  const [userPoints, setUserPoints] = useState(2850);
  const [userLevel, setUserLevel] = useState(8);
  const [dailyStreak, setDailyStreak] = useState(5);
  const { toast } = useToast();

  const dailyTasks = [
    { 
      id: 1, 
      name: "Complete 3 Swaps", 
      description: "Make 3 successful token swaps", 
      progress: 2, 
      total: 3, 
      reward: 150, 
      completed: false 
    },
    { 
      id: 2, 
      name: "Provide Liquidity", 
      description: "Add liquidity to any pool", 
      progress: 1, 
      total: 1, 
      reward: 300, 
      completed: true 
    },
    { 
      id: 3, 
      name: "Win Casino Game", 
      description: "Win any casino game", 
      progress: 0, 
      total: 1, 
      reward: 200, 
      completed: false 
    },
    { 
      id: 4, 
      name: "Trade Perpetuals", 
      description: "Open a perpetual position", 
      progress: 0, 
      total: 1, 
      reward: 250, 
      completed: false 
    }
  ];

  const weeklyTasks = [
    { 
      id: 1, 
      name: "High Volume Trader", 
      description: "Trade $10,000+ volume", 
      progress: 7500, 
      total: 10000, 
      reward: 1000, 
      completed: false 
    },
    { 
      id: 2, 
      name: "Farming Master", 
      description: "Earn $100+ from farming", 
      progress: 45, 
      total: 100, 
      reward: 750, 
      completed: false 
    }
  ];

  const achievements = [
    { name: "First Swap", icon: "🔄", earned: true, points: 100 },
    { name: "Liquidity Provider", icon: "💧", earned: true, points: 500 },
    { name: "Casino Winner", icon: "🎰", earned: false, points: 300 },
    { name: "Trading Pro", icon: "📈", earned: false, points: 1000 },
    { name: "Staking Master", icon: "🔒", earned: true, points: 400 },
    { name: "Bridge User", icon: "🌉", earned: false, points: 200 }
  ];

  const rewards = [
    { name: "Premium Theme", cost: 500, icon: "🎨", type: "Cosmetic" },
    { name: "Trading Fee Discount", cost: 1000, icon: "💸", type: "Utility" },
    { name: "VIP Support", cost: 2000, icon: "👑", type: "Service" },
    { name: "Exclusive NFT", cost: 5000, icon: "🖼️", type: "Collectible" }
  ];

  const claimTask = (taskId: number) => {
    const task = [...dailyTasks, ...weeklyTasks].find(t => t.id === taskId);
    if (task && task.completed) {
      setUserPoints(prev => prev + task.reward);
      toast({
        title: "Reward Claimed!",
        description: `You earned ${task.reward} points!`,
      });
    }
  };

  const redeemReward = (reward: any) => {
    if (userPoints >= reward.cost) {
      setUserPoints(prev => prev - reward.cost);
      toast({
        title: "Reward Redeemed!",
        description: `You got ${reward.name}!`,
      });
    } else {
      toast({
        title: "Insufficient Points",
        description: `You need ${reward.cost - userPoints} more points`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="rewards" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Rewards Center</CardTitle>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="farming" className="flex items-center gap-2">
                <Target size={16} />
                Farming
              </TabsTrigger>
              <TabsTrigger value="liquidity" className="flex items-center gap-2">
                <Zap size={16} />
                Liquidity
              </TabsTrigger>
              <TabsTrigger value="rewards" className="flex items-center gap-2">
                <Gift size={16} />
                Rewards
              </TabsTrigger>
              <TabsTrigger value="staking" className="flex items-center gap-2">
                <Lock size={16} />
                Staking
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          
          <CardContent>
            <TabsContent value="rewards" className="space-y-6">
              {/* User Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border border-primary/20 bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Star className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-2xl font-bold">{userPoints.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Total Points</p>
                  </CardContent>
                </Card>
                <Card className="border border-primary/20 bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Trophy className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-2xl font-bold">Level {userLevel}</p>
                    <p className="text-sm text-muted-foreground">Current Level</p>
                  </CardContent>
                </Card>
                <Card className="border border-primary/20 bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <Calendar className="mx-auto mb-2 text-primary" size={32} />
                    <p className="text-2xl font-bold">{dailyStreak} days</p>
                    <p className="text-sm text-muted-foreground">Daily Streak</p>
                  </CardContent>
                </Card>
              </div>

              {/* Daily Tasks */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Daily Tasks</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {dailyTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background/50">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{task.name}</h4>
                          {task.completed ? (
                            <CheckCircle className="text-primary" size={20} />
                          ) : (
                            <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/50" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="mt-2">
                          <Progress value={(task.progress / task.total) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            {task.progress}/{task.total}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge className="mb-2">{task.reward} pts</Badge>
                        <Button
                          size="sm"
                          disabled={!task.completed}
                          onClick={() => claimTask(task.id)}
                          className="block"
                        >
                          {task.completed ? "Claim" : "Pending"}
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Weekly Tasks */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Weekly Challenges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {weeklyTasks.map((task) => (
                    <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border border-primary/10 bg-background/50">
                      <div className="flex-1">
                        <h4 className="font-semibold">{task.name}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                        <div className="mt-2">
                          <Progress value={(task.progress / task.total) * 100} className="h-2" />
                          <p className="text-xs text-muted-foreground mt-1">
                            ${task.progress.toLocaleString()}/${task.total.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right ml-4">
                        <Badge variant="secondary" className="mb-2">{task.reward} pts</Badge>
                        <Button size="sm" disabled className="block">
                          In Progress
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Achievements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border text-center ${
                          achievement.earned
                            ? "border-primary bg-primary/10"
                            : "border-muted-foreground/20 bg-muted/50 opacity-60"
                        }`}
                      >
                        <div className="text-2xl mb-2">{achievement.icon}</div>
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">+{achievement.points} pts</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Rewards Shop */}
              <Card className="border border-primary/20 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Rewards Shop</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {rewards.map((reward, index) => (
                      <div key={index} className="p-4 rounded-lg border border-primary/10 bg-background/50">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{reward.icon}</span>
                            <div>
                              <h4 className="font-semibold">{reward.name}</h4>
                              <Badge variant="outline" className="text-xs">{reward.type}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">{reward.cost} pts</p>
                          </div>
                        </div>
                        <Button
                          className="w-full"
                          disabled={userPoints < reward.cost}
                          onClick={() => redeemReward(reward)}
                        >
                          {userPoints >= reward.cost ? "Redeem" : "Need More Points"}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="farming" className="space-y-4">
              <StakingRewards farmingOnly={true} />
            </TabsContent>

            <TabsContent value="liquidity" className="space-y-4">
              <StakingRewards liquidityOnly={true} />
            </TabsContent>

            <TabsContent value="staking" className="space-y-4">
              <StakingRewards stakingOnly={true} />
            </TabsContent>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default RewardsPanel;