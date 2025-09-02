import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Coins, Tractor, Droplets, Lock, TrendingUp } from "lucide-react";

const StakingRewards = () => {
  const [stakeAmount, setStakeAmount] = useState("");

  const stakingPools = [
    { 
      token: "ALIEN", 
      apy: 69.42, 
      tvl: "12.5M", 
      minStake: "100", 
      lockPeriod: "30 days",
      rewards: ["ALIEN", "ETH"]
    },
    { 
      token: "ETH", 
      apy: 15.8, 
      tvl: "145M", 
      minStake: "0.1", 
      lockPeriod: "No lock",
      rewards: ["ETH", "ALIEN"]
    },
    { 
      token: "BTC", 
      apy: 8.5, 
      tvl: "89M", 
      minStake: "0.01", 
      lockPeriod: "90 days",
      rewards: ["BTC", "ALIEN"]
    },
  ];

  const farmingPools = [
    { 
      pair: "ALIEN/ETH LP", 
      apy: 145.7, 
      tvl: "8.2M", 
      rewards: ["ALIEN", "Trading Fees"],
      multiplier: "3x"
    },
    { 
      pair: "ALIEN/USDC LP", 
      apy: 89.3, 
      tvl: "5.8M", 
      rewards: ["ALIEN", "Trading Fees"],
      multiplier: "2.5x"
    },
    { 
      pair: "ETH/USDC LP", 
      apy: 25.4, 
      tvl: "15.3M", 
      rewards: ["ALIEN", "Trading Fees"],
      multiplier: "1.2x"
    },
  ];

  const liquidityPools = [
    { 
      pair: "ALIEN/ETH", 
      liquidity: "$8.2M", 
      volume24h: "$2.1M", 
      fees24h: "$6,300",
      myShare: "0.45%"
    },
    { 
      pair: "ALIEN/USDC", 
      liquidity: "$5.8M", 
      volume24h: "$1.5M", 
      fees24h: "$4,500",
      myShare: "0.12%"
    },
    { 
      pair: "ETH/USDC", 
      liquidity: "$15.3M", 
      volume24h: "$4.2M", 
      fees24h: "$12,600",
      myShare: "0.08%"
    },
  ];

  return (
    <div className="space-y-6">
      <Tabs defaultValue="staking" className="w-full">
        <Card className="border border-primary/30 bg-card/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-foreground">Earn Rewards</CardTitle>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="farming" className="flex items-center gap-2">
                <Tractor size={16} />
                Farming
              </TabsTrigger>
              <TabsTrigger value="liquidity" className="flex items-center gap-2">
                <Droplets size={16} />
                Liquidity
              </TabsTrigger>
              <TabsTrigger value="staking" className="flex items-center gap-2">
                <Lock size={16} />
                Staking
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <CardContent>
            <TabsContent value="farming" className="space-y-6">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Yield Farming</h3>
                {farmingPools.map((farm, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-xl mb-2">{farm.pair}</h4>
                          <div className="flex gap-2 mb-2">
                            <Badge className="text-xs bg-primary">
                              {farm.multiplier} Multiplier
                            </Badge>
                            {farm.rewards.map((reward, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {reward}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{farm.apy}%</p>
                          <p className="text-sm text-muted-foreground">APY</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            TVL: ${farm.tvl}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Add Liquidity
                        </Button>
                        <Button variant="outline">
                          Harvest Rewards
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="liquidity" className="space-y-6">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Liquidity Pools</h3>
                {liquidityPools.map((pool, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-xl mb-2">{pool.pair}</h4>
                          <p className="text-sm text-muted-foreground">
                            Your Share: {pool.myShare}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold">{pool.liquidity}</p>
                          <p className="text-sm text-muted-foreground">Total Liquidity</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">24h Volume</p>
                          <p className="font-bold">{pool.volume24h}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">24h Fees</p>
                          <p className="font-bold text-primary">{pool.fees24h}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button className="bg-primary hover:bg-primary/90">
                          Add Liquidity
                        </Button>
                        <Button variant="outline">
                          Remove Liquidity
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="staking" className="space-y-6">
              <div className="grid gap-4">
                <h3 className="text-lg font-bold text-foreground">Staking Pools</h3>
                {stakingPools.map((pool, index) => (
                  <Card key={index} className="border border-primary/20 bg-muted/30">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-xl mb-2">{pool.token} Staking</h4>
                          <div className="flex gap-2 mb-2">
                            {pool.rewards.map((reward, i) => (
                              <Badge key={i} variant="secondary" className="text-xs">
                                {reward}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Min Stake: {pool.minStake} {pool.token} • Lock: {pool.lockPeriod}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-3xl font-bold text-primary">{pool.apy}%</p>
                          <p className="text-sm text-muted-foreground">APY</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            TVL: ${pool.tvl}
                          </p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <Input
                          placeholder={`Enter ${pool.token} amount`}
                          value={stakeAmount}
                          onChange={(e) => setStakeAmount(e.target.value)}
                          className="text-lg font-bold"
                        />
                        <div className="grid grid-cols-2 gap-2">
                          <Button className="bg-primary hover:bg-primary/90">
                            Stake
                          </Button>
                          <Button variant="outline">
                            Unstake
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default StakingRewards;