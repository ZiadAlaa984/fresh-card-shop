import ResetPassword from "@/app/(pages)/info/ResetPassword";
import UpdateInfo from "@/app/(pages)/info/updateInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, KeyRound } from "lucide-react";
const tabs = [
  {
    name: "Info",
    value: "info",
    icon: <Info />,
  },
  {
    name: "Reset Password",
    value: "resetPassword",
    icon: <KeyRound />,
  },
];
export default function VerticalTabsDemo() {
  return (
    <Tabs
      orientation="vertical"
      defaultValue={tabs[0].value}
      className=" w-full flex items-start flex-row gap-4 justify-center"
    >
      <TabsList className="shrink-0 grid grid-cols-1 h-auto w-fit gap-1">
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className="py-1.5 flex justify-start items-center gap-1"
          >
            {tab.icon} {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className=" flex items-center justify-center  w-full  font-medium text-muted-foreground">
        {tabs.map((tab) => (
          <TabsContent key={tab.value} className="" value={tab.value}>
            {tab.value == "info" && <UpdateInfo />}
            {tab.value == "resetPassword" && <ResetPassword />}
          </TabsContent>
        ))}
      </div>
    </Tabs>
  );
}
