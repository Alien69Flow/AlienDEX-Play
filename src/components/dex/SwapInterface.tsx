import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdvancedSwap from "./AdvancedSwap";
const SwapInterface = () => {
  return (
    <Tabs defaultValue="advanced" className="w-full">
      <TabsList className="grid w-full grid-cols-1 mb-6">
        <TabsTrigger value="advanced">Advanced Swap Interface</TabsTrigger>
      </TabsList>
      <TabsContent value="advanced">
        <AdvancedSwap />
      </TabsContent>
    </Tabs>
  );
};

export default SwapInterface;