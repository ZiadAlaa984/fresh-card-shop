import { Button } from "@/components/ui/button";

const BtnNavbar = ({
  Count,
  icon,
}: {
  Count?: number;
  icon: React.ReactNode;
}) => (
  <div className="hidden md:flex items-center gap-2">
    <div className="relative">
      <Button variant="outline" size="icon">
        {icon}
      </Button>
      {Count !== undefined && Count > 0 && (
        <span className="absolute top-0 right-0 px-1 min-w-4 translate-x-1/2 -translate-y-1/2 origin-center flex items-center justify-center rounded-full text-xs bg-destructive text-white">
          {Count}
        </span>
      )}
    </div>
  </div>
);

export default BtnNavbar;
